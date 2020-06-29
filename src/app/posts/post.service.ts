import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated$ = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    // return [...this.posts];

    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((mappedPostData) => {
        // console.log(mappedPostData);
        this.posts = mappedPostData.posts;
        this.postsUpdated$.next({
          posts: [...this.posts],
          postCount: mappedPostData.maxPosts,
        });
      });
  }

  getPost(id: string) {
    // return { ...this.posts.find((post) => post.id === id) };
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(`http://localhost:3000/api/posts/${id}`);
  }

  getPostUpdateListener() {
    return this.postsUpdated$.asObservable();
  }

  // addPost(title: string, content: string) {
  //   const post: Post = { title: title, content: content };
  //   this.posts.push(post);
  // }

  addPost(title: string, content: string, image: File) {
    // const post: Post = { id: null, title: title, content: content };
    const postData = new FormData(); // text + blob
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      // .post<{ message: string; postId: string }>(
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        // post
        postData
      )
      .subscribe((responseData) => {
        // const post: Post = {
        //   id: responseData.post.id,
        //   title: title,
        //   content: content,
        //   imagePath: responseData.post.imagePath,
        // };
        // // const id = responseData.postId;
        // // post.id = id;
        // this.posts.push(post);
        // this.postsUpdated$.next([...this.posts]);

        this.router.navigate(['/']);
      });

    // This is optimistic updating
    // this.posts.push(post);
    // this.postsUpdated$.next([...this.posts]);
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = {
    //   id: id,
    //   title: title,
    //   content: content,
    //   imagePath: null,
    // };

    let postData: Post | FormData;

    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null,
      };
    }

    this.http
      .put(`http://localhost:3000/api/posts/${id}`, postData)
      .subscribe((response) => {
        // const updatedPost = [...this.posts];

        // // this is unnecessary now because we dont visit the post list page
        // const oldPostIndex = updatedPost.findIndex((p) => p.id === id);
        // const post: Post = {
        //   id: id,
        //   title: title,
        //   content: content,
        //   imagePath: '',
        // };
        // updatedPost[oldPostIndex] = post;
        // this.posts = updatedPost;

        // this.postsUpdated$.next([...this.posts]);

        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${postId}`);
    // .subscribe(() => {
    //   const updatedPost = this.posts.filter((post) => post.id !== postId);
    //   this.posts = updatedPost;
    //   this.postsUpdated$.next([...this.posts]);
    // });
  }
}

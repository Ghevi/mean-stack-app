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
  private postsUpdated$ = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    // return [...this.posts];
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((mappedPosts) => {
        this.posts = mappedPosts;
        this.postsUpdated$.next([...this.posts]);
      });
  }

  getPost(id: string) {
    // return { ...this.posts.find((post) => post.id === id) };
    return this.http.get<{_id: string, title: string, content: string}>(`http://localhost:3000/api/posts/${id}`);
  }

  getPostUpdateListener() {
    return this.postsUpdated$.asObservable();
  }

  // addPost(title: string, content: string) {
  //   const post: Post = { title: title, content: content };
  //   this.posts.push(post);
  // }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated$.next([...this.posts]);
        this.router.navigate(["/"]);
      });

    // This is optimistic updating
    // this.posts.push(post);
    // this.postsUpdated$.next([...this.posts]);
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put(`http://localhost:3000/api/posts/${id}`, post)
      .subscribe((response) => {
        const updatedPost = [...this.posts];

        // this is unnecessary now because we dont visit the post list page
        const oldPostIndex = updatedPost.findIndex((p) => p.id === post.id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;

        this.postsUpdated$.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        const updatedPost = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated$.next([...this.posts]);
      });
  }
}

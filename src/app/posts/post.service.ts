import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated$ = new Subject<Post[]>();

  // addPost(title: string, content: string) {
  //   const post: Post = { title: title, content: content };
  //   this.posts.push(post);
  // }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsUpdated$.next([...this.posts]);
  }

  getPostUpdateListener() {
    return this.postsUpdated$.asObservable();
  }

  getPosts(): Post[] {
    return [...this.posts];
  }
}

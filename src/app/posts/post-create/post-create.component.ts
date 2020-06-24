import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  // @Output() postCreated = new EventEmitter<Post>();

  constructor(private postService: PostService) {}

  onAddPost(form: NgForm) {
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
    
    // const post: Post = {
    //   // title: this.enteredTitle,
    //   // content: this.enteredContent,
    //   id: null,
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
  }
}

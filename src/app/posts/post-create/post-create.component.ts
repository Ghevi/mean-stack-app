import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  // @Output() postCreated = new EventEmitter<Post>();

  post: Post;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private postId: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() { // template has (form:ngForm), for reactive we add this. before form here
    if (this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    // form.resetForm();
    this.form.reset();

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

import { Component } from "@angular/core";
// import { Component, EventEmitter, Output } from "@angular/core";
// import { NgForm } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";
  // newPost = '';
  // @Output() postCreated = new EventEmitter<Post>();
  // postCreated = new EventEmitter<Post>();

  // onAddPost(postInput: HTMLTextAreaElement) {
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log(postInput);
    // console.dir(postInput);
    // this.newPost = postInput.value
    // this.newPost = this.enteredValue;
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
    // this.postsService.addPost(post);
    // console.log("onAddPost: "+form.value.title);
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  constructor(public postsService: PostsService) {}
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // return this.posts;
    // return [...this.posts];
    // this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    this.http
      .get<{ message: string, posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
          console.log('getPosts.map: ' + post._id + '-' + post.title);
        })
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // addPost(post: Post) {
  addPost(title: string, content: string) {
    // console.log('addPost');
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        // console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
    // console.log("addPost: " + title + "-", content);
    // console.log('addPost: '+responseData.message);
  }

  deletePost(postId: string) {
    console.log('Deleting: ' + postId);
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted: ' + postId);
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });

  }

  // deletePost(postId: string) {
  //   this.http.delete('http://localhost:3000/api/posts/' + postId)
  //     .subscribe(() => {
  //       const updatedPosts = this.posts.filter(post => post.id !== postId);
  //       this.posts = updatedPosts;
  //       this.postsUpdated.next([...this.posts]);
  //     });
  // }
}

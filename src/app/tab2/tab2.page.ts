import { Component } from '@angular/core';

interface Post {
  avatar: string;
  name: string;
  timestamp: string;
  content: string;
  comments: Comment[];
  likes: number;
  showComments?: boolean; // New property for controlling comment visibility
}

interface Comment {
  avatar: string;
  name: string;
  content: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  posts: Post[] = [];
  newPostContent: string = '';

  constructor() {}

  addPost() {
    if (this.newPostContent.trim() !== '') {
      const newPost: Post = {
        avatar: 'assets/avatar.png', // Replace with dynamic user avatar
        name: 'Parent Name', // Replace with dynamic user name
        timestamp: new Date().toLocaleTimeString(),
        content: this.newPostContent,
        comments: [],
        likes: 0,
        showComments: false, // Initialize the comments section as hidden
      };
      this.posts.unshift(newPost); // Add new post at the beginning of the array
      this.newPostContent = ''; // Clear the textarea
    }
  }

  addComment(post: Post, commentContent: string) {
    if (commentContent && commentContent.trim() !== '') {
      const newComment: Comment = {
        avatar: 'assets/avatar2.png', // Replace with dynamic user avatar
        name: 'Another Parent', // Replace with dynamic user name
        content: commentContent,
      };
      post.comments.push(newComment);
    }
  }

  likePost(post: Post) {
    post.likes++;
  }

  toggleComments(post: Post) {
    post.showComments = !post.showComments;
  }
}

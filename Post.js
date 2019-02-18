/**
  This class represents a single Reddit Post from any given SubReddit.
**/
class Post {

  /**
    Constructor for Post class.

    @param id 7 character string representing unique id for each post.
    @param title Title of the post.
    @param author User name of the redditor who made the post.
    @param content Main body of the reddit post.
    @param date DateTime of post represented as milliseconds since epoch (January 1st, 1970.)
    @param url If post is a "self-post" the url is the for the original post. If url
              is linking an external source, it will be the url of that source.
  **/
  constructor(id, title, author, content, date, url) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
    this.date = Post.convertDate(date);
    this.url = url;
  }

  /**
    Helper function for Post constructor to convert date to format of
    DOW Mon DD YYYY HH:MM.

    @param date Milliseconds since epoch.
  **/
  static convertDate(date) {
    let newDate = new Date();
    newDate.setTime(date * 1000);
    newDate = newDate.toString();
    newDate = newDate.slice(0, 21);
    return newDate;
  }

  /**
    Converts Post class to a readable string.
  **/
  toString() {
    const id = `## ID: ${this.id} ##`;
    const titleLine = `\n#### ${this.title} ####\n`;
    const authorLine = `#### Posted By: ${this.author} ####\n`;
    const dateLine = `     ${this.date}\n`;
    const contentBody = `     ${this.content}\n`;
    const urlLine = `     ${this.url}\n`;
    return id + titleLine + authorLine + dateLine + contentBody + urlLine;
  }

  /**
    Compares two posts on the basis of id.

    @param otherPost The other Post class object to compare.
  **/
  compare(otherPost) {
    return (this.id === otherPost.id) ? true : false;
  }

} // end Post class

module.exports = Post;

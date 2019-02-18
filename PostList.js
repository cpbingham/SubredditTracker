const Post = require('./Post.js');

/**
  This class is used to store and manipulate a list of Reddit Posts.
**/
class PostList {
  constructor(json) {
    this.arr = PostList.createList(json);
  }

  /**
    Helper function for constructor which creates an array of Reddit Posts based
    on the JSON data received from the HTTP Request.

    @param json 25 Reddit Posts in JSON format.
    @return Array of 25 Post objects created from JSON data.
  **/
  static createList(json) {
    let result = [];
    for (let i = 0; i < 25; i++) {
      const listNode = json['data']['children'][i]['data'];
      const post = new Post(listNode['name'], listNode['title'], listNode['author'],
                            listNode['selftext'], listNode['created'], listNode['url']);
      result.push(post);
    }
    return result;
  }

  /**
    Converts PostList class into readable string.
    @return String representing a list of Reddit posts.
  **/
  toString() {
    let result = '';
    for (let i = 0; i < this.arr.length; i++) {
      result += this.arr[i].toString();
      result += '\n';
    }
    return result;
  }

  /**
    Searches PostList for a given post.

    @param otherPost Reddit post you'd like to search PostList for.
    @return true if PostList contains the specific post, false otherwise. 
  **/
  contains(otherPost) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].compare(otherPost))
        return true;
    }
    return false;
  }

} // end PostList class

module.exports = PostList;

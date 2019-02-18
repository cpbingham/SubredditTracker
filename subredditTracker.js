const fileDate = require('./fileDate.js');
const PostList = require('./PostList.js');
const promiseHTTPResponse = require('./promiseHTTPResponse.js');

// Get desired SubReddit name as command line argument
// TODO: Create some console I/O to ask user for input
const subreddit = process.argv[2];

// Create url based on given subreddit, to fetch data as JSON format
const url = 'https://www.reddit.com/r/' + subreddit + '.json';

//Get todays date for use in the file name from fileDate.js
const date = fileDate();

//Create fileName in which subreddit data will be stored
const fileName = `${subreddit}_${date}.txt`;

let recentPosts;

async function subredditTracker() {
  try {
    const jsonData = await promiseHTTPResponse(url);
    const posts = new PostList(jsonData);

    let newPosts;

    if (!recentPosts) {
      recentPosts = new PostList(jsonData);
      newPosts = recentPosts.toString();
      console.log(newPosts);
    }
  } catch (error) {
    console.log(error);
  }
}

subredditTracker();

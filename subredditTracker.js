const fileDate = require('./fileDate.js');
const PostList = require('./PostList.js');
const promiseHTTPResponse = require('./promiseHTTPResponse.js');
const promiseWriteFile = require('./promiseWriteFile.js');

// Get desired SubReddit name as command line argument
// TODO: Create some console I/O to ask user for input
const subreddit = process.argv[2];

// Create url based on given subreddit, to fetch data as JSON format
const url = 'https://www.reddit.com/r/' + subreddit + '.json';

//Get todays date for use in the file name from fileDate.js
const date = fileDate();

//Create fileName in which subreddit data will be stored
let fileName = `${subreddit}_${date}.txt`;
fileName = fileName.replace('/', '_');

// recentPosts will be instantiated to be a PostList containing previous fetched posts.
let recentPosts;

/**
  This asynchronous function handles the main logic of the application.
**/
async function subredditTracker() {
  try {
    // Fetch data from desired SubReddit and insert into PostList Object.
    const jsonData = await promiseHTTPResponse(url);
    const posts = new PostList(jsonData);

    let newPosts;

    // If this is the first run of the function, add the entire list of posts to the file.
    if (!recentPosts) {
      recentPosts = new PostList(jsonData);
      newPosts = recentPosts.toString();
      await promiseWriteFile(fileName, newPosts);
    }

    // Otherwise compare the fetched data with the existing data in the file and only add the new posts.
    else {
      newData = recentPosts.compare(posts);
      recentPosts.addPosts(newData);
      await promiseWriteFile(fileName, newData.toString());
    }

    // If any of the promises reject, catch and display error.
  } catch (error) {
    console.log(error);
  }
}

// Run the program once initially and then re-run to update every 15 minutes.
subredditTracker();
setInterval(subredditTracker, 90000);

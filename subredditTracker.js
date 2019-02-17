// Get desired SubReddit name as command line argument
// TODO: Create some console I/O to ask user for input
const subreddit = process.argv[2];

// Create url based on given subreddit, to fetch data as JSON format
const url = 'https://www.reddit.com/r/' + subreddit + '.json';

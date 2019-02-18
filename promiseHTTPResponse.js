const https = require('https');

/**
  This function defines a promise that when resolved creates an HTTPS GET request
  to the desired SubReddit to retrieve the first  25 posts in JSON format.

  Promise is rejected if the server response is not 200 or if the JSON is not able
  to be parsed.

  @param url specifies url to make GET requet to.
**/
const promiseHTTPResponse = (url) =>
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // HTTP Response Status Code
      const statusCode = res.statusCode;

      // If the status code is not 200 (OK), reject promise
      if (statusCode !== 200){
        reject('Invalid Subreddit');
      }

      // Read rawData data into string
      res.setEncoding('utf-8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        // Once you have the entire page, try to parse to JSON
        try {
          const parsedData = JSON.parse(rawData);
          // If successful, resolve promise with data in JSON format
          resolve(parsedData);
        } catch (e) {
          // If page isn't in JSON format, reject promise
          reject('Data not in JSON format');
        }
      });

    // If GET request throws an error, reject promise with given error.
    }).on('error', (e) => {
      reject(`Got error: ${e.message}`);
    });
}); //end promiseHTTPResponse

module.exports = promiseHTTPResponse;

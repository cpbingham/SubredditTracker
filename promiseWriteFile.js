const fs = require('fs');

/**
  This function creates a promise that when resolved, writes a string of new Posts
  into a file.

  @param fileName The name of the file to be written to.
  @param newPosts The string of new posts to be written to the file.
**/
const promiseWriteFile = (fileName, newPosts) => {
  new Promise((resolve, reject) => {
    fs.appendFile(fileName, newPosts, (err) => {
      if (err) {
        reject(`Error writing to file: ${err.message}`);
      }
      resolve();
    });
  });
};

module.exports = promiseWriteFile;

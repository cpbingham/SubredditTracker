/**
  Returns Current date in format DOW_Mon_DD
  Ex. Output on Sunday, February 17: Sub_Feb_17
**/
function fileDate() {
  let date = new Date();
  date = date.toString();
  date = date.slice(0, 10);
  date = date.replace(/ /g, '_');
  return date;
}

module.exports = {fileDate};

const filterWords = require('../static/ban.js');
const filterStr = Buffer.from(filterWords, 'base64').toString();

const rex = new RegExp(`${filterStr}`, 'g')

function filter(str) {
  return str.replace(rex,"*");
}
module.exports = filter;

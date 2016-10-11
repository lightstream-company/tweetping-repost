const createConnection = require('tweetping-connect').default;
const parseArgs = require('minimist');
const fetch =  require('isomorphic-fetch');

const args = parseArgs(process.argv.slice(2));

const streamId = args.s;
const url = args.u;
const method = args.m || 'POST';

console.log(`stream: ${streamId}, repost to: ${url}`);

const {connect} = createConnection(streamId);

connect('raw', (post) => {
  fetch(url, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    body: JSON.stringify(post)
  }).then(r => r.json()).then(r => console.log(r));
});

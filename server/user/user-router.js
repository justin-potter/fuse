const express = require('express');
const userHandler = require('./user-route-handler');

const app = express();

app.get('/', userHandler.getUserFriends);

// From the client side, user would route to /users/:id, looping through multiple times

app.post('/', (req, res) => {
  // console.log(process.env.NODE_ENV);
  console.error('select a friend to add');
  res.redirect('/');
});

app.get('/userInfo', userHandler.getUserInfo);

app.get('/search/:query?', userHandler.userSearch);

app.get('/pending', userHandler.getPendingFriends);

app.post('/:id', userHandler.addFriendRequest);

app.get('/destroy/pending/sent', userHandler.destroySentReq);

app.get('/destroy/pending/received', userHandler.destroyReceivedReq);

app.get('/destroy/friendships', userHandler.destroyFriendships);

// app.get('/destroy/oneFriendship', userHandler.destroyOneFriendship);

app.post('/friendRequest/destroyOne', userHandler.destroyOneFriendRequest);

app.post('/friendRequest/completeOne', userHandler.completeOneFriendRequest);


module.exports = app;


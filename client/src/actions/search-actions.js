import axios from 'axios';
import url from '../configs/urls';

export const SEARCH_FRIENDS = 'SEARCH_FRIENDS';
export const SEARCH_SELECT_FRIEND = 'SEARCH_SELECT_FRIEND';
export const ADD_FRIEND_REQUEST_TO_DB = 'ADD_FRIEND_REQUEST_TO_DB';

export function searchFriends(nameOrEmail) {
  // console.log('this is email passed in ', email);
  const searchUser = `${url.search}${nameOrEmail}`;
  // console.log('this is url', url);
  // need to update here get request to the db with specific query, in this case an email
  const request = axios.get(searchUser)
  .then((response) => {
    return response.data.map((friend) => {
      return { ...friend, selected: false };
    });
  });

  return {
    type: SEARCH_FRIENDS,
    payload: request,
  };
}

export function searchSelectFriend(friend, index) {
  return {
    type: SEARCH_SELECT_FRIEND,
    payload: { friend, index },
  };
}

export function addFriendRequestToDB(id) {
  // select id from friend and post to http://localhost:8000/user/id
  // console.log('in addFriendsToDB. this is id', id);
  const postFriendUrl = `${url.users}${id}`;
  // console.log('this is url in addFriendsToDB', url);

  // this will be a post request to the db.
  axios.post(postFriendUrl)
  .then((response) => {
    console.log(response.data);
  });

  // won't really be using payload, just make it a boolean?
  return {
    type: ADD_FRIEND_REQUEST_TO_DB,
    // payload: request,
  };
}






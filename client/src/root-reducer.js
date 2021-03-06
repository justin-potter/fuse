// points to all other reducers

// FIRE ZE MISSLES

import { combineReducers } from 'redux';


import photos from './reducers/photos-reducer';
import friends from './reducers/friends-reducer';
import search from './reducers/search-reducer';
import camera from './reducers/camera-reducer';
import user from './reducers/user-reducer';
import router from './reducers/shared-components-reducer';

const rootReducer = combineReducers({ friends, camera, photos, user, router, search });

export default rootReducer;


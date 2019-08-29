import { combineReducers } from 'redux';
import cart from './cart';
import photos from './photos';

export default combineReducers({
    cart,
    photos
})
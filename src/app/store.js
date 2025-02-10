import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/search/searchSlice'
import searchResultReducer from './features/search/searchResult'
import turfReducer  from './features/turf/turfSlice'
import logedInReducer from './features/logedIn/logedInSlice'
import userReducer from "./features/user/userSlice"

export default configureStore({
  reducer: {
        search: searchReducer,
        searchResult : searchResultReducer,
        turf: turfReducer,
        logedin: logedInReducer,
        user : userReducer,
  }
})
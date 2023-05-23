import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Customer/slice/UserSlice"
import movieReducer from "./Admin/Slices/movieSlice"
import theatherReducer from "./Admin/Slices/theaterSlice"


const store = configureStore({
  reducer: {
    userReducer:userReducer,
    movieReducer:movieReducer,
    theatherReducer:theatherReducer,
  },
});

export default store;

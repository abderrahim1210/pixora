import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "./photoSlice";
const store = configureStore({
    reducer:{
        photo : photoSlice
    }
});
export default store;
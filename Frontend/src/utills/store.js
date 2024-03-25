import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import UserDetailSlice from "./UserSlice"


const store= configureStore({

   reducer:{
    cart:cartSlice,
    User:UserDetailSlice

   }

})

export default store
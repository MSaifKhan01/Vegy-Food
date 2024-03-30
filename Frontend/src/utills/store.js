import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import UserDetailSlice from "./UserSlice"
import OrderSlice from "./OrderSlice.js"


const store= configureStore({

   reducer:{
    cart:cartSlice,
    User:UserDetailSlice,
    Order:OrderSlice

   }

})

export default store
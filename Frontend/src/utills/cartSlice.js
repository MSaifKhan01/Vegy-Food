
import {createSlice} from "@reduxjs/toolkit"

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        items:[],
    },
    reducers:{
        addItem:(state,action)=>{
            state.items.push(action.payload)
        },
        removeItem:(state,action)=>{
            // implement logic to remove a particular item 
            state.items.pop()
        },
        clearCart:(state)=>{
            state.items=[]
        }
    },
    
})

export const {addItem,removeItem,clearCart} =cartSlice.actions

export default cartSlice.reducer
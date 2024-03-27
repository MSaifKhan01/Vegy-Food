
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const AddToCartItem= createAsyncThunk("AddToCart",async(data,{rejectWithValue})=>{
    console.log("from fn thunk ",data)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`http://localhost:4000/Cart/Add-toCart/${data.id}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
            body:JSON.stringify(data)
        })

        const result= await response.json()
        console.log("from Cart thunk",result)

        return result;

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const GetCartItems = createAsyncThunk("GetCart", async (_, { rejectWithValue }) => {
    let token=sessionStorage.getItem("token")
    try {
        const response = await fetch("http://localhost:4000/Cart/Cart-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
     
        const result = await response.json();
        // console.log("from Cart thunk get Items", result);
        return result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const IncreaseItemsQty = createAsyncThunk("IncItemQty",async(id,{rejectWithValue})=>{
    console.log("from fn thunk ",id)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`http://localhost:4000/Cart/inc-qty/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk increament :-",result)

        return result;

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const DecreaseItemsQty = createAsyncThunk("DecItemQty",async(id,{rejectWithValue})=>{
    console.log("from fn thunk ",id)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`http://localhost:4000/Cart/dec-qty/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk decrement :-",result)

        return result;

    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const DeleteItem = createAsyncThunk("DeleteItem",async(id,{rejectWithValue})=>{
    console.log("from fn thunk dlete",id)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`http://localhost:4000/Cart//remove-item/${id}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk decrement :-",result)

        return result;

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers:{
        // addItem:(state,action)=>{
        //     state.items.push(action.payload)
        // },
        // removeItem:(state,action)=>{
        //     // implement logic to remove a particular item 
        //     state.items.pop()
        // },
        // clearCart:(state)=>{
        //     state.items=[]
        // }
    },
    extraReducers:(builder)=>{

          /// Add To Cart
        builder.addCase(AddToCartItem.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(AddToCartItem.fulfilled,(state,action)=>{
            state.loading=false
            // state.items.push(action.payload)
        })

        builder.addCase(AddToCartItem.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })


        // get Cart Items
        builder.addCase(GetCartItems.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(GetCartItems.fulfilled,(state,action)=>{
            state.loading=false
            // state.items.push(action.payload)
            state.error = null;
            state.items = action.payload.CartItems;
        })

        builder.addCase(GetCartItems.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

        /// increament

        
        builder.addCase(IncreaseItemsQty.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(IncreaseItemsQty.fulfilled,(state,action)=>{
            state.loading=false
            // state.items.push(action.payload)
          
        })

        builder.addCase(IncreaseItemsQty.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })



        
        /// Decreament

        
        builder.addCase(DecreaseItemsQty.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(DecreaseItemsQty.fulfilled,(state,action)=>{
            state.loading=false
            // state.items.push(action.payload)
          
        })

        builder.addCase(DecreaseItemsQty.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

        /// Delete Item 

        builder.addCase(DeleteItem.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(DeleteItem.fulfilled,(state,action)=>{
            state.loading=false
            // state.items.push(action.payload)
          
        })

        builder.addCase(DeleteItem.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

    }
    
})

// export const {removeItem,clearCart,addItem} =cartSlice.actions

export default cartSlice.reducer

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { Base_URL } from "../Config"

export const AddToCartItem= createAsyncThunk("AddToCart",async(data,{rejectWithValue})=>{
    // console.log("from fn thunk ",data)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`${Base_URL}/Cart/Add-toCart/${data.id}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
            body:JSON.stringify(data)
        })

        const result= await response.json()
        console.log("from add Cart thunk",result)

        return {result,data};

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const GetCartItems = createAsyncThunk("GetCart", async (_, { rejectWithValue }) => {
    let token=sessionStorage.getItem("token")
    try {
        const response = await fetch(`${Base_URL}/Cart/Cart-data`, {
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
    // console.log("from fn thunk ",id)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`${Base_URL}/Cart/inc-qty/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk increament Qty :-",result)
        // GetCartItems()
        console.log("----",id)

        return {id,result};

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const DecreaseItemsQty = createAsyncThunk("DecItemQty",async(id,{rejectWithValue})=>{
    // console.log("from fn thunk ",id)
    try {
        let token=sessionStorage.getItem("token")
        // console.log(token)
        const response= await fetch(`${Base_URL}/Cart/dec-qty/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk decrement Qty:-",result)

        return {id,result};

    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const DeleteItem = createAsyncThunk("DeleteItem",async(id,{rejectWithValue})=>{
    // console.log("from fn thunk dlete",id)
    try {
        let token=sessionStorage.getItem("token")
        // console.log(token)
        const response= await fetch(`${Base_URL}/Cart/remove-item/${id}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk delete-Item :-",result)

        return {id,result};

    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const ClearCart = createAsyncThunk("ClearCart",async(id,{rejectWithValue})=>{
    // console.log("from fn thunk dlete",id)
    try {
        let token=sessionStorage.getItem("token")
        console.log(token)
        const response= await fetch(`${Base_URL}/Cart/clear-cart`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ token}`
            },
            
         
        })

        const result= await response.json()
        console.log("from Cart thunk ClearCart :-",result)

        return result;

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const cartSlice= createSlice({
    name:"cart",
    initialState:{
        // items:[],
        items: [], // Initialize items as an empty array
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
        builder.addCase(AddToCartItem.fulfilled, (state, action) => {
            state.loading = false;
            const { data } = action.payload;
            console.log("hjvbjbhb",state.items)
        
            // if (
            //     !state.items  ||
            //     !state.items.some(item => item.id === data.id) ||
            //     !state.items.some(item => item.Product && item.Product.id === data.id)
            // ) {
            //     state.items.push(data);
            // }

             // Check if the item already exists in the cart
    const existingItem = state.items.find(item => item.id === data.id || (item.Product && item.Product.id === data.id));
    if (!existingItem) {
        state.items.push(data);
    } else {
        // Handle the case when the item already exists (optional)
        console.log("Item already exists in the cart:", existingItem);
    }
            
        });
        
        

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
              console.log("getCart.fulfilled - action payload:", action.payload.CartItems);
            console.log("GetCart.fulfilled - data:", state.items);
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
        builder.addCase(IncreaseItemsQty.fulfilled, (state, action) => {
            state.loading = false;
            const  {id,result} = action.payload;

            const orderIndex = state.items.findIndex((product) => product.Product.id === id);
            if (orderIndex !== -1) {
                state.items[orderIndex].Quantity += 1; // Decrease quantity by 1
            }
        });
        

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
            state.loading = false;
       
            const  {id,result} = action.payload;

            const orderIndex = state.items.findIndex((product) => product.Product.id === id);
            if (orderIndex !== -1) {
                state.items[orderIndex].Quantity -= 1; // Decrease quantity by 1
            }
          
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
            const  {id,result} = action.payload;

          // Filter out the item with the specified ID
    state.items = state.items.filter((item) => item.Product.id !== id);
          
        })

        builder.addCase(DeleteItem.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })




        
        /// ClearCart

        builder.addCase(ClearCart.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(ClearCart.fulfilled,(state,action)=>{
            state.loading=false
            state.items=[]
          
        })

        builder.addCase(ClearCart.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })


    }
    
})

// export const {removeItem,clearCart,addItem} =cartSlice.actions

export default cartSlice.reducer



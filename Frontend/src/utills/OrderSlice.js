const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

import { loadStripe } from "@stripe/stripe-js";
import { Base_URL } from "../Config";


export const MakeOrder= createAsyncThunk("MakeOrder",async(data,{rejectWithValue})=>{

    const stripe = await loadStripe(
        "pk_test_51OzL7GSFsBLrRIll1M7ewanBUR1PQDjVSjPwPe1yqzny0zaMbY2DvSSJyY6pg43EJkQghqX7iV55uGFOzGL0HTxd00jTi9AaYH"
      );



      try {
        const token = sessionStorage.getItem("token");
      
  
        const response = await fetch(`${Base_URL}/order/Check-out`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        const session = await response.json();
        // console.log(session,"--------")

      
        
  
        if (session.error) {
          console.error("Error creating Stripe Checkout Session:", session.error);
       
        } else {
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          // console.log(result,"----------")
       
  
          if (result.error) {
            console.error("Error redirecting to checkout:", result.error);
           
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
   
      }


      

})



export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${Base_URL}/order/get-order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const result = await response.json();
    console.log("-----fectorder orderSlice--",result)
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, newStatus }, { rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem('token');
    await fetch(`${Base_URL}/order/update-status/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    return { orderId, newStatus };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



const OrderSlice= createSlice({
    name:"OrderSlice",
    initialState:{
        Order:[],
        user: {},
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:((builder)=>{
        builder.addCase(MakeOrder.pending,(state)=>{

            state.loading=true;
            state.error=null

        })

        builder.addCase(MakeOrder.fulfilled,(state,action)=>{
            state.loading=false
          
        })
        builder.addCase(MakeOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

        builder
        .addCase(fetchOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.Order = action.payload.ordersData;
          state.user = action.payload.userData;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateOrderStatus.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
          state.loading = false;
          const { orderId, newStatus } = action.payload;
          const orderIndex = state.Order.findIndex((order) => order._id === orderId);
          if (orderIndex !== -1) {
            state.Order[orderIndex].status = newStatus;
          }
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  


   

    })
})


export default OrderSlice.reducer
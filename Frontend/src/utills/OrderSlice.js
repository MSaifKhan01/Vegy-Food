const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

import { loadStripe } from "@stripe/stripe-js";


export const MakeOrder= createAsyncThunk("MakeOrder",async(data,{rejectWithValue})=>{

    const stripe = await loadStripe(
        "pk_test_51OzL7GSFsBLrRIll1M7ewanBUR1PQDjVSjPwPe1yqzny0zaMbY2DvSSJyY6pg43EJkQghqX7iV55uGFOzGL0HTxd00jTi9AaYH"
      );



      try {
        const token = sessionStorage.getItem("token");
      
  
        const response = await fetch(`http://localhost:4000/order/Check-out`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
  
        const session = await response.json();
        console.log(session,"--------")

      
        
  
        if (session.error) {
          console.error("Error creating Stripe Checkout Session:", session.error);
       
        } else {
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          console.log(result,"----------")
       
  
          if (result.error) {
            console.error("Error redirecting to checkout:", result.error);
           
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
   
      }


      

})



const OrderSlice= createSlice({
    name:"OrderSlice",
    initialState:{
        Order:[],
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


   

    })
})


export default OrderSlice.reducer
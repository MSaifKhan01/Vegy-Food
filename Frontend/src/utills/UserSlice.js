import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Base_URL } from "../Config";

export const SignUp = createAsyncThunk(
  "SignUp",
  async (data, { rejectWithValue }) => {
    try {
      // const response = await fetch("https://vegy-food.onrender.com/SignUp", {
      const response = await fetch(`${Base_URL}/SignUp`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const SignIn = createAsyncThunk(
  "SignIn",
  async (data, { rejectWithValue }) => {
    try {
      // const response = await fetch("https://vegy-food.onrender.com/login", {
      const response = await fetch(`${Base_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      console.log("from slice ", response);

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const EmailforPasswordOTP= createAsyncThunk("EmailforPasswordOTP", async (email,{rejectWithValue})=>{
  try {
    const response = await fetch(`${Base_URL}/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})


export const OTPVerify= createAsyncThunk("OTPVerify",async(otp,{rejectWithValue})=>{
  try {
    const response = await fetch(`${Base_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})


export const ResetPassword= createAsyncThunk("ResetPassword",async(data,{rejectWithValue})=>{
  try {
    const response = await fetch(`${Base_URL}/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.emailForPasswordUpdate, newPassword:data.newPassword}),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

const UserDetailSlice = createSlice({
  name: "UserDetail",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(SignIn.pending, (state) => {
              state.loading = true;
              state.error = null; 
          })
          .addCase(SignIn.fulfilled, (state, action) => {
              state.loading = false;
              state.user.push(action.payload);
          })
          .addCase(SignIn.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload.message; 
          })
          builder.addCase(SignUp.pending,(state)=>{
            state.loading=true;
            state.error=null
          })
          builder.addCase(SignUp.fulfilled,(state)=>{
            state.loading=false
          })
          builder.addCase(SignUp.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
          })








          builder.addCase(EmailforPasswordOTP.pending,(state)=>{
            state.loading=true;
            state.error=null
          })
          builder.addCase(EmailforPasswordOTP.fulfilled,(state)=>{
            state.loading=false
          })
          builder.addCase(EmailforPasswordOTP.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
          })




          

          builder.addCase(OTPVerify.pending,(state)=>{
            state.loading=true;
            state.error=null
          })
          builder.addCase(OTPVerify.fulfilled,(state)=>{
            state.loading=false
          })
          builder.addCase(OTPVerify.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
          })


          

          builder.addCase(ResetPassword.pending,(state)=>{
            state.loading=true;
            state.error=null
          })
          builder.addCase(ResetPassword.fulfilled,(state)=>{
            state.loading=false
          })
          builder.addCase(ResetPassword.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
          })





  }

  

});

export default UserDetailSlice.reducer;

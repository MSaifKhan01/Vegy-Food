import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const SignUp = createAsyncThunk(
  "SignUp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:4000/SignUp", {
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
      const response = await fetch("http://localhost:4000/login", {
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
              state.error = null; // Reset error state
          })
          .addCase(SignIn.fulfilled, (state, action) => {
              state.loading = false;
              state.user.push(action.payload);
          })
          .addCase(SignIn.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload.message; // Set the error message
          });
  }

  

});

export default UserDetailSlice.reducer;

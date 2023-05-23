import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIlogin,APIsignup } from "../apis/userAPI";


// async actions
export const signin = createAsyncThunk("user/signin", async (values) => {
  try {
    const data = await APIlogin(values);
    // Lưu thông tin user vào localStorage để giữ trạng thái đăng nhập
    localStorage.setItem("user", JSON.stringify(data.content));
    return data.content;
  } catch (error) {
    throw error.response?.data?.content;
  }
});
export const signup= createAsyncThunk("user/signup", async (values) => {
  try
  {
    const data=await APIsignup(values);
    return data.content;
  }
  catch (error)
  {
    throw error.response?.data?.content;
  }
});
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
  isAuth:JSON.parse(localStorage.getItem("isAuth"))
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {logout(state) {
    localStorage.setItem("isAuth",JSON.stringify(false))
     return {...state,user:null,isAuth:JSON.parse(localStorage.getItem("isAuth"))};
    },},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      return { ...state, isLoading: true, error: null };
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      localStorage.setItem("isAuth",JSON.stringify(true))
      return { ...state, isLoading: false, user: action.payload,isAuth:JSON.parse(localStorage.getItem("isAuth"))};
    });
    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
  },
});
export const {logout}=userSlice.actions
export default userSlice.reducer;

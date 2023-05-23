import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetUserList, apiAddUser, apiUpdateUser, apiGetUserDetail } from '../APIs/userAPI';

const initialState = {
    userInfo: {},
    userEdit: {},
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    status: 'idle',
    error: null,
    isAuthAdmin:JSON.parse(localStorage.getItem("isAuthAdmin")) 
};

const fetchUserInfo = createAsyncThunk('user/info', async () => {
    try {
        const response = await apiGetUserList();
        return response.data.content;
    } catch (error) {
        throw error.respone?.data?.content;
    }
    }
);

const addUser = createAsyncThunk('user/add', async (userData) => {
    try {
        const response = await apiAddUser(userData);
        return response.data.content;
    } catch (error) {
        throw error.respone?.data?.content;
    }
    }
);

const updateUser = createAsyncThunk('user/update', async (userData) => {
    try {
        const response = await apiUpdateUser(userData);
        return response.data.content;
    } catch (error) {
        throw error.respone?.data?.content;
    }
    }
);

const getUserDetail = createAsyncThunk('user/detail', async (taiKhoan) => {
    try {
        const response = await apiGetUserDetail(taiKhoan);
        return response.data.content;
    } catch (error) {
        throw error.respone?.data?.content;
    }
    }
);

// export const userLogin = createAsyncThunk('user/login', async (values) => {
//     try {
//         const response = await apiUserLogin(values);
//         localStorage.setItem("admin",JSON.stringify(response.data.content))
//         return response.data.content;
//     } catch (error) {
//         throw error.respone?.data?.content;
//     }
//     }
// );



const customerSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
            }
            )
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            }
            )
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
            );
        builder
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
            }
            )
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            }
            )
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
            );
        builder
            .addCase(getUserDetail.pending, (state) => {
                state.status = 'loading';
            }
            )
            .addCase(getUserDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            }
            )
            .addCase(getUserDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            }
            );
        // builder
        //     .addCase(userLogin.pending, (state) => {
        //         state.status = 'loading';
        //     }
        //     )
        //     .addCase(userLogin.fulfilled, (state, action) => {
        //         localStorage.setItem("isAuthAdmin",JSON.stringify(true))
        //         return {
        //             ...state,
        //             status: 'succeeded',
        //             admin: action.payload,
        //             isAuthAdmin:JSON.parse(localStorage.getItem("isAuthAdmin"))
        //         }
        //     }
        //     )
        //     .addCase(userLogin.rejected, (state, action) => {
        //         state.status = 'failed';
        //         state.error = action.error.message;
        //     }
        //     );
            
    }
});


export default customerSlice.reducer;

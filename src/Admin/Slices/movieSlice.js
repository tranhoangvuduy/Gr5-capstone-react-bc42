import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetMovies, apiAddMovies, apiDeleteMovies, apiUpdateMovie } from '../APIs/movieAPI';

const initialState = {
    moviesList: [],
    MovieEdit: [],
    movieId: 0,
    status: 'idle',
    error: null,
};
const fetchMovies = createAsyncThunk('admin/catalog', async () => {
  try {
    const response = await apiGetMovies.getMovies();
    return response.data.content;
  } catch (error) {
    throw error.respone?.data?.content;
  }
});

const addMovies = createAsyncThunk('admin/add-new', async (formData) => {
  try {
    const response = await apiAddMovies.addMovies(formData);
    return response.data.content;
  } catch (error) {
    throw error.respone?.data?.content;
  }
});

const deleteMovies = createAsyncThunk('admin/delete', async (maPhim) => {
  try {
    const response = await apiDeleteMovies.deleteMovies(maPhim);
    return response.data.content;
  } catch (error) {
    throw error.respone?.data?.content;
  }
});

const movieDetail = createAsyncThunk('admin/edit', async (maPhim) => {
  try {
    const response = await apiGetMovies.getMovieDetail(maPhim);
    return response.data.content;
  } catch (error) {
    throw error.respone?.data?.content;
  }
});

const updateMovies = createAsyncThunk('admin/update', async (formData) => {
  try {
    const response = await apiUpdateMovie.updateMovie(formData);
    return response.data.content;
  } catch (error) {
    throw error.respone?.data?.content;
  }
});





const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      builder
      .addCase(addMovies.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(addMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
      }
      )
      .addCase(addMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
      );
      builder
      .addCase(deleteMovies.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(deleteMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
      }
      )
      .addCase(deleteMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
      );
      builder
      .addCase(updateMovies.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(updateMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
      }
      )
      .addCase(updateMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
      );
      builder
      .addCase(movieDetail.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.MovieEdit = action.payload;
      }
      )
      .addCase(movieDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
      );
      
      
  },
});


export default movieSlice.reducer;
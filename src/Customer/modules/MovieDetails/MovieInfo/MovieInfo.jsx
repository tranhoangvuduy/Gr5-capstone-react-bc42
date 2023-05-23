import React, { useEffect, useState } from 'react';
import { apiGetMovieDetails } from '../../../apis/movieAPI';
import { useNavigate } from 'react-router-dom';

function MovieInfo({ movieId }) {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const getMovieDetails = async () => {
    try {
      const data = await apiGetMovieDetails(movieId);
      setMovie(data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <div>
      <div className='m-3'>
        <h3>Mua vé phim {movie.tenPhim}</h3>
        <hr />
      </div>
      <div className='mt-3'>
        <div className='d-flex '>
          <div className='m-3'>
            <img src={movie.hinhAnh} width={400} height={400} alt='hình ảnh phim' />
          </div>
          <div className='m-3'>
            <p>Tên phim: {movie.tenPhim}</p>
            <p>Mô tả: {movie.moTa}</p>
            <p>Ngày khởi chiếu: {movie.ngayKhoiChieu}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;

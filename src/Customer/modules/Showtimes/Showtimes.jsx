import React, { useState, useEffect } from 'react'
import { showtimesAPI } from '../../apis/showTimesAPI';
import styles from './Showtimes.module.scss';
import {Link} from 'react-router-dom'

function Showtimes({ movieId }) {
  const values=["CGV","CineStar","Galaxy","LotteCinima","MegaGS","BHDStar"]
  const [booking, setBooking] = useState([]);
   const [booking1, setBooking1] = useState([]);
  const getBooking = async (value) => {
    try {
      const data = await showtimesAPI(value);
      setBooking(data.content);
    } catch (error) {
      console.log(error);
    }
  };
   const getBooking1 = async (value) => {
    try {
      const data = await showtimesAPI(value);
      setBooking1(data.content);
    } catch (error) {
      console.log(error);
    }
  };
const convertId=parseFloat(movieId)
  useEffect(() => {
    getBooking();
  }, []);

const filteredBooking = booking1.flatMap((item) =>
  item.lstCumRap.flatMap((cumRap) =>
    cumRap.danhSachPhim.filter((phim) => phim.maPhim === convertId)
      .flatMap((phim) => (
        phim.lstLichChieuTheoPhim.map((lichChieu)=>({maLichChieu: lichChieu.maLichChieu,
        ngayChieu: lichChieu.ngayChieuGioChieu,
        diaChi: cumRap.diaChi,
        hinhAnh: cumRap.hinhAnh,
        maCumRap: cumRap.maCumRap,
        tenCumRap: cumRap.tenCumRap,}))
      ))
  )
);
const click=booking.map((item,index)=>{
  const brand=values[index];
  return (
    <div key={index}>
      <img src={item.logo} onClick={()=>getBooking1(brand)} alt="" width={70} />
    </div>
  )
})
const showtimesList = filteredBooking.map((showtime) => (
  <div key={showtime.maLichChieu}>
    <div>{showtime.tenCumRap}</div>
    <p>Địa chỉ: {showtime.diaChi}</p>
    <p>Ngày chiếu: {showtime.ngayChieu}</p>
    {/* Thêm các thông tin về suất chiếu ở đây */}
    <Link to={`/booking/${showtime.maLichChieu}`}>Đặt vé</Link>
  </div>
));
console.log(booking);
  return (
    <div>
      <h3 className={styles.title}>Suất chiếu</h3>
      <div className="container">
        <div className='row'>
          <div className="col-4">
            <div className="d-flex flex-column">
             {click}
            </div>
          </div>
          <div className="col-8">
            {showtimesList}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Showtimes;

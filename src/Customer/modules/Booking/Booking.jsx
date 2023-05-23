import React,{useEffect, useState} from 'react'
import { bookingAPI } from '../../apis/showTimesAPI';
import style from './Booking.module.scss'
function Booking({maLichChieu}) {
  const [booking,setBooking] = useState({})
  const getBooking = async () => {
    try {
      const data = await bookingAPI(maLichChieu);
      setBooking(data.content);
    } catch (error) {
      console.log(error);
    }
  };
 useEffect(() => {
    getBooking();
  }, []);
 const newBooking = booking && booking.danhSachGhe && booking.danhSachGhe.map((seat) => {
  return {
    tenGhe: seat.tenGhe,
    daDat: seat.daDat
  }
});
const convertArray = newBooking && newBooking.map((seat) => {
  return [seat.tenGhe, seat.daDat];
});
 const rowLength = 10; // số ghế trên mỗi hàng trong rạp phim
const rows = [];

for (let i = 0; convertArray && i < convertArray.length; i += rowLength) {
  const row = convertArray && convertArray.slice(i, i + rowLength);
  rows.push(row);
}

console.log(booking); // mảng các hàng ghế
  return (
    <div className='container'>
    <div className='d-flex justify-content-around'>
      <div className='m-4'>
        {rows.map((row, index) => (
        <div key={index}>
          {row.map(([seat,daDat],seatIndex) => (
            <button className={`${style.seat} ${daDat ? style.full : style.empty}`} key={seatIndex}>{seat}</button>

          ))}
        </div>
      ))}
      </div>
      <div>s</div>
    </div>
    </div>
  )
}

export default Booking
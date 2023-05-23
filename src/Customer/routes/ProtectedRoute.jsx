import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate,useLocation } from 'react-router-dom'
import Booking from '../modules/Booking/Booking'
// Component làm nhiệm vụ kiểm tra khi truy cập vào 1 route cần yêu cầu đăng nhập mới có thể truy cập được
function ProtectedRoute() {
  const{bookingId}=useParams();
  console.log(bookingId);
    const {pathname}=useLocation()
    const {user}=useSelector((state)=>state.userReducer)
    //Trường hợp chưa đăng nhập, điều hướng về trang đăng nhập
    if(!user)
    {
        return <Navigate to={`/signin?redirectUrl=${pathname}`} replace/>
    }
     // Trường hợp đã đăng nhập => cho phép truy cập
  return (
    <Booking maLichChieu={bookingId}/>
  )
}

export default ProtectedRoute
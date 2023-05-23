import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,useLocation } from 'react-router-dom'
import { AdminMainLayout } from '../Layouts'
import { notification } from 'antd'
// Component làm nhiệm vụ kiểm tra khi truy cập vào 1 route cần yêu cầu đăng nhập mới có thể truy cập được
function AdminProtectRoute() {
    const {pathname}=useLocation()
    const {user}=useSelector((state)=>state.userReducer)
    //Trường hợp chưa đăng nhập, điều hướng về trang đăng nhập
    if(!user)
    {
        return <Navigate to={`/admin-signin?redirectUrl=${pathname}`} replace/>
    }
    if(user.maLoaiNguoiDung!=="QuanTri") {
        notification.error({
            message:"Truy cập bị từ chối",
            description:"Bạn không có quyền truy cập vào trang này"
        })
        
      return <Navigate to="/" replace/>

    } 
     // Trường hợp đã đăng nhập => cho phép truy cập
  return (
    <AdminMainLayout />
  )
}

export default AdminProtectRoute
import React from 'react'
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {signup} from "../../../slice/UserSlice";
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau:"",
      hoTen:"",
      email:"",
    },
  });
  const dispatch = useDispatch();
 const { user, isLoading, error } = useSelector((state) => state.userReducer);
  const onSubmit = (values) => {
    dispatch(signup(values))
  };
if(user)
{
  return <Navigate to="/signin" />;
}
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <div>
      <h1 className="mb-4 text-center">Đăng Ký</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Tài Khoản"
            {...register("taiKhoan", {
              required: {
                value: true,
                message: "Tài khoản không được để trống",
              },
            })}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("matKhau", {
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số",
              },
            })}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        <div className='mb-3'>
          <input type="password" placeholder='Nhập lại mật khẩu' {...register("nhapLaiMatKhau",{
            required:{
              value:true,
              message:"Trường này không được để trống"
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Nhập lại mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số",
              },
          })} />
          {errors.nhapLaiMatKhau && <p>{errors.nhapLaiMatKhau.message}</p>}
        </div>
        <div className='mb-3'>
          <input type="text" placeholder='Họ Tên' {...register("hoTen",{
            required: {
              value:true,
              message:"Họ tên không được để trống"
            },
          })} />
          {errors.hoTen && <p>{errors.hoTen.message}</p>}
        </div>
        <div className='mb-3'>
          <input type="email" placeholder='Email' {...register("email",{
            required:{
              value:true,
              message:"Email không được để trống"
            },
            pattern:{
              value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message:"email phải đúng định dạng"
            }
          })} />
        </div>
        {error&& <p>{error}</p>}
        <button className="btn btn-success" disabled={isLoading}>Đăng Ký</button>
      </form>
    </div>
  )
}

export default Signup
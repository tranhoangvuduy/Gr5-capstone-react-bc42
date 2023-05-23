import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {signin} from "../../../slice/UserSlice";
import { Navigate,useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
const schema=yup.object({
  taiKhoan:yup.string().required("Tài khoản không được để trống"),
  matKhau:yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"Mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số"),
})
function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode:"onTouched",
     // Khai báo schema validation bằng yup
    resolver:yupResolver(schema)
  });
const dispatch = useDispatch();
 const { user, isLoading, error } = useSelector((state) => state.userReducer);
 const [searchParams,setSearchParams] =useSearchParams()
  const onSubmit = (values) => {
    dispatch(signin(values));
  };

  const onError = (errors) => {
    console.log(errors);
  };
  if(user)
  {
    const url=searchParams.get("redirectUrl")|| "/";
    return <Navigate to={url}/>
  }
  return (
    <div>
      <h1 className="mb-4 text-center">Đăng Nhập</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Tài Khoản"
             {...register("taiKhoan")}

            // {...register("taiKhoan", {
            //   required: {
            //     value: true,
            //     message: "Tài khoản không được để trống",
            //   },
            // })}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("matKhau")}

            // {...register("matKhau", {
            //   required: {
            //     value: true,
            //     message: "Mật khẩu không được để trống",
            //   },
            //   pattern: {
            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            //     message:
            //       "Mật khẩu ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số",
            //   },
            // })}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        {error&& <p>{error}</p>}
        <button className="btn btn-success" disabled={isLoading}>Đăng Nhập</button>
      </form>
    </div>
  );
}

export default Signin;

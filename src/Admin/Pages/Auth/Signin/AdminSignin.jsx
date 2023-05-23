import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, notification } from "antd";
import { apiUserLogin } from "../../../APIs/userAPI";
import { Navigate,useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { adminLogin } from "../../../Slices/adminSlice";
import { signin } from "../../../../Customer/slice/UserSlice"

const AdminSignin = () => {



  const [form] = Form.useForm();
  const { user, error } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required("Username is required!")
        .max(20, "Username must be at most 20 characters!"),
      matKhau: Yup.string()
        .required("Password is required!")
        .min(8, "Password must be at least 8 characters!")
        .max(16, "Password must be at most 16 characters!")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
      apiUserLogin(values)
        .then((res) => {
          console.log(res);
          dispatch(signin(values));
          notification.success({
            message: "Login successfully!",
          });
        }
        )
        .catch((err) => {
          console.log(err.response?.data);
          notification.error({
            message: "Login failed!",
            description: err.response?.data,
          });
        }
        );
        
    },
  });

  const [searchParams,setSearchParams] =useSearchParams();

  if(user)
  {
    const url=searchParams.get("redirectUrl")|| "/admin";
    return <Navigate to={url}/>
  }

  return (
    <Form form={form} onSubmitCapture={formik.handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          name={["taiKhoan"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full 
                          appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 
                          font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 
                          focus:border-fuchsia-300 focus:outline-none"
        />
        {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
          <div style={{ color: "#fa0000", marginTop: "5px" }}>{formik.errors.taiKhoan}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <input
          name={["matKhau"]}
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg 
                          border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal 
                          text-gray-700 outline-none transition-all placeholder:text-gray-500 
                          focus:border-fuchsia-300 focus:outline-none"
        />
        {formik.touched.matKhau && formik.errors.matKhau ? (
          <div style={{ color: "#fa0000", marginTop: "5px"}}>{formik.errors.matKhau}</div>
        ) : null}
      </div>
      <div className="flex items-center pl-12 mb-0.5 text-left min-h-6">
        <input
          id="rememberMe"
          className="mt-0.5 rounded-10 duration-250 ease-in-out after:rounded-circle after:shadow-2xl 
                          after:duration-250 checked:after:translate-x-5.3 h-5 relative float-left -ml-12 w-10 
                          cursor-pointer appearance-none border border-solid border-gray-200 bg-zinc-700/10 bg-none 
                          bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 
                          after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-indigo-500/95
                          checked:bg-indigo-500/95 checked:bg-none checked:bg-right"
          type="checkbox"
        />
        <label
          className="ml-2 font-normal cursor-pointer select-none text-sm text-slate-700"
          htmlFor="rememberMe"
        >
          Remember me
        </label>
      </div>
      {error&& <p>{error}</p>}
      <div className="text-center">
        <button
          type="submit"
          className="inline-block w-full px-16 py-3.5 mt-6 mb-0 font-bold leading-normal text-center 
                          text-white align-middle transition-all bg-indigo-500 border-0 rounded-lg 
                          cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in 
                          tracking-tight-rem shadow-md bg-150 bg-x-25"
        >
          Sign in
        </button>
      </div>
    </Form>
  );

  

};
export default AdminSignin;

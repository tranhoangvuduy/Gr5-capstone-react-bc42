import React, { useState, useEffect } from "react";
import {
  Switch,
  DatePicker,
  Upload,
  notification,
  Form,
  InputNumber,
  message,
} from "antd";
import { useFormik } from "formik";
import { apiAddMovies } from "../../../APIs/movieAPI";
import * as Yup from "yup";
import { InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
const { Dragger } = Upload;

const AddMovie = () => {
  const [imgSrc, setImgSrc] = useState("");

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = dayjs(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeRating = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const formik = useFormik({
    initialValues: {
      maPhim: 0,
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP05",
      ngayKhoiChieu: "",
      danhGia: 0,
      hot: false,
      dangChieu: false,
      sapChieu: false,
      hinhAnh: {},
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Tên phim không được bỏ trống!"),
      trailer: Yup.string().required("Trailer không được bỏ trống!"),
      moTa: Yup.string().required("Mô tả không được bỏ trống!"),
      danhGia: Yup.string()
        .required("Đánh giá không được bỏ trống!")
        .nullable(),
      ngayKhoiChieu: Yup.string().required(
        "Ngày khởi chiếu không được bỏ trống!"
      ),
      hinhAnh: Yup.mixed().required("File is required!"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("hinhAnh", values.hinhAnh);
        }
      }
      apiAddMovies(formData)
        .then((res) => {
          console.log(res);
          notification.success({
            message: "Thêm phim thành công!",
          });
          setTimeout(() => {
            window.location.href = "/admin/movies";
          }, 1500);
        })
        .catch((err) => {
          console.log(err.response.data.content);
          notification.error({
            message: err.response.data.content,
          });
        });
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setImgSrc("");
  };

  return (
    <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3 mt-16">
            <div
              className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 
                    border-transparent border-solid shadow-xl rounded-2xl bg-clip-border"
            >
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <span className=" text-slate-500 opacity-50 text-[18px]">
                  Movie
                </span>
                <h3 className="ml-3 mb-2 font-bold">Add new</h3>
              </div>

              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <Form
                    onSubmitCapture={formik.handleSubmit}
                    onReset={handleReset}
                    style={{ width: "100%" }}
                  >
                    <div className="grid grid-cols-4 mx-auto gap-4">
                      <div className="col-start-1 p-4 rounded-lg flex justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <Form.Item>
                            <Dragger
                              name="hinhAnh"
                              multiple={false}
                              // {...props}
                              // action={"http://localhost:3000/admin/movie/edit/10995"}
                              onRemove={(file) => {
                                formik.setFieldValue("hinhAnh", {});
                                setImgSrc(null);
                              }}
                              maxCount={2}
                              accept={".png, .jpeg, gif, .jpg"}
                              beforeUpload={(file, fileList) => {
                                const fileSizeLimit = 1024 * 1024; // 1MB
                                if (fileList.length > 1) {
                                  message.error(
                                    "Cannot upload more than one file."
                                  );
                                  return true;
                                } else if (file.size > fileSizeLimit) {
                                  message.error(
                                    "File size should be less than 1MB."
                                  );
                                  return true;
                                } else if (
                                  formik.values.hinhAnh &&
                                  formik.values.hinhAnh.name
                                ) {
                                  message.error(
                                    "Only one file can be uploaded."
                                  );
                                  return true;
                                }

                                if (file) {
                                  formik.setFieldValue("hinhAnh", file);
                                  const imageUrl = URL.createObjectURL(file);
                                  setImgSrc(imageUrl); // Update the imgSrc state to be the URL object of the new file
                                  console.log(file);
                                  message.success(
                                    `${file.name} uploaded successfully.`
                                  );
                                  return false;
                                }
                              }}
                              // style={{
                              //   width: "300px",
                              //   height: "300px",
                              //   marginRight: "220px",
                              // }}
                            >
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                Click or drag file to this area to upload
                              </p>
                            </Dragger>
                            {formik.values.hinhAnh &&
                            formik.values.hinhAnh !== "" &&
                            imgSrc !== "" ? (
                              <img
                                src={imgSrc}
                                alt=""
                                style={{
                                  width: "100%",
                                  display: "block",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              />
                            ) : null}
                          </Form.Item>
                        </div>
                      </div>
                      <div className="col-start-2 col-end-6 p-2 rounded-lg">
                        <div className="flex flex-col">
                          <Form.Item style={{ width: "100px" }}>
                            <input
                              type="text"
                              id="movie-name"
                              className="border border-gray-400 rounded-lg p-2"
                              placeholder="Movie name"
                              name="tenPhim"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.tenPhim}
                              style={{ width: "400px" }}
                            />
                            {formik.touched.tenPhim && formik.errors.tenPhim ? (
                              <div style={{ color: "#fa0000" }}>
                                {formik.errors.tenPhim}
                              </div>
                            ) : null}
                          </Form.Item>
                          <Form.Item>
                            <input
                              type="text"
                              id="movie-trailer"
                              className="border border-gray-400 rounded-lg p-2"
                              placeholder="Trailer"
                              name="trailer"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.trailer}
                              style={{ width: "400px" }}
                            />
                            {formik.touched.trailer && formik.errors.trailer ? (
                              <div style={{ color: "#fa0000" }}>
                                {formik.errors.trailer}
                              </div>
                            ) : null}
                          </Form.Item>
                          <Form.Item>
                            <textarea
                              type="text"
                              id="movie-desc"
                              className="border border-gray-400 rounded-lg p-2"
                              placeholder="Description"
                              name="moTa"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.moTa}
                              style={{ width: "800px", height: "100px" }}
                            />
                            {formik.touched.moTa && formik.errors.moTa ? (
                              <div style={{ color: "#fa0000" }}>
                                {formik.errors.moTa}
                              </div>
                            ) : null}
                          </Form.Item>
                          <Form.Item name={["ngayKhoiChieu"]}>
                            <div className="flex items-center mb-4">
                              <label htmlFor="ngayKhoiChieu" className="mr-2">
                                Release date:
                              </label>
                              <DatePicker
                                onChange={handleChangeDatePicker}
                                format={"DD/MM/YYYY"}
                                placeholder="Release date"
                                locale={locale}
                                showToday={true}
                              />
                            </div>
                          </Form.Item>
                          <Form.Item label="Coming soon" labelAlign="left">
                            <Switch
                              id="is-upcoming"
                              onChange={handleChangeSwitch("sapChieu")}
                              name="sapChieu"
                            />
                          </Form.Item>
                          <Form.Item label="Now Showing" labelAlign="left">
                            <Switch
                              id="is-showing"
                              onChange={handleChangeSwitch("dangChieu")}
                              name="dangChieu"
                            />
                          </Form.Item>
                          <Form.Item label="Hot" labelAlign="left">
                            <Switch
                              id="is-hot"
                              onChange={handleChangeSwitch("hot")}
                              name="hot"
                            />
                          </Form.Item>
                          <Form.Item>
                            <div className="flex items-center mb-4">
                              <InputNumber
                                name="danhGia"
                                value={formik.values.danhGia}
                                onChange={handleChangeRating("danhGia")}
                                onBlur={formik.handleBlur}
                                min={1}
                                max={10}
                              />
                              {formik.touched.danhGia &&
                              formik.errors.danhGia ? (
                                <div style={{ color: "#fa0000" }}>
                                  {formik.errors.danhGia}
                                </div>
                              ) : null}
                            </div>
                          </Form.Item>

                          <div className="flex items-center mb-4">
                            <button
                              type="submit"
                              className=" text-white font-bold py-2 px-4 rounded cursor-pointer bg-indigo-400"
                            >
                              Add
                            </button>
                            <button
                              type="reset"
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold ml-3 py-2 px-4 rounded cursor-pointer"
                              disabled={!formik.dirty}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddMovie;

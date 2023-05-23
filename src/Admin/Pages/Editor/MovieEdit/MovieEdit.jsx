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
import { apiGetMovieDetail, apiUpdateMovie } from "../../../APIs/movieAPI";
import * as Yup from "yup";
import { InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useParams } from "react-router-dom";
const { Dragger } = Upload;

const MovieEdit = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [movieItem, setMovieItem] = useState({});
  const { movieId } = useParams();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: movieItem.maPhim || 0,
      tenPhim: movieItem.tenPhim || "",
      trailer: movieItem.trailer || "",
      moTa: movieItem.moTa || "",
      ngayKhoiChieu: movieItem.ngayKhoiChieu || "",
      danhGia: movieItem.danhGia || 0,
      hinhAnh: movieItem.hinhAnh || null,
      maNhom: "GP05",
      hot: false,
      dangChieu: false,
      sapChieu: false,
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
      const formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("hinhAnh", values.hinhAnh); // append the File object directly to the FormData object
        }
      }
      apiUpdateMovie(formData)
        .then((res) => {
          console.log(formData);
          console.log(res);
          notification.success({
            message: "Cập nhật phim thành công!",
            duration: 2,
          });
          setTimeout(() => {
            window.location.href = "/admin";
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Cập nhật phim thất bại!",
            duration: 2,
          });
        });
    },
  });

  const getMovieDetail = async () => {
    try {
      const data = await apiGetMovieDetail(movieId);
      if (data.content) {
        setMovieItem(data.content);
        setImgSrc(data.content.hinhAnh);
        console.log(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

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
  return (
    <div>
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap -mx-3">
            {/* <div className='bg-white w-full rounded-2xl ml-3 p-2 '>
                    <Header category="Movies" title="Catalog"/>
                </div> */}
            <div className="flex-none w-full max-w-full px-3 mt-24">
              <div
                className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 
                    border-transparent border-solid shadow-xl rounded-2xl bg-clip-border"
              >
                <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                  <span className=" text-slate-500 opacity-50 text-[18px]">
                    Movie
                  </span>
                  <h3 className="ml-3 mb-2 font-bold">Edit</h3>
                </div>

                <div className="flex-auto px-0 pt-0 pb-2">
                  <div className="p-0 overflow-x-auto">
                    <Form
                      onSubmitCapture={formik.handleSubmit}
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
                                  style={{ width: "100%", display: "block", marginLeft: "auto", marginRight: "auto" }}
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
                              {formik.touched.tenPhim &&
                              formik.errors.tenPhim ? (
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
                              {formik.touched.trailer &&
                              formik.errors.trailer ? (
                                <div style={{ color: "#fa0000" }}>
                                  {formik.errors.trailer}
                                </div>
                              ) : null}
                            </Form.Item>

                            <Form.Item>
                              <textarea
                                id="movie-description"
                                className="border border-gray-400 rounded-lg p-2"
                                placeholder="Description"
                                name="moTa"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.moTa}
                                style={{ width: "100%", height: "200px" }}
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
                                  format={"DD/MM/YYYY"}
                                  placeholder="Release date"
                                  locale={locale}
                                  showToday={true}
                                  value={dayjs(formik.values.ngayKhoiChieu)}
                                  onChange={handleChangeDatePicker}
                                />
                              </div>
                            </Form.Item>

                            <Form.Item label="Coming soon" labelAlign="left">
                              <Switch
                                id="is-upcoming"
                                name="sapChieu"
                                checked={formik.values.sapChieu}
                                onChange={handleChangeSwitch("sapChieu")}
                              />
                            </Form.Item>

                            <Form.Item label="Now Showing" labelAlign="left">
                              <Switch
                                id="is-showing"
                                name="dangChieu"
                                onChange={handleChangeSwitch("dangChieu")}
                                checked={formik.values.dangChieu}
                              />
                            </Form.Item>

                            <Form.Item label="Hot" labelAlign="left">
                              <Switch
                                id="is-hot"
                                name="hot"
                                checked={formik.values.hot}
                                onChange={handleChangeSwitch("hot")}
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
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Edit
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
    </div>
  );
};

export default MovieEdit;

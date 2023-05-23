import React, { useState, useEffect } from "react";
import {
  notification,
  Space,
  Table,
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
} from "antd";
import ReactShowMoreText from "react-show-more-text";
import {
  DeleteOutlined,
  EditOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// import "dayjs/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { apiGetMovies, apiDeleteMovies } from "../../APIs/movieAPI";
import {
  apiGetTheaterDetail,
  apiCreateMovieSchedule,
  apiGetTheater,
} from "../../APIs/theaterAPI";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [theaterList, setTheaterList] = useState([]);
  const [isSelectTheater, setIsSelectTheater] = useState([]);


  const getMovieList = async () => {
    try {
      const data = await apiGetMovies();
      setMovieList(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMovie = async (maPhim) => {
    Modal.confirm({
      title: "Are you sure to delete this movie ?",
      icon: <DeleteOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await apiDeleteMovies(maPhim);
          getMovieList();
          notification.success({
            message: "Delete movie successfully",
          });
        } catch (error) {
          notification.error({
            message: "Delete movie failed",
            description: error.response.data.content,
          });
        }
      },
    });
  };

  const handleEdit = (record) => {
    const movieId = record.maPhim;
    console.log(record.maPhim);
    navigate(`/admin/movies/edit/${movieId}`);
  };

  const handleChangeDatePicker = (value) => {
    let ngayChieuGioChieu = dayjs(value).format("DD/MM/YYYY HH:mm:ss");
    formik.setFieldValue("ngayChieuGioChieu", ngayChieuGioChieu);
  };

  const getTheaterList = async () => {
    try {
      const data = await apiGetTheater();
      console.log("theaterList: ", data.content);
      setTheaterList(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectTheaterSystem = async (value) => {
    try {
      const data = await apiGetTheaterDetail(value);
      console.log("cumRapList: ", data.content);
      setIsSelectTheater(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectTheaterSystem = (value) => {
    console.log("onSelect", value);
    handleSelectTheaterSystem(value);
  };


  const [form] = Form.useForm();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: selectedMovie,
      ngayChieuGioChieu: "",
      maRap: "",
      tenRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      try {
        console.log("values: ", values);
        const response = await apiCreateMovieSchedule(values);
        console.log("Created movie schedule: ", response);
        notification.success({
          message: "Create movie schedule successfully!",
        });
        setIsOpen(false);
      } catch (error) {
        console.log("Error: ", error);
        notification.error({
          message: "Create movie schedule failed!",
          description: error.response.data.content,
        });
      }
    },
  });

  const handleClockClick = (maPhim) => {
    setIsOpen(true);
    setSelectedMovie(maPhim);
    console.log("maPhim: ", maPhim);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Poster",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img src={text} alt="poster" width="200px" />,
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      key: "tenPhim",
      render: (text) => <p style={{ width: "230px" }}>{text}</p>,
      filteredValue: [searchValue],
      onFilter: (value, record) =>
        String(record.tenPhim).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Description",
      key: "moTa",
      dataIndex: "moTa",
      render: (text) => (
        <ReactShowMoreText
          lines={3}
          more="Show more"
          less="Show less"
          expanded={false}
          width={280}
        >
          {text}
        </ReactShowMoreText>
      ),
    },
    {
      title: "Release Date",
      key: "ngayKhoiChieu",
      dataIndex: "ngayKhoiChieu",
      render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-2xl text-blue-500"
            onClick={() => handleEdit(record)}
          />

          <DeleteOutlined
            className="text-2xl text-red-500"
            onClick={() => handleDeleteMovie(record.maPhim)}
          />

          <ClockCircleOutlined
            className="text-2xl text-green-500 "
            onClick={() => {
              handleClockClick(record.maPhim);
            }}
          />
          <Modal
            title="Set showtime"
            centered
            visible={isOpen}
            onOk={() => formik.handleSubmit()}
            onCancel={() => setIsOpen(false)}
            width={1300}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            {movieList
              .filter((movie) => movie.maPhim === selectedMovie)
              .map((movie) => (
                <div key={movie.maPhim} className="flex flex-col items-center">
                  <img src={movie.hinhAnh} alt="poster" width="350px" />
                  <h2 className="text-2xl font-bold mb-12">{movie.tenPhim}</h2>
                  <div class="flex">
                    <Form.Item
                      name={["chonHeThongRap"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select theater system!",
                        },
                      ]}
                      class="inline-flex"
                    >
                      <Select
                        placeholder="Select theater system"
                        style={{ width: "300px" }}
                        onSelect={onSelectTheaterSystem}
                        value={formik.values.chonHeThongRap}
                        onChange={(value) => {
                          formik.setFieldValue("chonHeThongRap", value);
                        }}
                      >
                        {theaterList.map((theater) => (
                          <Select.Option
                            value={theater.maHeThongRap}
                            key={theater.maHeThongRap}
                          >
                            {theater.tenHeThongRap}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={["chonCumRap"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select theater cluster!",
                        },
                      ]}
                      class="inline-flex"
                    >
                      <Select
                        placeholder="Select theater cluster"
                        style={{ width: "300px" }}
                        value={formik.values.chonCumRap}
                        onChange={(value) => {
                          formik.setFieldValue("maRap", value);
                        }}
                      >
                        {isSelectTheater.map((cumRap) => (
                          <Select.Option
                            value={cumRap.maCumRap}
                            key={cumRap.maCumRap}
                          >
                            {cumRap.tenCumRap}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={["tenRap"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select theater!",
                        },
                      ]}
                      class="inline-flex"
                    >
                      <Select
                        placeholder="Select theater"
                        style={{ width: "300px" }}
                        value={formik.values.maRap}
                        onChange={(value) => {
                          formik.setFieldValue("tenRap", value);
                        }}
                      >
                        {isSelectTheater.map((cumRap) =>
                          cumRap.danhSachRap.map((rap) => (
                            <Select.Option value={rap.maRap} key={rap.maRap}>
                              {rap.tenRap}
                            </Select.Option>
                          ))
                        )}
                      </Select>
                    </Form.Item>
                  </div>
                  <div class="flex">
                  <Form.Item
                      name={["ngayChieuGioChieu"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input showing time!",
                        },
                      ]}
                    >
                      <DatePicker
                        showTime
                        placeholder="Select date and time"
                        style={{ width: "200px" }}
                        onChange={handleChangeDatePicker}
                        format={"DD/MM/YYYY HH:mm:ss A"}
                        locale={locale}
                        showToday={true}
                      />
                    </Form.Item>
                    <Form.Item
                      name={["giaVe"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input ticket price!",
                        },
                      ]}
                      class="inline-flex"
                    >
                      <Input
                        placeholder="Ticket price"
                        value={formik.values.giaVe}
                        onChange={formik.handleChange}
                      />
                    </Form.Item>
                  </div>
                </div>
              ))}
          </Modal>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getMovieList();
    getTheaterList();
  }, []);

  return (
    <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3 mt-16">
            <div className="flex justify-between">
              <button
                className="mb-5 text-black font-bold py-2 px-4 rounded bg-white"
                style={{
                  border: "none",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                onClick={() => navigate("/admin/movies/add-movie")}
              >
                Add new
              </button>
              <div className="search-wrapper rounded-lg flex align-items-center  w-3/12 mb-5">
                <form
                  action
                  className="relative ml-auto w-max bg-white rounded-3xl "
                >
                  <input
                    type="search"
                    className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full 
              border bg-transparent pl-12 outline-none focus:w-full 
              focus:cursor-text focus:border-black focus:pl-16 focus:pr-4 inputSearch"
                    onSearch={(value) => {
                      setSearchValue(value);
                    }}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-y-0 my-auto h-8 w-12 border-r \
                    border-transparent px-3.5 peer-focus:border-gray-300 
                    peer-focus:stroke-black-500 stroke-black "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </form>
              </div>
            </div>
            <div
              className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 
                    border-transparent border-solid shadow-xl rounded-2xl bg-clip-border"
            >
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <span className=" text-slate-500 opacity-50 text-[18px]">
                  Movie
                </span>
                <h3 className="ml-3 mb-2 font-bold">Catalog</h3>
              </div>

              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <Table columns={columns} dataSource={movieList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Movies;

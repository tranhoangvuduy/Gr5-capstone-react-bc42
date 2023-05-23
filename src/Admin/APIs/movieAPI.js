import axiosClient from "./axiosClient";

export const apiGetMovies = async () => {
    const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        maNhom: "GP05",
      },
    });
    return data;
  };

// apiAddMovies formData
export const apiAddMovies = async (formData) => {
  const { data } = await axiosClient.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
  return data;
}

// apiDeleteMovies
export const apiDeleteMovies = async (maPhim) => {
  const { data } = await axiosClient.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  return data;
}

// apiGetMovieDetail
export const apiGetMovieDetail = async (maPhim) => {
  const { data } = await axiosClient.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  return data;
}

// apiUpdateMovie
// export const apiUpdateMovies = async (formData) => {
//   const { data } = await axiosClient.post("/QuanLyPhim/CapNhatPhimUpload", formData);
//   return data;
// }

// apiUpdateMovie
export const apiUpdateMovie = async (formData) => {
  const { data } = await axiosClient.post("/QuanLyPhim/CapNhatPhimUpload", formData);
  return data;
}
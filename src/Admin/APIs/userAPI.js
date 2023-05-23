import axiosClient from "./axiosClient";

// apiGetUserInfo
export const apiGetUserList = async () => {
    const { data } = await axiosClient.get("/QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP05",
      },
    });
    return data;
  }

// apiDeleteUser
export const apiDeleteUser = async (taiKhoan) => {
    const { data } = await axiosClient.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    return data;
  }

// apiAddUser
export const apiAddUser = async (userData) => {
    const { data } = await axiosClient.post("/QuanLyNguoiDung/ThemNguoiDung", userData);
    return data;
  }

// apiUpdateUser
export const apiUpdateUser = async (userData) => {
    const { data } = await axiosClient.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userData);
    return data;
  }

// apiGetUserDetail
export const apiGetUserDetail = async (taiKhoan) => {
    const { data } = await axiosClient.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
    return data;
  }

// apiUserLogin
export const apiUserLogin = async (values) => {
    const { data } = await axiosClient.post("/QuanLyNguoiDung/DangNhap", values);
    return data;
  }
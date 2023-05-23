import axiosClient from "./axiosClient";


export const apiGetTheater = async () => {
    const { data } = await axiosClient.get("/QuanLyRap/LayThongTinHeThongRap");
    return data;
    }

export const apiGetTheaterDetail = async (maHeThongRap) => {
    const { data } = await axiosClient.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    return data;
    }

export const apiCreateMovieSchedule = async (data) => {
    const { data: res } = await axiosClient.post("/QuanLyDatVe/TaoLichChieu", data);
    return res;
    }
import axiosClient from "./axiosClient";

export const showtimesAPI = async (maRap) => {
  const {data} = await axiosClient.get("/QuanLyRap/LayThongTinLichChieuHeThongRap",{
    params:{
      maHeThongRap:maRap,
      maNhom:"GP05"
    }
  });

 return data
}

export const bookingAPI = async (MaLichChieu) => {
  const {data} = await axiosClient.get("/QuanLyDatVe/LayDanhSachPhongVe", {
    params: {
      MaLichChieu:MaLichChieu,
    },
  });
  return data
};
export const seatAPI=async(values)=>{
  const {data} = await axiosClient.post("/QuanLyDatVe/DatVe",values);
  return data;
}

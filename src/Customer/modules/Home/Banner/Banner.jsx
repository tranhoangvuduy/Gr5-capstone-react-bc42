import React,{useState,useEffect} from 'react'
import { apiGetBanners } from "../../../apis/movieAPI";
import styles from './Banner.module.scss'
import Slider from 'react-slick'
function Banner() {
   const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  const getBanners = async () => {
    try {
      const data = await apiGetBanners();
      setBanners(data.content);
    } catch (error) {
      setError(error.response?.data?.content);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  if (error) return null;

  // carousel: slick, swiper
  return (
    <div >
    <Slider {...settings}>
  {banners.map((item) => {
    return (
      <div key={item.maBanner}>
        <img height={500} width={"100%"} src={item.hinhAnh} alt={item.maBanner} />
      </div>
    );
  })}
</Slider>
    </div>
  );
}

export default Banner;
document.querySelector('head').insertAdjacentHTML(
  'beforeend',
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css" />',
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css"/>'
);







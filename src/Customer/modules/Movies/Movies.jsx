import React,{useState,useEffect} from "react";
import styles from "./Movies.module.scss";
import ReactPlayer from "react-player";
import { apiGetMovies } from "./../../apis/movieAPI";
import { useNavigate } from "react-router-dom";
function Movies() {
  const navigate=useNavigate();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const data = await apiGetMovies();
      setMovies(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const [showVideo, setShowVideo] = useState(null);

  const handleImageClick = (id) => {
    setShowVideo(id);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='container mt-5'>
      <div className='row'>
        {movies.map(item=>{
          return (
            <div key={item.maPhim} className="col-sm-4 mb-3">
              <div className="card" style={{width: '25rem'}}>
                <div className="card-top">
                  {!showVideo || showVideo !== item.maPhim ? (
                    <img
                      className="card-img-top"
                      src={item.hinhAnh}
                      onClick={()=>handleImageClick(item.maPhim)}
                    />
                  ) : (
                    <ReactPlayer
                    width={400}
                      url={item.trailer}
                      playing
                      controls
                    />
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.tenPhim}</h5>
                  <p className="card-text">{item.moTa}</p>
                  <button
                    className="btn btn-success"
                    onClick={()=>{navigate(`/movies/${item.maPhim}`)}}
                  >
                      Xem Chi Tiết
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Movies;
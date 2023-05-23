import React from "react";
import styles from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "./../../slice/UserSlice";
import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userReducer.user);
  const { isAuth } = useSelector((state) => state.userReducer);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <header className="header">
      
      <nav className="flex justify-between items-center py-4 bg-gray-800">
        <div className="flex items-center">
          <Link
            className="text-xl font-bold text-white uppercase text-decoration-none ml-20"
            to="/"
          >
            Movies
          </Link>
        </div>
        <div className="text-center">
          <ul className="flex justify-between translate-y-[35%]">
            <li className="mx-4">
              <a href="#" className="text-white text-decoration-none">
                Lịch chiếu
              </a>
            </li>
            <li className="mx-4">
              <a href="#" className="text-white text-decoration-none">
                Cụm rạp
              </a>
            </li>
            <li className="mx-4">
              <a href="#" className="text-white text-decoration-none">
                Tin tức
              </a>
            </li>
            <li className="mx-4">
              <a href="#" className="text-white text-decoration-none">
                Ứng dụng
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center">
          <div className="ml-6">
            {isAuth ? (
              <>
                <span className="text-white mr-4">
                  Xin chào, {currentUser && currentUser.taiKhoan}
                </span>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-decoration-none"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-decoration-none"
                  to="/signin"
                >
                  Đăng nhập
                </Link>
                <Link
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 text-decoration-none"
                  to="/signup"
                >
                  Đăng kí
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

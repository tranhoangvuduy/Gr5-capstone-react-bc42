import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Customer/layouts/MainLayout/MainLayout";
import ProtectedRoute from "./Customer/routes/ProtectedRoute";
import AdminProtectedRoute from "./Admin/Routes/AdminProtectRoute";
import AuthLayout from "./Customer/layouts/AuthLayout/AuthLayout";
import { Movies, Users, MovieEdit, AddMovie, AddUser, UserEdit, AdminSignin } from "./Admin/Pages/"
import { AdminMainLayout, AdminSigninLayout } from "./Admin/Layouts/index";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee,fas } from '@fortawesome/free-solid-svg-icons'
 library.add(fab, faCheckSquare, faCoffee,fas)
// import MovieDetails from "./modules/MovieDetails/Showtimes/MovieDetails";
// import Singin from "./modules/Auth/Signin/Singin";
// import Signup from "./modules/Auth/Signup/Signup";
// import Booking from "./modules/Booking/Booking";
// import Home from "./modules/Home/Home";
const Home=lazy(() => import("./Customer/modules/Home/Home"));
const MovieDetails=lazy(() => import("./Customer/modules/MovieDetails/Showtimes/MovieDetails"));
const Singin=lazy(() => import("./Customer/modules/Auth/Signin/Singin"));
const Signup=lazy(() => import("./Customer/modules/Auth/Signup/Signup"));
const Booking=lazy(() => import("./Customer/modules/Booking/Booking"));
function App() {

  return (
  <Suspense fallback={<h1>loading...</h1>}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetails/>} />
          <Route path="/booking/:bookingId" element={<ProtectedRoute>
            <Booking/>
          </ProtectedRoute>}/>
        </Route>

        <Route path="/" element={<AuthLayout/>}>
          <Route path="/signin" element={<Singin/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Route>

        <Route path="/" element={<AdminSigninLayout/>}>
          <Route path="/admin-signin" element={<AdminSignin/>}/>
        </Route>
        
        
        <Route path="/admin" element={<AdminProtectedRoute> <AdminMainLayout /> </AdminProtectedRoute> } >
          <Route path="/admin/movies" element={<Movies />} />
          <Route path="/admin/movies/add-movie" element={<AddMovie />} />
          <Route path="/admin/movies/edit/:movieId" element={<MovieEdit />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/add-user" element={<AddUser />} />
          <Route path="/admin/users/edit/:userId" element={<UserEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>
  );
}

export default App;

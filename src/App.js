import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Movies from "./Components/Movies/Movies";
import MoviesDetails from "./Components/MoviesDetails/MoviesDetails";
import Home from './Components/Home/Home';
import TvShows from './Components/TvShows/TvShows';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Footer from "./Components/Footer/Footer";
function App() {
  function TestingRoute(props) {
    if(localStorage.getItem('tkn') == null) {
      return <Navigate to='/login' />;
    }else {
      return props.childern;
    }
  }
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  function userToken() {
    let user = jwtDecode(localStorage.getItem('tkn'));
    setCurrentUser(user);
  }
  function clearUserData() {
    localStorage.removeItem('tkn');
    setCurrentUser(null);
    navigate('/login');
  }
  useEffect(() => {
    if(localStorage.getItem('tkn') != null) {
      userToken();
    }
  } , [])
  return (
    <>
         <Navigation currentUser={currentUser} clearUserData={clearUserData} />
         <Routes>
            <Route path='' element={ <Home />} />
            <Route path='home' element={ <Home />} />
            <Route path='movies' element={ <TestingRoute> <Movies /> </TestingRoute> } />
            <Route path='tv' element={ <TestingRoute> <TvShows /> </TestingRoute> } />
            <Route path='details' element={ <MoviesDetails />} >
              <Route path=':id' element={ <MoviesDetails />} />
            </Route>
            <Route path='signup' element={ <Signup />} />
            <Route path='login' element={ <Login decodeToken={userToken} />} />
            <Route path='*' element={ <div className="vh-100 d-flex align-items-center justify-content-center">
              <h1>4 0 4</h1>
            </div>} />
         </Routes>
         <Footer />
    </>
  );
}

export default App;

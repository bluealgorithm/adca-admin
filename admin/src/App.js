import "./App.css";
import { HashRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useStateContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Nominees from "./Pages/Nominees";
import Voters from "./Pages/Voters";
import Overview from "./Pages/Overview";
import CreateCategories from "./Pages/CreateCategories";
import CreateSubCategories from "./Pages/CreateSubCategories";
import Categories from "./Pages/Categories";
import Login from "./Pages/Login";
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'
function App() {
  const { activeMenu, darkToggle, login } = useStateContext();

  // const location = useLocation();
  // console.log('hash', location.hash);
console.log(login)
  return (
    <div className={`${darkToggle && "dark"} App`}>
      <HashRouter>
         
        <div className='flex relative dark:bg-main-dark-bg'>
          {activeMenu ? (
            <div className={` ${login ? 'hidden w-0 md:w-0' : 'w-72 md:w-[20%] fixed sidebar dark:bg-secondary-dark-bg bg-white'} `}>
              <Sidebar />
            </div>
          ) : (
            <div className={`${login ? 'hidden' : 'w-0 dark:bg-secondary-dark-bg'} `}>
              <Sidebar />
            </div>
          )}
         
          <div
            className={`
              ${
                activeMenu ? "md:ml-72" : "flex-2"
              } dark:bg-main-bg bg-main-bg min-h-screen w-full`}
          >
            <div className={`${login ? 'hidden' : 'fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full' }`}>
              <Navbar />
            </div>
            <div>
              <Routes>
                <Route exact path="/login" element={<PublicRoute />}>
                <Route exact path="/login" element={<Login />}></Route>
                </Route>
                <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Overview />}>
                </Route>
                </Route>
                <Route exact path="/nominees" element={<PrivateRoute />}>
                <Route exact path="/nominees" element={<Nominees />}>
                </Route>
                </Route>
                <Route exact path="/total-votes" element={<PrivateRoute />}>
                <Route exact path="/total-votes" element={<Voters />}></Route>
                </Route>
                <Route exact path="/categories" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/categories"
                  element={<Categories />}
                ></Route>
                </Route>
                <Route exact path="/create-categories" element={<PrivateRoute />}>
                <Route
                  exact
                  path="/create-categories"
                  element={<CreateCategories />}
                ></Route>
                </Route>
                 <Route exact path="/create-sub-categories" element={<PrivateRoute />}>
                  <Route
                  exact
                  path="/create-sub-categories"
                  element={<CreateSubCategories />}
                ></Route>
                </Route> 
              </Routes>
            </div>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;

import "./App.css";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { useStateContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Nominees from "./Pages/Nominees";
import Voters from "./Pages/Voters";
function App() {
  const { activeMenu, darkToggle } = useStateContext();

  return (
    <div className={`${darkToggle && "dark"} App`}>
      <HashRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 md:w-[20%] fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`
              ${
                activeMenu ? "md:ml-72" : "flex-2"
              } dark:bg-main-bg bg-main-bg min-h-screen w-full`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              <Routes>
                <Route exact path="/nominees" element={<Nominees />}></Route>
                <Route exact path="/voters" element={<Voters />}></Route>
                {/* <Route exact path="/account" element={<PrivateRoute />}>
                  <Route exact path="/account" element={<Account />}></Route>
                </Route> */}
              </Routes>
            </div>
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;

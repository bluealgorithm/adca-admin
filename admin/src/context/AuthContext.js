import { useContext, createContext } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { setUserSession, removeUserSession } from "../utils/common";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState();
  const [screenSize, setScreenSize] = useState(undefined);
  const [darkToggle, setDarkToggle] = useState(false);
  // const [logout, setLogout] = useState(null)
  const [login, setLogin] = useState(false)
  // let login
    const url = window.location.pathname
  if (url == 'http://localhost:3000/voting-app#/login') setLogin(true)
  const handleClick = (clicked) => {
    setIsClicked({ ...isClicked, [clicked]: true });
  };

  if(user){
    return setUserSession(user);
  }
  // useEffect(() => {
  //       setUserSession(user);
  //     // setUserSession(user.accessToken, user.admin)
  // }, [user])
  
  const logout = () => {
    removeUserSession()
    // navigate('/login')

  }
  // const googleSignin = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  // };
  // const logout = () => {
  //   signOut(auth);
  // };


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setUserSession(currentUser.accessToken, currentUser);
  //     console.log("user", currentUser);
  //   });
  //   //   useEffect cleanup function
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        // googleSignin,
        login,
        setLogin,
        logout,
        setUser,
        user,
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        darkToggle,
        setDarkToggle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(AuthContext);
};

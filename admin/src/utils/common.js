// we can get the user in different ways either from session, localStorage, or redux
export const getUser = () => {
  const userStr = sessionStorage.getItem("admin");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const setUserSession = (user) => {
  const token =  user.accessToken
  const admin = user.admin
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("admin", JSON.stringify(admin));
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
};

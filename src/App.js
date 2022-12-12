import React from "react";

import logo from "./logo.svg";
import "./App.css";

import { Login, 카카오데이터받는곳 } from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import BreadTest from "./pages/BreadTest";
import Write from "./pages/Write";
import Article from "./pages/Article";
import MyPage from "./pages/MyPage";

import axios from "axios";
import { Routes, Route } from "react-router-dom";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});

  const 자동로그인 = async () => {
    await axios({
      url: "http://localhost:4000/autoLogin",
      method: "POST",
    }).then((response) => {
      setLoginUser(response.data);
    });
  };

  React.useEffect(() => {
    자동로그인();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/oauth/callback/kakao"
          element={<카카오데이터받는곳 />}
        />
        <Route exact path="/write" element={<Write />} />
        <Route exact path="/myPage" element={<MyPage />} />
        <Route exact path="/breadtest/*" element={<BreadTest />} />
        <Route exact path="/article" element={<Article />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;

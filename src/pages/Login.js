import React from "react";
import axios from "axios";
import qs from "qs";

axios.defaults.withCredentials = true;

const REST_API_KEY = "1417cb2e8eb1ac11c296428111e1765d";
const JAVASCRIPT_KEY = "39745e025fd1ebef74b3abb480efcec7";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
const 카카오소셜로그인링크 = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
  const 카카오로그인 = () => {
    console.log("카카오 로그인 준비");

    window.location.href = 카카오소셜로그인링크;
  };

  const [data, setData] = React.useState({});

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 로그인하기 = async () => {
    await axios({
      url: "http://localhost:4000/login",
      method: "POST",
      data: data,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      }

      if (response.data.code === "success") {
        window.location = "/";
      }
    });
  };

  return (
    <div>
      <input
        name="id"
        placeholder="아이디를 입력해주세요"
        onChange={데이터변경}
      />
      <input
        type="password"
        name="pw"
        placeholder="비밀번호를 입력해주세요"
        onChange={데이터변경}
      />
      <button className="btn" type="button" onClick={로그인하기}>
        로그인
      </button>
      <div></div>
      <button
        type="button"
        style={{ backgroundColor: "#F7E600", fontSize: 30, cursor: "pointer" }}
        onClick={카카오로그인}
      >
        카카오 계정으로 로그인
      </button>
    </div>
  );
}

function 카카오데이터받는곳() {
  const code = new URL(window.location.href).searchParams.get("code");

  const getKAKAO = async () => {
    const data = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: JAVASCRIPT_KEY,
    });

    const result = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      data: data,
    });

    window.Kakao.init(REST_API_KEY);

    window.Kakao.Auth.setAccessToken(result.data.access_token);

    const kakaoData = await window.Kakao.API.request({
      url: "/v2/user/me",
    });
  };

  React.useEffect(() => {
    getKAKAO();
  }, []);

  return <div>카카오 데이터 받는 곳</div>;
}

export { Login, 카카오데이터받는곳 };

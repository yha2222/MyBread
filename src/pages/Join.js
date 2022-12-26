import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Join() {
  const navigation = useNavigate();

  const [data, setData] = React.useState({});

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 가입하기 = async () => {
    await axios({
      url: "http://localhost:4000/join",
      method: "POST",
      data: data,
    }).then((response) => {
      console.log(response);

      if (response.data.message) {
        alert(response.data.message);
      }

      if (response.data.code === "success") {
        navigation("/Login");
      }
    });
  };

  return (
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login">
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="text"
                class="login__input"
                placeholder="User nickname"
                onChange={데이터변경}
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="text"
                class="login__input"
                placeholder="User id"
                onChange={데이터변경}
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="Password"
                onChange={데이터변경}
              />
            </div>
            <button
              class="button login__submit"
              type="button"
              onClick={가입하기}
            >
              회원가입
            </button>
          </form>
          <div class="social-login"></div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Join;

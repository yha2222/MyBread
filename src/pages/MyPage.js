import React from "react";
import axios from "axios";

function MyPage() {
  const [pic, setPic] = React.useState();

  const 추천받은목록가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/myBreadList",
      method: "GET",
    }).then((response) => {
      setPic(response.data);
    });
  };

  React.useEffect(() => {
    추천받은목록가져오기();
  }, []);

  return (
    <div class="container">
      <h2>My Page</h2>
      <div class="screen">
        <div class="screen__content">
          <div class="social-login">추천 받은 목록</div>
        </div>
        <div class="screen__content">
          <div class="social-login">내가 쓴 글</div>
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

export default MyPage;

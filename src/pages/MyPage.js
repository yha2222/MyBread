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
    <div>
      <h2></h2>
      <h3>추천 받은 빵</h3>
      <h3>내가 쓴 후기</h3>
    </div>
  );
}

export default MyPage;

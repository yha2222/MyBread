import React from "react";

function Map() {
  //마커 담을 배열
  const markers = [];

  //지도 생성
  const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(36.327725, 127.427369), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  return (
    <div>
      <div id="map" style={{ width: 500, height: 400 }}></div>
      <script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=39745e025fd1ebef74b3abb480efcec7"
      ></script>
    </div>
  );
}

export default Map;

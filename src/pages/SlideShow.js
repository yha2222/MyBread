const slides = document.querySelector(".slides"); //전체 슬라이드 컨테이너
const slideImg = document.querySelectorAll(".slides li"); //모든 슬라이드들
let currentIdx = 0; //현재 슬라이드 index
const slideCount = slideImg.length; //슬라이드 개수
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slideWidth = 300; //한 개 슬라이드 넓이
const slideMargin = 100; //슬라이드 간 margin 값

//전체 슬라이드 컨테이너 넓이 설정
slides.getElementsByClassName.width =
  (slideWidth + slideMargin) * slideCount + "px";

function moveSlide(num) {
  slideCount.style.left = -num * 400 + "px";
  currentIdx = num;
}

/**
 * 첫 번째 슬라이드로 표시됐을 때는 이전 버튼 눌러도 노반응
 * currentIdx !== 0 일 때만 moveSlide 함수 불러옴
 */
prev.addEventListener("click", function () {
  if (currentIdx !== 0) moveSlide(currentIdx - 1);
});

/**
 * 마지막 슬라이드로 표시 됐을 때는 다음 버튼 눌러도 노반응
 * currentIdx !== slideCount - 1 일 때만 moveSlide 함수 불러옴
 */
next.addEventListener("click", function () {
  if (currentIdx !== slideCount - 1) {
    moveSlide(currentIdx + 1);
  }
});

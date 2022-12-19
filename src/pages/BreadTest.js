import React from "react";
import axios from "axios";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const StoreContext = React.createContext();

const ProgressBar = (props) => {
  const width = (480 / 1) * props.step;

  return (
    <div className="progress-bar">
      <div className="percent" style={{ width: width }}></div>
    </div>
  );
};

const Question = (props) => {
  return (
    <div className="image-box">
      <imag src={props.image} alt="온보딩이미지" />
    </div>
  );
};

const Answer = (props) => {
  const navigation = useNavigate();

  const { setDispatchType } = React.useContext(StoreContext);

  return (
    <button
      className="btn"
      onClick={() => {
        setDispatchType({
          code: "답변",
          params: {
            value: props.value,
          },
        });
      }}
    >
      {props.text}
    </button>
  );
};

function TestMain() {
  const navigation = useNavigate();
  const { setDispatchType } = React.useContext(StoreContext);

  React.useEffect(() => {
    setDispatchType({
      code: "임시저장",
    });
  }, []);

  return (
    <div className="main-app">
      <img
        src="https://cdn.imweb.me/thumbnail/20220722/f3df23d953ade.png"
        alt="메인이미지"
      />
      <button
        className="btn"
        type="button"
        onClick={() => {
          navigation("/breadtest/teston1");
        }}
      >
        시작하기
      </button>
    </div>
  );
}

function TestOn1() {
  return (
    <div className="main-app">
      <ProgressBar step={0.8} />
      <Question image="https://www.sungsimdangmall.co.kr/data/sungsimdang…ods/sungsimdang/small/202233238829723523374_1.jpg" />
      <Answer text="유명한 빵" value="유명" />
      <Answer text="건강한 빵" value="건강" />
      <Answer text="달달한 빵" value="달" />
      <Answer text="칼칼한 빵" value="칼" />
      <Answer text="페스츄리 빵" value="페스" />
    </div>
  );
}

// 유명 선택지
function TestOn2() {
  return (
    <div className="main-app">
      <ProgressBar step={2} />
      <Question image="https://www.sungsimdangmall.co.kr/data/sungsimdang…ods/sungsimdang/small/202233238829723523374_1.jpg" />
      <Answer text="제일 유명한 빵" value="제일" />
      <Answer text="안 느끼한 빵" value="안느끼" />
      <Answer text="짭짤한 빵" value="짭짤" />
    </div>
  );
}

// 건강 선택지
function TestOn3() {
  return (
    <div className="main-app">
      <ProgressBar step={2} />
      <Question image="https://www.sungsimdangmall.co.kr/data/sungsimdang…ods/sungsimdang/small/202233238829723523374_1.jpg" />
      <Answer text="최강 건강 빵" value="건강건강" />
      <Answer text="그 중에 달달한 빵" value="달달" />
    </div>
  );
}

// 달달 선택지
function TestOn4() {
  return (
    <div className="main-app">
      <ProgressBar step={2} />
      <Question image="https://www.sungsimdangmall.co.kr/data/sungsimdang…ods/sungsimdang/small/202233238829723523374_1.jpg" />
      <Answer text="쫀득한 빵" value="쫀득" />
      <Answer text="크림 든 빵" value="크림" />
      <Answer text="제일 단 빵" value="디단" />
      <Answer text="그 중에 유명한 빵" value="달유명" />
    </div>
  );
}

// 칼칼 선택지
function TestOn5() {
  return (
    <div className="main-app">
      <ProgressBar step={2} />
      <Question image="https://www.sungsimdangmall.co.kr/data/sungsimdang…ods/sungsimdang/small/202233238829723523374_1.jpg" />
      <Answer text="빵 말고 밥" value="칼밥" />
      <Answer text="빵 말고 고로케" value="칼고로케" />
    </div>
  );
}

// 페스츄리 선택지
function TestOn6() {
  return (
    <div className="main-app">
      <ProgressBar step={2} />
      <Question image="https://www.sungsimdangmall.co.kr/data/sungsimdang…ods/sungsimdang/small/202233238829723523374_1.jpg" />
      <Answer text="양 많고 부들 빵" value="양많" />
      <Answer text="양 적고 빠삭한 빵" value="양적" />
    </div>
  );
}

function Result() {
  const navigation = useNavigate();
  const { state } = useLocation();
  const [result, setResult] = React.useState(undefined);

  const 빵결과가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/urBread",
      params: state,
    })
      .then(({ data }) => {
        setResult(data);
      })
      .catch((e) => {
        console.log("에러", e);
      });
  };

  React.useEffect(() => {
    빵결과가져오기();
  }, []);

  if (result === undefined) {
    return <div>결과 없음</div>;
  }

  const 빵저장 = async () => {
    await axios({
      url: "http://localhost:4000/keepBread",
      method: "POST",
      data: result,
    }).then((response) => {
      console.log(response);

      if (response.data.message) {
        alert(response.data.message);
      }
    });
  };

  return (
    <div className="result-img-wrap">
      <div className="result-box">
        <img className="result-img" src={result.content} alt="결과화면" />
        <div className="result-name">${result.name}</div>
      </div>
      <div>
        <button
          className="btn"
          onClick={() => {
            navigation("/breadtest/testmain");
          }}
        >
          다시하기
        </button>
        <button className="btn" onClick={빵저장}>
          담아놓기
        </button>
      </div>
    </div>
  );
}

function BreadTest() {
  const navigation = useNavigate();

  const [dispatch, setDispatchType] = React.useState({
    code: null,
    params: null,
  });

  const [urbread, setUrBread] = React.useState([
    {
      유명: 0,
      건강: 0,
      달: 0,
      칼: 0,
      페스: 0,
    },
    {
      제일: 0,
      안느끼: 0,
      짭짤: 0,
    },
    {
      건강건강: 0,
      달달: 0,
    },
    {
      쫀득: 0,
      크림: 0,
      디단: 0,
      달유명: 0,
    },
    {
      칼밥: 0,
      칼고로케: 0,
    },
    {
      양많: 0,
      양적: 0,
    },
  ]);

  let [page, setPage] = React.useState(1);

  React.useEffect(() => {
    switch (dispatch.code) {
      case "답변":
        const cloneBread = [...urbread];
        const findIndex = cloneBread.findIndex((item) => {
          return item[dispatch.params.value] !== undefined;
        });

        cloneBread[findIndex][dispatch.params.value] += 1;
        setUrBread(cloneBread);

        const nextPage = (page += 1);
        setPage(nextPage);

        localStorage.setItem("URBREAD", JSON.stringify(cloneBread));
        localStorage.setItem("PAGE", nextPage);

        if (nextPage === 5) {
          navigation("/breadtest/result", {
            state: urbread,
          });
        } else {
          navigation(`/breadtest/teston${nextPage}`);
        }
        break;

      case "임시저장":
        const 기억되어있는URBREAD = localStorage.getItem("URBREAD");
        const 기억되어있는PAGE = localStorage.getItem("PAGE");

        if (기억되어있는PAGE === "5") {
          localStorage.removeItem("URBREAD");
          localStorage.removeItem("PAGE");
          return;
        }

        if (기억되어있는URBREAD && 기억되어있는PAGE) {
          const 기억되어있는URBREAD배열 = JSON.parse(기억되어있는URBREAD);

          setUrBread(기억되어있는URBREAD배열);
          setPage(Number(기억되어있는PAGE));
          navigation(`/breadtest/teston${기억되어있는PAGE}`);
        }

        break;

      default:
        break;
    }
  }, [dispatch]);

  return (
    <StoreContext.Provider value={{ setDispatchType }}>
      <Routes>
        <Route exact path="/testmain" element={<TestMain />} />
        <Route exact path="/teston1" element={<TestOn1 />} />
        <Route exact path="/teston2" element={<TestOn2 />} />
        <Route exact path="/teston3" element={<TestOn3 />} />
        <Route exact path="/teston4" element={<TestOn4 />} />
        <Route exact path="/teston5" element={<TestOn5 />} />
        <Route exact path="/teston6" element={<TestOn6 />} />
        <Route exact path="/result" element={<Result />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default BreadTest;

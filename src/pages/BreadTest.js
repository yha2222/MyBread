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
    <div className="result-img">
      <imag src={props.image} alt="온보딩이미지" />
    </div>
  );
};

function TestMain() {
  const navigation = useNavigate();

  return (
    <div className="container">
      <div className="screen">
        <img
          src="https://cdn.imweb.me/thumbnail/20220722/f3df23d953ade.png"
          alt="메인이미지"
        />
        <div className="screen__content">
          <form className="login">
            <button
              className="button login__submit"
              type="button"
              onClick={() => {
                navigation("/breadtest/test");
              }}
            >
              <span className="button__text">시작하기</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function TestOn() {
  const navigation = useNavigate();

  const [bread, setBread] = React.useState([
    {
      name: "유명",
      active: false,
      item: [
        {
          clicked: false,
          name: "제일 유명",
        },
        {
          clicked: false,
          name: "안 느끼",
        },
        {
          clicked: false,
          name: "짭짤",
        },
      ],
    },
    {
      name: "건강",
      active: false,
      item: [
        {
          clicked: false,
          name: "건강건강",
        },
        {
          clicked: false,
          name: "달달",
        },
      ],
    },
    {
      name: "달달",
      active: false,
      item: [
        {
          clicked: false,
          name: "쫀득",
        },
        {
          clicked: false,
          name: "크림",
        },
        {
          clicked: false,
          name: "제일 달달",
        },
        {
          clicked: false,
          name: "유명",
        },
      ],
    },
    {
      name: "칼칼",
      active: false,
      item: [
        {
          clicked: false,
          name: "밥",
        },
        {
          clicked: false,
          name: "고로케",
        },
      ],
    },
    {
      name: "페스츄리",
      active: false,
      item: [
        {
          clicked: false,
          name: "양 많음",
        },
        {
          clicked: false,
          name: "양 적음",
        },
      ],
    },
  ]);

  return (
    <div className="container">
      <div className="screen">
        {bread.map((item, index) => {
          const activeClass = item.active === true ? "active-menu" : "";
          const result = "";

          return (
            <div className="social-icons" key={`bread-${index}`}>
              <button
                className={`social-login__icon ${activeClass}`}
                onClick={() => {
                  const newBread = [...bread].map((item, _index) => {
                    item.active = _index === index ? true : false;
                    return item;
                  });
                  setBread(newBread);
                }}
              >
                {item.name}
              </button>

              {item.active === true &&
                item.item.map((자식, sIndex) => {
                  const activeClass =
                    자식.clicked === true ? "active-menu" : "";

                  return (
                    <div className="social-icons" key={`bread-자식-${sIndex}`}>
                      <button
                        className={`social-login__icon ${activeClass}`}
                        onClick={() => {
                          const cloneBread = [...bread];

                          const findIndex = cloneBread.findIndex((item) => {
                            return item.active === true;
                          });

                          cloneBread[findIndex].item = cloneBread[
                            findIndex
                          ].item.map((item, index) => {
                            item.clicked = sIndex === index ? true : false;
                            return item;
                          });

                          setBread(cloneBread);
                        }}
                      >
                        {자식.name}
                      </button>
                    </div>
                  );
                })}
            </div>
          );
        })}

        <button
          className="login__submit"
          type="button"
          style={{ marginTop: 50 }}
          onClick={() => {
            console.log(bread);
            navigation("/breadtest/result");
          }}
        >
          <span className="button__text">추천보기</span>
          <i className="button__icon fas fa-chevron-right"></i>
        </button>
      </div>
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

      if (response.data.code === "success") {
        navigation("/Login");
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

  let [page, setPage] = React.useState(1);

  return (
    <StoreContext.Provider value={{ setDispatchType }}>
      <Routes>
        <Route exact path="/main" element={<TestMain />} />
        <Route exact path="/test" element={<TestOn />} />
        <Route exact path="/result" element={<Result />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default BreadTest;

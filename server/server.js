const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");
const db = mysql.createPoolCluster();

const app = express();
const port = 4000;

const breads = [
  {
    name: "튀김소보로",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG01.png",
    urbread: "유명제일",
  },
  {
    name: "판타롱부추빵",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG04.png",
    urbread: "유명안느끼",
  },
  {
    name: "명란바게트",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG24.png",
    urbread: "유명짭짤",
  },
  {
    name: "맷돌로갈은통밀빵",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG93.jpg",
    urbread: "건강건강건강",
  },
  {
    name: "월넛브래드",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG23.png",
    urbread: "건강달달",
  },
  {
    name: "토요빵",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG20.png",
    urbread: "달쫀득",
  },
  {
    name: "성심순크림빵",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG34.jpg",
    urbread: "달크림",
  },
  {
    name: "카카오순정",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG19.png",
    urbread: "달디단",
  },
  {
    name: "초코튀소",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/2020267652648880.png",
    urbread: "달달유명",
  },
  {
    name: "김치쌀밥주먹밥",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG61.jpg",
    urbread: "칼칼밥",
  },
  {
    name: "새우를낙지",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG64.jpg",
    urbread: "칼칼고로케",
  },
  {
    name: "보문산메아리",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/middle/IMG71.jpg",
    urbread: "페스양많",
  },
  {
    name: "작은메아리",
    content:
      "https://www.sungsimdangmall.co.kr/data/sungsimdang/goods/sungsimdang/small/IMG72.jpg",
    urbread: "페스양적",
  },
];

app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

db.add("my-bread", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "my-bread",
  port: 3306,
});

function 디비실행(query) {
  return new Promise(function (resolve, reject) {
    db.getConnection("my-bread", function (error, connection) {
      if (error) {
        console.log("디비 연결 오류", error);
        reject(true);
      }

      connection.query(query, function (error, data) {
        if (error) {
          console.log("쿼리 오류", error);
          reject(true);
        }

        resolve(data);
      });

      connection.release();
    });
  });
}

app.get("/urBread", (req, res) => {
  let result = "";
  const bread = req.query;

  for (let key in bread) {
    const value = bread[key];

    //배열 중에 숫자 올라간 거 result에 저장 => 문장 완성
    const most = Object.values(value);

    if (most) console.log(most);
  }

  const [빵결과] = breads.filter((item) => {
    return item.bread === result;
  });

  res.send(빵결과);
  console.log(빵결과);
});

app.get("/myBreadList", async (req, res) => {
  const query = `SELECT * FROM mybreadlist, user WHERE myBread.id = user.id`;

  const mybread = await 디비실행(query);

  res.send(mybread[0]);
});

app.get("/article_row", async (req, res) => {
  const { seq } = req.query;

  const query = `SELECT * FROM article WHERE seq = '${seq}'`;
  const article = await 디비실행(query);

  const reply_query = `SELECT * FROM reply WHERE seq = '${seq}'`;
  const reply = await 디비실행(reply_query);

  res.send({
    article: article[0],
    reply: reply,
  });
});

app.get("/article", async (req, res) => {
  const query = `SELECT * FROM article, user WHERE article.user_seq = user.seq`;

  const article = await 디비실행(query);

  res.send(article[0]);
});

app.get("/", (req, res) => {
  res.send("메인페이지");
});

app.post("/autoLogin", (req, res) => {
  res.send(req.session.loginUser);
});

app.post("/login", async (req, res) => {
  const { id, pw } = req.body;

  const result = {
    code: "success",
    message: "로그인 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }
  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(
    `SELECT * FROM user WHERE id='${id}' AND password='${pw}'`
  );

  if (user.length === 0) {
    result.code = "fail";
    result.message = "아이디가 존재하지 않습니다.";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  req.session.loginUser = user[0];
  req.session.save();

  res.send(result);
});

app.post("/join", async (req, res) => {
  const { id, nickname, pw } = req.body;

  const result = {
    code: "success",
    message: "회원가입 되었습니다.",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }
  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await 디비실행(`SELECT * FROM user WHERE id='${id}'`);

  if (user.length > 0) {
    result.code = "fail";
    result.message = "이미 동일한 아이디가 존재합니다.";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  await 디비실행(
    `INSERT INTO user(id, password, nickname) VALUES('${id}', '${pw}', '${nickname}')`
  );

  res.send(result);
});

app.post("/write", async (req, res) => {
  const { title, body } = req.body;
  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다.",
  };

  if (title === "") {
    result.code = "fail";
    result.message = "제목을 작성해주세요";
  }
  if (body === "") {
    result.code = "fail";
    result.message = "내용을 작성해주세요.";
  }
  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO article(title, body, user_seq) VALUES('${title}','${body}','${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});

app.post("/reply", async (req, res) => {
  const { loginUser } = req.session;
  const { replyText, seq } = req.body;
  const result = {
    code: "success",
    message: "댓글이 작성되었습니다.",
  };

  if (replyText === "") {
    result.code = "error";
    result.message = "댓글을 입력해주세요.";
  }

  if (result.code === "error") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO reply(body, seq, user_seq) VALUE('${replyText}', '${seq}', '${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});

app.post("/keepBread", async (req, res) => {
  const { loginUser } = req.session;
  const { bread } = req.body;

  const result = {
    code: "success",
    message: "저장되었습니다",
  };

  const query = `INSERT INTO mybreadlist(user_seq, bread) VALUES('${loginUser.seq}','${bread}')`;

  await 디비실행(query);

  res.send(result);
});

app.listen(port, () => {
  console.log("서버가 시작되었습니다.");
});

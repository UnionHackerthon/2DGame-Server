const express = require('express');
const app = express();

let users = [];

app.use(express.json());

app.get('/', (req, res) => res.send('Server Running'));

app.post('/score', (req, res) => {
  const { id, score } = req.body;

  let result = {
    cmd: -1,
    message: '',
  };

  let user = users.find((x) => x.id == id);

  if (user === undefined) {
    users.push({ id, score });

    result.cmd = 1001;
    result.message = '점수가 신규 등록되었습니다.';
  } else if (score > user.score) {
    user.score = score;
    result.cmd = 1002;
    result.message = '점수가 갱신 되었습니다.';
  } else {
    result.cmd = 1003;
  }

  console.log(users);
  res.send(result);
});

app.get('/score/:id', (req, res) => {
  console.log('id: ' + req.params.id);
  let user = users.find((x) => x.id == req.params.id);
  if (user === undefined) {
    res.send({
      cmd: 1103,
      message: '잘못된 id입니다.',
    });
  } else {
    res.send({
      cmd: 1102,
      message: '',
      result: user,
    });
  }
});

app.listen(3000, () => {
  console.log('Server Running at 3000 Port');
});

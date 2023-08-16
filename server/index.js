const express = require("express");
const {generateAccessToken, verifyToken, validateToken} = require("./Jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

//SOCKET . IO

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});


let ary = [
  {
    user: "admin",
    pass: "$2b$10$SahRFJ5J9rJ2greAhj0w5uhIAwLJbfSlaH7HYNdDC.9ZgTRDwSv1y",
  },
  {
    user: "guest",
    pass: "rest",
  },
];

// app.get("/", (req, res) => {
//   res.json({ ok: "I am server" });
//   console.log(ary);
// });

// FOR REGISTERATION
app.post("/registering", bodyParser.json(), (req, res) => {
  //const {user, pass} = req.body;
  const user = req.body?.user;
  const pass = req.body?.pass;
  try {
    console.log({ user, pass });
    //console.log(req);
    if (
      ary.find((element) => {
        return element.user === user.toString();
      })
    ) {
      console.log("user already exists");
      res.json({ key: false });
    } else {
      // Using bcrypt to hash password
      bcrypt.hash(pass, 10).then( (hash) => {
        ary.push({
          user: user,
          pass: hash,
        });
      }).then(res.json({ key: true })).catch((e)=>{
        if(e){
          res.json({error: e});
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e.message);
    res.json({ false: "error in backend" });
  }
});

// FOR LOGIN
app.post("/login", bodyParser.json(), (req, res) => {
  console.log(ary);
  const user = req.body?.user;
  const pass = req.body?.pass;

  try {
    const result = ary.find((ary) => {return ary.user === user});
    if(!result) {
      res.json({login: false, error: "user doesnot exists"});
    }
    else {
      bcrypt.compare(pass, result.pass).then((match) => {
        if(!match) {
          res.json({login: false, error: "wrong password"});
        }
        else {
        const token = generateAccessToken(user);
        //console.log(token_secret);
        res.cookie("access_token", token, {maxAge: 2*60*60*1000});  
        res.json({login: true, token: token});
        }
      })
    }
    
  } catch (e) {
    console.log(e);
  }
});

// profile test
app.get('/profile', validateToken, (req, res) => {
  console.log("profile called");
  res.json(req.user.data);
}); 

// FIND OPPONENT
app.get('/rival/:name', validateToken, (req, res) => {
  const user = req.params.name;
  console.log(user);
  res.json({ message: "rival api is working smoothly today"});
});

app.get('/setcookie', (req, res) => {
  const token = generateAccessToken("Mitthu_Parrot");
  res.cookie("access_token", token, {maxAge: 2*60*60*1000});
  //res.cookie(`Cookie sent by setcookie`,`I have sent this cookie for testing purpose`);
  res.send('Cookie have been saved successfully');
});

app.get("/greet/:name", (req, res) => {
  res.json({ greeting: `Hello ${req.params.name}` });
});


//  verification of token
app.get("/auth/:token" ,bodyParser.json() , (req, res) =>{
  try{
    if(req.params.token) {
      const decode = verifyToken(req.params.token);
      console.log(decode);
      res.json({ verify: true, decode: decode });
    }
    else {
      res.json({ verify: false, decode: "error"});
    }
  }
  catch(e) {
    res.json({verify: false});
  }
});

// SOCKET DOT IO
io.on('connection', (socket) => {

  socket.on("search", (data) => {
    console.log("this player " + data.rival);
    // we cant send challenge to specific people right now. (work in progress) 
    //socket.to(rival).emit("searchPlayer", socket.id, "challenge");
    socket.broadcast.emit("searchPlayer", data);
  });

});
server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// ===> PACKAGES <===
let express = require("express");
let cors = require("cors");
let app = express();
let UserModel = require("./database/schema/UserSchema");
let mongoDBConnection = require("./database/connection/connectDB");

// ===> MIDDLEWARES <===
app.use(cors()); // CORS-ORIGIN
app.use(express.json()); // BODY-PARSER

// ===> POST DATA TO THE mongoDB DATABASE <===
app.post("/create-user", (req, res) => {
  UserModel.create(req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
});
// ===> GET ALL DATA FROM mongoDB DATABASE <===
app.get("/", (req, res) => {
  UserModel.find({})
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.status(404).json(err));
});

// ===> GET SINGLE DATA FOR UPDATE <===
app.get("/get-single-user/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});
// ===> UPDATE DATA AND POST IT TO THE mongoDB SERVER <===
app.put("/update-user/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    }
  )
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(404).json(err));
});

// ===> DELETE USER FROM DATABASE <===
app.delete("/delete-user/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((user) => res.status(204).json(user))
    .catch((err) => res.status(404).json(err));
});

// ===> SERVER LISTENING <===
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

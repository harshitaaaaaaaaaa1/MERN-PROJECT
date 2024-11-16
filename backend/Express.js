let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let axios = require("axios");
let cors = require("cors");
let multer = require("multer");
let path = require("path"); // Import path for setting up static file directory
let registeredUsers = require("./models/registeredUsers");
let modelEmployeeRegister = require("./models/modelEmployeeRegister");

const PORT = process.env.PORT;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static folder to serve images
app.use("/Images", express.static(path.join(__dirname, "Images")));

mongoose.connect(PORT || 8000);
mongoose.connection
  .once("open", () => {
    console.log("Connected to DB.....");
  })
  .on("error", () => {
    console.log("Problem connecting to DB ..!!!!!");
  });

let storage = multer.diskStorage({
  destination: function (req, image, cb) {
    return cb(null, "./Images"); // Save images in 'Images' folder
  },
  filename: function (req, image, cb) {
    return cb(null, `${image.originalname}`);
  },
});
let upload = multer({ storage });

app.post("/register", (req, res) => {
  registeredUsers
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user !== null) {
        res.json("Email already registered..");
      } else {
        let dataForDB = new registeredUsers(req.body);
        dataForDB
          .save()
          .then(() => res.json("Input stored in DB successfully..."))
          .catch(() =>
            res.json("Data cannot be saved, problem at saving time....")
          );
      }
    })
    .catch(() => res.json("Registration problem..."));
});

app.post("/login", (req, res) => {
  registeredUsers
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user.cnfPassword == req.body.password) {
        res.json({ status: "success", id: user._id });
      } else {
        res.json({ status: "fail" });
      }
    })
    .catch(() => res.json({ status: "noUser" }));
});

app.get("/user/:ID", (req, res) => {
  let ID = req.params.ID;
  registeredUsers
    .findOne({ _id: ID })
    .then((e) => res.json(e.name))
    .catch(() => console.log("Problem at param get users Express.."));
});

app.post("/employees", upload.single("image"), (req, res) => {
  modelEmployeeRegister
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user !== null) {
        res.json("Email already registered..");
      } else {
        let dataForDB = new modelEmployeeRegister({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          designation: req.body.designation,
          gender: req.body.gender,
          course: req.body.course,
          image: req.file.filename, // Save filename in DB
        });
        dataForDB
          .save()
          .then(() => res.json("Input stored in DB successfully..."))
          .catch(() =>
            res.json("Data cannot be saved, problem at saving time....")
          );
      }
    })
    .catch(() => res.json("Registration problem..."));
});

app.get("/employee-list", (req, res) => {
  modelEmployeeRegister.find().then((e) => {
    res.send(e);
  });
});

app.get("/employee-list/:ID", (req, res) => {
  let ID = req.params.ID;
  modelEmployeeRegister
    .findOne({ _id: ID })
    .then((e) => res.send(e))
    .catch(() => res.send("Employee not found"));
});

app.put("/employee-list/:ID", upload.single("image"), (req, res) => {
  let ID = req.params.ID;
  modelEmployeeRegister
    .updateOne({ _id: ID }, req.body)
    .then(() => res.send("Successfully updated data"))
    .catch(() => res.send("Error at update API"));
});

app.delete("/employee-list/:ID", (req, res) => {
  let ID = req.params.ID;
  modelEmployeeRegister
    .deleteOne({ _id: ID })
    .then(() => res.send("User deleted.."))
    .catch(() => res.send("Problem at deletion.."));
});

app.listen(4001, () => {
  console.log("Server listening at 4001....");
});

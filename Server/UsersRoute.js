const router = require("express").Router();
const User = require("./UsersSchema");

router.post("/add", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      status: "Pending",
    });
    var data = await user.save();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.get("/search", async (req, res) => {
  User.find({}, function (err, list) {
    if (err) {
      res.json("Error");
    }
    res.json(list);
  });
});

router.get("/todo", (req, res) => {
  const searchField = req.query.name;
  User.find({ name: { $regex: searchField, $options: "$i" } }).then((data) => {
    res.json(data);
  })
  .catch((error) => console.error(error));
});

router.get("/status", (req, res) => {
  const searchField = req.query.status;
  User.find({ status: { $regex: searchField, $options: "$i" } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
});

router.put("/status/:id", (req, res) => {
  const id = { _id: req.params.id };
  const update = { status: req.body.status };
  User.findOneAndUpdate(id, update, {
    returnOriginal: false,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log("delete id", id);
  User.deleteOne({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
});

module.exports = router;

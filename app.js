const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi nullam vehicula ipsum a arcu. Blandit turpis cursus in hac habitasse. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Velit dignissim sodales ut eu sem integer vitae. Sem nulla pharetra diam sit amet nisl. Sed libero enim sed faucibus turpis in eu. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Augue eget arcu dictum varius. Sem et tortor consequat id porta. Amet purus gravida quis blandit turpis cursus in hac. Tortor condimentum lacinia quis vel eros donec. Dolor sit amet consectetur adipiscing elit duis. Id semper risus in hendrerit gravida rutrum. Phasellus vestibulum lorem sed risus. Faucibus vitae aliquet nec ullamcorper sit amet.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

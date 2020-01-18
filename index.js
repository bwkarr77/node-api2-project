// implement your API here
// yarn add express
const express = require("express"); //imports the express package
const cors = require("cors"); // installs cors

const Data = require("./data/db.js"); //import the data file
const server = express(); //creates express application using express module.

server.use(express.json());
server.use(cors());

const port = 5000;
server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));

// =======================
//     POST REQUEST
// =======================
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    //cancel the request, return 400
    res
      .status(400) //Bad request
      .json({ errorMessage: "Please provide title and contents for the post" });
  } else {
    //valid user -> save the new user to the database
    Data.insert(req.body)
      .then(post => {
        res
          .status(201) //created user
          .json(post); //return new created user document
      })
      .catch(() => {
        res
          .status(500) //server error
          .json({
            error: "There was an error while saving the post to the database"
          });
      });
  }
});
//==========================(still needs work)
server.post("/api/posts/:id/comments", (req, res) => {
  const { post } = req.body;
  const { id } = req.params;
  console.log("...comments:", req.params, req.body);
  if (!req.body) {
    res
      .status(400) //Bad Request
      .json({ errorMessage: "Please provide text for the comment" });
  } else {
    Data.findPostComments(id)
      .then(comment => {
        console.log("findPostComments(id):", comment);
        if (!comment) {
          res
            .status(404) //Not Found
            .json({
              message: "The post with that specified ID does not exist"
            });
        } else if (comment) {
          //cancel the request, return 400
          Data.insertComment(req.body)
            .then(post => {
              res
                .status(201) //created user
                .json(post); //return new created user document
            })
            .catch(() => {
              res
                .status(500) //server error
                .json({
                  error:
                    "There was an error while saving the post to the database"
                });
            });
        }
      })
      .catch(() => {
        res.status(500).json({ error: "There is another error..." });
      });
  }
});

// ============================
//        GET REQUESTS
// ============================
server.get("/api/posts", (req, res) => {
  //Trying to attach comments to the user object.........
  Data.find()
    .then(user => {
      console.log("/api/posts>Data.find()");
      user.map((each, index) => {
        let commentArr = [];
        Data.findPostComments(each.id)
          .then(comments => {
            comments.map((comment, index) => {
              commentArr.push(comment.text);
            });
            user[each.id].text = commentArr;
            // console.log("commentArr:", user[each.id]);
          })
          .catch(e => console.log("no comments"));
      });
      // console.log("pre...", user);
      res
        .status(200) //successful get user info
        .json(user); //return user info
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({
          errorMessage: "The posts information could not be retrieved."
        });
    });
});
server.get("/api/posts/:id", (req, res) => {
  // console.log("server.get.id:", req.params); //gives id number
  Data.findById(req.params.id)
    .then(user => {
      console.log("testing", user[0]); //returns object with: id, title, contents
      if (user) {
        res
          .status(200) //successful get user info
          .json(user[0]); //return user.id info
      } else {
        res
          .status(404) //user not found
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "The post information could not be retrieved." });
    });
});
//
server.get("/api/posts/:id/comments", (req, res) => {
  var commentArr = [];
  Data.findPostComments(req.params.id)
    .then(comments => {
      if (!comments || comments.length < 1) {
        res
          .status(404) //bad!!
          .json({ message: "This ID has no comments." });
      } else {
        comments.map((comment, index) => {
          commentArr.push(comment.text);
        });
        res
          .status(200) //success
          .json(commentArr); //return comments
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({
          errorMessage: "Comments information could not retrieve."
        });
    });
});

server.get("/api/posts/:id", (req, res) => {
  Data.findById(req.params.id)
    .then(user => {
      if (user) {
        res
          .status(200) //successful get user info
          .json(user); //return user.id info
      } else {
        res
          .status(404) //user not found
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// ======================
//       DELETE
// ======================
server.delete("/api/posts/:id", (req, res) => {
  Data.remove(req.params.id)
    .then(users => {
      if (users && users > 0) {
        res
          .status(200) //successful user find
          .json({ message: "The user was deleted." });
      } else {
        res
          .status(404) //user not found
          .json({ message: "The user with that specific ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "The user could not be removed." });
    });
});

// ================
//       PUT
// ================
server.put("/api/posts/:id", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400) //Bad request
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Data.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res
            .status(200) //successfully updated user info
            .json(user); //return the updated information
        } else {
          res
            .status(404) //user NOT found
            .json({
              message: "The user with the specified ID does not exist."
            });
        }
      })
      .catch(() => {
        res
          .status(500) //server error
          .json({ errorMessage: "The user information could not be modified" });
      });
  }
});

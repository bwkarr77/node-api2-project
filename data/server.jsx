const express = require("express");
const hubsRouter = require(".hubs/hubs-router.jsx");
const messagesRouter = require("./messages/messages-router.jsx");
const server = express();

server.use(express.json());

server.use("/api/hubs", hubsRouter);
server.use("/repos", hubsRouter);
server.use("/thing/otherthing", hubsRouter);

server.use("/api/messages", messagesRouter);

server.get("/", (req, res) => {
  res.send(`
        <h2>Lambda Hubs API</h2>
        <p>Welcome</p>
    `);
});

//export server
module.exports = server;

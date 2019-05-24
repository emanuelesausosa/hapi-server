const Hapi = require("hapi");

const Server = new Hapi.Server();

// set connection config
Server.connection({ port: 3000, host: "localhost" });
Server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`> server running at ${Server.info.uri}`);
});

//

const Hapi = require("@hapi/hapi");
const route = require("./routes");

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });

    server.route(route);

    await server.start();
    console.log(`Server is running on ${server.info.uri}`);
};

init();

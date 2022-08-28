const Hapi = require("@hapi/hapi");
const notesRoutes = require("./src/notesRoutes");

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    server.route(notesRoutes);

    await server.start();

    console.log(`Server is running on ${server.info.uri}`);
};

init();

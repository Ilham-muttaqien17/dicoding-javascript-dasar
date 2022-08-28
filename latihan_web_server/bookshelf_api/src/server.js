const Hapi = require('@hapi/hapi');
const booksRoute = require('./booksRoute');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(booksRoute);

  server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

init();

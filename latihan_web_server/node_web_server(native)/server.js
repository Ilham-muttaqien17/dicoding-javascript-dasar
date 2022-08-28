const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Powered-By", "NodeJS");

    // Get request method
    const { method } = req;

    // Get route
    const { url } = req;

    if (url === "/") {
        if (method === "GET") {
            res.statusCode = 200;
            res.end(
                JSON.stringify({
                    message: `Ini adalah homepage`,
                })
            );
        } else {
            res.statusCode = 400;
            res.end(
                JSON.stringify({
                    message: `Halaman tidak dapat diakses dengan ${method} request`,
                })
            );
        }
    } else if (url === "/about") {
        if (method === "GET") {
            res.statusCode = 200;

            res.end(
                JSON.stringify({
                    message: `Halo! Ini adalah halaman about`,
                })
            );
        } else if (method === "POST") {
            let body = [];

            req.on("data", (chunk) => {
                body.push(chunk);
            });

            req.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = body;
                res.statusCode = 200;
                res.end(
                    JSON.stringify({
                        message: `Halo, ${name}! Ini adalah halaman about`,
                    })
                );
            });
        } else {
            res.statusCode = 400;

            res.end(
                JSON.stringify({
                    message: `Halaman tidak dapat diakses dengan ${method} request`,
                })
            );
        }
    } else {
        res.statusCode = 404;
        res.end(
            JSON.stringify({
                message: `Halaman tidak ditemukan!`,
            })
        );
    }

    // if (method === "GET") {
    //     console.log(method);
    //     res.end("<h1>Diakses dengan menggunakan method GET</h1>");
    // }

    // if (method === "POST") {
    //     let body = [];

    //     // Get request body using event
    //     req.on("data", (chunk) => {
    //         body.push(chunk);
    //     });

    //     req.on("end", () => {
    //         body = Buffer.concat(body).toString();
    //         const { nama } = JSON.parse(body);
    //         console.log("Halo, ", nama);
    //         res.end("<h1>Diakses dengan menggunakan method POST</h1>");
    //     });
    // }

    // if (method === "PUT") {
    //     console.log(method);
    //     res.end("<h1>Diakses dengan menggunakan method PUT</h1>");
    // }

    // if (method === "DELETE") {
    //     console.log(method);
    //     res.end("<h1>Diakses dengan menggunakan method DELETE</h1>");
    // }
});

server.listen(3000, "localhost", () => {
    console.log(`Server is running!`);
});

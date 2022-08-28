const route = [
    {
        path: "/",
        method: "GET",
        handler: (req, res) => {
            return "Homepage";
        },
    },
    {
        method: "*",
        path: "/",
        handler: (req, res) => {
            return "Halaman tidak dapat diakses dengan method tersebut";
        },
    },
    {
        path: "/about",
        method: "GET",
        handler: (req, res) => {
            return "About";
        },
    },
    {
        method: "*",
        path: "/about",
        handler: (req, res) => {
            return "Halaman tidak dapat diakses dengan method tersebut";
        },
    },
    {
        method: "*",
        path: "/{any*}",
        handler: (req, res) => {
            return "Halaman tidak ditemukan";
        },
    },
    {
        method: "GET",
        path: "/hello/{name?}",
        handler: (req, res) => {
            // Get params from path
            const { name = "stranger" } = req.params;
            // Get query from path
            const { lang } = req.query;

            if (lang == "id") {
                return `Halo, ${name}`;
            }
            return `Hello, ${name}!`;
        },
    },
    {
        method: "POST",
        path: "/login",
        handler: (req, res) => {
            // Get body/payload request
            const { username } = req.payload;

            return `Kamu mengirimkan data berupa ${username}`;
        },
    },
    {
        method: "POST",
        path: "/users",
        handler: (req, res) => {
            const { username } = req.payload;

            return res.response("created").code(200);
        },
    },
];

module.exports = route;

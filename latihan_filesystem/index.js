const fs = require("fs");
const path = require("path");

// Membaca sebuah berkas/file secara keseluruhan kemudian mengembalikan isinya
// readFile -> Asyncronous
// readFileSync -> Syncronous
fs.readFile(path.resolve(__dirname, "notes.txt"), "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

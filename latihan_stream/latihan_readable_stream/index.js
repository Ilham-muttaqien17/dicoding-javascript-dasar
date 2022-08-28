const fs = require("fs");
const path = require("path");

// createReadStream -> membaca berkas/file secara perbagian
const readableStream = fs.createReadStream(
    path.resolve(__dirname, "article.txt"),
    {
        highWaterMark: 10, // Ukuran buffer -> Berkas akan dibaca sejumlah ukuran buffer (1 Byte = 1 Karakter)
    }
);

readableStream.on("readable", () => {
    try {
        process.stdout.write(`[${readableStream.read()}]`);
    } catch (err) {
        console.log(err.message);
    }
});

readableStream.on("end", () => {
    console.log("Done");
});

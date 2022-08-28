const fs = require("fs");

const writeableStream = fs.createWriteStream("output.txt");

writeableStream.write("Test, Hallo saya Ilham\n");

writeableStream.end("Ini adalah teks terakhir");

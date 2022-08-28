const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (req, res) => {
    const { title, tags, body } = req.payload;
    const noteId = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title,
        tags,
        body,
        noteId,
        createdAt,
        updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.noteId === noteId).length > 0;

    if (isSuccess) {
        const response = res
            .response({
                status: "success",
                message: "Catatan berhasil ditambahkan",
                data: {
                    noteId: noteId,
                },
            })
            .code(201);
        return response;
    }

    const response = res
        .response({
            status: "fail",
            message: "Catatan gagal ditambahkan",
        })
        .code(500);
    return response;
};

const getNotesHandler = (req, res) => {
    const response = res
        .response({
            status: "success",
            data: { notes },
        })
        .code(200);

    return response;
};

const getNoteById = (req, res) => {
    const { id } = req.params;

    const note = notes.filter((note) => note.noteId === id)[0];

    if (note) {
        const response = res
            .response({
                status: "success",
                data: {
                    note,
                },
            })
            .code(200);

        return response;
    }

    const response = res
        .response({
            status: "fail",
            message: "Catatan tidak ditemukan!",
        })
        .code(404);

    return response;
};

const updateNotesById = (req, res) => {
    const { id } = req.params;

    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.noteId === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateNotesById,
        };

        const response = res
            .response({
                status: "success",
                message: "Catatan berhasil diperbarui",
            })
            .code(200);

        return response;
    }

    const response = res
        .response({
            status: "fail",
            message: "Catatan gagal diperbarui, id tidak ditemukan",
        })
        .code(404);

    return response;
};

const deleteNoteById = (req, res) => {
    const { id } = req.params;

    const index = notes.findIndex((note) => note.noteId === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = res
            .response({
                status: "success",
                message: "Catatan berhasil dihapus",
            })
            .code(200);

        return response;
    }

    const response = res
        .response({
            status: "fail",
            message: "Catatan gagal dihapus, id tidak ditemuka",
        })
        .code(404);

    return response;
};

module.exports = {
    addNoteHandler,
    getNotesHandler,
    getNoteById,
    updateNotesById,
    deleteNoteById,
};

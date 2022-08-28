const {
    addNoteHandler,
    getNotesHandler,
    getNoteById,
    updateNotesById,
    deleteNoteById,
} = require("./notesHandler");

const route = [
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler: getNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteById,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: updateNotesById,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteById,
    },
];

module.exports = route;

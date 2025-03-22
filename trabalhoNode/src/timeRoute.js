const timeController = require("./timeController");

module.exports = (app) => {
    app.post("/time", timeController.post);
    app.put("/time/:id", timeController.put);
    app.delete("/time/:id", timeController.delete);
    app.get("/time", timeController.get);
    app.get("/time/:id", timeController.getById);
    app.get("/time/pesquisa/:pesquisa", timeController.getPesquisa);
}
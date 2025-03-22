async function connect() {
    if (global.connection && global.connection.state != "disconnect") {
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '54.91.193.137', user: 'libertas',
            password: '123456', database: 'libertas5per'
        }
    );
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO time_futebol (nome, cidade, estado, fundacao, estadio) VALUES (?, ?, ?, ?, ?)";
    const values = [req.body.nome, req.body.cidade, req.body.estado, req.body.fundacao, req.body.estadio];
    await conn.query(sql, values);

    res.status(201).send("OK");
}

exports.put = async (req, res, next) => {
    const conn = await connect();
    const sql = "UPDATE time_futebol SET nome = ?, cidade = ?, estado = ?, fundacao = ?, estadio = ? WHERE idtime = ?";
    const values = [req.body.nome, req.body.cidade, req.body.estado, req.body.fundacao, req.body.estadio, req.params.id];
    await conn.query(sql, values);
    res.status(201).send("OK");
}

exports.delete = async (req, res, next) => {
    const conn = await connect();
    const sql = "DELETE FROM time_futebol WHERE idtime = ?";
    const values = [req.params.id];
    await conn.query(sql, values);
    res.status(200).send("OK");
}

exports.get = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM time_futebol");
    res.status(200).send(rows);
}

exports.getById = async (req, res, next) => {
    const conn = await connect();
    const [rows] = await conn.query("SELECT * FROM time_futebol WHERE idtime = ?", [req.params.id]);

    if (rows == null || rows.length == 0) { 
        res.status(404).send("Not Found");
    } else {
        res.status(200).send(rows);
    }
}

exports.getPesquisa = async (req, res, next) => {
    const conn = await connect();
        const termoPesquisa = `%${req.params.pesquisa.trim().toUpperCase()}%`; 
        const [rows] = await conn.query(
            "SELECT * FROM time_futebol WHERE UPPER(TRIM(nome)) LIKE ?",
            [termoPesquisa]
        );

    if (rows == null || rows.length == 0) { 
        res.status(404).send("Not Found");
    } else {
        res.status(200).send(rows);
    }
}

const mysql = require('mysql') //usado para acessar as querys e o mysql

function execSQLQuery(sqlQry, res) {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cmeidb'
    })

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou');
    });
}

module.exports = execSQLQuery;
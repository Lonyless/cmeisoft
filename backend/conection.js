const mysql = require('mysql') //usado para acessar as querys e o mysql

function execSQLQuery(sqlQry, res) {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'comercial',
        port: 3306,
        password: 'pgcadmin',
        database: 'cmeidb'
    })

    connection.query(sqlQry, function (error, results, fields) {
        if (res != null) {
            console.log("dif null")
            if (error)
                res.json(error);
            else
                res.json(results);
                console.log(results)
        }
        
       
        connection.end();
        console.log('executou');
    });
}

module.exports = execSQLQuery;
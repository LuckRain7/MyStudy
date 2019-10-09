var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.1.100',
    user: 'root',
    password: 'zhczdata',
    database: 'test'
});

// 进行连接测试 连接成功返回 连接成功
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connect success');
});



/**
 * 封装连接函数
 * @param {*} sql sql语句
 * @param {*} sql_params 数据
 */
function HelloQuery(sql, sql_params) {
    sql_params = sql_params || null;
    connection.query(sql, sql_params, function (err, result) {
        if (err) {
            console.log('[INSERT-ERROR] - ', err.message);
        }
        console.log(result);
    });

}

// * 删除数据 DELETE FROM users WHERE age=3
// HelloQuery('DELETE FROM users WHERE age=3');
// HelloQuery('DELETE FROM users WHERE age=?',[3]);


// * 添加数据
// HelloQuery('INSERT INTO users (name, age) VALUES (\'test3\',3)');
// HelloQuery('INSERT INTO users (name, age) VALUES (?,?)',['test3',3]);

// * 更新数据
// HelloQuery('UPDATE users SET age=5 WHERE name=\'test3\'');
// HelloQuery('UPDATE users SET age=? WHERE name=?',[6,'test3']);


// * 查询数据
HelloQuery('SELECT * FROM users');


// 断开连接
connection.end();



// 此为测试数据
// [ RowDataPacket { name: 'testname', age: 1 },
//   RowDataPacket { name: 'testname2', age: 2 } ]
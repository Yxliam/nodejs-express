
var db = require('./DBconfig').connect('127.0.0.1', 'node', 'root', '');

exports.query = function (sql,sqlParm, callback) {
    callback = callback || function(){};
    db.query(sql, sqlParm,function (err, result) {
        if (err === null) {
            if (isEmptyObject(result)) {
                result = null;
            }
            callback(result);
        }else{
            console.log( err );
        }
    });
}
exports.db = db;

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}
// 响应一个JSON数据
exports.responseJSON = function (msg,code, data) {
    data = data || null;
    code = code  || 1;
    msg = msg   || 'ok';
      return {
          msg : msg,
         code : code,
         data : data

      }
   };
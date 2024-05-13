const db = require("../../db/connect");

// 提交订单
exports.submit_order = (req, res) => {
  const sql = `INSERT INTO orders SET u_id = ${req.query.u_id},a_id = ${req.query.a_id},o_total = ${req.query.o_total},o_time = '${req.query.o_time}',o_content = '${req.query.o_content}',o_state = ${req.query.o_state},notes='${req.query.notes}',orderer = '${req.query.orderer}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(499).json({
        message: err.sqlMessage,
      });
    } else {
      if (req.query.o_state === false) {
        res.send({
          message: "您的订单尚未成功支付",
        });
      } else {
        res.send({
          message: "您的订单已成功提交了!",
        });
      }
    }
  });
};

//统计订单状态数量
exports.o_stateCount = (req, res) => {
  const sql = `SELECT o_state, COUNT(*) AS count FROM orders WHERE u_id = ${req.query.u_id} GROUP BY o_state;`;
  db.query(sql,(err,result)=>{
    if (err) {
      console.log(err);
      res.status(499).json({
        message: err.sqlMessage,
      });
    }else{
      res.send(result)
    }
  })
}


//查找订单
exports.find_orders = (req,res)=>{
  const sql = `SELECT * FROM orders WHERE u_id = ${req.query.u_id}`
  db.query(sql,async(err,result)=>{
    if (err) {
      console.log(err);
      res.status(499).json({
        message: err.sqlMessage,
      });
    }else{
      await result.forEach(item => {
        item.o_content = JSON.parse(item.o_content)
      });
      res.send(result)
    }
  })
}


//删除订单
exports.del_order = (req,res)=>{
  const sql = `DELETE FROM orders WHERE o_id = ${req.query.o_id}`
  db.query(sql,(err,result)=>{
    if (err) {
      console.log(err);
      res.status(499).json({
        message: err.sqlMessage,
      });
    }else{
      res.send({
        message:'删除订单成功!'
      })
    }
  })
}

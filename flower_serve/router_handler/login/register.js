const db = require('../../db/connect')

exports.register = (req,res)=>{
    const sql1 = `INSERT INTO user SET u_phone = '${req.body.u_phone}',u_pwd = '${req.body.u_pwd}'`
    const sql2 = `INSERT INTO user_detail SET u_name = '新用户',u_phone = '${req.body.u_phone}'`
    db.query(`SELECT * FROM user where u_phone = ${req.body.u_phone}`,(err,result)=>{
        if(err){  //数据库语句执行失败
            res.status(500).json({
                message:err.sqlMessage
            })
        }else if(result.length > 0){
            res.status(200).json({
                code:500,
                message:'手机号已注册'
            })
        }else{
            db.query(sql1,(err,result)=>{
                if(err){  //数据库语句执行失败
                    res.status(500).json({
                        message:err.sqlMessage
                    })
                }else{
                    db.query(sql2,(err,result)=>{
                        if(err){  //数据库语句执行失败
                            res.status(500).json({
                                message:err.sqlMessage
                            })
                        }else{
                            res.status(200).json({
                                code:10000,
                                message:'用户注册成功',
                            })
                        }
                    })      
                }
            })
        }
    })
    
    
}
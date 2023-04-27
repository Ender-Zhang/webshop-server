import express from 'express';
const router = express.Router({});

import db from './../db/sqlite';
// import conn from './../db/db';
import config from '../src/config';
import sms_util from './../util/sms_util';

import svgCaptcha from 'svg-captcha';
import md5 from 'blueimp-md5';
import formidable from 'formidable';
import {basename} from 'path';

const S_KEY = '@WaLQ1314?.LqFtK.Com.#'; // 盐
const users = {}; // 用户信息
let tmp_captcha = '';

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log(md5(md5("admin") + S_KEY));
    res.render('index', {title: '医药商城'});
});

/**************************************** 前台商城 ****************************************** */
/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res) => {
    let sqlStr = 'SELECT * FROM homecasual';
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '请求轮播图数据失败'});
    //         console.log(error);
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         res.json({success_code: 200, message: results});
    //     }
    // });
    db.serialize(() => {
        // 添加数据
        // db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        // db.run(`INSERT INTO users (name) VALUES ('John')`);
        db.all(sqlStr, [], (err, rows) => {
          if (err) {
            console.error(err.message);
            res.json({err_code: 0, message: '请求轮播图数据失败'});
          } else {
            console.log(rows);
            res.json({success_code: 200, message: rows});
          }
        });
      });
});

/**
 * 获取商品分类数
 */
router.get('/api/category', (req, res) => {
    let sqlStr = 'SELECT * FROM category';
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '请求商品分类数据失败'});
    //         console.log(error);
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         res.json({success_code: 200, message: results});
    //     }
    // });

    db.all(sqlStr, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.json({err_code: 0, message: '请求商品分类数据失败'});
        } else {
          console.log(rows);
          res.json({success_code: 200, message: rows});
        }
      });
});

/**
 * 模糊搜索(商品名称)
 */
router.post('/api/searchgoods', (req, res) => {
    // 获取参数
    let keywords = req.body.keywords;
	keywords = keywords.replace(/\s+/g, ' ');
	keywords = keywords.replace(/(^\s*)|(\s*$)/g, '');
    let keyArr = keywords.split(' ');
    let sqlStr = 'SELECT * FROM recommend WHERE goods_name LIKE ';  // sql语句
    keyArr.forEach((item, index, arr)=>{
        sqlStr += "'%" + item + "%'";
        if(index != arr.length-1){
            sqlStr += " OR goods_name LIKE ";
        }
    });
    // conn.query(sqlStr, (error, results, fields) => {
    //     results = JSON.parse(JSON.stringify(results));
    //     if (!error && results.length) {
    //         console.log(results);
    //         res.json({success_code: 200, message: results});
    //     }else{
    //         console.log(error);
    //     }
    // });
    db.all(sqlStr, (err, rows) => {
        if (!err && rows.length) {
            console.log(rows);
            res.json({ success_code: 200, message: rows });
        } else {
            console.log(err);
        }
    });

});

/**
 * 获取推荐商品列表
 *  1, 3
 */
router.get('/api/recommendshoplist', (req, res) => {
    // 获取参数
	let category = req.query.category || 1;
    let pageNo = req.query.pageNo || 1;
    let pageSize = req.query.count || 3;

    let sqlStr = 'SELECT * FROM recommend WHERE category = ' + category + ' LIMIT ' + (pageNo - 1) * pageSize + ',' + pageSize;

    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '请求商品列表数据失败'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         res.json({success_code: 200, message: results});
    //     }
    // });

    db.all(sqlStr, [], (err, rows) => {
        if (err) {
          console.log(err);
          res.json({ err_code: 0, message: '请求商品列表数据失败' });
        } else {
          res.json({ success_code: 200, message: rows });
        }
      });
});

/**
 * 获取所有商品
 */
router.get('/api/allgoods', (req, res) => {

    let sqlStr = 'SELECT * FROM recommend';

    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '请求商品数据失败'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         res.json({success_code: 200, message: results});
    //     }
    // });

    db.all(sqlStr, [], (err, row) => {
        if (err) {
          console.log(err);
          res.json({ err_code: 0, message: '请求商品数据失败' });
        } else {
            console.log(row);
          res.json({ success_code: 200, message: row });
        }
      });
});

/**
 * 获取首页商品列表
 */
// router.get('/api/homeshoplist', (req, res) => {
//     // 获取总分类
//     let cateSqlStr = 'SELECT COUNT(*) FROM category';

// 	conn.query(cateSqlStr, (error, results, fields) => {
// 		if (!error) {
//             // console.log("result1",results);
//             let sqlStr = '';
//             for(let i=0; i < results[0]['COUNT(*)']; i++){
//                 sqlStr += 'SELECT * FROM recommend WHERE category = ' + (i+1) + ' LIMIT 3;';
//             }
//             conn.query(sqlStr, (error, results, fields) => {
//                 if (!error) {
//                     results = JSON.parse(JSON.stringify(results));
//                     res.json({success_code: 200, message: results});
//                 }
//             });
// 		}
// 	});

    
// });

router.get('/api/homeshoplist', async (req, res) => {
    // 获取总分类
    let cateSqlStr = 'SELECT COUNT(*) as count FROM category';

    db.get(cateSqlStr, async (error, row) => {
        if (!error) {
            let count = row.count;
            let rrrr = [];

            const getRecommendData = (sql) => {
                return new Promise((resolve, reject) => {
                    db.all(sql, (error, results) => {
                        if (!error) {
                            resolve(results);
                        } else {
                            reject('Error executing query');
                        }
                    });
                });
            };

            try {
                for (let i = 0; i < count; i++) {
                    let sqlStr = 'SELECT * FROM recommend WHERE category = ' + (i + 1) + ' LIMIT 3;';
                    let results = await getRecommendData(sqlStr);
                    let dddd = [];
                    for (let j = 0; j < results.length; j++) {
                        dddd.push(results[j]);
                        rrrr.push(dddd);
                    }
                }
                res.json({ success_code: 200, message: JSON.parse(JSON.stringify(rrrr)) });
            } catch (error) {
                res.status(500).json({ error_code: 500, message: error });
            }
        } else {
            res.status(500).json({ error_code: 500, message: 'Error executing query' });
        }
    });
});



/**
 * 获取商品详细信息
 */
router.get('/api/goodsdetail', (req, res) => {
    // 获取参数
    let goodsNo = req.query.goodsNo;
	let sqlStr = 'SELECT * FROM recommend WHERE goods_id = ' + goodsNo;
	// conn.query(sqlStr, (error, results, fields) => {
	// 	if (!error) {
	// results = JSON.parse(JSON.stringify(results));
	// 		res.json({success_code: 200, message: results});
	// 	}
	// });

    db.all(sqlStr, [], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ err_code: 0, message: '请求推荐商品数据失败' });
        } else {
            let results = JSON.parse(JSON.stringify(rows));
            res.json({ success_code: 200, message: results });
        }
});

});

/**
 * 获取商品评价
 */ 
router.get('/api/goodscomment', (req, res) => {
    // 获取参数
    let goodsId = req.query.goodsId;

	// let sqlStr = 'SELECT user_info.id, user_info.user_name, user_info.user_nickname, comments.comment_detail, comments.comment_id, comments.comment_rating, comments.goods_id FROM user_info INNER JOIN comments ON user_info.id = comments.user_id WHERE goods_id = ' + goodsId;
	// conn.query(sqlStr, (error, results, fields) => {
	// 	if (!error) {
    //         results = JSON.parse(JSON.stringify(results));
	// 		res.json({success_code: 200, message: results});
	// 	}
	// });
    let sqlStr = 'SELECT user_info.id, user_info.user_name, user_info.user_nickname, comments.comment_detail, comments.comment_id, comments.comment_rating, comments.goods_id FROM user_info INNER JOIN comments ON user_info.id = comments.user_id WHERE goods_id = ?';
    db.all(sqlStr, [goodsId], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({err_code: 0, message: '请求商品评论数据失败'});
        } else {
            res.json({success_code: 200, message: rows});
        }
    });
});

/**
  评论商品
*/
router.post('/api/postcomment', (req, res) => {
	// 获取参数
	let goods_id = req.body.goods_id;
	let comment_detail = req.body.comment_detail;
	let comment_rating = req.body.comment_rating;
	let user_id = req.body.user_id;
    const addSql = "INSERT INTO comments(goods_id, comment_detail, comment_rating, user_id) VALUES (?, ?, ?, ?)";
    const addSqlParams = [goods_id, comment_detail, comment_rating, user_id];
    // conn.query(addSql, addSqlParams, (error, results, fields) => {
    //     results = JSON.parse(JSON.stringify(results));
    //     if (!error) {
    //       // 更新数据
    //       let sqlStr = "UPDATE recommend SET comments_count = comments_count + 1 WHERE goods_id = " + goods_id;
    //       conn.query(sqlStr, (error, results, fields) => {
    //         if (error) {
    //           console.log(error);
    //         } else {
    //           res.json({success_code: 200, message: "发布成功"});
    //         }
    //       });
    //     }
    //  });

    db.run(addSql, addSqlParams, function(err) {
        if (err) {
            console.log(err.message);
            res.json({err_code: 0, message: '发布评论失败'});
        } else {
            let sqlStr = "UPDATE recommend SET comments_count = comments_count + 1 WHERE goods_id = " + goods_id;
            db.run(sqlStr, function(err) {
                if (err) {
                    console.log(err.message);
                } else {
                    res.json({success_code: 200, message: "发布成功"});
                }
            });
        }
    });
});

/**
 一次性图形验证码
*/
router.get('/api/captcha', (req, res) => {
    // 生成随机验证码
    let captcha = svgCaptcha.create({
        color: true,
        noise: 3,
        ignoreChars: '0o1iIO',
        size: 4
    });

    // 保存
    req.session.captcha = captcha.text.toLocaleLowerCase();
	tmp_captcha = captcha.text.toLocaleLowerCase();

    // 返回客户端
    res.type('svg');
    res.send(captcha.data);
});

/**
  发送验证码短信
*/
router.get('/api/send_code', (req, res) => {
    // 获取手机号码
    let phone = req.query.phone;
    // 随机产生验证码
    let code = sms_util.randomCode(6);

    /* sms_util.sendCode(phone, code, function (success) {
        if (success) {
             users[phone] = code;
             res.json({success_code: 200, message: '验证码获取成功!'});
         } else {
             res.json({err_code: 0, message: '验证码获取失败!'});
         }
     });*/

    // 成功——模拟短信功能
    setTimeout(() => {
        users[phone] = code;
        console.log("验证码: " + code);
        res.json({success_code: 200, message: code});
    }, 2000);
});

/**
  手机验证码登录
*/
router.post('/api/login_code', (req, res) => {
    // 获取数据
    const phone = req.body.phone;
    const code = req.body.code;
    
    console.log("phone: " + phone);
    console.log("code: " + code);
    console.log(users[phone]);
    console.log(users);
    // 验证验证码是否正确
    // if (users[phone] !== code) {
    //     console.log("验证码不正确!");
    //     res.json({err_code: 0, message: '验证码不正确!'});
    // }

    // 查询数据
    delete  users[phone];
    db.serialize(function() {
    let sqlStr = "SELECT * FROM user_info WHERE user_phone = " + phone + " LIMIT 1";

    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '查询失败'});
	// 		console.log(error);
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         if (results[0]) {  // 用户已经存在
    //             req.session.userId = results[0].id;
                
    //             res.json({
    //                 success_code: 200,
    //                 message: {
	// 					id: results[0].id,
    //                     user_name: results[0].user_name,
    //                     user_nickname: results[0].user_nickname || '',
    //                     user_phone: results[0].user_phone,
	// 					user_sex: results[0].user_sex,
	// 					user_address: results[0].user_address,
	// 					user_sign: results[0].user_sign,
    //                     user_birthday: results[0].user_birthday,
    //                     user_avatar: results[0].user_avatar
	// 				}
    //             });
    //         } else { // 新用户
    //             const addSql = "INSERT INTO user_info(user_name, user_phone, user_avatar) VALUES (?, ?, ?)";
    //             const addSqlParams = [phone, phone, 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg'];  // 手机验证码注册，默认用手机号充当用户名
    //             conn.query(addSql, addSqlParams, (error, results, fields) => {
    //                 results = JSON.parse(JSON.stringify(results));
    //                 if (!error) {
    //                     req.session.userId = results.insertId;
    //                     let sqlStr = "SELECT * FROM user_info WHERE id = '" + results.insertId + "' LIMIT 1";
    //                     conn.query(sqlStr, (error, results, fields) => {
    //                         if (error) {
    //                             res.json({err_code: 0, message: '注册失败'});
    //                             console.log(error);
    //                         } else {
    //                             results = JSON.parse(JSON.stringify(results));
                                
    //                             res.json({
    //                                 success_code: 200,
    //                                 message: {
    //                                     id: results[0].id,
    //                                     user_name: results[0].user_name,
    //                                     user_phone: results[0].user_phone,
    //                                     user_avatar: results[0].user_avatar
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     }
    // });
    console.log("sqlStr: " + sqlStr);
    console.log("phone: " + [phone]);
    db.all(sqlStr, [], (err, rows) => {
        if (!err) {
            rows = JSON.parse(JSON.stringify(rows));
            console.log("sql结果: " + rows);
            if (rows[0]) {  // 用户已经存在
                req.session.userId = rows[0].id;

                res.json({
                    success_code: 200,
                    message: {
                        id: rows[0].id,
                        user_name: rows[0].user_name,
                        user_nickname: rows[0].user_nickname || '',
                        user_phone: rows[0].user_phone,
                        user_sex: rows[0].user_sex,
                        user_address: rows[0].user_address,
                        user_sign: rows[0].user_sign,
                        user_birthday: rows[0].user_birthday,
                        user_avatar: rows[0].user_avatar
                    }
                });
            } else { // 新用户
                console.log("新用户");
                const addSql = "INSERT INTO user_info(user_name, user_phone, user_avatar) VALUES (?, ?, ?)";
                const addSqlParams = [phone, phone, 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg'];  // 手机验证码注册，默认用手机号充当用户名
                db.run(addSql, addSqlParams, function(err) {
                    if (!err) {
                        req.session.userId = this.lastID;
                        const sqlStr = "SELECT * FROM user_info WHERE id = ? LIMIT 1";
                        db.all(sqlStr, [this.lastID], (err, rows) => {
                            if (!err) {
                                rows = JSON.parse(JSON.stringify(rows));

                                res.json({
                                    success_code: 200,
                                    message: {
                                        id: rows[0].id,
                                        user_name: rows[0].user_name,
                                        user_phone: rows[0].user_phone,
                                        // user_avatar: rows[0].user_avatar
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        else {
            console.log(err);
        }
    });
});
});

/**
 * 用户名和密码登录
 */
router.post('/api/login_pwd', (req, res) => {
	console.log("123",req.session.captcha);
	console.log("456",tmp_captcha);
  console.log("name",req.body.name);
  console.log("pwd", req.body.pwd);
    // 获取数据
	const user_name = req.body.name;
    const user_pwd = md5(md5(req.body.pwd) + S_KEY);
    const captcha = req.body.captcha.toLowerCase();

    // 验证图形验证码是否正确
    // if (captcha !== tmp_captcha) {
    //     res.json({err_code: 0, message: '图形验证码不正确!'});
    //     return;
    // }

    // tmp_captcha = '';
    
    // 查询数据
    let sqlStr = "SELECT * FROM user_info WHERE user_name = '" + user_name + "' LIMIT 1";
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '用户名不正确!'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));

    //         if (results[0]) {  // 用户已经存在
    //             // 验证密码是否正确
    //             if (results[0].user_pwd !== user_pwd) {
    //                 res.json({err_code: 0, message: '密码不正确!'});
    //             } else {
    //                 req.session.userId = results[0].id;
                    
    //                 res.json({
    //                     success_code: 200,
    //                     message: {
    //                         id: results[0].id,
    //                         user_name: results[0].user_name || '',
    //                         user_nickname: results[0].user_nickname || '',
    //                         user_phone: results[0].user_phone || '',
	// 						user_sex: results[0].user_sex || '',
	// 						user_address: results[0].user_address || '',
	// 						user_sign: results[0].user_sign || '',
	// 						user_birthday: results[0].user_birthday || '',
    //                         user_avatar: results[0].user_avatar || ''
    //                     },
    //                     info: '登录成功!'
    //                 });
    //             }
    //         } else { // 新用户
    //             const addSql = "INSERT INTO user_info(user_name, user_pwd, user_avatar) VALUES (?, ?, ?)";
    //             const addSqlParams = [user_name, user_pwd, 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg'];
    //             conn.query(addSql, addSqlParams, (error, results, fields) => {
    //                 results = JSON.parse(JSON.stringify(results));
    //                 if (!error) {
    //                     req.session.userId = results.insertId;
    //                     let sqlStr = "SELECT * FROM user_info WHERE id = '" + results.insertId + "' LIMIT 1";
    //                     conn.query(sqlStr, (error, results, fields) => {
    //                         if (error) {
    //                             res.json({err_code: 0, message: '注册失败'});
    //                         } else {
    //                             results = JSON.parse(JSON.stringify(results));
                                
    //                             res.json({
    //                                 success_code: 200,
    //                                 message: {
    //                                     id: results[0].id,
    //                                     user_name: results[0].user_name || '',
    //                                     user_nickname: results[0].user_nickname || '',
    //                                     user_avatar: results[0].user_avatar || ''
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     }
    // });

    db.all(sqlStr, [], (err, rows) => {

        if (err) {
            res.json({err_code: 0, message: '用户名不正确!'});
            console.log(err);
        } else {
            const results = JSON.parse(JSON.stringify(rows));

            if (results[0]) {  // 用户已经存在

                // 验证密码是否正确
                if (results[0].user_pwd !== user_pwd) {
                    console.log(".......");
                    console.log("rpwd",results[0].user_pwd);
                    console.log("pwd",user_pwd);
                    console.log("密码不正确");
                    res.json({err_code: 0, message: '密码不正确!', info:"密码不正确！"});
                } else {
                    req.session.userId = results[0].id;

                    res.json({
                        success_code: 200,
                        message: {
                            id: results[0].id,
                            user_name: results[0].user_name || '',
                            user_nickname: results[0].user_nickname || '',
                            user_phone: results[0].user_phone || '',
                            user_sex: results[0].user_sex || '',
                            user_address: results[0].user_address || '',
                            user_sign: results[0].user_sign || '',
                            user_birthday: results[0].user_birthday || '',
                            user_avatar: results[0].user_avatar || ''
                        },
                        info: '登录成功!'
                    });
                }
            } else { // 新用户
                const addSql = "INSERT INTO user_info(user_name, user_pwd, user_avatar) VALUES (?, ?, ?)";
                const addSqlParams = [user_name, user_pwd, 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg'];
                db.run(addSql, addSqlParams, function(err) {
                    if (err) {
                        res.json({err_code: 0, message: '注册失败'});
                        console.log(err);
                    } else {
                        req.session.userId = this.lastID;
                        let sqlStr = "SELECT * FROM user_info WHERE id = '" + this.lastID + "' LIMIT 1";
                        db.all(sqlStr, [], (err, rows) => {
                            if (err) {
                                res.json({err_code: 0, message: '注册失败'});
                                console.log(err);
                            } else {
                                const results = JSON.parse(JSON.stringify(rows));
                                console.log("注册成功！")
                                res.json({
                                    success_code: 200,
                                    message: {
                                        id: results[0].id,
                                        user_name: results[0].user_name || '',
                                        user_nickname: results[0].user_nickname || '',
                                        // user_avatar: results[0].user_avatar || '',
                                        user_avatar: "https://team-rolls-royce-backend.glitch.me/avatar_uploads/avatar_default.jpg"
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

/**
*  根据session中的用户id获取用户信息
* */
router.get('/api/user_info', (req, res) => {
    // 获取参数
   let userId = req.query.user_id || req.session.userId;
   
    let sqlStr = "SELECT * FROM user_info WHERE id = " + userId + " LIMIT 1";
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '请求用户数据失败'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         if (!results[0]) {
    //             delete req.session.userId;
    //             res.json({error_code: 1, message: '请先登录'});
    //         } else {
    //             res.json({
    //                 success_code: 200,
    //                 message: {
    //                     id: results[0].id,
    //                     user_name: results[0].user_name || '',
    //                     user_nickname: results[0].user_nickname || '',
    //                     user_phone: results[0].user_phone || '',
    //                     user_sex: results[0].user_sex || '',
    //                     user_address: results[0].user_address || '',
    //                     user_sign: results[0].user_sign || '',
    //                     user_birthday: results[0].user_birthday || '',
    //                     user_avatar: results[0].user_avatar || ''
    //                 },
    //             });
    //         }
    //     }
    // });

    db.get(sqlStr, [userId], (err, row) => {
        if (err) {
          res.json({ err_code: 0, message: '请求用户数据失败' });
        } else {
          if (!row) {
            delete req.session.userId;
            res.json({ error_code: 1, message: '请先登录' });
          } else {
            console.log("用户信息：",row);
            res.json({
              success_code: 200,
              message: {
                id: row.id,
                user_name: row.user_name || '',
                user_nickname: row.user_nickname || '',
                user_phone: row.user_phone || '',
                user_sex: row.user_sex || '',
                user_address: row.user_address || '',
                user_sign: row.user_sign || '',
                user_birthday: row.user_birthday || '',
                user_avatar: row.user_avatar || ''
              },
            });
          }
        }
      });
});

/**
 * 退出登录
 */
router.get('/api/logout', (req, res) => {
    // 清除session中userId
    delete  req.session.userId;
	
    res.json({
        success_code: 200,
        message: "退出登录成功"
    });
});

/**
 * 添加商品到购物车
 */
router.post('/api/ ', (req, res) => {
    // 验证用户
    let user_id = req.body.user_id;
    if(!user_id){
        res.json({err_code:0, message:'非法用户'});
        return;
    }
    /* if(!user_id || user_id !== req.session.userId){
		 console.log( req.session.userId);
         res.json({err_code:0, message:'非法用户'});
         return;
     }
	*/
    // 获取客户端传过来的商品信息
    let goods_id = req.body.goods_id;
    let goods_name = req.body.goods_name;
    let thumb_url = req.body.thumb_url;
    let price = req.body.price;
    let buy_count = req.body.buy_count;
    let is_pay = 0; // 0 未购买 1购买
	let counts = req.body.counts;

    let sql_str = "SELECT * FROM cart WHERE goods_id = " + goods_id + " AND user_id=" + user_id + " LIMIT 1";
    // conn.query(sql_str, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '服务器内部错误!'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         if (results[0]) { // 商品已经存在
    //             res.json({success_code: 200, message: '该商品已在购物车中'});
    //         } else { // 商品不存在
	// 			let add_sql = "INSERT INTO cart(goods_id, goods_name, thumb_url, price, buy_count, is_pay, user_id, counts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	// 			let sql_params = [goods_id, goods_name, thumb_url, price, buy_count, is_pay, user_id, counts];
	// 			conn.query(add_sql, sql_params, (error, results, fields) => {
	// 				if (error) {
    //                     res.json({err_code: 0, message: '加入购物车失败!'});
    //                     console.log(error);
	// 				} else {
	// 					res.json({success_code: 200, message: '加入购物车成功!'});
	// 				}
	// 			});
    //         }
    //     }
    // });
    db.get(sql_str, [], (error, row) => {
        if (error) {
            res.json({err_code: 0, message: '服务器内部错误!'});
        } else {
            if (row) { // 商品已经存在
                res.json({success_code: 200, message: '该商品已在购物车中'});
            } else { // 商品不存在
                let add_sql = "INSERT INTO cart(goods_id, goods_name, thumb_url, price, buy_count, is_pay, user_id, counts) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                let sql_params = [goods_id, goods_name, thumb_url, price, buy_count, is_pay, user_id, counts];
                db.run(add_sql, sql_params, (error) => {
                    if (error) {
                        res.json({err_code: 0, message: '加入购物车失败!'});
                        console.log(error);
                    } else {
                        res.json({success_code: 200, message: '加入购物车成功!'});
                    }
                });
            }
        }
    });
});

/**
 * 查询购物车的商品
 */
router.get('/api/cart_goods', (req, res) => {
    // 获取参数
    let user_id = req.query.user_id;
    let sqlStr = "SELECT * FROM cart WHERE user_id =" + user_id;
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '请求购物车商品数据失败'});
    //     } else {
    //         res.json({success_code: 200, message: results});
    //     }
    // });
    db.all(sqlStr, [], (error, rows) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '请求购物车商品数据失败'});
        } else {
            res.json({success_code: 200, message: rows});
        }
    });
});

/**
 * 删除购物车单条商品
 */
router.post('/api/delete_goods', (req, res) => {
    // 获取数据
    const goods_id = req.body.goods_id;
	const user_id = req.body.user_id;
	
    let sqlStr = "DELETE FROM cart WHERE goods_id =" + goods_id + " AND user_id = " + user_id;
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '删除失败!'});
    //     } else {
    //         res.json({success_code: 200, message: '删除成功!'});
    //     }
    // });
    db.run(sqlStr, [], (error) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '删除失败!'});
        } else {
            res.json({success_code: 200, message: '删除成功!'});
        }
    });
});

/*********************************** 用户中心 **************************************** */

/**
 * 修改用户信息 
 */
// router.post('/api/change_user_msg', (req, res) => {
//     // 获取客户端传过来的商品信息
// 	const form = new formidable.IncomingForm();
   
//     form.uploadDir = config.uploadsAvatarPath; // 上传图片放置的文件夹
//     form.keepExtensions = true; // 保持文件的原始扩展名

//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return next(err);
//         }
// 		let id = fields.id;
//         let user_nickname = fields.user_nickname || '';
//         let user_sex = fields.user_sex || '';
//         let user_address = fields.user_address || '';
//         let user_birthday = fields.user_birthday || '';
//         let user_sign = fields.user_sign || '';
//         let user_avatar = 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg';
//         if(files.user_avatar){
//             user_avatar = 'http://localhost:' + config.port + '/avatar_uploads/' + basename(files.user_avatar.path); 
//         }

//         // 验证
//         if (!id) {
//             res.json({err_code: 0, message: '修改用户信息失败!'});
//         }

//         // 更新数据
//         let sqlStr = "UPDATE user_info SET user_nickname = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ?, user_avatar = ? WHERE id = " + id;
//         let strParams = [user_nickname, user_sex, user_address, user_birthday, user_sign, user_avatar];
//     //     conn.query(sqlStr, strParams, (error, results, fields) => {
//     //         if (error) {
//     //             console.log(error);
//     //             res.json({err_code: 0, message: '修改用户信息失败!'});
//     //         } else {
//     //             res.json({success_code: 200, message: '修改用户信息成功!'});
//     //         }
//     //     });
//     // });
//     db.run(sqlStr, strParams, (error) => {
//         if (error) {
//             console.log(error);
//             res.json({err_code: 0, message: '修改用户信息失败!'});
//         } else {
//             res.json({success_code: 200, message: '修改用户信息成功!'});
//         }
//     });
// });
// });
router.post('/api/change_user_msg', (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = config.uploadsAvatarPath;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }
        let id = fields.id;
        let user_nickname = fields.user_nickname || '';
        let user_sex = fields.user_sex || '';
        let user_address = fields.user_address || '';
        let user_birthday = fields.user_birthday || '';
        let user_sign = fields.user_sign || '';
//         let user_avatar = 'http://localhost:' + config.port + '/avatar_uploads/avatar_default.jpg';

//         if (files.user_avatar) {
//             user_avatar = 'http://localhost:' + config.port + '/avatar_uploads/' + path.basename(files.user_avatar.path);
//         }
      
      console.log("user:", user_nickname);

        if (!id) {
            res.json({ err_code: 0, message: 'Failure to modify user information!' });
        }

        let sqlStr = "UPDATE user_info SET user_nickname = ? , user_sex = ?, user_address = ?, user_birthday = ?, user_sign = ? WHERE id = " + id;
        let strParams = [user_nickname, user_sex, user_address, user_birthday, user_sign];
        db.run(sqlStr, strParams, (error) => {
            if (error) {
                console.log(error);
                res.json({ err_code: 0, message: 'Failure to modify user information!' });
            } else {
                // db.all('Select * from user_info where id= 8', (error, rows) => {
                //       if (error) {
                //         console.log('Error fetching users:', error.message);
                //       } else {
                //         console.log('Users:', rows);
                //       }
                //     });
                
                res.json({ success_code: 200, message: 'Modify user information successfully!' });
            }
        });
    });
});
/**
 * 修改用户密码
 */
router.post('/api/change_user_pwd', (req, res) => {
    // 获取数据
    let id = req.body.id;
    let oriPwd = '';
    let newPwd = md5(md5(req.body.newPwd) + S_KEY);
    if(req.body.oriPwd){
        oriPwd = md5(md5(req.body.oriPwd) + S_KEY);
    }

    let sqlStr = "SELECT * FROM user_info WHERE id = " + id;
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '查询失败!'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         if (results[0]) { // 用户存在
    //             if(!results[0].user_pwd || (results[0].user_pwd && oriPwd === results[0].user_pwd)){
    //                 let sqlStr = "UPDATE user_info SET user_pwd = ? WHERE id = " + id;
    //                 conn.query(sqlStr, [newPwd], (error, results, fields) => {
    //                     if(!error){
    //                         res.json({success_code: 200, message: '密码修改成功!'});
    //                     }
    //                 });
    //             }else if(oriPwd != results[0].user_pwd){
    //                 res.json({err_code: 0, message: '输入的原始密码错误!'});
    //             }
    //         } else { 
    //             res.json({err_code: 0, message: '非法用户!'});
    //         }
    //     }
    // });
    db.get(sqlStr, [], (error, row) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '查询失败!'});
        } else {
            if (row) { // 用户存在
                if (!row.user_pwd || (row.user_pwd && oriPwd === row.user_pwd)) {
                    let sqlStr = "UPDATE user_info SET user_pwd = ? WHERE id = ?";
                    db.run(sqlStr, [newPwd, id], (error) => {
                        if (!error) {
                            res.json({success_code: 200, message: '密码修改成功!'});
                        }
                    });
                } else if (oriPwd != row.user_pwd) {
                    res.json({err_code: 0, message: '输入的原始密码错误!'});
                }
            } else {
                res.json({err_code: 0, message: '非法用户!'});
            }
        }
    });
});

/**
  修改手机
*/
router.post('/api/change_user_phone', (req, res) => {
    // 获取数据
    const id = req.body.id;
    const phone = req.body.phone;
    const code = req.body.code;

    // 验证验证码是否正确
    if (users[phone] !== code) {
        res.json({err_code: 0, message: '验证码不正确!'});
    }

    // 查询数据
    delete  users[phone];

    let sqlStr = "UPDATE user_info SET user_phone = " + phone + " WHERE id = " + id;

    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
    //         res.json({err_code: 0, message: '修改失败'});
	// 		console.log(error);
    //     } else {
    //         res.json({success_code: 200, message: '修改成功'});
    //     }
    // });
    db.run(sqlStr, strParams, (error) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '修改失败'});
        } else {
            res.json({success_code: 200, message: '修改成功'});
        }
    });

});

/********************************* 后台管理系统 ********************************** */

/**
 * 管理员登录
 */
router.post('/api/admin_login', (req, res)=>{
    const account = req.body.account;
    const pwd = req.body.pwd;
    const md5Pwd = md5(md5(req.body.pwd) + S_KEY);

    if(!account || !pwd){
        res.json({error_code: 0, message: "账号和密码不得为空！"});
    }

    let sqlStr = "SELECT * FROM administrators WHERE account = '" + account + "'";
    conn.query(sqlStr, (error, results, fields) => {
        if(error){
            console.log(error);
            res.json({error_code: 0, message: "服务器内部错误！"});
        }else if(results[0]){
            let user = JSON.parse(JSON.stringify(results[0]));
            if(md5Pwd === user['pwd']){
                req.session.adminId = user['id'];
                res.json({success_code: 200, message: "登录成功！"});
            }else{
                res.json({error_code: 0, message: "密码错误！"});
            }
        }else{
            res.json({err_code: 0, message: "用户不存在！"});
        }
    });
    // db.get(sqlStr, strParams, (error, row) => {
    //     if (error) {
    //         console.log(error);
    //         res.json({error_code: 0, message: "服务器内部错误！"});
    //     } else if (row) {
    //         if (md5Pwd === row.pwd) {
    //             req.session.adminId = row.id;
    //             res.json({success_code: 200, message: "登录成功！"});
    //         } else {
    //             res.json({error_code: 0, message: "密码错误！"});
    //         }
    //     } else {
    //         res.json({err_code: 0, message: "用户不存在！"});
    //     }
    // });

});

/**
 * 管理员退出登录
 */
router.get('/api/admin_logout', (req, res) => {
    console.log(req.session.adminId)
    delete  req.session.adminId;
	
    res.json({
        success_code: 200,
        message: "退出登录成功"
    });
});

/**
 * 修改商品数量 
 */
router.post('/api/change_goods_count', (req, res) => {
    // 获取数据
    const goods_id = req.body.goods_id;
    const buy_count = req.body.count;
	const user_id = req.body.user_id;

    let sqlStr = "UPDATE cart SET buy_count = ? WHERE goods_id = " + goods_id + " AND user_id = " + user_id;
    let strParams = [buy_count];
    // conn.query(sqlStr, strParams, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '修改商品数量失败!'});
    //     } else {
    //         res.json({success_code: 200, message: '修改商品数量成功!'});
    //     }
    // });
    db.run(sqlStr, strParams, (error) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '修改商品数量失败!'});
        } else {
            res.json({success_code: 200, message: '修改商品数量成功!'});
        }
    });
});

/**
 * 获取所有用户信息
 */
router.get('/api/admin_allusers', (req, res) => {

    let sqlStr = 'SELECT id, user_name, user_phone, user_nickname, user_address FROM user_info';

    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '请求用户数据失败'});
    //     } else {
    //         results = JSON.parse(JSON.stringify(results));
    //         res.json({success_code: 200, message: results});
    //     }
    // });
    db.all(sqlStr, (error, rows) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '请求用户数据失败'});
        } else {
            res.json({success_code: 200, message: rows});
        }
    });
});


/**
 * 删除recommend单条商品
 */
router.post('/api/delete_recom_goods', (req, res) => {
    // 获取数据
    const goods_id = req.body.goods_id;
	
    let sqlStr = "DELETE FROM recommend WHERE goods_id =" + goods_id;
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '删除失败!'});
    //     } else {
	// 		let sqlStr2 = "DELETE FROM cart WHERE goods_id =" + goods_id;
	// 		conn.query(sqlStr, (error, results, fields) => {
	// 			if (error) {
	// 				console.log(error);
	// 				res.json({err_code: 0, message: '删除失败!'});
	// 			} else {
	// 				res.json({success_code: 200, message: '删除成功!'});
	// 			}
	// 		});
    //     }
    // });
    db.run(sqlStr, strParams, (error) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '删除失败!'});
        } else {
            let sqlStr2 = "DELETE FROM cart WHERE goods_id = ?";
            let strParams2 = [goods_id];

            db.run(sqlStr2, strParams2, (error) => {
                if (error) {
                    console.log(error);
                    res.json({err_code: 0, message: '删除失败!'});
                } else {
                    res.json({success_code: 200, message: '删除成功!'});
                }
            });
        }
    });
});

/**
 * 修改recommend商品信息 
 */
router.post('/api/update_recom_goods', (req, res) => {
    // 获取数据
    const goods_id = req.body.goods_id;
    const goods_name = req.body.goods_name;
    const short_name = req.body.short_name;
    const price = req.body.price;
    const counts = req.body.counts;
    const category = req.body.category;

    let sqlStr = "UPDATE recommend SET goods_name = ?, short_name = ?, price = ?, counts = ?, category = ? WHERE goods_id = " + goods_id;
    let strParams = [goods_name, short_name, price, counts, category];
    // conn.query(sqlStr, strParams, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '修改失败!'});
    //     } else {
    //         res.json({success_code: 200, message: '修改成功!'});
    //     }
    // });
    db.run(sqlStr, strParams, (error) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '修改失败!'});
        } else {
            res.json({success_code: 200, message: '修改成功!'});
        }
    });
});

/**
 * 添加商品到recommend
 */
router.post('/api/add_shop_recom', (req, res) => {
    // 获取客户端传过来的商品信息
    console.log("进入添加商品到recommend");
	const form = new formidable.IncomingForm();

    form.uploadDir = config.uploadsGoodsPath;  // 上传图片放置的文件夹
    form.keepExtensions = true; // 保持文件的原始扩展名
    form.parse(req, (err, fields, files)=>{
        if(err){
            return next(err);
        }
		let goods_id = fields.goods_id;
		let goods_name = fields.goods_name;
		let short_name = fields.short_name;
		let price = fields.price;
		let normal_price = price + 300;
		let market_price = price + 500;
		let sales_tip = fields.sales_tip;
		let category = fields.category;
		let comments_count = 0;
		let counts = fields.counts;
		// let thumb_url = 'http://localhost:' + config.port + '/uploads/' + basename(files.goods_img.path);
		// let image_url = 'http://localhost:' + config.port + '/uploads/' + basename(files.goods_img.path);
		// let hd_thumb_url = 'http://localhost:' + config.port + '/uploads/' + basename(files.goods_img.path);
    
		let sql_str = "SELECT * FROM recommend WHERE goods_id = " + goods_id;
	// 	conn.query(sql_str, (error, results, fields) => {
	// 		if (error) {
	// 			res.json({err_code: 0, message: '服务器内部错误!'});
	// 		} else {
	// 			results = JSON.parse(JSON.stringify(results));
	// 			if (results[0]) { // 商品已经存在
	// 				res.json({success_code: 500, message: '该商品已在数据库中'});
	// 			} else { // 商品不存在
	// 				// let add_sql = "INSERT INTO recommend(goods_id, goods_name, short_name, thumb_url, image_url, hd_thumb_url, price, normal_price, market_price, sales_tip, category, counts, comments_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	// 				// let sql_params = [goods_id, goods_name, short_name, thumb_url, image_url, hd_thumb_url, price, normal_price, market_price, sales_tip, category, counts, comments_count];
	// 				let add_sql = "INSERT INTO recommend(goods_id, goods_name, short_name, price, normal_price, market_price, sales_tip, category, counts, comments_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	// 				let sql_params = [goods_id, goods_name, short_name, price, normal_price, market_price, sales_tip, category, counts, comments_count];
    //                 conn.query(add_sql, sql_params, (error, results, fields) => {
	// 					if (error) {
	// 						console.log(error);
	// 						res.json({err_code: 0, message: '加入失败!'});
	// 					} else {
	// 						let sqlStr = "UPDATE category SET cate_counts = cate_counts + 1  WHERE cate_id = " + category;
	// 						conn.query(sqlStr, [], (error, results, fields) => {
	// 							if (error) {
	// 								console.log(error);
	// 							} else {
	// 								res.json({success_code: 200, message: '加入成功!'});
	// 							}
	// 						});
	// 					}
	// 				});
	// 			}
	// 		}
	// 	});
	// });

    db.get(sql_str, [], (error, rows) => {
        if (error) {
            console.log(error);
            res.json({ err_code: 0, message: '服务器内部错误!' });
        } else {
            console.log("rows", rows);
            if (rows) { // 商品已经存在
            // if (rows[0]) { // 商品已经存在
                res.json({ success_code: 500, message: '该商品已在数据库中' });
            } else { // 商品不存在
                let add_sql = "INSERT INTO recommend(goods_id, goods_name, short_name, price, normal_price, market_price, sales_tip, category, counts, comments_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                let sql_params = [goods_id, goods_name, short_name, price, normal_price, market_price, sales_tip, category, counts, comments_count];
                db.all(add_sql, sql_params, (error) => {
                    if (error) {
                        console.log(error);
                        res.json({ err_code: 0, message: '加入失败!' });
                    } else {
                        let sqlStr = "UPDATE category SET cate_counts = cate_counts + 1  WHERE cate_id = ?";
                        db.all(sqlStr, [category], (error) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("加入成功");
                                res.json({ success_code: 200, message: '加入成功!' });
                            }
                        });
                    }
                });
            }
        }
    });
});

});


/**
 * 删除所有商品
 */
router.post('/api/delete_all_goods', (req, res) => {
    // 获取数据
	const user_id = req.body.user_id;
	
    let sqlStr = "DELETE FROM cart WHERE user_id = " + user_id;
    // conn.query(sqlStr, (error, results, fields) => {
    //     if (error) {
	// 		console.log(error);
    //         res.json({err_code: 0, message: '删除失败!'});
    //     } else {
    //         res.json({success_code: 200, message: '删除成功!'});
    //     }
    // });
    db.run(sqlStr, [user_id], (error) => {
        if (error) {
            console.log(error);
            res.json({err_code: 0, message: '删除失败!'});
        } else {
            res.json({success_code: 200, message: '删除成功!'});
        }
    });

});

export default router;

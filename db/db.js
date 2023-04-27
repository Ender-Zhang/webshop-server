/*
 * @Author: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @Date: 2023-04-14 16:14:10
 * @LastEditors: Ender-Zhang 102596313+Ender-Zhang@users.noreply.github.com
 * @LastEditTime: 2023-04-21 13:36:47
 * @FilePath: \webshop-master\web-server\db\db.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import mysql from 'mysql';
import config from '../src/config';

const  conn = mysql.createConnection({
    host:"localhost", // 数据库的地址
    user: "root", // 账号
    password: "icetree00", // 密码
    database: "web_shop", // 数据库名称
    multipleStatements: true,  // 允许多条sql同时查询
});

conn.connect();

export default conn;


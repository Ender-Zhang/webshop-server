-- Active: 1682100850269@@127.0.0.1@3306
-- Administrators table
DROP TABLE IF EXISTS administrators;
CREATE TABLE administrators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  account TEXT,
  pwd TEXT
);

INSERT INTO administrators (id, account, pwd) VALUES (1, 'admin', '63814a82384f9faca8bcca0f08d86eb9');

-- Cart table
DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
  goods_id INTEGER NOT NULL,
  goods_name TEXT,
  thumb_url TEXT,
  price REAL,
  buy_count INTEGER,
  is_pay TEXT,
  user_id INTEGER NOT NULL,
  counts INTEGER
);

INSERT INTO cart VALUES (555, '555', 'http://localhost:3000/uploads/upload_bb4a65134ebf4a8de2a7e810faed8709.jpg', 555, 1, '0', 14, 555);
INSERT INTO cart VALUES (11111, '1111', 'http://localhost:3000/uploads/upload_df43f5a23c1fe9b6c7c72b2d1bf14210.jpg', 1111, 1, '0', 14, 1111);
INSERT INTO cart VALUES (11, '11', 'http://localhost:3000/uploads/upload_779da2ad65e94a538af1c8f9ecf0a499.png', 11, 1, '0', 14, 11);
INSERT INTO cart VALUES (11, '11', 'http://localhost:3000/uploads/upload_779da2ad65e94a538af1c8f9ecf0a499.png', 11, 1, '0', 13, 11);
INSERT INTO cart VALUES (22, '22', 'http://localhost:3000/uploads/upload_677f693c6f3f30a920ccb350e387e7a6.png', 22, 1, '0', 13, 22);
INSERT INTO cart VALUES (33, '33', 'http://localhost:3000/uploads/upload_d1798166ebd0048e4be6561184a719b0.png', 33, 1, '0', 13, 33);
INSERT INTO cart VALUES (22222, '22222', 'http://localhost:3000/uploads/upload_534508a76bfc8c003034449944f1b815.jpg', 2222, 4, '0', 14, 2221);

-- Category table
DROP TABLE IF EXISTS category;
CREATE TABLE category (
  cate_id INTEGER PRIMARY KEY,
  cate_name TEXT,
  cate_icon TEXT,
  cate_counts INTEGER
);

INSERT INTO category VALUES (1, '美容美白', 'el-icon-reading', 36);
INSERT INTO category VALUES (2, '养生保健', 'el-icon-box', 24);
INSERT INTO category VALUES (3, '医学书籍', 'el-icon-present', 23);
INSERT INTO category VALUES (4, '医疗器械', 'el-icon-mobile-phone', 13);
INSERT INTO category VALUES (5, '视力保护', 'el-icon-ice-cream', 20);

-- Comments table
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  goods_id INTEGER NOT NULL,
  comment_detail TEXT,
  comment_rating INTEGER,
  user_id INTEGER NOT NULL
);



INSERT INTO comments VALUES (1, 136590526, 'good', 5, 5);
INSERT INTO comments VALUES (16, 136590526, 'nice', 5, 5);
INSERT INTO comments VALUES (17, 136590526, 'bad', 1, 8);
INSERT INTO comments VALUES (20, 65676090, 'success', 5, 5);
INSERT INTO comments VALUES (21, 65676090, 'error', 5, 5);
INSERT INTO comments VALUES (22, 6225284, '不好用', 2, 5);
INSERT INTO comments VALUES (23, 6225284, '还可以', 4, 5);
INSERT INTO comments VALUES (24, 8836407, '好吃', 5, 5);
INSERT INTO comments VALUES (25, 621723438, '强烈推荐', 5, 5);
INSERT INTO comments VALUES (26, 621723438, '毒鸡汤', 2, 9);
INSERT INTO comments VALUES (27, 10519372, 'aaaaa', 5, 12);
INSERT INTO comments VALUES (28, 11, '必须好评！！！！', 5, 14);
INSERT INTO comments VALUES (29, 11, 'jjjjjjjj', 0, 14);
INSERT INTO comments VALUES (30, 111, 'dsshdsadasd', 5, 13);

DROP TABLE IF EXISTS homecasual;
CREATE TABLE homecasual (
  id INTEGER NOT NULL PRIMARY KEY,
  imgurl TEXT,
  detail TEXT
);

INSERT INTO homecasual VALUES (1, 'http://localhost:3000/images/home/s1.png', 'http://mobile.yangkeduo.com/subject.html?subject_id=6153');
INSERT INTO homecasual VALUES (2, 'http://localhost:3000/images/home/s2.png', 'http://mobile.yangkeduo.com/promotion_op.html?type=12&id=228');
INSERT INTO homecasual VALUES (3, 'http://localhost:3000/images/home/s3.png', 'http://mobile.yangkeduo.com/subject.html?subject_id=6242');
INSERT INTO homecasual VALUES (4, 'http://localhost:3000/images/home/s4.png', 'http://mobile.yangkeduo.com/subject.html?subject_id=6153');
INSERT INTO homecasual VALUES (5, 'http://localhost:3000/images/home/s5.png', 'http://mobile.yangkeduo.com/subject.html?subject_id=6230');
INSERT INTO homecasual VALUES (6, 'http://localhost:3000/images/home/s6.png', 'http://mobile.yangkeduo.com/promotion_op.html?type=12&id=190');
INSERT INTO homecasual VALUES (7, 'http://localhost:3000/images/home/s7.png', 'http://mobile.yangkeduo.com/promotion_op.html?type=12&id=229');
INSERT INTO homecasual VALUES (8, 'http://localhost:3000/images/home/s8.png', 'http://mobile.yangkeduo.com/subject.html?subject_id=6153');
INSERT INTO homecasual VALUES (9, 'http://localhost:3000/images/home/s9.png', 'http://mobile.yangkeduo.com/subject.html?subject_id=6242');

DROP TABLE IF EXISTS recommend;
CREATE TABLE recommend (
  goods_id INTEGER NOT NULL PRIMARY KEY,
  goods_name TEXT DEFAULT NULL,
  short_name TEXT DEFAULT NULL,
  thumb_url TEXT DEFAULT NULL,
  hd_thumb_url TEXT DEFAULT NULL,
  image_url TEXT DEFAULT NULL,
  price INTEGER DEFAULT NULL,
  normal_price INTEGER DEFAULT NULL,
  market_price INTEGER DEFAULT NULL,
  sales_tip TEXT DEFAULT NULL,
  category INTEGER DEFAULT NULL,
  counts INTEGER DEFAULT NULL,
  comments_count INTEGER DEFAULT NULL
);

INSERT INTO recommend VALUES (11, '11', '11', 'http://localhost:3000/uploads/upload_779da2ad65e94a538af1c8f9ecf0a499.png', 'http://localhost:3000/uploads/upload_779da2ad65e94a538af1c8f9ecf0a499.png', 'http://localhost:3000/uploads/upload_779da2ad65e94a538af1c8f9ecf0a499.png', 11, 11300, 11500, '11', 2, 11, 2);
-- other insert statements here
INSERT INTO `recommend` VALUES (22, '22', '22', 'http://localhost:3000/uploads/upload_677f693c6f3f30a920ccb350e387e7a6.png', 'http://localhost:3000/uploads/upload_677f693c6f3f30a920ccb350e387e7a6.png', 'http://localhost:3000/uploads/upload_677f693c6f3f30a920ccb350e387e7a6.png', 22, 22300, 22500, '22', 2, 22, 0);
INSERT INTO `recommend` VALUES (33, '33', '33', 'http://localhost:3000/uploads/upload_d1798166ebd0048e4be6561184a719b0.png', 'http://localhost:3000/uploads/upload_d1798166ebd0048e4be6561184a719b0.png', 'http://localhost:3000/uploads/upload_d1798166ebd0048e4be6561184a719b0.png', 33, 33300, 33500, '33', 3, 33, 0);
INSERT INTO `recommend` VALUES (44, '44', '44', 'http://localhost:3000/uploads/upload_95674502ffd1287ca1ee74b8275df345.png', 'http://localhost:3000/uploads/upload_95674502ffd1287ca1ee74b8275df345.png', 'http://localhost:3000/uploads/upload_95674502ffd1287ca1ee74b8275df345.png', 44, 44300, 44500, '44', 4, 44, 0);
INSERT INTO `recommend` VALUES (55, '55', '55', 'http://localhost:3000/uploads/upload_480721c7d61da3252e1062432dcf2785.png', 'http://localhost:3000/uploads/upload_480721c7d61da3252e1062432dcf2785.png', 'http://localhost:3000/uploads/upload_480721c7d61da3252e1062432dcf2785.png', 55, 55300, 55500, '55', 5, 55, 0);
INSERT INTO `recommend` VALUES (111, '111', '111', 'http://localhost:3000/uploads/upload_d285e8746c214e6d19169cf2a75c4c2d.jpg', 'http://localhost:3000/uploads/upload_d285e8746c214e6d19169cf2a75c4c2d.jpg', 'http://localhost:3000/uploads/upload_d285e8746c214e6d19169cf2a75c4c2d.jpg', 111, 111300, 111500, '111', 1, 111, 1);
INSERT INTO `recommend` VALUES (222, '222', '222', 'http://localhost:3000/uploads/upload_d350d4c50fc34c0f5867fc1924e9825c.jpg', 'http://localhost:3000/uploads/upload_d350d4c50fc34c0f5867fc1924e9825c.jpg', 'http://localhost:3000/uploads/upload_d350d4c50fc34c0f5867fc1924e9825c.jpg', 222, 222300, 222500, '222', 2, 221, 0);
INSERT INTO `recommend` VALUES (333, '333', '333', 'http://localhost:3000/uploads/upload_55a86fe30ce8eed6ea0c01fb9409d858.jpg', 'http://localhost:3000/uploads/upload_55a86fe30ce8eed6ea0c01fb9409d858.jpg', 'http://localhost:3000/uploads/upload_55a86fe30ce8eed6ea0c01fb9409d858.jpg', 333, 333300, 333500, '333', 3, 333, 0);
INSERT INTO `recommend` VALUES (444, '4444', '444', 'http://localhost:3000/uploads/upload_4d6fe1c25d8e01c0958ffebd12da0beb.jpg', 'http://localhost:3000/uploads/upload_4d6fe1c25d8e01c0958ffebd12da0beb.jpg', 'http://localhost:3000/uploads/upload_4d6fe1c25d8e01c0958ffebd12da0beb.jpg', 444, 444300, 444500, '4444', 4, 444, 0);
INSERT INTO `recommend` VALUES (555, '555', '555', 'http://localhost:3000/uploads/upload_bb4a65134ebf4a8de2a7e810faed8709.jpg', 'http://localhost:3000/uploads/upload_bb4a65134ebf4a8de2a7e810faed8709.jpg', 'http://localhost:3000/uploads/upload_bb4a65134ebf4a8de2a7e810faed8709.jpg', 555, 555300, 555500, '555', 5, 555, 0);
INSERT INTO `recommend` VALUES (4444, '44444', '4444', 'http://localhost:3000/uploads/upload_42d204467ac2fca2f07593f6f872fe8c.jpg', 'http://localhost:3000/uploads/upload_42d204467ac2fca2f07593f6f872fe8c.jpg', 'http://localhost:3000/uploads/upload_42d204467ac2fca2f07593f6f872fe8c.jpg', 4444, 4444300, 4444500, '4444', 4, 4444, 0);
INSERT INTO `recommend` VALUES (11111, '11111', '1111', 'http://localhost:3000/uploads/upload_df43f5a23c1fe9b6c7c72b2d1bf14210.jpg', 'http://localhost:3000/uploads/upload_df43f5a23c1fe9b6c7c72b2d1bf14210.jpg', 'http://localhost:3000/uploads/upload_df43f5a23c1fe9b6c7c72b2d1bf14210.jpg', 1111, 1111300, 1111500, '11111', 1, 1111, 0);
INSERT INTO `recommend` VALUES (15545, '111', '2222', 'http://localhost:3000/uploads/upload_f0b7eedb939006a9bbc527b68b0ac297.png', 'http://localhost:3000/uploads/upload_f0b7eedb939006a9bbc527b68b0ac297.png', 'http://localhost:3000/uploads/upload_f0b7eedb939006a9bbc527b68b0ac297.png', 222, 222300, 222500, '11', 2, 11, 0);
INSERT INTO `recommend` VALUES (22222, '2222', '22222', 'http://localhost:3000/uploads/upload_534508a76bfc8c003034449944f1b815.jpg', 'http://localhost:3000/uploads/upload_534508a76bfc8c003034449944f1b815.jpg', 'http://localhost:3000/uploads/upload_534508a76bfc8c003034449944f1b815.jpg', 2222, 2222300, 2222500, '2222', 2, 2221, 0);
INSERT INTO `recommend` VALUES (33333, '33333', '33333', 'http://localhost:3000/uploads/upload_6d3ef1069f4bee1987467d6f650bc975.jpg', 'http://localhost:3000/uploads/upload_6d3ef1069f4bee1987467d6f650bc975.jpg', 'http://localhost:3000/uploads/upload_6d3ef1069f4bee1987467d6f650bc975.jpg', 33333, 33333300, 33333500, '3333', 3, 3333, 0);
INSERT INTO `recommend` VALUES (55555, '5555', '55555', 'http://localhost:3000/uploads/upload_b616bfd2c78a53fa0b61cbd2ba91b5bf.jpg', 'http://localhost:3000/uploads/upload_b616bfd2c78a53fa0b61cbd2ba91b5bf.jpg', 'http://localhost:3000/uploads/upload_b616bfd2c78a53fa0b61cbd2ba91b5bf.jpg', 5555, 5555300, 5555500, '5555', 5, 555, 0);
INSERT INTO `recommend` VALUES (1358464, '444', 'hhh', 'http://localhost:3000/uploads/upload_022e36eea34b218b8202afc65d7353e4.jpg', 'http://localhost:3000/uploads/upload_022e36eea34b218b8202afc65d7353e4.jpg', 'http://localhost:3000/uploads/upload_022e36eea34b218b8202afc65d7353e4.jpg', 44, 44300, 44500, '44', 1, 44, 0);

DROP TABLE IF EXISTS user_info;
CREATE TABLE user_info (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_name TEXT DEFAULT NULL,
  user_pwd TEXT DEFAULT NULL,
  user_phone TEXT DEFAULT NULL,
  user_sex TEXT DEFAULT NULL,
  user_address TEXT DEFAULT NULL,
  user_birthday TEXT DEFAULT NULL,
  user_sign TEXT DEFAULT NULL,
  user_nickname TEXT DEFAULT NULL,
  user_avatar TEXT DEFAULT NULL
);

INSERT INTO user_info VALUES (5, '13666666666', NULL, '13666666666', '女', '福州', '2000-01-01', '564154', '', 'http://localhost:3000/avatar_uploads/avatar_default.jpg');
-- other insert statements here
INSERT INTO `user_info` VALUES (8, '15666666666', NULL, '15666666666', '女', '', '', '', '15661', 'http://localhost:3000/avatar_uploads/avatar_default.jpg');
INSERT INTO `user_info` VALUES (9, '来来来', 'a163a36c731d1ac664841b6d196a05e3', '18666666666', '男', '', '', '', 'HS', 'http://localhost:3000/avatar_uploads/upload_5a67435fbb680332a6a3aa62014f5aa2.jpg');
INSERT INTO `user_info` VALUES (12, '13111111111', 'd43533b0994949040511bb6076624b42', NULL, NULL, NULL, NULL, NULL, NULL, 'http://localhost:3000/avatar_uploads/avatar_default.jpg');
INSERT INTO `user_info` VALUES (13, 'admin', '63814a82384f9faca8bcca0f08d86eb9', NULL, NULL, NULL, NULL, NULL, NULL, 'http://localhost:3000/avatar_uploads/avatar_default.jpg');
INSERT INTO `user_info` VALUES (14, '13111111111', NULL, '13111111111', NULL, NULL, NULL, NULL, NULL, 'http://localhost:3000/avatar_uploads/avatar_default.jpg');
INSERT INTO `user_info` VALUES (15, '13222222222', '032cee82df5b7be8073d3be42ea48a12', NULL, NULL, NULL, NULL, NULL, NULL, 'http://localhost:3000/avatar_uploads/avatar_default.jpg');

SET FOREIGN_KEY_CHECKS = 1;

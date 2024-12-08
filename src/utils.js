const jwt = require("jsonwebtoken");
APP_SECRET = "Graphql";

function getTokenPayload(token) {
  //トークン化された前の情報を複合する
  return jwt.verify(token, APP_SECRET)
}

// ユーザーIDを取得するための関数

function getUserId(req, authToken) {
  if (req) {
    //ヘッダーで認証権限があるか確認する。
    const authHeader = req.headers.authorization;
    //権限があるなら
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンが見つかりませんでした");
      }
      //そのトークンを複合する。
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId
}
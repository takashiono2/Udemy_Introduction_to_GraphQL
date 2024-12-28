const jwt = require("jsonwebtoken");
APP_SECRET = "GraphQL-is-aw3some";

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

// function getUserId(req) {
//   const authHeader = req.headers.authorization;  // Authorizationヘッダーの取得
//   if (authHeader) {
//     const token = authHeader.replace("Bearer ", "").trim();  // "Bearer "を削除
//     if (!token) {
//       throw new Error("トークンが見つかりませんでした");
//     }
//     try {
//       const { userId } = jwt.verify(token, APP_SECRET);  // JWTを検証し、userIdを取得
//       return userId;
//     } catch (e) {
//       throw new Error("トークンが無効です");
//     }
//   }
//   throw new Error("認証権限がありません");
// }

module.exports = {
  APP_SECRET,
  getUserId
}
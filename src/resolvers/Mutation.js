const bcrypt = require("bcriptjs");


// ユーザーの新規登録のリゾルバ
async function signup(parent, args, context) {
  //パスワードの設定
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });
}

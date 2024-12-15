const { gql, ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("/utils");

const prisma = new PrismaClient();

//HackerNewsの1つ1つの投稿
// let links = [
//   {
//     id: "link-0",
//     description: "GraphQLチュートリアルをUdemyで学ぶ",
//     url: "www.udemy-graphql-tutorial.com",
//   },
// ];

//リゾルバ関数
const resolvers = {
  Query: {
    info: () => 'HackerNews クローン',
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
  },

  Mutation: {
    post: (parent, args, context) => {
      const newlink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        }
      });
      return newlink;
    },
  },
};


const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      UserId: req && req.headers.authorization ? getUserId(req) : null,
    }
  },
});

server.listen().then(({ url }) => console.log(`${url}でサーバー起動中・・・`));

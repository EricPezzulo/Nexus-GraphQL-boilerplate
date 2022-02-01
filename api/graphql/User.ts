import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("username");
    t.string("email");
  },
});

export const GetUsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_root, _args, context) {
        return context.db.user.findMany();
      },
    });
  },
});

export const UserMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve(_root, args, context) {
        const newUser = {
          name: args.name,
          username: args.username,
          email: args.email,
        };
        return context.db.user.create({ data: newUser });
      },
    });
    t.nonNull.list.field("findUser", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_root, args, context) {
        console.log(args);
        return context.db.user.findMany({
          where: {
            email: args.email,
          },
        });
      },
    });

    // delete user
    // t.nonNull.list.field("deleteUser", {
    //   type: "User",
    //   args: {
    //     id: nonNull(stringArg()),
    //   },
    //   async resolve(_root, args, context) {
    //     return await context.db.user.delete({
    //       where: { id: args.id },
    //     });
    //   },
    // });
  },
});

export const DeleteUserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root, args, context) {
        console.log(args.id);
        return await context.db.user.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

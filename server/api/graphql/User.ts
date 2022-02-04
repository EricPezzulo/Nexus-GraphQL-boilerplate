import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t:any) {
    t.string("id");
    t.string("name");
    t.string("username");
    t.string("email");
    t.string("imageUrl");
  },
});

export const GetUsersQuery = extendType({
  type: "Query",
  definition(t:any) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_root:any, _args:any, context:any) {
        return context.db.user.findMany();
      },
    });
  },
});

export const UserMutations = extendType({
  type: "Mutation",
  definition(t:any) {
    t.field("createUser", {
      type: "User",
      args: {
        name: nonNull(stringArg()),
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
      },
      resolve(_root:any, args:any, context:any) {
        const newUser = {
          name: args.name,
          username: args.username,
          email: args.email,
          imageUrl: args.imageUrl,
        };
        return context.db.user.create({ data: newUser });
      },
    });
  },
});

export const FindUserMutation = extendType({
  type: "Query",
  definition(t:any) {
    t.nonNull.list.field("findUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
        // email: nonNull(stringArg()),
      },
      resolve(_root:any, args:any, context:any) {
        return context.db.user.findMany({
          where: {
            // email: args.email,
            id: args.id
          },
        });
      },
    })
  },
})
  


export const DeleteUserMutation = extendType({
  type: "Mutation",
  definition(t:any) {
    t.nonNull.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root:any, args:any, context:any) {
        return context.db.user.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

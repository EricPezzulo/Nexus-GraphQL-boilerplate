import { objectType, extendType, stringArg, nonNull, intArg } from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("body");
    t.boolean("published");
  },
});

export const GetPostDraftsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("drafts", {
      type: "Post",
      resolve(_root, _args, context) {
        return context.db.post.findMany({ where: { published: false } });
      },
    });
    t.list.field("posts", {
      type: "Post",
      resolve(_root, _args, context) {
        return context.db.post.findMany({ where: { published: true } });
      },
    });
  },
});

export const CreateDraftMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createDraft", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      resolve(_root, args, context) {
        const draft = {
          title: args.title,
          body: args.body,
          published: false,
        };
        return context.db.post.create({ data: draft });
      },
    });

    t.field("publish", {
      type: "Post",
      args: {
        draftId: nonNull(intArg()),
      },
      resolve(_root, args, context) {
        return context.db.post.update({
          where: { id: args.draftId },
          data: {
            published: true,
          },
        });
      },
    });
  },
});

// export const PublishDraft = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.field("publish", {
//       type: "Post",
//       args: {
//         draftId: nonNull(intArg()),
//       },
//       resolve(_root, args, context) {
//         const { draftId } = args;
//         let draftToPublish = context.db.post.findUnique(
//           (p) => p.id === draftId
//         );
//         if (!draftToPublish) {
//           throw new Error(`Could not find draft with id` + draftId);
//         }
//         draftToPublish.published = true;
//         return draftToPublish;
//       },
//     });
//   },
// });

// export const FetchPublishedPosts = extendType({
//   type: "Query",
//   definition(t) {
//     t.list.field("posts", {
//       type: "Post",
//       resolve(_root, _args, context) {
//         return context.db.posts.filter((p) => p.published === true);
//       },
//     });
//   },
// });

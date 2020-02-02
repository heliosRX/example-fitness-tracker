export default {
  create(_, { role }) {
    return {
      role: role || "member",
    };
  },
  fields: {
    role: { type: 'String' },
  },
};

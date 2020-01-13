export default {
  create(_, { role }) {
    return {
      role: role || "member",
    };
  },
  fields: {
    role: { validate_bolt_type: 'String' },
  },
};

export default {
  create({ username }) {
    return {
      username:  username || "Unknown user",
      picture:   '',
    };
  },
  fields: {
    username:  { validate_bolt_type: 'String', required: true },
    picture:   { validate_bolt_type: 'String' },
  },
};

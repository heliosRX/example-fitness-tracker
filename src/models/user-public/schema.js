export default {
  create({ username }) {
    return {
      username:  username || "Unknown user",
      picture:   '',
      about:     '',
    };
  },
  fields: {
    username:  { type: 'String', required: true },
    picture:   { type: 'String' },
    about:     { type: 'String' },
  },
};

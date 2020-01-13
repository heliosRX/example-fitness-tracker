import { moment } from "heliosrx"

export default {
  create({ username }) {
    return {
      username:  username || "Unknown user",
      createdAt: moment.currentTimeServer('REALTIMEDB'),
    };
  },
  fields: {
    username:  { validate_bolt_type: 'String', required: true },
    createdAt: { validate_bolt_type: 'ServerTimestamp' },
  },
};

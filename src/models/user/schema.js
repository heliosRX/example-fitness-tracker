import { moment } from "heliosrx";

export default {
  create({ username }) {
    return {
      username:    username || "Unknown user",
      createdAt:   moment.currentTimeServer('REALTIMEDB'),
      phonenumber: '',
    };
  },
  // unsafe_disable_validation: true,
  fields: {
    username:    { type: 'String', required: true },
    createdAt:   { type: 'ServerTimestamp' },
    phonenumber: { type: 'String' },
    groups:      { type: 'Map<AnyID, String>' },
    mytype:      { type: 'Type []' },
    // groups:      { type: 'Any' },
  },
};

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
    username:    { validate_bolt_type: 'String', required: true },
    createdAt:   { validate_bolt_type: 'ServerTimestamp' },
    phonenumber: { validate_bolt_type: 'String' },
    groups:      { validate_bolt_type: 'Map<AnyID, String>' },
    mytype:      { validate_bolt_type: 'Type []' },
    // groups:      { validate_bolt_type: 'Any' },
  },
};

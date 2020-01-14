import { moment } from 'heliosrx'

export default {
  create({ userId, value }) {
    return {
      createdAt: moment.currentTimeServer('REALTIMEDB'),
      value:     value,
      userId:    userId,
      // title:     title || "Undefined title",
      // isDone:    false,
    };
  },
  fields: {
    createdAt: { validate_bolt_type: 'ServerTimestamp' },
    userId:    { validate_bolt_type: 'UserID' },
    value:     { validate_bolt_type: 'Number' },
    // title:     { validate_bolt_type: 'String', required: true },
    // isDone:    { validate_bolt_type: 'Boolean' },
  },
};

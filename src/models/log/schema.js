import { moment } from 'heliosrx'

export default {
  create({ userId, value }, { date = null }) {
    return {
      date:      date || moment.currentTimeServer('REALTIMEDB'),
      value:     value,
      userId:    userId,
      // title:     title || "Undefined title",
      // isDone:    false,
    };
  },
  fields: {
    date:      { validate_bolt_type: 'Timestamp' },
    userId:    { validate_bolt_type: 'UserID' },
    value:     { validate_bolt_type: 'Number' },
    // title:     { validate_bolt_type: 'String', required: true },
    // isDone:    { validate_bolt_type: 'Boolean' },
  },
};

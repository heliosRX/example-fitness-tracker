import { moment } from 'heliosrx';

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
    date:      { type: 'Timestamp' },
    userId:    { type: 'UserID' },
    value:     { type: 'Number' },
    // title:     { type: 'String', required: true },
    // isDone:    { type: 'Boolean' },
  },
};

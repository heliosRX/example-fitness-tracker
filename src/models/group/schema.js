import { moment } from "heliosrx";

export default {
  create({ title }, { unit }) {
    return {
      title:       title || "",
      unit:        unit || "?",
      matchRegex:  '/^([0-9]+)\\w+min*$/',
			createdAt:   moment.currentTimeServer('REALTIMEDB'),
			description: null,
    };
  },
  fields: {
    title:       { type: 'String', required: true },
    unit:        { type: 'String' },
		matchRegex:  { type: 'String' },
    createdAt:   { type: 'ServerTimestamp' },
    description: { type: 'String' },
		members:     { type: 'GroupMember[]' },
  },
};

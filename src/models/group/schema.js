import { moment } from "heliosrx"

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
    title:       { validate_bolt_type: 'String', required: true },
    unit:        { validate_bolt_type: 'String' },
		matchRegex:  { validate_bolt_type: 'String' },
    createdAt:   { validate_bolt_type: 'ServerTimestamp' },
    description: { validate_bolt_type: 'String' },
		members:     { validate_bolt_type: 'GroupMember[]' },
  },
};

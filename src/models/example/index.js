import { getRegistry } from 'heliosrx'
import { moment } from "heliosrx";

export default {
  modelGetters: {
    mygetter: ( $instance,  $model, $models ) => {
      console.log("$instance", $instance)
      console.log("$model", $model)
      console.log("$models", $models)
      console.log("this", this) // undefined
      return -1;
    }
  },
  modelActions: {
    myaction({ $instance, $model, $models }, customArg1, customArg2) {
      console.log("$instance", $instance)
      console.log("$model", $model)
      console.log("$models", $models)
      console.log("customArg1", customArg1)
      console.log("customArg2", customArg2)
      console.log("this", this) // GenericModel = $model
      return 1;
    }
  },
  listGetters: {
    mygetter: ( $instance,  $model, $models ) => {
      console.log("$instance", $instance)
      console.log("$model", $model)
      console.log("$models", $models)
      console.log("this", this) // undefined
      return -2;
    }
  },
  listActions: {
    myaction({ $instance, $model, $models }, customArg1, customArg2) {
      console.log("$instance", $instance)
      console.log("$model", $model)
      console.log("$models", $models)
      console.log("customArg1", customArg1)
      console.log("customArg2", customArg2)
      console.log("this", this) // GenericModel = $model
      return 2;
    }
  },
  staticGetters: {
    mygetter: ( $model, $models ) => {
      console.log("$model", $model)
      console.log("$models", $models)
      console.log("this", this) // undefined
      return -3;
    }
  },
  staticActions: {
    myaction({ $model, $models }, customArg1, customArg2) {
      console.log("$model", $model)
      console.log("$models", $models)
      console.log("$registry", getRegistry())
      console.log("customArg1", customArg1)
      console.log("customArg2", customArg2)
      console.log("this", this) // GenericStore = $model
      return 3;
    }
  },
  schema: {
    create({ username }) {
      return {
        username:    username || "Unknown user",
        createdAt:   moment.currentTimeServer('REALTIMEDB'),
      };
    },
    fields: {
      username:    { type: 'String', required: true },
      createdAt:   { type: 'ServerTimestamp' },
      groups:      { type: 'Map<AnyID, String>' },
      mytype:      { type: 'Type []' },
    },
  }
};

import GenericStore from 'heliosrx/src/store'
import taskModelDefinition from './task';

export const task = new GenericStore(
  '/tasks/*',
  taskModelDefinition
);

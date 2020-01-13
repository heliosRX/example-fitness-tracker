import * as userFunctions from './user.js'
import * as readyFunctions from './ready.js'

let apiFunctionList = {}

// if ( process.env.NODE_ENV === "CLI" ) {
//   Object.assign( apiFunctionList, adminFunctions );
//   // No HMR...
// }

Object.assign( apiFunctionList, authFunctions );
Object.assign( apiFunctionList, readyFunctions );

// TODO: Provide automatic help for API functions

if (module.hot) {
  module.hot.accept([
    './auth',
    './ready',
  ], (filename) => {

    // Parse "./src/api/<moduleName>.js"
    let moduleName = filename[0].split('/').reverse()[0];
    console.log("[HMR*] update api %c<" + moduleName + ">", 'color: #42b983');

    // Path must be hardcoded!
    let updatedModule;
    switch (moduleName) {
      case 'auth.js': updatedModule = require('./auth'); break;
      case 'ready.js': updatedModule = require('./ready'); break;
    }

    for ( let actionName in updatedModule ) {
      apiFunctionList[ actionName ] = updatedModule[ actionName ];
    }
  })
}

export default apiFunctionList;

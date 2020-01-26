<template>
  <div id="app">
		<component :is="layout" />
  </div>
</template>

<script>
import defaultLayout from '@/layout/default'
import emptyLayout from '@/layout/empty'
import resourceLoader from '@/resource-loader'
import { getRegistry } from 'heliosrx'
import { auth_logout } from '@/api/auth'

export default {
  name: "App",
  components: {
    defaultLayout,
		emptyLayout,
  },
  beforeCreate() {
    resourceLoader.afterAppStartsLoading();
  },
  mounted() {
    resourceLoader.afterAppMounted();
  },
  watch: {
    '$ready_auth' (ready) {
      if ( ready ) {
        this.defaultUserId = this.$models.user.defaultUserId;
      } else {
        // user signed out
        this.defaultUserId = null;
      }
    },
    '$ready_user' (ready) {
      // console.log("user is ready", ready)
      if ( ready ) {
        resourceLoader.afterUserReady(this.userData, this.$models.user.defaultUserId);
      }
    },
    'userReadonly.status': { // TODO: move to resource loader?
      handler( newUserReadonlyStatus ) {
        if ( newUserReadonlyStatus === null ) {
          // We're not logged in yet
          return;
        }

        if ( newUserReadonlyStatus === undefined ) {
          // INFO: This would be the case if the authUserCreated is not executed,
          //       but then also this watcher is not triggerd!?

          // INFO: This happens, when we load the user before CF has created status = 'init',
          //       which will happen!

          // console.log("[load] User attached, but still waiting for user account")
          return;
        }

        // INFO: Status will be 'loading' before any data is received
        if ( newUserReadonlyStatus === 'loading' ) {
          return;
        }

        if ( newUserReadonlyStatus === 'init' ) {
          // resourceLoader.attachUser() // Second chance...
          resourceLoader.afterUserInitialized( this.userReadonly );
        }

        if ( newUserReadonlyStatus === 'init' || newUserReadonlyStatus === 'creating' ) {
          this.waitingForContent = true; // not used anymore?
        }

        if ( newUserReadonlyStatus === 'active' && this.waitingForContent ) {
          // only triggers when status: null -> init or creating -> active
          // does not work with reload

          /* User has just been activated */
          resourceLoader.afterUserContentCreated( this.userReadonly ).then(() => {
            this.waitingForContent = false;
          })
        }

        if ( /*( oldUserReadonly.status && newUserReadonly['.exists'] === false )
          ||*/ newUserReadonlyStatus === 'deleted'
          || newUserReadonlyStatus === 'inactive' ) {
          /* User was deleted on server side */
          // console.log("[load] **** BOOM - USER TERMINATED ****")
          auth_logout().then(() => {
            this.$router.push('/login');
          });
        }
      },
    },
  },
  computed: {
		layout() {
			return ( this.$route.meta.layout || 'default' ) + '-layout';
		},

    userReadonly() {
      if ( !this.loggedIn ) {
        return { status: null };
      }
      if ( this.defaultUserId && this.$ready_user ) {
        return this.$models.userReadonly.subscribeNode( this.defaultUserId );
      }
      return { status: 'loading' };
    },

    resourcesReady() {
      // DEBUG ! MOVE TO READY API
      return Object.keys(getRegistry().state.ready);
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

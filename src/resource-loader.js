/* eslint-disable no-unused-vars */

import firebase from '@firebase/app'
// import store from "@/store"
import $models from "@/models"
// import { GenericStore, resetGenericStores } from 'heliosrx'
import { resetGenericStores, GenericStore } from 'heliosrx'
import { rem_ready, set_ready } from '@/api/ready'
import { get_registry } from '@/api/misc'
// import { UserFeatureStore } from '@/features.js';

const DEFAULT_ROUTER_AFTER_LOGIN = '/';

// eslint-disable-next-line
const log1 = (...args) => { console.log('[load]', ...args) };
// eslint-disable-next-line
const log2 = (...args) => { /* console.log('[load*]', ...args) */ };

let router = {
  lastRouteRedirect: null,
  currentRoute: { query: {} },
  push( route ) {
    // eslint-disable-next-line
    console.warn("No router available, but resource manager wants to change route to", route );
    this.lastRouteRedirect = route;
  }
}

const ResourceLoader = {

  // stores display name before it is saved (for used signing in with password)
  displayName: null,

  // ---------------------------------------------------------------------------
  connectRouter( vue_router ) {
    var lastRouteRedirect = router.lastRouteRedirect
    log1("Got real router => lastRouteRedirect", lastRouteRedirect)

    /* After approx 500 ms the router is loaded, so replace fake router with
       real router and redirect to last redirect route passed to the fake router. */
    router = vue_router;

    if ( lastRouteRedirect ) {
      router.push( lastRouteRedirect );
    }
  },

  // ---------------------------------------------------------------------------
  onDatabaseConnect() {
    // eslint-disable-next-line
    console.log("[.info/conntected] connected");
    /*
    // If we are currently connected, then use the 'onDisconnect()'
    // method to add a set which will only trigger once this
    // client has disconnected by closing the app,
    // losing internet, or any other means.
    */
    // store.commit(`app/SET_CONNECTION_STATUS`, true);

    // INFO: Note that onDisconnect operations are only triggered once.
    //       If you want an operation to occur each time a disconnect occurs,
    //       you'll need to re-establish the onDisconnect operations each time
    //       you reconnect.

    /*
    let isOfflineForDatabase = {
      isOnline: false,
      lastSeen: firebase.database.ServerValue.TIMESTAMP,
    };

    let isOnlineForDatabase = {
      isOnline: true,
      lastSeen: firebase.database.ServerValue.TIMESTAMP,
    };

    $models.userStatus
      .childRef( $models.userStatus._get_uid() )
      .onDisconnect() // Setting up the onDisconnect hook
      .update(isOfflineForDatabase).then(() => {
        // eslint-disable-next-line
        console.log("[.info/conntected] onDisconnect hook acknowledged by server", isOnlineForDatabase);
        $models.userStatus.update( $models.userStatus._get_uid(), isOnlineForDatabase)
      });
    */
  },

  // ---------------------------------------------------------------------------
  onDatabaseDisconnect() {
    // eslint-disable-next-line
    console.log("[.info/conntected] disconnected");
    // store.commit(`app/SET_CONNECTION_STATUS`, false);
  },

  // ---------------------------------------------------------------------------
  async afterUserSignIn( user ) {

    log1("afterUserSignIn => login", user.uid);

    /* Set registry to ready */
    get_registry().commit('INIT_REGISTRY');

    // We don't know yet if the user exists in the database,
    // so we have to attach the user to check
    this.attachUser(user.uid); // user/{userid}/private/userdata

    // Get display name
    let displayName = user.displayName || this.displayName || 'New user'

    if ( user.additionalUserInfo && user.additionalUserInfo.isNewUser ) {
      await $models.userStatus.update( $models.userStatus._get_uid(), {
        displayName: displayName,
      })
    }
  },

  // ---------------------------------------------------------------------------
  afterUserSignOut() {

    // TODO: This also gets called, when user is not signed in at all

    log1("[afterUserSignOut] Logout! Resetting all data.")
    /* INFO: This will also be called when user is not signed in at all */

    // The reason why we store the user status in vuex is that it will
    // allow us to create and use a reactive getter on the user login state
    // TODO: move to app/*
    // store.commit("user/LOGOUT", null, { root: true });

    /* Clear instance cache */
    $models.userReadonly.reset_global_instance_cache();

    /* Reset user and remove all subscriptions */
    resetGenericStores();

    /* Reset registry */
    get_registry().commit('RESET_REGISTRY');

    // TODO: if we do this we dont need watcher
    // this.dettachAllTasklists();

    /* Clear regular Vuex store */
    // store.dispatch('clearAll');

    /* Set user id to null */
    // GenericStore.defaultUserId = null;
    GenericStore.resetState();

    /* Remove watcher tasklist list */
    if ( this.unwatch_tasklist_watcher ) {
      this.unwatch_tasklist_watcher();
    }

    /* Dettach all tasklists? */
    this.dettachAllTasklists(); // TODO: necessary?

    /* remove ready flags */
    setTimeout(() => {
      rem_ready( 'user' );
      rem_ready( 'auth' );

      // Initialize store for the next user
      this.initializeStores();

      /* WORKAROUND: Reload page, until the problems with persisting
         data are solved. Something is missing!
         - vuex store is reset
         - registry is reset
         - instance cache is reset
         - Registry is reset
         - defaultUserId is reset
      */
      location.reload();
      // location.replace('/login')

    }, 10)

  },

  // ---------------------------------------------------------------------------
  afterUserNoAuthentication() {

    log1("afterUserNoAuthentication")

    // We have to reset the user state! (= initialize!)
    // store.commit("user/LOGOUT", null, { root: true });

  },

  // ---------------------------------------------------------------------------
  afterUserRegistration(
    user = {},
    displayNameRegistrationForm = null,
    {
      isOAuth = false,
    } = {}
  ) {

    log1("afterUserRegistration", { isOAuth, displayNameRegistrationForm })

    /* For email sign up auth_update_display_name() is already calleda by auth_signup.
       For O-Auth sign up firebase takes care of it. */

    if ( user.uid ) {
      // Happens twice when signup by email, but it's ok
      GenericStore.defaultUserId = user.uid;
    }

    // set status
    // TODO: MAKE SURE defaultUserId is set !!!
    //       - worked - maybe skip for sign in with google
    if ( 'displayName' in user || displayNameRegistrationForm ) {
      $models.userStatus.update( $models.userStatus._get_uid(), {
        displayName: displayNameRegistrationForm || user.displayName,
        isOnline: true,
        lastSeen: firebase.database.ServerValue.TIMESTAMP,
      })
    }
  },

  // ---------------------------------------------------------------------------
  initializeStores() {
  },

  // ---------------------------------------------------------------------------
  beforeAppStartsLoading() {
    log1("beforeAppStartsLoading")

    this.initializeStores();

    /* Check if we're comming from a login redirect. Returns { user: null }
       when not redirect from O-Auth provider */
    firebase.auth().getRedirectResult().then((result) => {

      log1("beforeAppStartsLoading -> redirectResult", result)

      if ( result.user ) {

        if ( result.credential ) {
          /* This gives you a Google Access Token. You can use it to access the Google API. */
        }

        if ( result.additionalUserInfo.isNewUser ) {

          /* We just created a new user via O-Auth sign up */
          this.afterUserRegistration( result.user, null, { isOAuth: true })

        } else {

          router.push( router.currentRoute.query.redirect || DEFAULT_ROUTER_AFTER_LOGIN )
        }
      }
    }).catch(err => {
      throw err;
    })
  },

  // ---------------------------------------------------------------------------
  afterAppStartsLoading() {
    log2("afterAppStartsLoading", {});
  },

  // ---------------------------------------------------------------------------
  /* Called when the user was just initialized by the authUserCreated cloud function */
  afterUserInitialized( userReadonly ) {

    log1("afterUserInitialized");

    let userId = $models.user.defaultUserId;

    // CHECK: $models.userReadonly.getNode( newUserId ).status === 'init'
    // HACK: Because clientActivationRequest does not exist yet, but we need to update it

    // Just activate ...
    // auth_activate_user( userId )
  },

  // ---------------------------------------------------------------------------
  afterUserContentCreated( userReadonly ) {
    log1("afterUserContentCreated", userReadonly)

    // It makes sense to wait a little bit until tasklists finished loading

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        log1("afterUserContentCreated --- 1s TRIGGER")
        this.userReadonlyReady( userReadonly );

        // NEU !
        router.push( router.currentRoute.query.redirect || DEFAULT_ROUTER_AFTER_LOGIN )
        resolve();

      }, 3000) // HACK / WORKAROUND
    })
  },

  // ---------------------------------------------------------------------------
  afterAppMounted() {
    log2("afterAppMounted", {});
  },

  // ---------------------------------------------------------------------------
  afterUserReady(userData, authUserId) {

    // check if main tasklist exists
    log1('afterUserReady userData', userData, authUserId)

    if (userData.$ready && !userData.defaultTasklistId) {
      // create default tasklist
      // DONE in Cloud function now
      // xTODO: Check userReadonly if user is active
    }
  },

  // ---------------------------------------------------------------------------
  attachUser( authUserId ) {
    log1("attachUser");

    GenericStore.defaultUserId = authUserId;
    set_ready('auth')
    log1("set ready -> auth = true")
  },

  // ---------------------------------------------------------------------------
  /*
   * This is called as soon as the user settings are ready
   */
  userSettingsReady( /* userSettings */ ) {
  },

  // ---------------------------------------------------------------------------
  /*
   * This is called as soon as the user settings are ready
   */
  userReadonlyReady( /* userReadonly */ ) {
  },

  // ---------------------------------------------------------------------------
  attachContacts( /* authUserId */ ) {
  },

  // ---------------------------------------------------------------------------
  dettachAllContacts() {
  },

  // ---------------------------------------------------------------------------
  /*
   * Attaches a list of tasklists
   */
  attachTasklistList( /* tasklist_id_list, is_multi_tasklist_attach */ ) {
  },

  // ---------------------------------------------------------------------------
  /*
   * Attaches one tasklist
   */
  attachTasklist( /* tasklist_id, is_multi_tasklist_attach */ ) {
  },

  // ---------------------------------------------------------------------------
  /*
   * Dettaches alls tasklists
   */
  dettachAllTasklists() {
  },

  // ---------------------------------------------------------------------------
  /*
   * Dettaches one tasklist
   */
  dettachTasklist( /* tasklist_id, { delete_state = true, remove_settings = false } = {} */ ) {
  }
}

export default ResourceLoader;

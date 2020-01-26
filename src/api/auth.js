// import firebase from "@firebase/app";
import { auth } from '@/firebase';
import { auth as firebaseAuth } from "firebase/app";

// ----------------------------------------------------------------------------
export async function auth_signup({ userEmail, userPassword, userName }) {
  return auth
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((credential) => {
      auth_update_display_name({ displayName: userName }) // async
      return credential
    });
}

// ----------------------------------------------------------------------------
let userLoaded = false;
export async function auth_current_user() {
  return new Promise((resolve, reject) => {
     if (userLoaded) {
        resolve( auth.currentUser );
     }
     const unsubscribe = auth.onAuthStateChanged(user => {
        userLoaded = true;
        unsubscribe();
        resolve(user);
     }, reject);
  });
}

// ----------------------------------------------------------------------------
/* Return true if user is logged in, false if user is not logged in and 'null'
   if user authentication is still in progress */
export function auth_user_is_logged_in() {
  return userLoaded ? !!auth.currentUser : null;
}

// ----------------------------------------------------------------------------
export async function auth_login_with_provider({ providerName, rememberMe }) {
  console.log("[auth] login_with_provider", providerName);

  // if user is already logged in return
  if ( auth.currentUser ) {
    return;
  }

  let provider = null;
  switch (providerName) {
    case "google":
      provider = new firebaseAuth.GoogleAuthProvider();
      break;
    case "twitter":
      provider = new firebaseAuth.TwitterAuthProvider();
      break;
    case "facebook":
      provider = new firebaseAuth.FacebookAuthProvider();
      break;
    case "github":
      provider = new firebaseAuth.GithubAuthProvider();
      break;
    case "oauth":
      provider = new firebaseAuth.OAuthProvider();  /* TODO */
      break;
  }
  let persistenceSetting = rememberMe
    ? firebaseAuth.Auth.Persistence.LOCAL
    : firebaseAuth.Auth.Persistence.SESSION;

  return auth
    .setPersistence(persistenceSetting)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.

      // New sign-in will be persisted with session persistence.
      // let result = auth.signInWithPopup(provider);
      let result = auth.signInWithRedirect(provider);
      console.log("[auth] succesfully logged in", result);
    })
    .catch(error => {
      // Handle Errors here.
      console.log("[auth] error while logging in", error);
    });
}

// ----------------------------------------------------------------------------
export async function auth_login_with_email_and_password({
  userEmail,
  userPassword,
  rememberMe,
}) {

  if ( auth.currentUser ) {
    return;
  }

  function handleError(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.warn("Login Error:", errorCode, errorMessage);
    return error;
  }

  // TODO: Refactor
  var result = '';
  try {
    if (!rememberMe) {
      result = auth.currentUser;
      if (result !== null) {
        return result;
      }

      let persistenceSetting = rememberMe
        ? firebaseAuth.Auth.Persistence.LOCAL
        : firebaseAuth.Auth.Persistence.SESSION;

      return await auth
        .setPersistence(persistenceSetting)
        .then(() => {
          return auth
            .signInWithEmailAndPassword(userEmail, userPassword)
            .catch(handleError);
        })
        .catch(handleError);
    } else {
      result = auth.currentUser;
      if (result === null) {

        result = await auth
          .signInWithEmailAndPassword(userEmail, userPassword)
          .catch(handleError);
      }
      return result;
    }
  } catch (error) {
    console.log("[auth] Exception not handles during login", error);
  }
}

// ----------------------------------------------------------------------------
export async function auth_logout() {
  try {
    await auth.signOut();
  } catch (error) {
    console.log("[auth] error", error);
  }
}

// ----------------------------------------------------------------------------
export function auth_forgot_password({ userEmail }) {
  // TODO: validate input
  if ( !userEmail ) {
    throw new Error('Invalid input', userEmail);
  }
  return auth.sendPasswordResetEmail( userEmail );
}

// ----------------------------------------------------------------------------
export function auth_update_password({ userPassword }) {
  /* Returns promise */
  let user = auth.currentUser;
  return user.updatePassword(userPassword);
}

// ----------------------------------------------------------------------------
// Currently not used
export async function auth_check_if_user_exists({ userEmail }) {
  let results = await auth.fetchSignInMethodsForEmail(userEmail);
  return results[0] !== undefined;
}

// -----------------------------------------------------------------------------
export async function auth_update_display_name({ displayName }) {
  return auth.currentUser.updateProfile({
    displayName: displayName,
  })
}

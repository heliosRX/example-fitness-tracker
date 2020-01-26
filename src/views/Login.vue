<template>
  <div class="login-view">
    <div class="column column-50 column-offset-25">
      <form @submit.prevent>
        <fieldset>
          <h1 class="h1 text-center">Login</h1>
          <div class="card error" v-if="error">{{error}}</div>
          <label for="username">E-Mail</label>
          <input
            type="text"
            placeholder="E-mail"
            v-model="form.userEmail" />
          <label for="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            v-model="form.userPassword" />
          <label for="remeber">Remember me?</label>
          <input
            type="checkbox"
            v-model="form.rememberMe" />
					<div class="row">
						<div class="column">
							<button @click="onLogin">Login</button>
						</div>
						<div class="column">
							<button @click="onForgotPassword" class="button-outline">Forgot Password</button>
						</div>
					</div>
        </fieldset>
      </form>
    </div>
    <hr />
    <section class="row">
			<div class="column">
				<button class="button-primary mx-auto" @click="onLoginWithGoogle">
					Sign In with <strong>Google</strong>
				</button>
			</div>
    </section>
  </div>
</template>

<script>
import {
	auth_login_with_email_and_password,
	auth_login_with_provider,
	auth_forgot_password, } from '@/api/auth'

export default {
  data() {
    return {
      error: null,
      form: {
        userEmail: "",
        userPassword: "",
        rememberMe: true,
      },
    };
  },
  methods: {
    onLogin() {
      auth_login_with_email_and_password( this.form ).then((res) => {
        if ( res && res.code ) {
          this.error = res.message;
        } else {
          this.$router.push('/');
        }
      });
    },
    onLoginWithGoogle() {
      auth_login_with_provider({
        providerName: 'google',
        rememberMe: this.form.rememberMe,
      }).then((res) => {
        if ( res && res.code ) {
          this.error = res.message;
        } else {
          this.$router.push('/');
        }
      })
    },
		onForgotPassword() {
			auth_forgot_password( this.form );
		},
  },
}
</script>

<style>
.login-view {
  border: 1px solid grey;
  border-radius: 3px;
  max-width: 50%;
  padding: 2em;
  margin: 0 auto;
}
.login-view form input[type="text"],
.login-view form input[type="password"],
.login-view form button,
.login-view form label {
  display: block;
  width: 95%;
}
</style>

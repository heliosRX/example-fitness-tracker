<template>
  <div class="about" v-if="user">
    <h1>This is the profile page</h1>
    <pre>{{foobar}}</pre>
    <pre>{{user}}</pre>
		<pre>{{userPromise}}</pre>
		<pre>{{dbUser}}</pre>
    <pre>{{$models.user.schema_all_fields}}</pre>
    <input placeholder="Username" v-model="username" />
		<button @click="onCreateAccount">create my account</button>
  </div>
</template>

<script>
// import { registry } from 'heliosrx'
import { getRegistry } from "heliosrx"
import { auth_current_user } from '@/api/auth'
// import { auth_current_user, auth_user_is_logged_in } from '@/api'

export default {
  data() {
    return {
      username: "Unknown",
      user: null,
    }
  },
  mounted() {
    auth_current_user().then(user => {
      this.user = user;
    });
  },
  computed: {
		dbUser() {
			return this.$models.user.subscribeNode( this.$models.user.defaultUserId );
		},
    logged_in() {
      // return auth_user_is_logged_in()
      return null;
    },
    foobar() {
      return getRegistry().state.ready;
    },
    userPromise() {
      return auth_current_user();
    },
	},
	methods: {
		onCreateAccount() {
			this.$models.user.update( this.$models.user.defaultUserId, {
				username: this.username,
			});

      this.$models.userPublic.update( this.$models.user.defaultUserId, {
				username: this.username,
        picture: `https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 100)}.jpg`,
			});
		},
  }
}
</script>

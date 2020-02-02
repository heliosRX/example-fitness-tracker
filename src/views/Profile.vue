<template>
  <div class="about" v-if="user">
    <h1>Profile</h1>

    <form v-if="dbUser.$state[ '.exists' ] !== false" @submit.prevent>
      <fieldset>
        <label for="usernameField">Username</label>
        <input
          type="text"
          placeholder="Username"
          v-model="dbUserPublic.username"
          id="usernameField" />

        <label for="pictureField">Picture URL</label>
        <input
          type="url"
          placeholder="http://..."
          v-model="dbUserPublic.picture"
          id="pictureField" />

        <label for="phonenumberField">Phone number</label>
        <input
          type="tel"
          placeholder="+1 (234) 567890"
          v-model="dbUser.phonenumber"
          id="phonenumberField" />

        <label for="commentField">Comment</label>
        <textarea
          v-model="dbUserPublic.about"
          placeholder="About myself …"
          id="commentField" />

        <button class="button button-large" @click="onUpdateAccount">Update my account</button>
        <button class="button button-large button-danger ml-2" @click="onDeleteAccount">Delete my account</button>
        <!--
        <div class="float-right">
          <input type="checkbox" id="confirmField">
          <label class="label-inline" for="confirmField">Send a copy to yourself</label>
        </div>
        <input class="button-primary" type="submit" value="Send">
        -->
      </fieldset>
    </form>
    <div v-else>
      <button class="button button-large button-black" @click="onCreateAccount">Create my account</button>
    </div>

    <hr />

    <div class="container">
      <h2>DEBUG</h2>
      <pre>groups: {{dbUser.groups}}</pre>
      <div class="row">
        <input class="column column-40 m-2" type="text" v-model="debug.groupId" />
        <input class="column column-40 m-2" type="text" v-model="debug.groupName" />
        <button class="column m-2 button button-large" @click="debugOnAddGroup">ADD</button>
        <button class="column m-2 button button-large" @click="debugOnRemGroup">REM</button>
      </div>
    </div>

    <hr />
    <pre>user.schema: {{$models.user.schemaAllFields}}</pre>
    <pre>userPublic.schema: {{$models.userPublic.schemaAllFields}}</pre>
    <pre>dbUser: {{dbUser}}</pre>
		<pre>dbUserPublic: {{dbUserPublic}}</pre>
    <pre>authUser: {{user}}</pre>
    <pre>registry-ready: {{getRegistry}}</pre>
  </div>
</template>

<script>
import { getRegistry } from "heliosrx"
import { auth_current_user } from '@/api/auth'

export default {
  data() {
    return {
      username: "Unknown",
      user: null,
      debug: {
        groupId: "-LzTcZ5qnUWTa2tigkzf",
        groupName: "Name",
      },
    }
  },
  mounted() {
    auth_current_user().then(user => {
      this.user = user;

      this.$watch('dbUserPublic.$ready' , ready => {
        if ( ready ) {
          console.log("ready!")
          console.log("dbUser", this.dbUser)
        }
      });
    });
  },
  computed: {
		dbUser() {
			return this.$models.user.subscribeNode( this.$models.user.defaultUserId );
		},
    dbUserPublic() {
			return this.$models.userPublic.subscribeNode( this.$models.user.defaultUserId );
		},
    getRegistry() {
      return getRegistry().state.ready;
    },
	},
	methods: {
    onUpdateAccount() {
      this.dbUser.write();
      this.userPublic.write();
    },

    onDeleteAccount() {
      // TODO
    },

		onCreateAccount() {
			this.$models.user.update( this.$models.user.defaultUserId, {
				username: this.username,
			});

      this.$models.userPublic.update( this.$models.user.defaultUserId, {
				username: this.username,
        picture: `https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 100)}.jpg`,
			});
		},

    debugOnAddGroup() {
      let groupId = this.debug.groupId;

      // this.$models.user.update( this.$models.user.defaultUserId, {
      //   groups: {
      //     [groupId]: this.debug.groupName
      //   }
      // })

      // TODO helios: Implement updateNested()
      // TODO helios: Fix nested schema validation
      // TODO RECIPE

      this.$models.user.update( this.$models.user.defaultUserId, {
        [`groups/${groupId}`]: this.debug.groupName
      })
    },

    debugOnRemGroup() {
      let groupId = this.debug.groupId;

      // this.$models.user.update( this.$models.user.defaultUserId, {
      //   groups: {
      //     [groupId]: null
      //   }
      // })

      this.$models.user.update( this.$models.user.defaultUserId, {
        [`groups/${groupId}`]: null
      })
    }
  }
}
</script>

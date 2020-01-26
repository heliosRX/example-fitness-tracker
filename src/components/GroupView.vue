<template>
  <div v-if="group.$ready">

    <h1>
      {{group.title}}
      <router-link :to="`/group/${groupId}/edit`">
        <i class="icon ion-ios-cog" style="float:right" />
      </router-link>
    </h1>

    <p v-if="group.description" class="group-description">
      {{group.description}}
    </p>

    <ChallengeTable
      :group-id="groupId"
      :logs-all="logsAll"
      :users="members"
      @member-add="onAddNewMember" />

		<!--
    <div class="log-list">
			<ul>
				<li v-for="log in logs.items" :key="log.$key">
					[User:{{log.userId}}]
					logged
					{{log.value}}
					<a href="#" @click.prevent="deleteItem( log ) /* log.remove() */">
						<i class="icon ion-md-trash" />
					</a>
				</li>
			</ul>
			<input type="number" v-model="value" @keyup.enter="addItem" />
			<button @click="addItem">Add Item</button>
		</div>
    -->

    <!-- <pre>logsByUser:     {{logsByUser}}</pre> -->
    <!-- <pre>members:        {{members}}</pre> -->
    <!-- <pre>groupId:        {{groupId}}</pre> -->
    <!-- <pre>group.$ready:   {{group.$ready}}</pre> -->
    <!-- <pre>logs.$readyAll: {{logs.$readyAll}}</pre> -->
    <!-- <pre>group:          {{group}}</pre> -->
	</div>
	<div v-else class="loading">
		Loading...
		<i class="icon ion-md-refresh ion-spin" />
	</div>
</template>

<script>
import ChallengeTable from "@/components/ChallengeTable.vue"

export default {
  components: {
    ChallengeTable,
  },
  props: {
    groupId: {
      type: String,
      required: true,
    }
  },
  // data() {
  //   return {
  //     value: 1,
  //   };
  // },
  created() {
  },
  computed: {
    members() {
      let members = this.$models
        .groupMember
        .with({ groupId: this.groupId })
        .getList()
        .itemsAsArray();

      // this.$models.randomid = 232144564654

      members.forEach(member => {
        member.public = this.$models.userPublic.subscribeNode( member.$id );
        // this._helios_subscriptions.push( ... )
      });

      return members;

      // return [
      //   { userId: 'afNcxkBmlXbozP2aSeITiD5e4AJ2', username: "A", picture: 'https://randomuser.me/api/portraits/women/21.jpg' },
      //   { userId: 'afNcxkBmlXbozP2aSeITiD5e4AJ2', username: "B", picture: 'https://randomuser.me/api/portraits/men/84.jpg' },
      //   { userId: 'afNcxkBmlXbozP2aSeITiD5e4AJ2', username: "C", picture: 'https://randomuser.me/api/portraits/women/22.jpg' },
      // ];
    },
    logsAll() {
      return this.logs.itemsAsArray();
      // return {
      //   'A0': this.logs.itemsAsArray(),
      //   'B0': this.logs.itemsAsArray(),
      //   'C0': this.logs.itemsAsArray(),
      // };
    },
    group() {
			return this.$models.group.subscribeNode( this.groupId );
    },
    logs() {
      // return { '$readyAll': true };
      // return this.$models.log.with({ groupId: this.groupId }).subscribeList();
      if ( this.group.$ready ) {
				return this.$models.log.with({ groupId: this.groupId }).getList();

        // console.log("this.groupXX", this.group)
        // return this.group.logs;
      }
      return { '$readyAll': false };
    }
  },
  methods: {
    addItem() {
      this.$models.log.with({ groupId: this.groupId }).add({
        userId: this.$models.user.defaultUserId,
        value: parseFloat( this.value ),
      });
      this.value = "";
    },
    deleteItem( log ) {
      // log.remove();
      this.$models.log.with({ groupId: this.groupId }).remove( log.$id );
    },
    onAddNewMember() {
      let userId = prompt();
      if ( userId ) {
        this.$models.groupMember.with({ groupId: this.groupId  }).add({}, userId);
      }
    },
    // checkTask( log ) {
    //   log.update({ isDone: !log.isDone })
    // }
  }
}
</script>

<style>
.group-description {
  border-radius: 0.25rem;
  background: #eee;
  padding: 1rem;
  margin: 1rem 0;
}

.loading {
  text-align: center;
  font-size: 20pt;
  min-height: 140px;
  margin-top: 100px;
}

.ion-spin {
  font-size: 20pt;
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}

/*
.log-list {
  margin: 0 2em;
  padding: 2em;
  border: 2px solid grey;
}

.log-list .icon {
  color: black;
}

.log-list .icon.ion-md-trash {
  color: #cc5050;
}

.log-list ul {
  padding: 0;
}

.log-list li {
  list-style: none;
  font-size: 20pt;
  padding: 0 0.5em;
}

.log-list button,
.log-list input {
  margin-right: 0.5em;
  font-size: 20pt;
  border: 2px solid black;
}

.log-list input:focus {
  outline: none;
}

.log-list li:hover {
  background: #eee;
}
*/
</style>

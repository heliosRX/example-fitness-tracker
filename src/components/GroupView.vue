<template>
  <div v-if="group.$ready && logs.$readyAll">
		<h1>{{group.title}}</h1>
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
	</div>
	<div v-else class="loading">
		Loading...
		<i class="icon ion-md-refresh ion-spin" />
		<pre>groupId:        {{groupId}}</pre>
		<pre>group.$ready:   {{group.$ready}}</pre>
		<pre>logs.$readyAll: {{logs.$readyAll}}</pre>
		<pre>group:          {{group}}</pre>
	</div>
</template>

<script>
export default {
  props: {
    groupId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      value: 1,
    };
  },
  created() {
  },
  computed: {
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
        value: parseFloat( this.value )
      });
    },
    deleteItem( log ) {
      // log.remove();
      this.$models.log.with({ groupId: this.groupId }).remove( log.$id );
    },
    // checkTask( log ) {
    //   log.update({ isDone: !log.isDone })
    // }
  }
}
</script>

<style>
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

.log-list .loading {
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
</style>

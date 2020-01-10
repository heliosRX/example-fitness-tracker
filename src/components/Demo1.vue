<template>
  <div class="todo-list">
    <ul v-if="tasks.$readyAll">
      <li v-for="task in tasks.itemsAsArray()" :key="task.$key">
        <a href="#" @click.prevent="checkTask( task )" style="text-decoration: none">
          <i :class="['icon',
            task.isDone
              ? 'ion-md-checkbox-outline'
              : 'ion-md-square-outline']" />
        </a>
        {{task.title}}
        <a href="#" @click.prevent="deleteItem( task )">
          <i class="icon ion-md-trash" />
        </a>
      </li>
    </ul>
    <div v-else class="loading">
      Loading...
      <i class="icon ion-md-refresh ion-spin" />
    </div>
    <input v-model="title" @keyup.enter="addItem" />
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  computed: {
    tasks() {
      return this.$models.task.subscribeList();
    }
  },
  methods: {
    addItem() {
      this.$models.task.add({ title: this.title });
      this.title = "";
    },
    // $models.user.subscribeNode() // /user/{userId}
    // $models.task.subscribeList()
    // $models.task.queryList({ user })
    deleteItem( task ) {
      // /user/{userId}/task/{taskId}
      this.$models.task.remove( task.$id );
    },
    checkTask( task ) {
      // task.update({ isDone: !task.isDone })
      task.update({ isDone: !task.isDone })

      // this.$models.task.update( task.$id, {
      //   isDone: !task.isDone
      // })
    }
  }
}
</script>

<style>
.todo-list {
  margin: 0 2em;
  padding: 2em;
  border: 2px solid grey;
}

.todo-list .icon {
  color: black;
}

.todo-list .icon.ion-md-trash {
  color: #cc5050;
}

.todo-list ul {
  padding: 0;
}

.todo-list li {
  list-style: none;
  font-size: 20pt;
  padding: 0 0.5em;
}

.todo-list button,
.todo-list input {
  margin-right: 0.5em;
  font-size: 20pt;
  border: 2px solid black;
}

.todo-list input:focus {
  outline: none;
}

.todo-list li:hover {
  background: #eee;
}

.todo-list .loading {
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

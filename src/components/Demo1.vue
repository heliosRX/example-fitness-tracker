<template>
  <div v-if="tasks.$readyAll">
    <ul>
      <li v-for="task in tasks.itemsAsArray()" :key="task.$key">
        <a href="#" @click.prevent="checkTask( task )" style="text-decoration: none">
          {{ task.isDone ? '✅' : '⏹️' }}
        </a>
        {{task.title}}
        <a href="#" @click.prevent="deleteItem( task )">del</a>
      </li>
    </ul>
    <input v-model="title" @keyup.enter="addItem" />
    <button @click="addItem">Add Item</button>
  </div>
  <div v-else>
    Loading...
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

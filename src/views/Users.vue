<template>
  <div class="users-view">
    <ul>
      <li v-for="user in users" :key="user.$id">
        <img :src="user.picture" class="avatar" />
        <strong>{{user.username}}</strong>: {{user.$id}}
      </li>
    </ul>
    <!-- <pre>{{users}}</pre> -->
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$models.userPublic.subscribeList().itemsAsArray();
    },
  },
}
</script>

<style>
</style>

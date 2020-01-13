<template>
  <div id="app">
		<component :is="layout" />
  </div>
</template>

<script>
import defaultLayout from '@/layout/default'
import emptyLayout from '@/layout/empty'
import resourceLoader from '@/resource-loader'

export default {
  name: "App",
  components: {
    defaultLayout,
		emptyLayout,
  },
  watch: {
  },
  computed: {
		layout() {
			return ( this.$route.meta.layout || 'default' ) + '-layout';
		},
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

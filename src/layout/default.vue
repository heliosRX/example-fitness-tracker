<template>
  <div class="default">
    <header class="Header">
      <div class="row">
        <div class="column column-0" style="flex: 0 0 40px; padding: 0">
          <img src="@/assets/logo.svg" height="32px" />
        </div>
        <div class="column column-0">
          <div class="Logo Logo--full" aria-label="Challenge App">
            <router-link class="Link" to="/">
              Challenge App
            </router-link>
          </div>
        </div>
        <div class="column"></div>
        <div class="column column-0">
          <nav class="Navigation">
            <ul class="List">
              <li class="Navigation__item">
                <router-link class="Link" to="/users">Users</router-link>
              </li>
							<!--
              <li class="Navigation__item">
                <router-link class="Link" to="/">Home</router-link>
              </li>
              <li class="Navigation__item">
                <router-link class="Link" to="/profile">Profile</router-link>
              </li>
              <li class="Navigation__item">
                <router-link class="Link" to="/login">Login</router-link>
              </li>
							-->
							<li class="Navigation__item">
                <router-link class="Link" to="/about">How it works</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <div class="Sidebar">
			<sidebar-menu />
    </div>
    <main class="Content">
      <router-view />
    </main>
	</div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu'
export default {
	components: {
		SidebarMenu,
	},
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>

<style>
.Header {
  border-bottom: 1px solid grey;
  height: 50px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  right: 0;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;

  display: flex;
  justify-content: center;
  align-items: center;
	padding: 0 2rem;
}
.Header .Navigation {
  position: absolute;
  right: 1rem;
  height: 50px;
  /* top: 35%; */
}
.Header .Logo {
  float: left;
}
.Logo--full {
  display: inline-block;
  /* height: 6.2rem;
  margin-top: -1rem; */
}
.Logo {
  fill: #86addb;
  overflow: hidden;
}
.Link .Icon {
  fill: #606c76;
}
.Icon:not(:root) {
  overflow: visible;
}
.List {
  list-style: none;
  list-style-margin-bottom: 3.75rem;
}
.Navigation__item {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  justify-content: flex-end;
  margin: 0;
  position: relative;
  width: 12rem;
}
.Sidebar {
  width: 225px;
  flex: 1 1 225px;
  min-height: calc(100vh - 50px);
  background: #eee;
  margin: 0;
  padding: 1rem;

  font-size: 16px;
  background-color: #fff;
  width: 225px;
  position: fixed;
  z-index: 10;
  top: 50px;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
}
.Content {
  padding-left: 225px;
  display: block;
}
.Content > * {
  margin: 0 auto;
  padding: 8rem 4rem;
}
</style>

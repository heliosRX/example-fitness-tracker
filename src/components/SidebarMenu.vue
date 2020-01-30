<template>
	<ul class="sidebar-menu">
		<!-- <pre>menuList:{{menuList}}</pre> -->
		<li v-for="menuItem in menuList" :key="menuItem.name">
			<router-link :to="menuItem.url">
				{{menuItem.name}}
			</router-link>
		</li>
		<li>
			<a href="#" @click.prevent="onAddGroup">
				<div class="flex">
					<AddIcon w="24px" h="24px" class="mr-1" />
					Add new group
				</div>
			</a>
		</li>
		<li class="sidebar-menu-bottom">
			<a href="#" @click.prevent="onLogout">
				<div class="flex">
					<LogOutIcon w="24px" h="24px" class="mr-1" />
					<span>Logout</span>
				</div>
			</a>
			<router-link to="/profile">
				<div class="flex">
					<PersonIcon w="24px" h="24px" class="mr-1" />
					<span>Profile</span>
				</div>
			</router-link>
		</li>
	</ul>
</template>

<script>
import PersonIcon from 'vue-ionicons/dist/ios-person.vue'
import LogOutIcon from 'vue-ionicons/dist/ios-log-out.vue'
import AddIcon from 'vue-ionicons/dist/ios-add.vue'

import { auth_logout } from '@/api/auth'

export default {
	components: {
		PersonIcon,
		LogOutIcon,
		AddIcon,
	},
  data: () => ({
		// menu: [
		// 	{ url: '/group/1', name: "FOO 1" },
		// 	{ url: '/group/2', name: "FOO 2" },
		// 	{ url: '/group/3', name: "FOO 3" },
		// 	{ url: '/group/4', name: "FOO 4" },
		// 	{ url: '/group/5', name: "FOO 5" },
		// 	{ url: '/group/6', name: "FOO 6" },
		// ]
  }),
	computed: {
		groupList() {
			return this.$models.group.subscribeList();
      // return this.$models.group.subscribeQuery({
      //   key: 'members',
      //   value: this.$models.user.defaultUserId,
      // })
		},

		menuList() {
			const userId = this.$models.user.defaultUserId;
			const relevantGroups = this.groupList.itemsAsArray().filter((group) => {
				const members = group.members || {};
				return userId in members;
			});

			return relevantGroups.map( item => {
				return {
					url: '/group/' + item.$id,
					name: item.title,
				}
			});
		}
	},
  methods: {
		onLogout() {
			auth_logout().then(() => {
				this.$router.push( "/login" );
			});
		},
		onAddGroup() {
			this.$router.push( "/group/new" );
		}
  }
}
</script>

<style>
ul.sidebar-menu {
	list-style: none;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 0;
}
ul.sidebar-menu li a:hover {
	background: #F8CB6F;
}
ul.sidebar-menu li a {
	display: block;
	color: black;
	font-weight: bold;
	padding: 0.5rem 1rem;
	border-radius: 6px;
}
.sidebar-menu-bottom {
	margin-top: auto;
	margin-bottom: 0;
}
</style>

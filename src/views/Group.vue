<template>
  <div class="group-view">
		<group-edit v-if="groupId === 'new'" :is-new="true" />
		<group-view v-else :group-id="groupId" />
		<!-- <pre>groupId: {{groupId}}</pre> -->
  </div>
</template>

<script>
import GroupView from '@/components/GroupView.vue'
import GroupEdit from '@/components/GroupEdit.vue'

export default {
	components: {
		GroupView,
		GroupEdit,
	},
  data: () => ({
  }),
  computed: {
		groupId() {
			return this.$route.params.groupId;
		}
	},
  methods: {},
}
</script>

<style>
</style>

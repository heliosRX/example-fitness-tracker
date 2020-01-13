<template>
  <div class="group-edit">

		<form @submit.prevent="onSave">
			<fieldset>

				<label for="nameField">Title</label>
				<input type="text" placeholder="My cool challenge …" v-model="group.title">

				<label for="ageRangeField">Unit</label>
				<select v-model="group.unit" id="ageRangeField">
					<option value="" disabled>Please select a unit</option>
					<option value="kg">kg</option>
					<option value="min">min</option>
					<option value="m">meter</option>
				</select>

				<label for="commentField">Description</label>
				<textarea
					placeholder="Optional text field …"
					v-model="group.description" />

				<!--
				<div class="float-left">
					<input type="checkbox">
					<label class="label-inline" for="confirmField">Send a copy to yourself</label>
				</div>
				-->

				<input class="button-primary" type="submit" value="Save" />
			</fieldset>
		</form>

		<pre>{{group}}</pre>
  </div>
</template>

<script>
export default {
	props: {
		isNew: {}
	},
  data: () => ({
		group: {},
  }),
	created() {
		this.group = this.$models.group.new_from_template();
	},
  methods: {
		onSave() {
			this.group.write().then( groupId => {
				this.$router.push( `/group/${groupId}` )
			});
		}
  }
}
</script>

<style>
</style>

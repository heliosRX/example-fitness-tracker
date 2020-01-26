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
          <option value="steps">steps</option>
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

        <input class="button button-primary" type="submit" value="Save" />
        <input class="button button-outline ml-2" type="submit" value="Cancel" @click.prevent="onCancel">
        <!-- <button class="button button-outline">Cancel</button> -->
			</fieldset>
		</form>

    <pre>isNew: {{isNew}}</pre>
    <pre>group: {{group}}</pre>
  </div>
</template>

<script>
export default {
	props: {
		isNew: {
      type: Boolean,
    },
    groupId: {
      type: String,
      default: "",
    }
	},
  data: () => ({
		group: {},
  }),
	created() {
    if ( this.isNew ) {
      this.group = this.$models.group.new_from_template();
    } else {
      this.group = this.$models.group.subscribeNode( this.groupId );
    }
    console.log("group", this.group)
	},
  methods: {
		onSave() {
      let userId = this.$models.user.defaultUserId;
      if ( !userId ) {
        alert("invalid user id");
      }
      this.group.members = {
        [userId]: { role: 'admin' },
      };
			this.group.write().then( groupId => {
        // user zur gruppe hinzufügen
        /* this.$models
          .groupMember
          .with({ groupId })
          .add({}, this.$models.user.defaultUserId).then(() => {
          });
        */
        this.$router.push( `/group/${groupId}` );
			});
		},
    onCancel() {
      if ( this.groupId ) {
        this.$router.push( `/group/${this.groupId}` )
      } else {
        this.$router.push( '/' )
      }
    }
  }
}
</script>

<style>
</style>

<template>
  <table class="challenge-table">
    <thead>
      <tr>
        <th></th>
        <th>
          Date
        </th>
        <th v-for="(user, index) in users" :key="getUserKey(user, index)">
          <!-- <slot name="user" :user="user">{{ getUserText(user) }}</slot> -->
          <img :src="user.public.picture" class="avatar" />
          <span>{{ user.public.username }}</span>
        </th>
        <th>
          <button v-if="isGroupAdmin" class="button-primary mx-auto" @click="onAddNewMember">
            Add new member
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in logTable" :key="getItemKey(row, index)">
        <td v-if="index === today">X</td>
        <td v-else></td>
        <td>{{ index|formatDate }}</td>
        <td
          v-for="(user, userIndex) in users"
          :key="`row-${getItemKey(row, index)}-${getUserKey(user, userIndex)}`"
        >
          {{ logTable[ index ][ user.$id ] || '-' }}
          <a class="show-on-hover" href="#" @click.prevent="onAddEntry( index, user.$id )">
            <span class="fa fa-add" />
            add
          </a>
          <!-- <input v-model="newEntry" /> -->
          <!-- {{ getItemValue(row, user) }} -->
        </td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>
          Sum
        </td>
        <td
          v-for="(user, userIndex) in users"
          :key="`sum-${getUserKey(user, userIndex)}`"
        >
          {{ sums[ user.$id ] || '0' }}
        </td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>
          Current Streak
        </td>
        <td
          v-for="(user, userIndex) in users"
          :key="`current-streak-${getUserKey(user, userIndex)}`"
        >
          {{ currentStreaks[ user.$id ] || '0' }}
        </td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>
          Longest Streak
        </td>
        <td
          v-for="(user, userIndex) in users"
          :key="`longest-streak-${getUserKey(user, userIndex)}`"
        >
          {{ longestStreaks[ user.$id ] || '0' }}
        </td>
        <td></td>
      </tr>
    </tbody>
    <!-- <pre>{{logTable}}</pre> -->
  </table>
</template>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'

export default {
  props: {
    groupId: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      default() {
        return [];
      },
    },
    logsAll: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  // data() {
  //   return {
  //     newEntry: 1,
  //   };
  // },
  computed: {
    dateRange() {
      const datelist = [];
      const start_date = dayjs('2020-01-20');
      const end_date = dayjs('2020-01-30');
      let day = start_date;
      while ( day < end_date ) {
        datelist.push( day );
        day = day.add(1, 'day');
      }
      return datelist;
    },
    logTable() { // O(n^3)
      let table = {};

      // this.users.forEach(user => { })
      this.dateRange.forEach(date => {
        // table[ date.format('YYYY-MM-DD') ] = {};
        Vue.set( table, date.format('YYYY-MM-DD'), {} );
      });


      this.logsAll.forEach(log => {
        // console.log("X", dayjs(log.date).format())
        // date.diff(dayjs(log.date), 'day') === 0

        //TODO: handle case, when log item is out of range
        let date = dayjs(log.date).format('YYYY-MM-DD');
        table[ date ] = table[ date ] || {};
        // table[ date ][ log.userId ] = log.value;
        Vue.set( table[ date ], log.userId, log.value );
      });

      // this.dateRange.forEach(date => {
      //   let user_logs = {};
      //   this.users.forEach(user => {
      //     let logs = this.logsByUser[ user.userId ] || [];
      //   })
      //   table[ date.format('YYYY-MM-DD') ] = user_logs;
      // })
      return table;
    },
    sums() {
      const sums = {};

      this.logsAll.forEach((log) => {
        sums[log.userId] = sums[log.userId] || 0;
        sums[log.userId] += log.value;
      });

      return sums;
    },
    currentStreaks() {
      return {};
    },
    longestStreaks() {
      return {};
    },
    hasUsers() {
      return this.users && this.users.length > 0;
    },
    isGroupAdmin() {
      const userId = this.$models.user.defaultUserId;
      const currentUser = this.users.find((user) => {
        return user.$id === userId;
      });

      return currentUser === undefined ? false : currentUser.role === 'admin';
    },
    today() {
      return dayjs().format('YYYY-MM-DD');
    },
  },
  methods: {
    getUserKey(user, index) {
      return (user && user.value) || index;
    },
    getUserText(user) {
      return (user && user.text) || '';
    },
    getItemKey(item, index) {
      return (item && item.value) || index;
    },
    getItemValue(item, user) {
      if (!item || !user || !user.value || !item[user.value]) {
        return '';
      }
      return item[user.value];
    },
    onAddNewMember() {
      this.$emit('member-add');
    },
    onAddEntry( index, userId ) {
      console.log("onAddEntry", index, userId );
      let value = prompt('Please provide value:');
      this.$models.log.with({ groupId: this.groupId }).add({
        userId:    userId,
        date:      dayjs( index ).unix(),
        value:     parseInt( value ),
      });
    }
  },
  filters: {
    formatDate( index ) {
      return dayjs( index ).format('DD. MMM YYYY');
    }
  }
};
</script>

<style media="screen">
.challenge-table td .show-on-hover {
  display: none;
}
.challenge-table td:hover .show-on-hover {
  display: inline;
}
.challenge-table td {
  border-right: 1px solid #fff;
}
.challenge-table tr:nth-child(odd) {
  background-color: #e1e1e1;
}
.challenge-table thead > tr > th {
  background-color: #fff;
}

</style>

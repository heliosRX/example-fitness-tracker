<template>
  <table class="challenge-table">
    <thead>
      <tr>
        <th style="width: 200px">
          Date
        </th>
        <th
          v-for="(user, index) in users"
          :key="getUserKey(user, index)"
          style="width: 260px">
          <div class="flex flex-center">
            <img :src="user.public.picture" class="avatar" />
            <span class="ml-1">{{ user.public.username }}</span>
          </div>
        </th>
        <th>
          <button v-if="isGroupAdmin" class="button-primary mx-auto" @click="onAddNewMember">
            Add new member
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in logTable"
        :key="getItemKey(row, index)"
        :class="{
          'is-today'   : index === todayIndex,
          'is-weekend' : isWeekend( index ),
          }">
        <td class="date-column">
          <span class="icon ion-md-arrow-forward" v-if="index === todayIndex" />
          {{ index|formatDate }}
        </td>
        <td
          v-for="(user, userIndex) in users"
          :key="`row-${getItemKey(row, index)}-${getUserKey(user, userIndex)}`"
          @click.prevent="onAddEntry( index, user.$id )"
          class="content-cell"
        >
          {{ logTable[ index ][ user.$id ] || '-' }}
          <a class="show-on-hover" href="#" >
            <span class="icon ion-md-create" />
          </a>
        </td>
        <td></td>
      </tr>
      <tr class="table-seperator">
        <td :colspan="users.length + 2"></td>
      </tr>
      <tr>
        <td class="date-column">
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
        <td class="date-column">
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
        <td class="date-column">
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
  computed: {
    dateRange() {
      const datelist = [];
      // const start_date = dayjs('2020-01-20');
      // const end_date = dayjs('2020-01-30');
      const end_date = dayjs();
      const start_date = end_date.subtract(14, 'days');
      let day = start_date;
      while ( day <= end_date ) {
        datelist.push( day );
        day = day.add(1, 'day');
      }
      return datelist;
    },
    logTable() {
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
    todayIndex() {
      return dayjs().format('YYYY-MM-DD');
    },
  },
  methods: {
    getUserKey(user, index) {
      return (user && user.value) || index;
    },
    getItemKey(item, index) {
      return (item && item.value) || index;
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
    },
    isWeekend( index ) {
      let weekday = dayjs( index ).format('d');
      return weekday === '0' || weekday === '6';
    },
  },
  filters: {
    formatDate( index ) {
      return dayjs( index ).format('ddd, DD. MMM YYYY');
    },
  }
};
</script>

<style>
.challenge-table tr.is-weekend td {
  color: #409c40;
}
.challenge-table tr.is-today td {
  background: #F8CB6F;
}
.challenge-table td.date-column {
  border-right: 1px solid rgba(0,0,0,0.1);
  font-family: monospace;
  font-weight: bold;
  text-align: center;
  padding-left: 1.5rem;
}
.challenge-table td, .challenge-table th {
  border: none;
}
.challenge-table td .show-on-hover {
  display: none;
}
.challenge-table td.content-cell:hover {
  box-sizing: border-box;
  box-shadow: inset 0px 0px 8px rgba(0,0,0,0.25);
  cursor: pointer;
}
.challenge-table td:hover .show-on-hover {
  display: inline;
}
.challenge-table tr:nth-child(odd) {
  background-color: #f5f5f5;
}
.challenge-table thead > tr > th {
  background-color: #fff;
}
table.challenge-table tbody td {
  /* border: 1px solid #e1e1e1; */
}
.challenge-table tr.table-seperator td {
  background: white;
  height: 50px;
}

</style>

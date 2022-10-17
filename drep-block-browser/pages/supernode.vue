<template>
  <div class="page">
    <Top />
    <div class="title-block">
      <div class="page-title">
        Supernode
      </div>
    </div>

    <!-- <v-container id="input-usage" grid-list-xl fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-input type="text" />
        </v-flex>
      </v-layout>
    </v-container> -->
    <!-- <div class="search">
      <input v-model="message" type="text" class="input" placeholder="Search Super Node Address" @input="onInput"
        @keyup.enter="submit">
      <span @click="submit">Search</span>
    </div> -->
    <div class="table-data table-data__actions">
      <v-data-table :headers="headers" :items="node" :loading="loading" loading-text="Loading... Please wait"
        hide-default-header hide-default-footer hide-default-footer :total-items="totalTxs" class="table">
        <template v-slot:items="props">
          <td>
            {{ props.index+1 }}
          </td>
          <td class="text-xs-right">
            <nuxt-link :to="{name: 'address',query: { address: props.item.address }}">
              {{ props.item.address }}
            </nuxt-link>
          </td>
          <td class="text-xs-right">
            {{ props.item.quantity }}
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import Top from '~/components/Top'
  import BigNumber from 'bignumber.js'
  export default {
    components: {
      Top
    },
    data() {
      return {
        totalTxs: 0,
        loading: true,
        headers: [{
            text: 'Ranking',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Supernode',
            value: 'calories',
            sortable: false
          },
          {
            text: 'Voting Power',
            value: 'fat',
            sortable: false
          }
        ]
      }
    },

    async asyncData(ctx) {
      try {
        const result = await ctx.$axios.$get('api/supernode', {})
        return {
          node: result.node.nodes,
          totalTxs: result.node.nodes.length,
          loading: false
        }
      } catch (error) {
        console.log(error)
        ctx.redirect('/error')
      }
    },
    methods: {

      getFormatAmount(amount) {
        return new BigNumber(amount).shiftedBy(-18).toFormat()
      },
      subAddr(addr) {
        return addr.substring(0, 10) + '......' + addr.substring(addr.length - 10, addr.length)
      },
      getTimeAgo(timestamp) {
        let runTime = (new Date() / 1000 - timestamp)
        const year = Math.floor(runTime / 86400 / 365)
        runTime = runTime % (86400 * 365)
        const month = Math.floor(runTime / 86400 / 30)
        runTime = runTime % (86400 * 30)
        const day = Math.floor(runTime / 86400)
        runTime = runTime % 86400
        const hour = Math.floor(runTime / 3600)
        runTime = runTime % 3600
        const minute = Math.floor(runTime / 60)
        runTime = runTime % 60
        const second = Math.floor(runTime)
        // console.log(year,month,day,hour,minute,second);
        let yearStr = ''
        if (year === -1) {
          return '1s ago'
        }
        if (year !== 0 && year > 0) {
          if (year === 1) {
            yearStr = '1 year ago'
          } else {
            yearStr = year + 'years' + ' ago'
          }
          return yearStr
        }

        let monthStr = ''
        if (month !== 0 && month > 0) {
          if (month === 1) {
            monthStr = '1 month ago'
          } else {
            monthStr = month + 'months' + ' ago'
          }
          return monthStr
        }
        let dayStr = ''
        if (day !== 0 && day > 0) {
          if (day === 1) {
            dayStr = '1 day ago'
          } else {
            dayStr = day + 'days' + ' ago'
          }
          return dayStr
        }
        let hourStr = ''
        if (hour !== 0 && hour > 0) {
          if (hour === 1) {
            hourStr = '1 hour ago'
          } else {
            hourStr = hour + 'hours' + ' ago'
          }
          return hourStr
        }
        let minStr = ''
        if (minute !== 0 && minute > 0) {
          if (minute === 1) {
            minStr = '1 min ago'
          } else {
            minStr = minute + 'mins' + ' ago'
          }
          return minStr
        }
        let secStr = ''
        if (second !== 0 && second > 0) {
          if (second === 1) {
            secStr = '1s ago'
          } else {
            secStr = Math.abs(second) + 's' + ' ago'
          }
          return secStr
        } else {
          return '1s ago'
        }
      },
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      timeFormate(ts) {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'August', 'September',
          'October', 'November', 'December'
        ]
        const time = new Date(ts)
        const y = time.getFullYear()
        const m = month[time.getMonth()]
        const d = time.getDate()
        const h = time.getHours()
        const mm = time.getMinutes()
        const s = time.getSeconds()

        return this.add0(m) + '-' + this.add0(d) + '-' + y + ' ' + this.add0(h) + ':' +
          this.add0(mm) + ':' + this.add0(s)
      }
    }
  }

</script>

<style>
  .table-data__actions .v-datatable__actions {
    display: none;
  }

</style>

<style scoped lang="scss">
  .table thead tr th {
    font-size: 13px;
    font-weight: bold;
    color: #000000 !important;
  }

  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  .title-block {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 0 auto;
    overflow: hidden;
  }

  .image {
    height: 21px;
    margin-top: 8px;
  }

  .page-title {
    margin-top: 11px;
    line-height: 62px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-left: 32px;
  }

  .text-xs-right {
    text-align: left !important;
    font-size: 13px !important;
  }

  .content {
    background: rgba(0, 0, 0, 1);
    opacity: 0.03;
  }

  table.v-table thead th {
    font-size: 13px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
  }

  .table-data {
    padding: 10px 10px;
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 76px auto;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    background-color: white;

    .table {
      .theadth {
        font-weight: 500;
        font-size: 13px;
        font-weight: bold;
      }

      .text-xs-left {
        font-size: 13px;
        font-weight: bold;
      }

      a {
        color: rgba(29, 126, 255, 1);
      }

      td {
        line-height: 60px;
        min-height: 60px;
      }

      tr {
        background: rgba(250, 250, 250, 1);
      }
    }
  }

  .theadth {
    font-weight: 500;
    font-size: 13px;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    .table thead tr th {
      font-size: 13px;
      font-weight: bold;
      color: #000000 !important;
    }

    .title-block {
      width: 90%;
      margin: 0 auto;
    }

    .title {
      font-size: 20px !important;
      margin-top: -25px;
      margin-left: 3rem;
    }

    .page-title {
      margin-left: 0px !important;
      margin-top: 0;
    }

    .table-data {
      padding: 10px 10px;
      width: 94%;
      max-width: 1200px;
      margin: 0 auto 76px auto;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      background-color: white;

      .table {
        .theadth {
          font-weight: 500;
          font-size: 13px;
          font-weight: bold;
        }

        .text-xs-left {
          font-size: 13px;
          font-weight: bold;
        }

        a {
          color: rgba(29, 126, 255, 1);
        }

        td {
          line-height: 60px;
          min-height: 60px;
        }

        tr {
          background: rgba(250, 250, 250, 1);
        }
      }
    }
  }

</style>

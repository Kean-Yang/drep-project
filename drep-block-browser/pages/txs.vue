<template>
  <div class="page">
    <Top />

    <div class="title-block">
      <div class="page-title">
        Transactions
      </div>
    </div>

    <div class="table-data">
      <v-data-table :headers="headers" :items="transactions" :pagination.sync="pagination" :loading="loading"
        loading-text="Loading... Please wait" :rows-per-page-items="pageItems" :total-items="totalTxs" class="table">
        <template v-slot:items="props">
          <td class="text-xs-left">
            <div class="homeData-Blocks-leaderaddress">
              <nuxt-link :to="{
                  name: 'tx',
                  query: { hash: props.item.hash }
                }">
                {{ props.item.hash }}
              </nuxt-link>
            </div>
          </td>
          <td class="text-xs-left">
            {{ getTimeAgo(props.item.timestamp) }}
          </td>
          <td class="text-xs-txs">
            <nuxt-link :to="{
                name: 'block',
                query: { height: props.item.height }
              }">
              {{ props.item.height }}
            </nuxt-link>
          </td>
          <td class="text-xs-left">
            {{ props.item.type === 0 ? 'Transfer' : props.item.type ===1 ? 'CreateContract' : props.item.type
              ===2 ? 'CallContract' : props.item.type ===3 ? 'SetAlias' : props.item.type
                ===4 ? 'VoteCredit' : props.item.type ===5 ? 'CancelVoteCredit' : props.item.type
                  ===6 ? 'Candidate' : props.item.type ===7 ? 'CancelCandidate ' :'Transfer' }}
          </td>
          <td class="text-xs-left">
            Success
          </td>
          <td class="text-xs-left">
            {{ getFormatAmount(props.item.amount ) }} DREP
          </td>
          <td class="text-xs-right">
            {{ getffee(props.item.gasprice,props.item.gaslimit) }}

            DREP
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  import Top from '~/components/Top'
  export default {
    components: {
      Top
    },
    data() {
      return {
        loading: false,
        pagination: {},
        totalTxs: 0,
        headers: [{
            text: 'Txn Hash',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Age',
            value: 'calories',
            sortable: false
          },
          {
            text: 'Block',
            value: 'Block',
            sortable: false
          },
          {
            text: 'Type',
            value: 'Type',
            sortable: false
          },
          {
            text: 'Status',
            value: 'Status',
            sortable: false
          },
          {
            text: 'Amount',
            value: 'amount',

            sortable: false
          },
          {
            text: 'Fee',
            value: 'Fee',
            align: 'right',
            sortable: false
          }
        ],
        desserts: [{
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        }],
        pageItems: [
          20,
          30,
          50
          // {
          //   text: '$vuetify.dataIterator.rowsPerPageAll',
          //   value: -1
          // }
        ]
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler() {
          this.loadTxs()
        }
      }
    },
    async asyncData(ctx) {
      try {
        const result = await ctx.$axios.$get('/api/transactions', {
          params: {
            page: 1,
            limit: 20
          }
        })

        return {
          transactions: result.transactions.data,
          totalTxs: result.transactions.totalCount
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
      getffee(gasPrice, gasLimit) {
        return new BigNumber(gasPrice).shiftedBy(-18).multipliedBy(new BigNumber(gasLimit)).toFixed(8)
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
      },
      async loadTxs() {
        this.loading = true
        const result = await this.$axios.$get('/api/transactions', {
          params: {
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage
          }
        })
        this.loading = false
        this.transactions = result.transactions.data
        this.totalTxs = result.transactions.totalCount
      }
    }
  }

</script>

<style scoped lang="scss">
  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  .title-block {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 0 auto;
  }

  .image {
    height: 22px;
    margin-top: 8px;
  }

  td {
    white-space: nowrap;
  }

  .title {
    width: 260px;
    height: 26px;
    font-size: 26px !important;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-top: -29px;
    margin-left: 4rem;
  }

  .table-data {
    padding: 10px 10px;
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 75px auto;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    background-color: white;
  }

  .page-title {
    margin-top: 11px;
    line-height: 62px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-left: 36px;
  }

  .text-xs-right {
    text-align: right !important;
    font-size: 12px !important;
    font-weight: 400;
  }

  .content {
    background: rgba(0, 0, 0, 1);
    opacity: 0.03;
  }

  .homeData-Blocks-leaderaddress {
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 1450px) {

    .table {

      .theadth {
        font-weight: 500;
        font-size: 13px;
        font-weight: bold;
      }

      .text-xs-left {
        font-size: 13px;
        font-weight: 400;
      }

      a {
        color: rgba(29, 126, 255, 1);
      }

      td {
        line-height: 44px !important;
        min-height: 44px !important;

      }

      tr {
        background: rgba(250, 250, 250, 1);
      }
    }
  }

  @media screen and (max-width: 768px) {
    .title-block {
      width: 90%;
      margin: 0 auto;
    }

    .table-data {
      padding: 0px;
      width: 94%;
      max-width: 1200px;
      margin: 0 auto 75px auto;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      background-color: white;
    }

    .page-title {
      margin-top: 11px;
      line-height: 62px;
      font-size: 18px;
      font-weight: bold;
      color: black;
      margin-left: 0px !important;

    }

    .image {
      width: 18px;
      height: 18px;
      margin-bottom: -8px;
    }

    .title {
      font-size: 18px !important;
      margin-top: -15px;
      margin-left: 3rem;
    }

    .table {
      width: 100%;
    }

    .table {
      .theadth {
        font-weight: 500;
        font-size: 13px;
        font-weight: 500;

        th {
          padding: 0 0px !important;
        }
      }

      .text-xs-left {
        font-size: 13px;

      }

      a {
        color: rgba(29, 126, 255, 1);
      }

      th {
        padding: 0 0px !important;
      }

      td {
        line-height: 30px !important;
        min-height: 30px !important;
        padding: 0 24px !important;
      }

      tr {
        background: rgba(250, 250, 250, 1);
      }
    }
  }

  .table {

    .theadth {
      font-weight: 500;
      font-size: 13px;
      font-weight: bold;
    }

    .text-xs-left {
      font-size: 13px;
      font-weight: 400;
    }

    tbody tr:nth-child(2n-1) {
      background: rgba(250, 250, 250, 1);
    }

    .elevation-1 {
      background: rgba(250, 250, 250, 1);
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

</style>

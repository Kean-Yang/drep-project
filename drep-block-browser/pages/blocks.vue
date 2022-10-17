<template>
  <div class="page">
    <Top />
    <div class="title-block">
      <div class="page-title">
        Blocks
      </div>
    </div>

    <!-- <v-container id="input-usage" grid-list-xl fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-input type="text" />
        </v-flex>
      </v-layout>
    </v-container> -->
    <div class="table-data">
      <v-data-table :headers="headers" :items="blocks" :rows-per-page-items="pageItems" :pagination.sync="pagination"
        dense :loading="loading" loading-text="Loading... Please wait" :total-items="totalTxs" class="table ">
        <template v-slot:header.name="{ header }">
          {{ header.text.toUpperCase() }}
        </template>

        <template v-slot:items="props" :class="items.index%2 ==0? 'isActive' : '1111'" class="isActive1">
          <td>
            <nuxt-link :to=" {name: 'block' ,query: { height: props.item.height }}">
              <div>
                {{ props.item.height }}
              </div>
            </nuxt-link>
          </td>

          <td class="text-xs-left">
            <span> {{ getTimeAgo(props.item.timestamp) }}</span>
          </td>
          <td class="text-xs-left">
            {{ props.item.txs.length ? props.item.txs.length :'0' }}
          </td>
          <td class="text-xs-left">
            <n-link :to="{ name: 'address',query: { address: props.item.proof.leaderaddress }}">
              {{ subAddr(props.item.proof.leaderaddress) }}
            </n-link>
          </td>

          <td class="text-xs-left">
            {{
              props.item.gasused
            }}

            ({{ (props.item.gasused/props.item.gaslimit).toFixed(2) === "0.00" ||(props.item.gasused/props.item.gaslimit).toFixed(2) === "0.0" ? 0: (props.item.gasused/props.item.gaslimit).toFixed(2) }}%)
          </td>

          <td class="text-xs-right">
            {{
              format_number(props.item.gaslimit)

            }}
          </td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
  import Top from '~/components/Top'
  export default {
    components: {
      Top
    },
    data() {
      return {
        totalTxs: 0,
        loading: false,
        pagination: {},
        headers: [{
            text: 'Block',
            align: 'left',
            sortable: false,
            value: 'name',
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Age',
            value: 'calories',
            align: 'left',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Txns',
            value: 'fat',
            align: 'left',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Miner',
            value: 'carbs',
            align: 'left',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Gas Used',
            value: 'protein',
            align: 'left',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Gas Limit',
            value: 'protein',
            align: 'right',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
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
          //   value: 100
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
        const result = await ctx.$axios.$get('api/blocks', {
          params: {
            page: 1,
            limit: 20
          }
        })
        return {
          blocks: result.blocks,
          totalTxs: result.totalCount
        }
      } catch (error) {
        console.log(error)
        ctx.redirect('/error')
      }
    },
    methods: {
      // getFormatAmount(amount) {
      //   // return new BigNumber(amount).div(new BigNumber("1000000000000000000")).toFormat(2)
      // },
      getFormatAmount(amount) {
        return new BigNumber(amount).div(new BigNumber('1000000000000000000')).toFormat(2)
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
      format_number(nStr) {
        nStr += ''
        const x = nStr.split('.')
        let x1 = x[0]
        const x2 = x.length > 1 ? '.' + x[1] : ''
        const rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + ',' + '$2')
        }
        return x1 + x2
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
        const result = await this.$axios.$get('/api/blocks', {
          params: {
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage
          }
        })
        this.loading = false
        this.blocks = result.blocks
      }
    }
  }

</script>

<style lang="scss">
  .table thead tr th {
    font-size: 13px;
    font-weight: bold;
    color: #000000 !important;
  }

  .table tbody tr:nth-child(2n) {
    background: rgba(250, 250, 250, 1);
  }

  .table tbody tr {
    padding: 0 24px;
  }

  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  a {
    color: #1D7EFF;
  }

  td {
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    .table-data {
      width: 92% !important;
      margin: 0 auto 75px auto;
      padding: 4px 4px !important;
    }

    .page-title {
      margin-top: 11px;
      line-height: 62px;
      font-size: 18px;
      font-weight: bold;
      color: black;
      margin-left: 0px;

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

      a {
        color: rgba(29, 126, 255, 1);
      }

      td {
        line-height: 30px !important;
        min-height: 30px !important;
        padding: 0 24px !important;
      }

    }
  }

</style>
<style scoped lang="scss">
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

  .table-data {
    padding: 10px 10px;
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 75px auto;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    background-color: white;
  }

  .text-xs-right {
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

  .theadth {
    font-weight: 500;
    font-size: 13px;
    font-weight: bold;
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

    .table {
      width: 100%;
    }

    .image {
      height: 18px;
    }

    .title {
      font-size: 20px !important;
      margin-top: -25px;
      margin-left: 3rem;
    }

    .page-title {
      margin-left: 0px !important;
    }

    .table {
      .theadth {
        font-weight: 500;
        font-size: 13px;
        font-weight: bold;

      }

      .text-xs-left {
        font-size: 13px;
        font-weight: 500;
      }

      a {
        color: rgba(29, 126, 255, 1);
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

</style>

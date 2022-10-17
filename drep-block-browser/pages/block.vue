<template>
  <div class="page">
    <Top />
    <div class="title-block">
      <div class="page-title">
        BLOCKS#{{ block.Height }}

        <!-- <img class="image" src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/on.png" alt="">
        <img class="image" src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/next.png" alt="">
        <nuxt-link :to="{name: 'block' ,query: { height: block.Height-1 }}">
          <div>
            <img class="image" src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/next.png" alt="">
          </div>
        </nuxt-link> -->
      </div>
    </div>

    <div class="block-page-tab hoblockme-data ">
      <div class="hoblockme-data-title">
        Overview
      </div>

      <ul class="page-tab-overview">
        <li>
          <div>Block Height:</div>

          <nuxt-link :to=" {name: 'block' ,query: { height: block.Height}}">
            {{
              block.Height
            }}
          </nuxt-link>
        </li>
        <li>
          <div>Timestamp:</div>
          <p>
            {{ getTimeAgo(block.Timestamp) }}

            （{{ getTimetoUTCString(block.Timestamp ).split(',')[1] }}）
          </p>
        </li>
        <li>
          <div>Block Hash:</div>
          <p>
            {{ block.blockHash }}
          </p>
        </li>

        <li>
          <div>Txns:</div>
          <p>{{ txCount }}</p>
        </li>
        <li>
          <div>Miner:</div>
          <p>
            <n-link :to="{
                name: 'address',
                query: { address: block.MinerAddr }
              }">
              {{ block.MinerAddr }}
            </n-link>
          </p>
        </li>
      </ul>
    </div>

    <div class="block-page-tab hoblockme-data ">
      <div class="hoblockme-data-title">
        Transactions
      </div>

      <v-data-table :headers="headers" :items="txList" :rows-per-page-items="pageItems" :pagination.sync="pagination"
        dense :loading="loading" loading-text="Loading... Please wait" :total-items="txCount" class="table">
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
            <span> {{ getTimeAgo(props.item.timestamp ) }}</span>
          </td>
          <td class="text-xs-left">
            <span>
              <nuxt-link :to=" {name: 'block' ,query: { height: block.Height}}">
                {{
                  block.Height
                }}
              </nuxt-link>
            </span>
          </td>
          <td class="text-xs-left">
            <span> {{ props.item.type === 0 ? 'Transfer' : props.item.type ===1 ? 'CreateContract' : props.item.type
              ===2 ? 'CallContract' : props.item.type ===3 ? 'SetAlias' : props.item.type
                ===4 ? 'VoteCredit' : props.item.type ===5 ? 'CancelVoteCredit' : props.item.type
                  ===6 ? 'Candidate' : props.item.type ===7 ? 'CancelCandidate ' :'Transfer' }}</span>
          </td>
          <td class="text-xs-left">
            <span> Success</span>
          </td>

          <td class="text-xs-left">
            <span> {{ getAmount(props.item.amount) }} DREP</span>
          </td>

          <td class="text-xs-right">
            <span>
              {{ getffee(props.item.gasprice,props.item.gaslimit) }} DREP</span>
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
        height: '',
        TxCount: 0,
        pagination: {},
        tab: null,
        txList: [],
        txCount: 0,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails'
        ],
        totalTxs: 0,
        loading: false,
        rewardsheaders: [{
            text: 'Delegator',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Txn Hash',
            value: 'calories',
            sortable: false
          },
          {
            text: 'Status',
            value: 'fat',
            sortable: false
          },
          {
            text: 'Amount',
            value: 'carbs',
            sortable: false
          }
        ],
        headers: [{
            text: 'Txn Hash',
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
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Block',
            value: 'fat',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Type',
            value: 'carbs',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Status',
            value: 'protein',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Amount',
            value: 'protein',
            sortable: false,
            class: [
              'theadth'
            ] // 样式
          },
          {
            text: 'Fee',
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
          10,
          20,
          30,
          50
          // {
          // text: '$vuetify.dataIterator.rowsPerPageAll',
          // value: -1
          // }
        ],
        show: false
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler: function handler() {
          this.loadTxs()
        }
      },
      $route(to, from) {
        this.reload(to.query.address)
      }
    },
    async asyncData(ctx) {
      try {
        // if (!query.hash || !query.height) {
        // return {}
        // }
        if (ctx.query.hash) {
          const result = await ctx.$axios.$get('/block?hash=' + ctx.query.hash)
          if (!result.success) {
            ctx.redirect('/404')
          }

          return {
            block: result.block.Header
          }
        }
        if (ctx.query.height) {
          const height = (ctx.query.height + '').replace(',', '')

          const result = await ctx.$axios.$get(
            '/api/block?height=' + height
          )
          if (!result.success) {
            ctx.redirect('/404')
          }
          return {
            block: result.block.Header,
            rewards: result.block.rewards,
            height: height
          }

          const res = await ctx.$axios.$get('/api/blockpage', {
            params: {
              height: height,
              page: 1,
              limit: 10
            }
          })
          if (!res.success) {
            ctx.redirect('/404')
          }

          return {
            txList: res.data.data,
            txCount: res.data.totalCount
          }
        }
      } catch (error) {
        console.log(error)
        ctx.redirect('/error')
      }
    },
    methods: {
      async reload(query) {
        if (query.hash) {
          const result = await this.$axios.$get('api/block?hash=' + query.hash)
          if (!result.success) {
            this.$router.push({
              name: '404'
            })
          }

          this.block = result.block
        }
        if (query.height) {
          const height = (query.height + '').replace(',', '')
          const result = await this.$axios.$get(
            '/api/block?height=' + height
          )
          if (!result.success) {
            this.$router.push({
              name: '404'
            })
          }

          this.block = result.block
        }
      },
      getTimetoUTCString(timestamp) {
        return new Date(Number(timestamp + '000')).toUTCString()
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
      getAmount(Amount) {
        return new BigNumber(Amount).shiftedBy(-18).toFormat()
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
      getffee(gasPrice, gasLimit) {
        return new BigNumber(gasPrice).shiftedBy(-18).multipliedBy(new BigNumber(gasLimit))
      },
      async loadTxs() {
        this.loading = true

        const result = await this.$axios.$get('/api/blockpage', {
          params: {
            height: this.height,
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage
          }
        })

        this.txList = result.data.data
        this.txCount = result.data.totalCount
        this.loading = false
      }
    }
  }

</script>

<style lang="scss">
  .hoblockme-data {

    .table a {
      color: rgba(29, 126, 255, 1);
      font-size: 13px;
      font-weight: 500;
      color: rgba(29, 126, 255, 1);
    }

    .table thead {
      background: rgba(250, 250, 250, 1);
    }

    .table tbody tr:nth-child(2n) {
      background: rgba(250, 250, 250, 1);
    }

    .table tbody tr:nth-child(2n-1) {
      background: white;
    }
  }

  .block-page-tab {
    .v-tabs__slider-wrapper {
      line-height: 60px;
    }

    .v-tabs__container {
      border-bottom: 1px solid #E8E8E8
    }

    .v-tabs__div {
      align-items: center;
      display: inline-flex;
      flex: 0 1 auto;
      font-size: 14px;
      font-weight: bold;
      color: rgba(140, 140, 140, 1);
      height: inherit;
      max-width: 264px;
      text-align: center;
      text-transform: none;
      vertical-align: middle;
    }

    .accent {
      border: none !important;
      background-color: white !important;
      font-size: 15px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
  }

</style>

<style scoped lang="scss">
  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  .justify-center {
    width: 92%;
    margin: 0 auto;
    max-width: 1200px;
  }

  .homeData-Blocks-leaderaddress {
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    padding: 5px 15px;
    border-radius: 12px;
    box-shadow: 0px 5px 5px 0px rgba(143, 131, 103, 0.15);

    .item {
      height: 80px;
    }
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
    cursor: pointer;
  }

  .page-title {
    margin-top: 11px;
    line-height: 62px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-left: 50px;
  }

  .table {
    padding: 0 24px;
  }

  .table-data {
    padding: 10px 10px;
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 0 auto;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    background-color: white;
  }

  .hoblockme-data-title {
    font-size: 15px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 60px;
    padding: 0 48px;
    border-bottom: 1px solid #E8E8E8;

  }

  .block-page-tab {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 24px auto;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;

    .page-tab-overview {
      margin: 10px 48px 30px 48px;
      overflow: hidden;
      padding: 0;

      li {
        list-style: none;
        line-height: 18px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 18px;
        margin: 10px 0;
        overflow: hidden;
      }

      div {
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        width: 20%;
        float: left;
      }

      p {
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        width: 80%;
        float: left;
        padding: 0;
        margin: 0;
      }
    }
  }

  .underline {
    border-bottom: 1px solid;
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }

  .block-left {
    width: 30%;
    font-size: 16px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    // line-height: 68px;
  }

  .block-right {
    width: 92%;
    margin-left: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    // line-height: 68px;
  }

  @media screen and (max-width: 768px) {
    .hoblockme-data-title {
      font-size: 15px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 60px;
      padding: 0 8px;
      border-bottom: 1px solid #E8E8E8;

    }

    .page-title {
      margin-top: 11px;
      line-height: 62px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin-left: 0px;
    }

    .table {
      padding: 0 8px;
    }

    .block-page-tab {
      width: 92%;
      max-width: 1200px;
      margin: 0 auto 24px auto;
      overflow: hidden;
      background-color: white;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;

      .page-tab-overview {
        margin: 10px 8px 30px 8px;
        overflow: hidden;
        padding: 0;

        li {
          list-style: none;
          line-height: 18px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 18px;
          margin: 10px 0;
          overflow: hidden;
        }

        div {
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          width: 26%;
          float: left;
        }

        p {
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          width: 74%;
          float: left;
          padding: 0;
          margin: 0;
          word-wrap: break-word;
        }
      }
    }

    .title-block {
      width: 90%;
      margin: 0 auto;
    }

    .image {
      width: 18px;
      height: 18px;
      margin-bottom: -6px;
    }

    .title {
      height: 18px;
      font-size: 20px !important;
      margin-top: -18px;
      margin-left: 3rem;
    }

    .block-height {
      font-size: 12px;
      margin-top: -55px;
      margin-left: 10.5rem;
    }

    .justify-center {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
      margin-top: 3%;
    }

    .block-left {
      font-size: 14px;
      width: 30%;
      margin-left: -16px;
    }

    .block-right {
      font-size: 12px;
      margin-left: 0px;
      padding-top: 3px;
      margin-right: -16px;

      p {
        white-space: wrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

  }

</style>

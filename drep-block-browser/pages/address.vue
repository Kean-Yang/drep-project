<template>
  <div class="page">
    <Top />
    <div class="topic">
      <div id="word">
        <span>Address</span>
        <div id="copy">
          {{ this.$route.query.address }}
        </div>
      </div>
      <!--
      <v-alert v-show="show" :type="success" dense :height="20" :border="top">
        success
      </v-alert> -->

      <input type="button" :class="{
          clicked: show === 1,
          notclick: show !== 1,
          img01: true
        }" @click="copy()">
    </div>

    <Balance :balance="balance" />

    <div>
      <div class="container-container">
        <div class="container-data">
          <div class="container-data-title">
            <div class="container-data-titleleft">
              Delegators
            </div>
          </div>
          <v-data-table :headers="Delegatorsheaders" :items="delegators" :rows-per-page-items="pageItems"
            :pagination.sync="dePagination" dense loading-text="Loading... Please wait" :total-items="totalTxs"
            class="table ">
            <!-- <template v-slot:header.name="{ header }">
                {{ header.text.toUpperCase() }}
              </template> -->

            <template v-slot:items="props" :class="items.index%2 ==0? 'isActive' : '1111'" class="isActive1">
              <td class="text-xs-right">
                <nuxt-link :to=" {name: 'address' ,query: { address: props.item.address}}">
                  <div class="homeData-Blocks-leaderaddress">
                    {{
                      props.item.address

                    }}
                  </div>
                </nuxt-link>
              </td>
              <td class="text-xs-right">
                {{
                  props.item.value
                }} DREP
              </td>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
    <div class="container-container" style="margin-bottom: 76px">
      <div class="container-data">
        <div class="container-data-title">
          <div class="container-data-titleleft">
            Transactions
          </div>
        </div>

        <v-data-table :headers="headers" :items="transactions" :rows-per-page-items="pageItems"
          :pagination.sync="pagination" dense :loading="loading" loading-text="Loading... Please wait"
          :total-items="totalTxs" class="table ">
          <!-- <template v-slot:header.name="{ header }">
                {{ header.text.toUpperCase() }}
              </template> -->

          <template v-slot:items="props" :class="items.index%2 ==0? 'isActive' : '1111'" class="isActive1">
            <td>
              <nuxt-link :to=" {name: 'tx' ,query: { hash: props.item.hash}}">
                <div class="homeData-Blocks-leaderaddress">
                  {{
                    props.item.hash
                  }}
                </div>
              </nuxt-link>
            </td>

            <td class="text-xs-left">
              {{
                getTimeAgo(props.item.timestamp)

              }}
            </td>
            <td class="text-xs-left">
              <nuxt-link :to=" {name: 'block' ,query: { height: props.item.height}}">
                <div class="homeData-Blocks-leaderaddress">
                  {{
                    props.item.height
                  }}
                </div>
              </nuxt-link>
            </td>

            <td class="text-xs-left">
              {{
                props.item.type === 0 ? 'Transfer' : props.item.type ===1 ? 'CreateContract' : props.item.type
                  ===2 ? 'CallContract' : props.item.type ===3 ? 'SetAlias' : props.item.type
                    ===4 ? 'VoteCredit' : props.item.type ===5 ? 'CancelVoteCredit' : props.item.type
                      ===6 ? 'Candidate' : props.item.type ===7 ? 'CancelCandidate ' :'Transfer'
              }}
            </td>
            <td class="text-xs-left">
              Success
            </td>
            <td class="text-xs-left">
              {{ getFormatAmount(props.item.amount) }} DREP
            </td>
            <td class="text-xs-right">
              {{ getffee(props.item.gasprice ,props.item.gaslimit) }} DREP
            </td>
          </template>
        </v-data-table>
      </div>
    </div>

    <!--
    <v-container id="input-usage" grid-list-xl fluid>
      <v-layout wrap>
        <v-flex xs12>
          <v-input type="text" />
        </v-flex>
      </v-layout>
    </v-container>

    <v-data-table :headers="headers" :pagination.sync="pagination" :total-items="totalTxs" :items="transactions"
      :loading="loading" loading-text="Loading... Please wait" class="table" :rows-per-page-items="pageItems">
      <template v-slot:items="props">
        <td>
          <nuxt-link :to="{
              name: 'tx',
              query: { hash: props.item.hash }
            }">
            {{ subAddr(props.item.hash) }}
          </nuxt-link>
        </td>
        <td class="text-xs-right">
          {{ getTimeAgo(props.item.timestamp) }}
        </td>
        <td class="text-xs-right">
          {{
            !props.item.timestamp
              ? 'null'
              : timeFormate(props.item.timestamp *1000)
          }}
        </td>
        <td class="text-xs-right">
          <n-link :to="{
              name: 'address',
              query: { address: props.item.from }
            }" replace>
            {{ subAddr( props.item.from) }}
          </n-link>
        </td>
        <td class="text-xs-right">
          <n-link :to="{
              name: 'address',
              query: { address: props.item.to }

            }" replace>
            {{ subAddr( props.item.to) }}
          </n-link>
        </td>
        <td class="text-xs-right">
          {{ getFormatAmount(props.item.amount) }}
        </td>
      </template>
    </v-data-table> -->
  </div>
  </div>
</template>

<script>
  import Top from '~/components/Top'
  import Search from '~/components/Search'
  import Balance from '~/components/Balance'
  import BigNumber from 'bignumber.js'
  export default {
    components: {
      Top,
      Search,
      Balance
    },
    data() {
      return {
        address: '',
        totalTxs: 0,
        Blocks: {},
        transactions: [],
        loading: false,
        Delegatorsloading: true,
        pagination: {},
        dePagination: {},
        Delegatorsheaders: [{
            text: 'Delegator Address',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Amount',
            value: 'Amount',
            sortable: false
          }
        ],

        headers: [{
            text: 'Txn Hash',
            align: 'left',
            sortable: false,
            value: 'Txn Hash'
          },
          {
            text: 'Age',
            value: 'Age',
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
          10,
          20,
          30,
          50
          // {
          //   text: '$vuetify.dataIterator.rowsPerPageAll',
          //   value: -1
          // }
        ],
        show: false
      }
    },
    watch: {
      pagination: {
        deep: true,
        handler() {
          this.loadTxs()
        }
      },
      depagination: {
        deep: true,
        handler() {
          this.DelegatorsloadTxs()
        }
      },
      $route(to, from) {
        this.reload(to.query.address)
      }
    },
    async asyncData(ctx) {
      try {
        const result = await ctx.$axios.$get('/api/addrTxHistory', {
          params: {
            address: ctx.query.address,
            page: 1,
            limit: 10
          }
        })
        const results = await ctx.$axios.$get('/api/balance', {
          params: {
            address: ctx.query.address
          }
        })
        return {
          address: ctx.query.address,
          transactions: result.transactions.docs,
          totalTxs: result.transactions.total,
          balance: results.balance,
          delegators: results.delegators,
          Delegatorsloading: false
        }
      } catch (error) {
        ctx.redirect('/error')
      }
    },
    methods: {
      async reload(addr) {
        this.address = addr
        this.pagination.page = 1
        this.pagination.rowsPerPage = 15
        const results = await this.$axios.$get('/api/balance', {
          params: {
            address: addr
          }
        })
        this.balance = results.balance
        this.loadTxs()
      },
      getFormatAmount(amount) {
        return new BigNumber(amount).shiftedBy(-18).toFormat()
      },
      getffee(gasPrice, gasLimit) {
        return new BigNumber(gasPrice).shiftedBy(-18).multipliedBy(new BigNumber(gasLimit)).toFixed(8)
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
      },
      copy() {
        const oncopy = document.getElementById('copy').innerText
        const oInput = document.createElement('input')
        oInput.value = oncopy
        document.body.appendChild(oInput)
        oInput.select()
        document.execCommand('Copy')
        oInput.className = 'oInput'
        oInput.style.display = 'none'
        this.show = 1
        setTimeout(() => {
          this.show = 2
        }, 3000)
      },
      async loadTxs() {
        this.loading = true
        const result = await this.$axios.$get('/api/addrTxHistory', {
          params: {
            address: this.address,
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage
          }
        })
        this.loading = false
        this.transactions = result.transactions.docs
      },
      async DelegatorsloadTxs() {
        const results = await this.$axios.$get('/api/balance', {
          params: {
            address: this.address,
            page: this.depagination.page,
            limit: this.depagination.rowsPerPage
          }
        })
        this.transactions = results.transactions.docs
        this.totalTxs = results.transactions.total
        this.balance = results.balance
        this.delegators = results.delegators
      }
    }
  }

</script>

<style lang="scss">
  td {
    white-space: nowrap;
  }

  .block-page-tab {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    line-height: 24px;

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

  table.v-table thead th {
    font-size: 13px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
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

  .topic {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0 36px;
    line-height: 72px;
  }

  .homeData-Blocks-leaderaddress {
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1D7EFF;
  }

  .page-title {
    margin-top: 11px;
    line-height: 62px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-left: 50px;
  }

  .avatar {
    width: 20px;
    height: 22px;
    float: left;
  }

  .address {
    height: 26px;
    font-size: 26px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    padding-left: 15px;
    margin-top: -8px;
    float: left;
  }

  .container-container {

    width: 92%;
    max-width: 1200px;
    margin: 0px auto 24px auto;
    overflow: hidden;

    .left {
      width: calc(50% - 7px);
      float: left;
      text-align: left;

    }

    .right {
      width: calc(50% - 7px);
      float: right;
      text-align: left;

    }

    .container-title {
      overflow: hidden;

      .container-title-item {
        width: calc(50% - 7px);
        float: left;
        padding: 16px 16px 18px 24px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
        border-radius: 4px;

        p {
          font-size: 13px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          width: 100%;
        }

        .container-title-item-conten {

          overflow: hidden;

          .container-title-item-contenleft {
            font-size: 18px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
            float: left;
          }

          .container-title-item-contenright {
            line-height: 22px;
            float: right;
            font-size: 13px;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
          }

        }

      }

    }

    .container-data {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
    }

    .container-data-title {
      background-color: white;
      overflow: hidden;
      margin-top: 24px;

      .container-data-titleleft {
        line-height: 48px;
        height: 48px;
        list-style-type: none;
        transition: -webkit-transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
        transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1);
        transition: transform 0.6s cubic-bezier(0.86, 0, 0.07, 1), -webkit-transform 0.6s cubic-bezier(0.86, 0, 0.07,
            1);
        white-space: nowrap;
        position: relative;
        border-bottom: 1px solid #E8E8E8;
        padding: 0 24px;
        font-size: 14px;
        font-weight: bold;

      }

      .container-data-titleright {
        float: right;
      }

    }

  }

  #word {
    div {
      float: left;
      padding-left: 22px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(140, 140, 140, 1);
      line-height: 72px;
    }

    span {
      font-size: 24px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      float: left;
    }
  }

  .clicked {
    width: 80px !important;
    height: 22px !important;
    background: url("https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/icon_copied.png");

  }

  .notclick {
    background: url("https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/icon_copy.png");
  }

  .img01 {
    width: 16px;
    height: 18px;
    margin-left: 16px;
  }

  .img02 {
    height: 20px;
    margin-left: 20px;
  }

  .title {
    width: 260px;
    height: 26px;
    font-size: 26px !important;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 24px;
    margin-top: -29px;
    margin-left: 4rem;
  }

  .text-xs-right {
    text-align: left !important;
    font-size: 12px !important;
  }

  .content {
    background: rgba(0, 0, 0, 1);
    opacity: 0.03;
  }

  .block-page-footab {
    margin-bottom: 76px;
  }

  .block-page-tab {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    line-height: 72px;

    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;

    .v-tabs__slider-wrapper {
      line-height: 60px;
    }

    .v-tabs__container {
      border-bottom: 1px solid #E8E8E8;
      padding: 0 14px;
      font-weight: bold;
      color: black;
    }

    .v-tabs__div {
      padding: 0 14px !important;
      font-weight: bold;
      color: black !important;
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

  @media screen and (max-width: 1450px) {

    .table {
      .theadth {
        font-weight: 500;
        font-size: 13px;
        font-weight: bold;
      }

      .text-xs-left {
        font-size: 13px;
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
    .img01 {
      width: 16px;
      height: 18px;
      margin-left: 0px;
      margin-top: 8px;
    }

    .img02 {
      height: 18px;
      margin-left: 0px;
    }

    th {
      padding: 0 !important;
    }

    .block-page-tab {
      width: 92%;
      max-width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      line-height: 24px;

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

    .topic {
      width: 100%;
      margin: 0 auto;
    }

    .avatar {
      width: 18px;
      height: 20px;
    }

    .address {
      font-size: 20px;
      margin-top: -4px;
    }

    #word {
      font-size: 12px;
    }

    #word {
      div {
        float: left;
        padding-left: 4px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(140, 140, 140, 1);
        line-height: 72px;
        max-width: 120px;
        width: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span {
        font-size: 24px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        float: left;
      }
    }

    .title-block {
      width: 90%;
      margin-left: 5%;
      margin-top: 10%;
    }

    .image {
      width: 18px;
      height: 18px;
      margin-bottom: -5px;
    }

    .title {
      font-size: 20px !important;
      margin-top: -20px;
      margin-left: 2.4rem;
    }

    .table {
      width: 90%;
      margin-left: 5%;
    }

    .table tbody tr {
      padding: 0;
    }

    .container-container {

      width: 92%;
      max-width: 1200px;
      margin: 0px auto 24px auto;
      overflow: hidden;
      padding: 0;

      .left {
        width: calc(50% - 7px);
        float: left;
        text-align: left;

      }

      .right {
        width: calc(50% - 7px);
        float: right;
        text-align: left;

      }

      .container-title {
        overflow: hidden;

        .container-title-item {
          width: calc(50% - 7px);
          float: left;
          padding: 16px 16px 18px 24px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
          border-radius: 4px;

          p {
            font-size: 13px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            width: 100%;
          }

          .container-title-item-conten {

            overflow: hidden;

            .container-title-item-contenleft {
              font-size: 18px;
              font-weight: bold;
              color: rgba(0, 0, 0, 1);
              line-height: 22px;
              float: left;
            }

            .container-title-item-contenright {
              line-height: 22px;
              float: right;
              font-size: 13px;
              font-weight: 400;
              color: rgba(155, 155, 155, 1);
            }

          }

        }

      }

      .container-data {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
        border-radius: 4px;
      }

      .container-data-title {
        background-color: white;
        overflow: hidden;
        margin-top: 24px;
        padding: 24px 18px 18px 18px;

        .container-data-titleleft {
          font-size: 14px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          float: left;
          width: 100%;
          padding: 0;
        }

        .container-data-titleright {
          float: right;
        }

      }

    }

    .table {
      .theadth {
        font-weight: 500;
        font-size: 13px;
        font-weight: 400;

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

      td {
        line-height: 30px !important;
        min-height: 30px !important;
      }

      tr {
        background: rgba(250, 250, 250, 1);
      }
    }
  }

</style>

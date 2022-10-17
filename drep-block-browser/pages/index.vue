<template>
  <div class="page">
    <Top />

    <Header />

    <div class="exchange-logo">
      <div class="exchange-logo-content">
        <div>
          <span>Buy DREP</span>
        </div>
        <div>
          <a href="https://www.binance.com/cn/trade/DREP_BTC">
            <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/Binance.svg" alt="">
          </a>
        </div>
        <div>
          <a href="https://www.gate.io/en/trade/DREP_USDT ">
            <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/Gateio.svg" alt="">
          </a>
        </div>
      </div>
    </div>
    <!-- <Faucet /> -->

    <div class="home-data">
      <div class="container-container-item">
        <div class="container-title left">
          <div class="container-title-itemfirst">
            <div class="left">
              <p> Price</p>

              <div class="container-title-item-contenleft">
                <p> ${{ getPeakTPS }}</p>
                (Binance)
              </div>
            </div>

            <div class="right">
              <div class="container-title-item-conten">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/img_hangqing.png" alt="">
              </div>
            </div>
          </div>

          <div class="container-title-item" style="float: right">
            <p> Height</p>
            <div class="container-title-item-conten">
              <div class="container-title-item-contenleft">
                {{ BlockHeight }}
                <!-- {{ homeData.LatestTxs[0].height }} -->
              </div>
              <div class="container-title-item-contenright">
                {{ getTimeAgo(blockTime) }}
              </div>
            </div>
          </div>
        </div>
        <div class="container-title right">
          <div class="container-title-item">
            <p> Transaction</p>
            <div class="container-title-item-conten">
              <div class="container-title-item-contenleft">
                {{ format_number(txNum) }}
              </div>
              <div class="container-title-item-contenright">
                {{ getTimeAgo(tsxTime) }}
              </div>
            </div>
          </div>
          <div class="container-title-item" style="float: right">
            <p> Safe Gas Price</p>
            <div class="container-title-item-conten">
              <div class="container-title-item-contenleft" title="1 RP = 1e-9 DREP" style="cursor: pointer;">
                {{ getFormatAmount(gasPrice) }}&nbsp RP
              </div>
              <div class="container-title-item-contenright">
                10s ago
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-container">
        <div class="left">
          <!-- <div class="container-title">
            <div class="container-title-itemfirst" style="margin-right: 14px">
              <div class="left">
                <p> Price</p>

                <div class="container-title-item-contenleft">
                  <p> ${{ getPeakTPS }}</p>
                  (Coinmarketcap)
                </div>
              </div>

              <div class="right">
                <div class="container-title-item-conten">
                  <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/img_hangqing.png" alt="">
                </div>
              </div>
            </div>

            <div class="container-title-item">
              <p> Height</p>
              <div class="container-title-item-conten">
                <div class="container-title-item-contenleft">
                  {{ BlockHeight }}
                </div>
                <div class="container-title-item-contenright">
                  {{ getTimeAgo(blockTime) }}
                </div>
              </div>
            </div>
          </div> -->

          <div class="container-data table-data__actions">
            <div class="container-data-title">
              <div class="container-data-titleleft">
                Latest Blocks
              </div>

              <nuxt-link :to="{name: 'blocks'}">
                <div class="container-data-titleright">
                  More
                </div>
              </nuxt-link>
            </div>
            <v-data-table
              :headers="headers"
              :items="homeData.Blocks"
              dense
              :loading="loading"
              loading-text="Loading... Please wait"
              class="table "
            >
              <template v-slot:items="props" :class="items.index%2 ==0? 'isActive' : '1111'" class="isActive1">
                <td class="first-td">
                  <nuxt-link :to=" {name: 'block' ,query: { height: props.item.height }}">
                    <div>
                      {{ props.item.height }}
                    </div>
                  </nuxt-link>
                  <span>{{ getTimeAgo(props.item.timestamp ? props.item.timestamp :0) }}</span>
                </td>

                <td class="text-xs-left">
                  <nuxt-link :to=" {name: 'address' ,query: { address: props.item.proof.leaderaddress }}">
                    <span class="Miner">Miner&nbsp </span>
                    <div class="homeData-Blocks-leaderaddress">
                      {{ props.item.proof.leaderaddress }}
                    </div>
                  </nuxt-link>
                  <div class="time">
                    {{ props.item.txs.length ? props.item.txs.length :'0' }}
                    Txns
                    {{
                      getTimeAgo(props.item.timestamp ? props.item.timestamp :0)
                    }}
                  </div>
                </td>
                <td class="text-xs-right">
                  {{ reward }} DREP
                </td>
              </template>
            </v-data-table>
          </div>
        </div>
        <div class="right">
          <!-- <div class="container-title">
            <div class="container-title-item" style="margin-right: 14px">
              <p> Transaction</p>
              <div class="container-title-item-conten">
                <div class="container-title-item-contenleft">
                  {{ format_number(txNum) }}
                </div>
                <div class="container-title-item-contenright">
                  {{ getTimeAgo(tsxTime) }}
                </div>
              </div>
            </div>
            <div class="container-title-item">
              <p> Safe Gas Price</p>
              <div class="container-title-item-conten">
                <div class="container-title-item-contenleft" title="1 RP = 1e-9 DREP" style="cursor: pointer;">
                  {{ getFormatAmount(gasPrice) }}&nbsp RP
                </div>
                <div class="container-title-item-contenright">
                  10s ago
                </div>
              </div>
            </div>
          </div> -->

          <div class="container-data table-data__actions">
            <div class="container-data-title">
              <div class="container-data-titleleft">
                Latest Transactions
              </div>

              <nuxt-link :to="{name: 'txs'}">
                <div class="container-data-titleright">
                  More
                </div>
              </nuxt-link>
            </div>
            <v-data-table
              :headers="tsxheaders"
              :items="homeData.LatestTxs"
              dense
              :loading="loading"
              loading-text="Loading... Please wait"
              class="table "
            >
              <template v-slot:header.name="{ header }">
                {{ header.text.toUpperCase() }}
              </template>

              <template v-slot:items="props" :class="items.index%2 ==0? 'isActive' : '1111'" class="isActive1">
                <td>
                  <nuxt-link :to=" {name: 'tx' ,query: { hash: props.item.hash}}">
                    <div class="homeData-Blocks-leaderaddress">
                      {{ props.item.hash }}
                    </div>
                  </nuxt-link>
                  <div class="time">
                    {{ getTimeAgo(props.item.timestamp ? props.item.timestamp:'') }}
                  </div>
                </td>

                <td class="text-xs-left">
                  <nuxt-link :to=" {name: 'address' ,query: { address: props.item.from}}">
                    <span class="Miner">From &nbsp</span>
                    <div class="homeData-Blocks-leaderaddress">
                      {{ props.item.from }}
                    </div>
                  </nuxt-link>
                  <nuxt-link :to=" {name: 'address' ,query: { address: props.item.to }}">
                    <span class="Miner">To &nbsp</span>
                    <div class="homeData-Blocks-leaderaddress">
                      {{ props.item.to }}
                    </div>
                  </nuxt-link>
                </td>
                <td class="text-xs-right">
                  {{ getAmount(props.item.amount) }} DREP
                </td>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>

    <!-- <Container /> -->
  </div>
  </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import Header from '~/components/Header'
import Container from '~/components/Container'
import Top from '~/components/Top'
export default {
  components: {
    Header,
    Container,
    Top
  },
  data() {
    return {
      getPeakTPS: '',
      NumTxs: '',
      homeData: {},
      BlockHeight: 0,
      getPeakTPS: 0,
      loading: false,
      NumTxs: 0,
      headers: [{
        text: 'Height/Time',
        align: 'left',
        sortable: false,
        value: 'name',
        class: ['theadth'] // 样式
      },
      {
        text: 'Miner/Txns',
        value: 'calories',
        sortable: false,
        class: ['theadth'] // 样式
      },
      {
        text: 'Block Reward',
        value: 'fat',
        sortable: false,
        align: 'right',
        class: ['theadth'] // 样式
      }
      ],
      tsxheaders: [{
        text: 'Hash',
        align: 'left',
        sortable: false,
        value: 'name',
        class: ['theadth'] // 样式
      },
      {
        text: 'From/To',
        value: 'calories',
        sortable: false,
        class: ['theadth'] // 样式
      },
      {
        text: 'Amount',
        value: 'fat',
        align: 'right',
        sortable: false,
        class: ['theadth'] // 样式
      }
      ]
    }
  },
  async asyncData(ctx) {
    try {
      const result = await ctx.$axios.$get('/api/home')
      if (result.success) {
        return {
          BlockHeight: result.BlockHeight ? result.BlockHeight : 0,
          getPeakTPS: parseFloat(result.DREPUSDT.DREPUSDT).toFixed(6),
          txNum: result.txNum,
          gasPrice: result.gasPrice,
          blockTime: result.blockTime / 1000,
          tsxTime: result.blockTime / 1000,
          reward: result.reward ? result.reward : 100
        }
      }
    } catch (error) {
      console.log(error)
      ctx.redirect('/error')
    }
  },
  destroyed: function () {
    this.clearTime()
  },
  mounted: function () {
    console.log(new BigNumber(2).pow(256).minus(1))

    this.getLatestDatatime()
    this.loadTxs()
  },

  methods: {
    getFormatAmount(amount) {
      return new BigNumber(amount).shiftedBy(9).toFormat()
    },
    getLatestDatatime() {
      this.time = setInterval(this.getLatestData, 10000)
      this.txstime = setInterval(this.loadTxs, 10000)
    },
    clearTime() {
      clearInterval(this.time)
      clearInterval(this.txstime)
    },

    getTimeAgo(timestamp) {
      if (timestamp === 0) {
        return '0s ago'
      }
      let runTime = new Date() / 1000 - timestamp
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
        return '0s ago'
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
    getAmount(Amount) {
      return new BigNumber(Amount).shiftedBy(-18).toFormat()
    },
    timeFormate(ts) {
      const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const time = new Date(ts)
      const y = time.getFullYear()
      const m = month[time.getMonth()]
      const d = time.getDate()
      const h = time.getHours()
      const mm = time.getMinutes()
      const s = time.getSeconds()

      return (
        this.add0(m) +
          '-' +
          this.add0(d) +
          '-' +
          y +
          ' ' +
          this.add0(h) +
          ':' +
          this.add0(mm) +
          ':' +
          this.add0(s)
      )
    },
    getLatestData() {
      this.$axios.$get('/api/home', {}).then((result) => {
        this.getPeakTPS = parseFloat(result.DREPUSDT.DREPUSDT).toFixed(6)
        this.txNum = result.txNum
        this.gasPrice = result.gasPrice
      })
    },
    loadTxs() {
      this.loading = true
      this.$axios.$get('/api/getBlocksTxs', {}).then((res) => {
        this.homeData = res
        this.BlockHeight = res.Blocks[0].height ? res.Blocks[0].height : 0
        this.blockTime = res.Blocks[0].timestamp ? res.Blocks[0].timestamp : 0
        this.tsxTime = res.LatestTxs[0] ? res.LatestTxs[0].timestamp : 0
        this.loading = false
      })
    }
  }
}

</script>
<style lang="scss">
  .table-data__actions .v-datatable__actions {
    display: none;
  }

  td {
    white-space: nowrap;
  }

  .home-data {
    .table thead tr th {
      font-size: 13px;
      font-weight: bold;
      color: #000000 !important;
    }

    .table a {
      color: rgba(29, 126, 255, 1);
      font-size: 13px;
      font-weight: 500;
      color: rgba(29, 126, 255, 1);
    }

    .table tbody tr:nth-child(2n-1) {
      background: rgba(250, 250, 250, 1);
    }

    .table tbody tr:nth-child(2n) {
      background: white;
    }
  }

</style>
<style scoped lang="scss">
  .page {
    background: rgba(245, 245, 245, 1);
    margin-top: 66px;
    min-height: calc(100vh - 287px);
  }

  .table {
    margin: 0 12px 0 12px;
    padding-bottom: 18px;
  }

  .text-xs-right {
    font-weight: 500;
    color: rgba(89, 89, 89, 1);
  }

  .first-td {
    div {
      font-weight: 500;
      color: rgba(29, 126, 255, 1);
    }

    span {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .time {
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
  }

  .exchange-logo {
    width: 100%;
    background-color: #ffffff;
    min-height: 40px;

    .exchange-logo-content {
      width: 56%;
      max-width: 1200px;
      margin: 0 auto 24px auto;
      overflow: hidden;

      div {
        width: 33%;
        float: left;
        text-align: center;
        min-height: 40px;
        height: 40px;

        img {
          text-align: center;
          vertical-align: middle;
          height: 18px;
          margin: 12px auto;
        }

        span {
          line-height: 40px;
          font-size: 13px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }

  .container-container-item {
    width: 92%;
    max-width: 1200px;
    margin: 24px auto 0px auto;
    overflow: hidden;

    .container-title {
      overflow: hidden;
      width: calc(50% - 7px);
      float: left;

      .container-title-item {
        width: calc(50% - 7px);
        float: left;
        padding: 16px 16px 18px 24px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
        border-radius: 4px;
        min-height: 114px;

        p {
          font-size: 13px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          width: 100%;
          margin: 0;
        }

        .container-title-item-conten {
          overflow: hidden;
          margin-top: 38px;

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

      .container-title-itemfirst {
        width: calc(50% - 7px);
        float: left;
        padding: 16px 16px 18px 24px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
        border-radius: 4px;
        min-height: 114px;

        p {
          width: 100%;
          margin: 0;
          font-size: 18px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 22px;
        }

        .container-title-item-contenleft {
          float: left;
          margin-top: 20px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 15px;
        }

        .container-title-item-conten {
          overflow: hidden;

          img {
            max-width: 140px;
            max-height: 52px;
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
  }

  .container-container {
    width: 92%;
    max-width: 1200px;
    margin: 0px auto 76px auto;
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

    .container-data {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
    }

    .container-data-title {
      background-color: white;
      overflow: hidden;
      margin-top: 24px;
      padding: 24px 36px 0px 24px;

      .container-data-titleleft {
        font-size: 14px;
        font-weight: 900;
        color: rgba(0, 0, 0, 1);
        float: left;
      }

      .container-data-titleright {
        float: right;
      }
    }
  }

  td {
    line-height: 30px;
  }

  .block-card {
    min-width: 32%;
    max-width: 32%;
    flex-basis: 32%;
    padding: 0px;
    text-align: center;
    margin: 0px;
    display: flex;
    justify-content: space-between;
    margin-right: 2%;
  }

  .rootchain {
    width: 70.2%;
    max-width: 1200px;
    height: 26px;
    font-size: 26px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 68px;
    margin: 4% auto 5% auto;
  }

  .item-name {
    border-radius: 12px;
    font-size: 1rem;
    font-family: DINAlternate-Bold;
  }

  .container-width {
    display: flex;
    justify-content: center;
    width: 70.2%;
    margin: 0 auto;
    max-width: 1200px;
  }

  .homeData-Blocks-leaderaddress {
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .Miner {
    color: #595959;
    float: left;
    font-weight: 500;
  }

  .container {
    max-width: 100%;
    padding: 0px !important;
  }

  .v-form>.container {
    padding: 0px !important;
  }

  .layout {
    width: 100%;
    margin: 0px;
  }

  // .flex.md4 {
  // max-width: 32%;
  // flex-basis: 32%;
  // }
  .v-card {
    background-color: transparent !important;
    box-shadow: none;
  }

  .v-list {
    background-color: transparent !important;
  }

  .margin-card {
    margin-right: 0px;
  }

  .v-card__title {
    border-bottom: 1px solid rgb(197, 193, 193);
    // position: relative;
    padding-left: 0px;
    padding-right: 0px;
  }

  .v-card__text {
    height: 100%;
    padding: 0px;
    // padding-bottom: 24px;
  }

  .num-box {
    width: 322px;
    height: 148px;
  }

  .underline {
    border-bottom: none;
    margin-bottom: -15px;
    flex: row;
    justify-content: space-between;
  }

  .number {
    font-size: 26px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    /*line-height: 74px;*/
  }

  .item-width {
    // width: 360px;
    margin-right: 10px;
  }

  .item-card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-image: url('/home/rectangle.png');
    background-size: 132% 138%;
    background-position: center;
    border-radius: 12px !important;
    box-shadow: 0px 5px 18px 0px rgba(71, 64, 49, 0.15);
    cursor: default;
  }

  .tab {
    max-width: 92%;
    margin-left: 15%;
    margin-top: 4%;
  }

  .tab-name {
    width: 97px;
    font-size: 26px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 68px;
  }

  .tab-card {
    max-width: 48%;
    flex-basis: 48%;
    padding: 0px;
    text-align: center;
    margin: 0px;
    margin-right: 2%;
    background-color: transparent !important;
  }

  // .md6 {
  // max-width: 48%;
  // flex-basis: 48%;
  // }
  .margin-tab {
    margin-left: 5%;
    // margin-top: 0px;
  }

  .block-item {
    width: 100%;
    min-height: 102px;
    background: linear-gradient(-60deg,
        rgba(220, 179, 122, 0.1),
        rgba(228, 197, 144, 0.1),
        rgba(243, 223, 177, 0.1));
    box-shadow: 0px 3px 4px 0px rgba(63, 57, 43, 0.15);
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    padding: 10px;

    .left {
      height: 100%;
      // display: inline-block;
      float: left;
      text-align: left;

      .height {
        width: 100px;
        font-size: 20px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 45px;
      }

      .txns {
        width: 100px;
        font-size: 16px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 30px;
      }

      .mined {
        width: 180px;
        font-size: 16px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 40px;
      }

      .hash {
        // width: 180px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        // line-height: 30px;
        margin-top: -6px;
      }

      .sec {
        width: 180px;
        height: 12px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        margin-top: 10px;
      }
    }

    .right {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;

      span {
        // display: inline-block;
        width: 30px;
        font-size: 14px;
        font-family: DINAlternate-Bold;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        float: left;
        margin-right: 25px;
      }
    }

    .drep {
      float: left;
      text-align: left;
      width: 80px;
      font-size: 16px;
      font-family: DINAlternate-Bold;
      font-weight: bold;
      color: rgba(0, 1, 1, 1);
      line-height: 1.2;
      margin-top: 0px;
      margin-right: -20px;
    }

    .sec2 {
      float: left;
      width: 200px;
      font-size: 12px;
      line-height: 2;
      font-family: PingFangSC-Regular;
      text-align: left;
      margin-right: -20px;
    }
  }

  .but {
    width: 80px;
    height: 28px;
    background: linear-gradient(270deg, rgba(14, 14, 13, 1), rgba(66, 66, 66, 1));
    box-shadow: 0px 6px 20px 0px rgba(63, 57, 43, 0.15);
    border-radius: 4px;

    a {
      font-family: DINAlternate-Bold;
      font-weight: bold;
      font-size: 14px;
      line-height: 28px;
      color: rgba(244, 205, 166, 1);
    }
  }

  @media screen and (max-width: 768px) {
    .container-container-item {
      width: 92%;
      max-width: 1200px;
      margin: 24px auto 0 auto;
      overflow: hidden;

      .container-title {
        overflow: hidden;
        width: 100%;
        float: left;

        .container-title-item {
          width: 100%;
          float: left;
          padding: 16px 16px 18px 24px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
          border-radius: 4px;
          min-height: 114px;
          margin-bottom: 24px;

          p {
            font-size: 13px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            width: 100%;
            margin: 0;
          }

          .container-title-item-conten {
            overflow: hidden;
            margin-top: 38px;

            .container-title-item-contenleft {
              font-size: 13px;
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

        .container-title-itemfirst {
          width: 100%;
          float: left;
          padding: 16px 16px 18px 24px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
          border-radius: 4px;
          min-height: 114px;
          margin-bottom: 24px;

          p {
            color: black;
            width: 100%;
            margin: 0;
            font-size: 13px;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 22px;
          }

          .container-title-item-contenleft {
            float: left;
            margin-top: 20px;
            font-size: 13px;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
            line-height: 15px;
          }

          .container-title-item-conten {
            overflow: hidden;

            img {
              max-width: 140px;
              max-height: 52px;
              width: 100%;
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
    }

    .exchange-logo-content {
      width: 92% !important;
    }

    .container-container {
      width: 92%;
      margin: 0 auto;

      .left {
        width: 100%;
        margin-bottom: 0px;
      }

      .right {
        width: 100%;
        margin-bottom: 76px;
      }
    }

    .container-title-itemfirst {
      .left {
        margin-bottom: 0px;
      }

      .right {
        margin-bottom: 32px;
      }
    }

    .rootchain {
      margin-left: 5%;
      margin-bottom: 12%;
      font-size: 22px;
    }

    .container-width {
      width: 90%;
      margin-left: 5%;
    }

    .number {
      font-size: 18px;
    }

    .blocks {
      width: 18px;
      height: 18px;
    }

    .transactions {
      width: 18px;
      height: 18px;
    }

    .tab {
      max-width: 90%;
      margin-left: 5%;
    }

    .tab-name {
      font-size: 20px;
    }

    .tab-card {
      max-width: 100%;
      flex-basis: 100%;
      margin-right: 0px;
    }

    .margin-tab {
      margin-left: 0px;
      margin-top: -8%;
    }

    @media screen and (max-width: 320px) {
      .rootchain {
        margin-top: 16%;
      }
    }
  }

</style>

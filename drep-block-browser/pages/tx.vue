<template>
  <div class="page">
    <Top />
    <div class="title-block">
      <div class="page-title">
        Transactions Details
      </div>
    </div>

    <div class="page-conten">
      <ul class="page-tab-overview">
        <li>
          <div>Txn Hash:</div>
          <p>
            {{ transaction.hash }}
          </p>
        </li>
        <li>
          <div>Type:</div>
          <p>
            {{

              transaction.typee === 0 ? 'Transfer' : transaction.type ===1 ? 'CreateContract' : transaction.type
                ===2 ? 'CallContract' : transaction.type ===3 ? 'SetAlias' : transaction.type
                  ===4 ? 'VoteCredit' : transaction.type ===5 ? 'CancelVoteCredit' : transaction.type
                    ===6 ? 'Candidate' : transaction.type ===7 ? 'CancelCandidate ' :'Transfer'

            }}
          </p>
        </li>

        <li>
          <div>Status:</div>
          <p class="Success">
            <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/status_success.png" alt="">
          </p>
        </li>
        <li>
          <div>Height:</div>
          <p>
            <n-link :to="{
                name: 'block',
                query: { height: transaction.height}
              }">
              {{ transaction.height }}
            </n-link>
          </p>
        </li>
        <li>
          <div>Timestamp:</div>
          <p>
            {{ getTimeAgo(transaction.timestamp) }}

            （{{ getTimetoUTCString(transaction.timestamp).split(',')[1] }}）
          </p>
        </li>
        <li>
          <div>From:</div>
          <p>
            <n-link :to="{
                name: 'address',
                query: { address: transaction.from }
              }">
              {{ transaction.from }}
            </n-link>
          </p>
        </li>
        <li>
          <div>To:</div>
          <p>
            <n-link :to="{
                name: 'address',
                query: { address: transaction.to }
              }">
              {{ transaction.to }}
            </n-link>
          </p>
        </li>
        <li>
          <div>Amount:</div>
          <p>{{ getAmount(transaction.amount) }} DREP</p>
        </li>
        <li>
          <div>Fee:</div>
          <p>
            {{
              getffee(transaction.gasprice,transaction.gaslimit) }}

            DREP
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Top from '~/components/Top'
  import Search from '~/components/Search'

  import Bignumber from 'bignumber.js'

  export default {
    components: {
      Top,
      Search
    },
    data() {
      return {}
    },
    async asyncData(ctx) {
      try {
        // console.log(ctx.query.hash)
        if (ctx.query.hash) {
          const result = await ctx.$axios.$get(
            '/api/transaction?hash=' + ctx.query.hash
          )
          return {
            transaction: result.transaction
            // count: result.transaction.numTxs
          }
        } else {
          ctx.redirect('/nodata')
        }
        if (ctx.query.height) {
          const result = await ctx.$axios.$get(
            '/api/transaction?height=' + ctx.query.height
          )
          return {
            transaction: result.transaction
            // count: result.transaction.numTxs
          }
        }
      } catch (error) {
        console.log(error)
        ctx.redirect('/nodata')
      }
    },
    methods: {
      add0(m) {
        return m < 10 ? '0' + m : m
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
      getAmount(Amount) {
        return new Bignumber(Amount).shiftedBy(-18).toFormat()
      },
      getffee(gasPrice, gasLimit) {
        return new Bignumber(gasPrice).shiftedBy(-18).multipliedBy(new Bignumber(gasLimit)).toFixed(8)
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

<style scoped lang="scss">
  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  .justify-center {
    width: 92%;
    max-width: 1200px;
    margin: 3% auto 0 auto;
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
  }

  .page-title {
    margin-top: 11px;
    line-height: 62px;
    font-size: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-left: 50px;
  }

  .underline {
    border-bottom: 1px solid;
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }

  .Success {

    line-height: 18px;
    padding: 0 8px;

    span {
      width: 110px !important;
      height: 24px;
      background: rgba(233, 248, 246, 1);
      border-radius: 2px;
      padding: 0 8px;

    }

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

  .page-conten {
    width: 92%;
    max-width: 1200px;
    margin: 0px auto 76px auto;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;

    .page-tab-overview {
      margin: 30px 48px 30px 48px;
      overflow: hidden;
      padding: 0;

      li {
        list-style: none;
        line-height: 18px;
        font-size: 13px;
        font-weight: 500;
        color: black;
        line-height: 24px;
        margin: 10px 0;
        overflow: hidden;
      }

      div {
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        width: 14%;
        float: left;
      }

      p {
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        width: 84%;
        float: left;
        padding: 0;
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .page-title {
      margin-top: 0px;
      line-height: 62px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      margin-left: 0px;
    }

    .page-conten {
      width: 92%;
      max-width: 1200px;
      margin: 0px auto 76px auto;
      overflow: hidden;
      background-color: white;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
      border-radius: 4px;

      .page-tab-overview {
        margin: 30px 12px 30px 12px;
        overflow: hidden;
        padding-left: 0;

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
          color: black;
          width: 70%;
          float: left;
          padding: 0;
          margin-left: 4%;
          word-wrap: break-word;
        }
      }
    }

    .justify-center {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
      margin-top: 3%;
    }

    .title-block {
      width: 90%;
      margin: 0 auto
    }

    .image {
      width: 18px;
      height: 18px;
      margin-bottom: -8px;
    }

    .title {
      font-size: 20px !important;
      margin-top: -18px;
      margin-left: 3rem;
    }

    .justify-center {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }

  }

</style>

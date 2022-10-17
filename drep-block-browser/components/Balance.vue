<template>
  <div class="Balance-page block-page-tab">
    <div class="Overview">
      Overview
    </div>
    <ul class="page-tab-overview">
      <!-- <li>
        <div>Block Hight:</div>
        <p>{{ block.Height }}</p>
      </li> -->
      <li>
        <div>Balance:</div>
        <p>
          {{ balance.balance }}
          DREP
        </p>
      </li>

      <li>
        <div>Value:</div>
        <p>
          {{
            gettotalPrice(balance.totalPrice)
          }}
          USDT
        </p>
      </li>
      <li>
        <div>Available:</div>
        <p>
          {{ balance.balance - balance.bondedQuantity }}
          DREP
        </p>
      </li>
      <li>
        <div>Bonded:</div>
        <p>
          {{
            balance.bondedQuantity
          }}
          DREP
        </p>
      </li>
      <li>
        <div>Power:</div>
        <p>
          {{
            balance.powerQuantity ? balance.powerQuantity:'0'
          }}
          DREP
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    props: ['balance'],
    data() {
      return {}
    },
    methods: {
      toThousands: function (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      },
      getValue(amount) {
        return new BigNumber(amount).div(new BigNumber('1000000000000000000')).times(new BigNumber('0.00356')).toFormat(
          2)
      },
      gettotalPrice(totalPrice) {
        return totalPrice.toFixed(2)
      },
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
      }
    }
  }

</script>
<style lang="scss">
  .Balance-page {
    overflow: hidden;

    .v-list--two-line .v-list__tile {
      line-height: 38px;
    }

    .block-right,
    .listitem {
      width: 92%;
      margin-left: 50px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 1, 1);
      line-height: 38px;
    }

  }

</style>

<style scoped lang="scss">
  .block-page-tab {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto 0 auto;
    overflow: hidden;
    background-color: white;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;

    .Overview {
      line-height: 60px;
      font-size: 15px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      width: 100%;
      border-bottom: 1px solid #E8E8E8;
      padding: 0 24px;
    }

    .page-tab-overview {
      overflow: hidden;
      padding: 0;

      li {
        list-style: none;
        font-size: 13px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 38px;
        margin: 10px 0;
        overflow: hidden;
        width: 100%;
        padding: 0 24px;
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

  .layout {
    width: 92%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .content {
    padding: 0px 0px;
    /* width: 1050px; */
    /* height: 72px; */
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 5px 0px rgba(143, 131, 103, 0.15);
    border-radius: 12px;
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
    color: rgba(0, 0, 1, 1);
    line-height: 38px;
  }

  @media screen and (max-width: 768px) {
    .layout {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }

    .block-left {
      font-size: 14px;
      width: 40%;
      margin-left: -16px;
    }

    .block-right {
      font-size: 12px;
      margin-left: 0px;
      width: 60%;
      margin-right: -16px;
    }
  }

</style>

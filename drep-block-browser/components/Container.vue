<template>
  <v-item-group>
    <v-container grid-list-md class="tab">
      <v-layout wrap>
        <v-flex class="tab-card">
          <v-item>
            <v-card light width="100%">
              <v-card-title class="underline">
                <div>
                  <img src="/home/blocks.png" alt="blocks" class="blocks">
                  <span class="tab-name">&nbsp;&nbsp;&nbsp;BLOCKS</span>
                </div>
                <div class="but">
                  <n-link to="/blocks">
                    View All
                  </n-link>
                </div>
              </v-card-title>
              <v-card-text>
                <v-list two-line>
                  <template v-for="(item, index) in homeData.Blocks">
                    <div :key="index" class="block-item">
                      <div class="left">
                        <div class="height">
                          <n-link :to="{
                              name: 'block',
                              query: { height: item.height }
                            }">
                            # {{ item.height }}
                          </n-link>
                        </div>
                        <div class="txns">
                          <img src="/home/arrow.png" alt="arrow" width="14px" height="12px">
                          <n-link to="/txs">
                            &nbsp;&nbsp;{{ item.txs.length }} txns
                          </n-link>
                        </div>
                      </div>
                      <div class="left">
                        <div class="mined">
                          Mined By:
                        </div>
                        <div class="hash">
                          <n-link :to="{
                              name: 'address',
                              query: { address: item.proof.leaderaddress }
                            }">
                            {{ subAddr(item.proof.leaderaddress) }}
                          </n-link>
                        </div>
                        <div class="sec">
                          >{{
                            getTimeAgo(item.timestamp)
                          }}
                        </div>
                      </div>
                    </div>
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-item>
        </v-flex>

        <v-flex class="tab-card">
          <v-item>
            <v-card light width="100%" class="margin-tab">
              <v-card-title class="underline">
                <div>
                  <img src="/home/transactions.png" alt="transactions" class="transactions">
                  <span class="tab-name">&nbsp;&nbsp;&nbsp;TRANSACTIONS</span>
                </div>
                <div class="but">
                  <n-link to="/txs">
                    View All
                  </n-link>
                </div>
              </v-card-title>
              <v-card-text>
                <v-list two-line>
                  <template v-for="(item, index) in homeData.LatestTxs">
                    <div :key="index" class="block-item">
                      <div class="right">
                        <div>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;TX#:&nbsp;</span>
                          <n-link :to="{name: 'tx', query: { hash: item.hash }}">
                            {{ subAddr(item.hash) }}
                          </n-link>
                        </div>
                        <div>
                          <span>FROM:&nbsp;</span>
                          <n-link :to="{
                              name: 'address',
                              query: { address: item.from }
                            }">
                            {{ subAddr(item.from) }}
                          </n-link>
                        </div>
                        <div>
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TO:&nbsp;
                          </span>
                          <n-link :to="{
                              name: 'address',
                              query: { address: item.to }
                            }">
                            {{ subAddr(item.to) }}
                          </n-link>
                        </div>
                      </div>
                      <div class="right">
                        <div class="drep">
                          {{ getFormatAmount(item.amount)+" DREP" }}
                        </div>
                        <div class="sec2">
                          >{{
                            getTimeAgo(item.timestamp)
                          }}
                        </div>
                      </div>
                    </div>
                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-item-group>
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  export default {
    // props: {
    //   homeData: {
    //     type: Object,
    //     required: true
    //   }
    // },
    data() {
      return {
        getPeakTPS: '',
        NumTxs: '',
        homeData: {}
      }
    },
    mounted() {
      this.loadTxs()
      // const result = this.$axios.$get('/api/getBlocksTxs', {}).then((res) => {
      //   console.log(res.Blocks)
      //   this.homeData = res
      // })

      // console.log(this.home_data.Blocks, 999)
      // this.home_data = this.$props.homeData

      // function toThousands(num) {
      //   return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      // }
      // this.BlockHeight = toThousands(this.home_data.BlockHeight)
      // this.getPeakTPS = toThousands(this.home_data.getPeakTPS)
      // this.NumTxs = toThousands(this.home_data.NumTxs)

      // this.homeData.Blocks.forEach((item, index) => {
      //   item.height = toThousands(item.height)
      // })
      // this.homeData.LatestTxs.forEach((item, index) => {
      //   // item.amount =
      // })
    },
    destroyed: function () {
      // console.log('离开页面')
    },
    methods: {
      getFormatAmount(amount) {
        return new BigNumber(amount).div(new BigNumber('1000000000000000000')).toFormat(10)
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
      loadTxs() {
        const result = this.$axios.$get('/api/getBlocksTxs', {}).then((res) => {
          this.homeData = res
        })
      }
    }
  }

</script>

<style scoped lang="scss">
  .container-width {
    display: flex;
    justify-content: center;
    width: 70.2%;
    margin-left: 15%;
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
  //   max-width: 32%;
  //   flex-basis: 32%;
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
    width: 92%;
    max-width: 1200px;
    margin: 4% auto 0 auto;
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
  //   max-width: 48%;
  //   flex-basis: 48%;
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
      margin: 0 auto;
      width: 92%;
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

    .left {
      margin-left: 20px;

      .height {
        width: 100px;
        font-size: 18px !important;
        line-height: 36px;
      }

      .txns {
        width: 100px;
        font-size: 14px;
      }

      .mined {
        width: 120px;
        line-height: 36px;
      }

      .hash {
        width: 120px;
        font-size: 12px !important;
      }

      .sec {
        width: 120px;
        font-size: 12px;
      }
    }

    .right {
      font-size: 12px;

      span {
        margin-right: 18px !important;
        margin-top: -2px;
      }

      .drep {
        padding-left: 8px;
        font-size: 16px !important;
      }

      .sec2 {
        padding-left: 8px;
        line-height: 1.2;
        padding-top: 4px;
      }
    }

    @media screen and (max-width: 320px) {
      .rootchain {
        margin-top: 16%;
      }
    }
  }

</style>

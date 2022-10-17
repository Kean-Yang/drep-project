<template>
  <div class="header">
    <div class="header-container">
      <div class="main">
        <input v-model="message" type="text" class="input" placeholder="Search by Address/ TXn Hash /Block Height"
          @input="onInput" @keyup.enter="submit">

        <span @click="submit">Search</span>
      </div>

      <div class="download-DREP-wallet">
        <div class="DREP-Wallet-Download ">
          Download DREP Wallet
        </div>
        <div class="header-download-wallet">
          <div>
            <a href="https://play.google.com/store/apps/details?id=com.drep.wallet">
              <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/GooglePlay1.svg" alt="">
            </a>
          </div>
          <div>
            <a href="https://apps.apple.com/us/app/drep/id1492978231?l=zh&ls=1">
              <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/AppStore1.svg" alt="">
            </a>
          </div>
          <div class="pcdownload" @click="isMacos">
            <!-- <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/AppStore3.svg" alt=""
              @click="isAndroid"> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BigNumber from 'bignumber.js'
  export default {
    data() {
      return {
        message: ''
      }
    },
    mounted() {
      // const yi = document.body.clientHeight
      // const bili = yi / 1600
      // const oContainer = document.getElementsByClassName('header-container')[0]
      // const oImg = document.getElementsByClassName('banner')[0]
      // oImg.height = bili * 380
      // oContainer.height = bili * 380
    },

    methods: {
      isMacos() {
        // const u = navigator.userAgent
        // if (/macintosh|mac os x/i.test(navigator.userAgent)) {
        //   window.location.href =
        //     'https://github.com/drep-project/DREP_Wallet/releases/download/v0.9.2-alpha/DREP-Wallet-0.9.2-alpha.dmg'
        // } else {
        //   window.location.href = 'http://file.drep.org/appdrep1.4.1.apk'
        // }
      },
      submit() {
        // console.log(this.message.length)
        // console.log(new BigNumber(this.message).toFixed())

        this.$axios.$get('/api/getBlocksTxs', {}).then((res) => {
          if (res.success = false) {
            this.$router.push({
              name: 'nodata'
            })
          } else {
            if (this.message.startsWith('0x')) {
              if (this.message.length === 42) {
                this.$router.push({
                  name: 'address',
                  query: {
                    address: '' + this.message
                  }
                })
                return
              } else if (this.message.length === 66) {
                this.$router.push({
                  name: 'tx',
                  query: {
                    hash: '' + this.message
                  }
                })
                return
              }
            } else if (this.message.length === 40) {
              this.$router.push({
                name: 'address',
                query: {
                  address: '' + this.message
                }
              })
              return
            } else if (this.message.length === 64) {
              this.$router.push({
                name: 'tx',
                query: {
                  hash: '' + this.message
                }
              })
              return
            }
            if (new BigNumber(this.message).toFixed() !== 'NaN') {
              this.$router.push({
                name: 'block',
                query: {
                  height: '' + this.message
                }
              })
            }
          }
        })
      },
      onInput(e) {
        this.message = e.target.value
      }
    }
  }

</script>
<style scoped lang="scss">
  .header {
    background-color: #000000;
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    min-height: 306px;
    max-height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url(https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/web_banner10.png);
    background-size: 100% 100%;
  }

  .banner {
    width: 100%;
    height: 100%;
  }

  .download-DREP-wallet {
    overflow: hidden;

    .DREP-Wallet-Download {
      font-size: 18px;
      font-family: Gilroy-Regular, Gilroy;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      margin-top: 38px;
      text-align: center;
    }

    .header-download-wallet {
      overflow: hidden;
      margin-top: 14px;

      div {
        width: 186px;
        height: 42px;
        float: left;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }

    }
  }

  /* .header-container .v-btn {
  color: #fff;
}
.header-container .button {
  width: 40rem;
  float: right;
} */
  @media screen and (max-width: 768px) {
    .download-DREP-wallet {
      overflow: hidden;

      .DREP-Wallet-Download {
        font-size: 18px;
        font-family: Gilroy-Regular, Gilroy;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
        margin-top: 20px;
        text-align: center;
      }

      .header-download-wallet {
        overflow: hidden;
        margin-top: 22px;
        margin-bottom: 20px;

        div {
          width: 40%;
          float: left;
          margin: 6px 5%;

          img {
            width: 100%;
            height: 100%;
          }
        }

      }
    }

    .pcdownload {
      display: none;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      min-height: 220px;
      max-height: 450px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-image: url(https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/home_banner_wap.png);
      background-size: 100% 100%;
    }
  }

  .main {
    display: flex;
    justify-content: center;
    width: 568px;
    margin: 99px auto 0 auto;

  }

  .input {
    height: 40px;
    line-height: 40px;
    box-shadow: 0px 14px 70px 0px rgba(163, 163, 163, 0.15);
    border-radius: 12px;
    padding: 0 16px;
    background-color: rgba(255, 255, 255, 1);
    max-width: 1200px;
    border-radius: 4px 0px 0px 4px;
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
  }

  input:focus {
    border: none;
  }

  span {
    width: 72px;
    height: 40px;
    background: rgba(29, 126, 255, 1);
    border-radius: 0px 4px 4px 0px;
    line-height: 40px;
    text-align: center;
    color: white;
    cursor: pointer;
  }

  .pcdownload {
    background-image: url(https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/AppStore3.svg);
    background-size: 100% 100%;
    cursor: pointer;
  }

  .pcdownload:hover {
    background-image: url(https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/BlackComingsoon.png);
    background-size: 100% 100%;
    cursor: pointer;
    width: 136px;
    height: 40px;
    float: left;
    margin-right: 16px;
  }

  @media screen and (max-width: 768px) {
    .main {
      display: flex;
      justify-content: center;
      width: 96%;
      max-width: 350px !important;
    }

    .input {
      font-size: 13px;
      height: 40px;
      padding-left: 10px;
    }
  }

</style>

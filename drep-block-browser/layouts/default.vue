<template>
  <v-app class="app-page">
    <nuxt />
    <footer class="footer">
      <div class="foot-page">
        <div class="foot-left">
          <div class="foot-page-logo">
            <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/logo_drep_w.svg" alt="">
          </div>
          <div class="DREP-Wallet-Download">
            Download DREP Wallet
          </div>
          <div class="foot-download-wallet">
            <div>
              <a href="https://play.google.com/store/apps/details?id=com.drep.wallet&hl=en&pli=1">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/GooglePlay2.svg" alt="">
              </a>
            </div>
            <div>
              <a href="https://apps.apple.com/us/app/drep/id1492978231?l=zh&ls=1">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/AppStore2.svg" alt="">
              </a>
            </div>
            <div class="pcdownload" @click="isMacos">
              <!-- <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/AppStore3.svg" alt=""
              @click="isAndroid"> -->
            </div>
          </div>
        </div>

        <div class="foot-right">
          <div class="foot-community">
            <div>
              <a href="https://t.me/drep_foundation">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/logo_telegram.svg" alt="">
              </a>
            </div>
            <div>
              <a href="https://twitter.com/FoundationDrep ">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/icon_twitter.svg" alt="">
              </a>
            </div>
            <div>
              <a href="https://www.reddit.com/user/DREP-FOUNDATION">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/Reddit.svg" alt="">
              </a>
            </div>
            <div>
              <a href="https://steemit.com/@drepfoundation">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/Steemit.svg" alt="">
              </a>
            </div>
            <div>
              <a href="https://blog.naver.com/drepkorea">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/blog.svg" alt="">
              </a>
            </div>
            <div>
              <a href="https://open.kakao.com/o/g5NUg5N">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/kakao.svg" alt="">
              </a>
            </div>
            <div>
              <a href="pr@drep.org">
                <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/icon_email.svg" alt="">
              </a>
            </div>
          </div>

          <div class="foot-Copyright">
            Copyright @ {{ new Date().getFullYear() }} DREP Foundation Ltd,. All Rights Reserved
          </div>
        </div>
      </div>
      </div>
    </footer>
  </v-app>
</template>

<script>
export default {
  methods: {
    isMacos() {
      // const u = navigator.userAgent
      // if (/macintosh|mac os x/i.test(navigator.userAgent)) {
      // window.location.href =
      // 'https://github.com/drep-project/DREP_Wallet/releases/download/v0.9.2-alpha/DREP-Wallet-0.9.2-alpha.dmg'
      // } else {
      // window.location.href = 'http://file.drep.org/appdrep1.4.1.apk'
      // }
    }
  }
};
</script>

<style lang="scss">
body,
html {
  font-family: Gilroy-Bold, Gilroy;
}
</style>
<style scoped lang="scss">
.app-page {
  min-width: 320px;
  overflow: hidden;
  background: rgba(245, 245, 245, 1);
}

.footer {
  background: rgba(0, 0, 0, 1);
  box-shadow: 0px 4px 6px 0px rgba(245, 245, 245, 0.7);
  overflow: hidden;

  // display: flex;
  // justify-content: center;
  .foot-page {
    max-width: 1200px;
    margin: 36px auto;
    overflow: hidden;
  }

  .foot-left {
    float: left;

    .foot-page-logo {
      width: 112px;
      height: 26px;
    }

    .foot-download-wallet {
      overflow: hidden;

      div {
        width: 136px;
        height: 40px;
        float: left;
        margin-right: 16px;
        margin-top: 22px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .DREP-Wallet-Download {
    font-size: 18px;
    font-family: Gilroy-Regular, Gilroy;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 21px;
    margin-top: 40px;
  }

  .foot-right {
    float: right;

    .foot-community {
      overflow: hidden;
      margin-top: 90px;
      margin-bottom: 12px;

      div {
        width: 20px;
        height: 20px;
        float: right;
        margin-right: 12px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .foot-Copyright {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(140, 140, 140, 1);
      line-height: 20px;
    }
  }
}

.pcdownload {
  background-image: url(https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/AppStore4.svg);
  background-size: 100% 100%;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .foot-page {
    padding: 0 12px;
  }

  .footer {
    background: rgba(0, 0, 0, 1);
    box-shadow: 0px 4px 6px 0px rgba(245, 245, 245, 0.7);
    overflow: hidden;

    // display: flex;
    // justify-content: center;
    .foot-page {
      max-width: 1200px;
      margin: 36px auto;
      overflow: hidden;
    }

    .foot-left {
      float: left;
      width: 100%;

      .foot-page-logo {
        width: 112px;
        height: 26px;
        position: absolute;
        left: 50%;
        margin-left: -60px;
      }

      .foot-download-wallet {
        overflow: hidden;
        margin-top: 24px;

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

    .DREP-Wallet-Download {
      font-size: 18px;
      font-family: Gilroy-Regular, Gilroy;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 21px;
      margin-top: 40px;
      text-align: center;
    }

    .foot-right {
      float: right;

      .foot-community {
        overflow: hidden;
        width: 72%;
        margin: 56px auto 48px auto;

        div {
          width: 13%;
          /* height: 20px; */
          float: right;
          margin-right: 1%;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .foot-Copyright {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(140, 140, 140, 1);
        line-height: 20px;
        text-align: center;
      }
    }
  }
}
</style>

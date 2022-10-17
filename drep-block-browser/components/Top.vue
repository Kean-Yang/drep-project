<template>
  <div class="top">
    <div class="content">
      <div class="logo">
        <a href="/">
          <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/logo_drep_w.svg" alt="logo"
            width="135" height="32">
        </a>
      </div>

      <div class="clicktab" @click="loadTxs">
        <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/home_icon_more.png" alt="logo">
      </div>

      <div v-show="mtab" class="tab">
        <div class="tab-item" @click="mtabhide">
          <n-link to="/" :class="this.$route.path === '/' ? 'now1' : 'now2'">
            Home
          </n-link>
        </div>
        <div class="tab-item" @click="mtabhide">
          <n-link to="/blocks" :class="this.$route.path === '/blocks'|| this.$route.path ==='/block' || this.$route.path ==='/address' ?
              'now1' : 'now2'">
            Blocks
          </n-link>
        </div>
        <div class="tab-item" @click="mtabhide">
          <n-link to="/txs" :class="this.$route.path === '/txs'|| this.$route.path === '/tx' ? 'now1' : 'now2'">
            Transactions
          </n-link>
        </div>
        <div class="tab-item" @click="mtabhide">
          <n-link to="/supernode" :class="this.$route.path === '/supernode' ? 'now1' : 'now2'">
            Supernode
          </n-link>
        </div>

        <div class="tab-item">
          <n-link to="/testcoin" :class="this.$route.path === '/testcoin' ? 'now1' : 'now2'">
            Testcoin
          </n-link>
        </div>

        <div class="tab-item" @click="mtabhide">
          <a href="https://drep.org/" class="now2">
            DREP
          </a>
        </div>

        <div id="mobile-main-1" class="tab-item">
          <div class="header">
            <div class="nav">
              <div class="drop-down clearfix">
                <ul>
                  <li>
                    <div class="now2 switch">
                      <img class="mobile-main-img"
                        src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/main_icon_change.png"
                        alt="">
                      Testnet
                    </div>
                    <ul>
                      <li>
                        <a href="http://testnet.drep.org">Testnet</a>
                      </li>
                      <li>
                        <a href="http://explorer.drep.org/">Main</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="mobile-main" class="tab-item">
          <a href="http://explorer.drep.org/" class="now2">
            <img class="mobile-main-img"
              src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/main_icon_change.png" alt="">
            Testnet
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        base: false,
        mtab: null,
        screenWidth: 0
      }
    },
    mounted() {
      this.ispc()
      //  const that = this;
      //   window.onresize = () => {
      //       if(document.body.clientWidth<= 768){
      //           that.mtab = true
      //       }else{
      //           that.mtab = false
      //       }

      //   }
    },
    methods: {
      loadTxs() {
        if (this.mtab === false) {
          this.mtab = true
        } else {
          this.mtab = false
        }
      },
      mtabhide() {
        const that = this
        if (document.body.clientWidth <= 768) {
          this.mtab = false
        }
      },
      ispc() {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          this.mtab = false
        } else {
          this.mtab = true
        }
      }
    }

  }

</script>

<style scoped lang="scss">
  .top {
    width: 100%;
    height: 66px;
    background: #000000;
    display: flex;
    justify-content: center;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .content {
    width: 92%;
    max-width: 1200px;
    height: 66px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  }

  a {
    color: white;
    font-size: 16px;
    text-decoration: none;
  }

  .tab {
    display: flex;
    text-align: right;

    .tab-item {
      color: #f5f5f5;
      margin: 10px 10px 0px 25px;
    }
  }

  .switch {
    position: relative;
    cursor: pointer;

    .switch-show {
      position: absolute;
      opacity: 0;
      top: 0;
      padding-top: 30px;

      div {
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: white;
      }
    }

  }

  .switch-show:hover {
    display: block;
    opacity: 1;
  }

  .switch-show div:hover {
    display: block;
    opacity: 1;
    background: #fafafa;

  }

  .now1 {
    color: #1d7eff;
  }

  .now2 {
    color: #a6aebc;
  }

  #mobile-main {
    opacity: 0;
  }

  #mobile-main-1 {
    opacity: 1;
  }

  .mobile-main-img {
    width: 12px;
    height: 10px;

  }

  .clicktab {
    position: absolute;
    right: 20px;
    top: 26px;
    width: 20px !important;
    height: 16px !important;
    opacity: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .logo {
      margin: 20px;
    }

    .clicktab {
      opacity: 1;
    }

    .tab {
      display: block;
      text-align: right;
      background: white;
      overflow: hidden;
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    }

    #mobile-main {
      opacity: 1;

    }

    #mobile-main-1 {
      opacity: 0;
      display: none;
    }

    .content {
      width: 100%;
      display: block;
    }

    img {
      width: 80px;
      height: 24px;
      margin-top: 5px;
    }

    .tab-item {

      float: left;
      width: 100%;
      text-align: left;

      a {
        text-align: left;
      }
    }

    a {
      font-size: 13px;
    }
  }

  .nav {
    margin: 0 auto;
  }

  /* 描述a标签的css */
  .nav a {
    display: block;
    width: 120px;
    color: #666666;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    text-decoration: none;
  }

  /* 鼠标悬停a标签事改变背景色 */
  .nav a:hover {
    color: #1d7eff;

  }

  /* 去除无序列表 无标记 取消默认的内边距 */
  .nav ul {
    list-style: none;
    padding: 0;
  }

  /* 一级菜单设置浮动 使之在一行上面 */
  .drop-down>ul>li {
    float: left;
    /* 为了让二级菜单栏参照定位 */
    position: relative;
  }

  /* 一级菜单栏悬停鼠标时显示二级菜单栏 */
  .drop-down>ul>li:hover>ul {
    display: block;
  }

  /* 二级菜单栏绝对定位 脱离文档 默认不显示 */
  .drop-down>ul>li>ul {
    position: absolute;
    display: none;
    background: white;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
  }

  /* 在二级菜单栏悬停鼠标时 显示相对于的三级菜单栏 */
  .drop-down>ul>li>ul>li:hover>ul {
    display: block;
  }

  /* 二级菜单栏相对定位 为下面三级菜单栏绝对定位做准备 */
  .drop-down>ul>li>ul>li {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #1D7EFF;
  }

  .drop-down>ul>li>ul>li:hover {
    background: #E9F2FF;
    border-radius: 4px;
  }

  /* 三级菜单栏绝对定位 脱离文档流 并且位于二级菜单栏右边 默认不显示 */
  .drop-down>ul>li>ul>li>ul {
    position: absolute;
    left: 100%;
    top: 0;
    display: none;
  }

  /* 清除浮动 兼容低版本IE */
  .clearfix {
    *zoom: 1;
  }

  /* 清除一级菜单栏浮动的操作 */
  .clearfix ::after {
    content: ".";
    display: block;
    clear: both;
    /* 兼容低版本Firefox*/
    height: 0;
    overflow: hidden;
  }

</style>

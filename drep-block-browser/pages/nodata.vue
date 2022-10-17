<template>
  <div class="page">
    <div>
      <Top />
    </div>
    <div class="word-block">
      <img src="https://drep-resources.s3-ap-northeast-1.amazonaws.com/browser/img_nodata.png" alt="">
    </div>

    <div class="back-block">
      <Button type="button" class="back-home">
        <n-link to="/">
          Back Home
        </n-link>
      </Button>
    </div>
  </div>
</template>

<script>
  import Top from '~/components/Top'
  export default {
    components: {
      Top
    }
  }

</script>

<style scoped lang="scss">
  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  .word-block {
    margin: 10% auto 0 auto;
    text-align: center;
    max-width: 1200px;
    width: 92%;

    img {
      text-align: center;
      width: 44%;
      margin: 0 33%;
    }
  }

  .back-block {
    text-align: center;
  }

  .back-home {
    height: 32px;
    background: rgba(29, 126, 255, 1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 32px;
  }

  .back-home a {
    font-size: 16px !important;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    line-height: 45px;
    color: rgba(244, 205, 166, 1);
  }

  @media screen and (max-width: 768px) {
    .word-block {
      font-size: 16px;
    }

    .word-block {
      margin: 10% auto 0 auto;
      text-align: center;
      max-width: 1200px;
      width: 90%;

      img {
        text-align: center;
        width: 100%;
        margin: 0 auto;
      }
    }
  }

  .back-home {
    padding: 0 24px;
    height: 32px;
  }

  .back-home a {
    font-size: 18px;
    line-height: 32px;
  }

</style>

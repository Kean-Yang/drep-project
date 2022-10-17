<template>
  <div class="page">
    <Top />
    <div class="table-data">
      <v-form v-model="valid" lazy-validation>
        <v-container>
          <!-- <v-layout style="width:100%">
            <v-flex xs12 row class="flex" style="width:70%">
              <v-text-field v-model="faucetAddress" :counter="64" label="Your DREP testnet public key" required
                class="input" />
            </v-flex>
            <button class="but" @click="submitFaucet">
              Claim
            </button>
          </v-layout> -->

          <div class="main">
            <input v-model="faucetAddress" :counter="64" type="text" class="input"
              placeholder="Your DREP testnet public Address" @keyup.enter="submitFaucet">

            <span @click="submitFaucet">Claim</span>
          </div>

          <v-layout v-if="showSuccess" class="al">
            <v-flex>1 DREP testnet tokens have been sent to your Address.</v-flex>
          </v-layout>

          <v-layout v-if="showfalse" class="alerr">
            <v-flex>{{ text }}.</v-flex>
          </v-layout>

          <v-layout class="remark">
            <v-flex>
              <div>Instruction:</div>
              <ol class="ol-left">
                <li>
                  Prepare your DREP testnet public Address
                </li>
                <li>Input it on above field of "Your DREP testnet public Address"</li>
                <li>Press button of Claim</li>
              </ol>
              <div>Note:</div>
              <p class="word">
                Every DREP testnet public Address is allowed to claim DREP testnet token once per day (00:00, UTC)
              </p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
  import Top from '~/components/Top'
  export default {
    components: {
      Top
    },
    data: () => ({
      valid: false,
      faucetAddress: '',
      text: '',
      showSuccess: false,
      showfalse: false
    }),
    methods: {
      async submitFaucet() {
        if (this.faucetAddress && this.faucetAddress != '') {
          const result = await this.$axios.$get(
            '/api/faucet?address=' + this.faucetAddress
          )

          if (result.success && result.success === true) {
            this.showfalse = false
            this.showSuccess = true
          } else {
            this.showSuccess = false
            this.text = result.data.msg
            this.showfalse = true
          }
        }
      }
    }
  }

</script>

<style scoped lang="scss">
  .page {
    min-height: calc(100vh - 221px);
    margin-top: 66px;
  }

  .container {
    padding: 16px 0px 0px 0px;
  }

  .main {
    display: flex;
    justify-content: center;

    width: 568px;
    margin: 72px auto 0 auto;

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

  }

  .v-form {
    width: 92%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }

  .but {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(244, 205, 166, 1);
    line-height: 40px;
    width: 132px;
    height: 40px;
    margin-top: 10px;
    background: linear-gradient(270deg, rgba(14, 14, 13, 1), rgba(66, 66, 66, 1));
    box-shadow: 0px 4px 21px 0px rgba(0, 0, 0, 0.29);
    border-radius: 10px;
    cursor: pointer;
  }

  .but:hover {
    box-shadow: 0px 4px 21px 0px rgba(9, 9, 9, 0.5);
  }

  .flex {
    justify-content: center;
    flex-direction: row;
  }

  .remark {
    width: 92%;
    font-family: PingFangSC-Medium;
    font-weight: 400;
    color: #010000;
    margin: 40px auto !important;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(138, 148, 166, 1);
    line-height: 22px;

    div {
      font-size: 14px;
    }
  }

  .ol-left {
    margin-left: -5px;
    font-size: 14px;
    font-weight: 150;
  }

  .word {
    font-size: 14px;
    font-weight: 150;
  }

  .al {
    width: 550px;
    font-size: 10px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(222, 184, 127, 1);
    text-align: center;
    margin: 0 auto !important;
    /* line-height: 25px; */
    /* padding-top: 0px;
  margin-top: -30px; */
  }

  .alerr {
    width: 550px;
    font-size: 10px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: red;
    line-height: 25px;
    text-align: center;
    margin: 0 auto !important;
  }

  @media screen and (max-width: 768px) {
    .main {
      width: 100%;
    }

    .input {
      width: 90%;
      height: 46px;
    }

    .v-form {
      width: 92%;
      margin: 0 auto;
    }

    .but {
      font-size: 16px;
      line-height: 30px;
      height: 30px !important;
      width: 80px;
      margin-top: 20px;
    }

    .remark {
      width: 100%;
      margin-bottom: 22% !important;
    }

    .al {
      width: 100%;
      text-align: center;
      font-size: 10px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(222, 184, 127, 1);
      /* line-height: 25px; */
      /* padding-top: 0px;
        margin-top: -30px; */
    }

    .alerr {
      width: 100%;
      text-align: center;
      font-size: 10px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: red;
      /* line-height: 25px; */
      /* padding-top: 0px;
        margin-top: -30px; */
    }
  }

</style>

<template>
  <div>
    <v-form v-model="valid" lazy-validation>
      <v-container>
        <v-layout style="width:100%">
          <v-flex xs12 row class="flex" style="width:70%">
            <v-text-field v-model="faucetAddress" :counter="64" label="Your DREP testnet public key" required
              class="input" />
          </v-flex>
          <button class="but" @click="submitFaucet">
            Claim
          </button>
        </v-layout>

        <v-layout v-if="showSuccess" class="al">
          <v-flex>1 DREP testnet tokens have been sent to your address.</v-flex>
        </v-layout>

        <v-layout class="remark">
          <v-flex>
            <div>How to claim free DREP testnet token:</div>
            <ol class="ol-left">
              <li>
                Prepare your DREP testnet public key
              </li>
              <li>Input it on above field of "Your DREP testnet public key"</li>
              <li>Press button of Claim</li>
            </ol>
            <div>Note:</div>
            <p class="word">
              Every DREP testnet public key is allowed to claim DREP testnet token once per day (00:00, UTC)
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      faucetAddress: '',
      showSuccess: false
    }),
    methods: {
      async submitFaucet() {
        if (this.faucetAddress && this.faucetAddress != '') {
          const result = await this.$axios.$get(
            'http://explorer.drep.org/uat/api/faucet?address=' + this.faucetAddress
          )
          if (result.success) {
            // console.log(result)
            this.showSuccess = true
          }
        }
      }
    }
  }

</script>

<style scoped>
  .container {
    padding: 16px 0px 0px 0px;
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

    height: 160px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 400;
    color: #010000;
    line-height: 27px;
    margin-top: 40px;
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
    /* line-height: 25px; */
    /* padding-top: 0px;
  margin-top: -30px; */
  }

  @media screen and (max-width: 768px) {
    .v-form {
      width: 90%;
      margin-left: 5%;
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
  }

</style>

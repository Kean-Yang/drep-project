<template>
  <div class="main">
    <input v-model="message" type="text" class="input" placeholder="Search by Address/ TXn Hash /Block Height"
      @input="onInput" @keyup.enter="submit">

    <span @click="submit">Search</span>
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
    methods: {
      submit() {
        // console.log(this.message.length)
        // console.log(new BigNumber(this.message).toFixed())

        if (this.message.startsWith('0x')) {
          // console.log(this.message.length, 88888)
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
          return
        }
        this.$router.push({
          name: '404'
        })
      },
      onInput(e) {
        this.message = e.target.value
      }
    }
  }

</script>

<style scoped>
  .main {
    display: flex;
    justify-content: center;
    width: 568px;
    margin: -30px auto 0 auto;

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

  @media screen and (max-width: 768px) {
    .main {
      display: flex;
      justify-content: center;
      width: 90%;
      max-width: 300px !important;
    }

    .input {

      height: 46px;
      padding-left: 4rem;
    }
  }

</style>

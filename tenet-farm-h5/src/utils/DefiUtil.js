import config from './Config';
import * as Tool from './Tools';

class DefiUtil {
  // 流动池名称
  async getPolllName(web3, contract_address) {
    try {
      var contract = new web3.eth.Contract(config.uni_abi, contract_address);
      var token0_address = await contract.methods.token0().call();
      var token1_address = await contract.methods.token1().call();
      var token0_contract = new web3.eth.Contract(config.erc20_abi, token0_address);
      var token1_contract = new web3.eth.Contract(config.erc20_abi, token1_address);
      // var token0_name = await token0_contract.methods.name().call();
      // var token1_name = await token1_contract.methods.name().call();
      // const pairAddrName = token0_name.replace('Token', '') + '/' + token1_name.replace('Token', '');
      // return pairAddrName;

      console.log('token0_address: ' + token0_address, '---', 'token1_address: ' + token1_address);
      var token0_symbol;
      if (token0_address && (token0_address.toLowerCase() === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' || token0_address.toLowerCase() === '0xc778417e063141139fce010982780140aa0cd5ab')) {
        token0_symbol = 'ETH';
      } else {
        token0_symbol = await token0_contract.methods.symbol().call();
      }
      var token1_symbol;
      if (token1_address && (token1_address.toLowerCase() === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' || token1_address.toLowerCase() === '0xc778417e063141139fce010982780140aa0cd5ab')) {
        token1_symbol = 'ETH';
      } else {
        token1_symbol = await token1_contract.methods.symbol().call();
      }
      return token0_symbol + '/' + token1_symbol;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  // 查询符号
  async getSymbol(web3, contractAddress) {
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, contractAddress);
      let d = await contract.methods.symbol().call();
      return Promise.resolve(d);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  // 查询余额
  getBalanceOf(web3, contractAddress, userAddress) {
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, contractAddress);
      return contract.methods.balanceOf(userAddress).call();
    } catch (error) {
      console.error('getBalanceOf: ', error);
    }
  }

  // 获取授权额度
  async getAllowance(web3, erc20ContractAddress, userAddress, senderContractAddress = config.tenet_contract_address) {
    try {
      console.log('web3=====', web3);

      var contract = new web3.eth.Contract(config.erc20_abi, erc20ContractAddress);
      console.log(erc20ContractAddress, userAddress, senderContractAddress);

      var allowanceAmount = await contract.methods.allowance(userAddress, senderContractAddress).call();
      console.log('allowanceAmount: ' + allowanceAmount);

      return allowanceAmount;
    } catch (error) {
      console.error('getAllowance: ', error);
    }
  }

  // 授权扣款
  approve(web3, erc20ContractAddress, userAddress, amount = '0xffffffffffffffffffffffffffffffffffffffffff') {
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, erc20ContractAddress);
      return contract.methods
        .approve(config.tenet_contract_address, amount)
        .send({ from: userAddress })
        .on('error', function (error) {
          console.log('invoke approve error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('invoke approve pending: ' + transactionHash);
          console.log(transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('approve receipt');
        });
    } catch (error) {
      console.error('approve: ', error);
    }
  }

  //----------------------------------------------------------------------

  // lpten查询余额
  getLpTenTokenBalanceOf(web3, userAddress) {
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, config.lptentoken_contract_address);
      return contract.methods.balanceOf(userAddress).call();
    } catch (error) {
      console.error('getLpTenTokenBalanceOf: ', error);
    }
  }

  // 项目方余额
  getProjectBalanceOf(web3, userAddress, tokenAddress) {
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, tokenAddress);
      return contract.methods.balanceOf(userAddress).call();
    } catch (error) {
      console.error('getLpTenTokenBalanceOf: ', error);
    }
  }

  // 查询ten余额
  getTenTokenBalanceOf(web3, userAddress) {
    console.log('getTenTokenBalanceOf:', userAddress);
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, config.tenet_token_contract_address);
      return contract.methods.balanceOf(userAddress).call();
    } catch (error) {
      console.error('getTenTokenBalanceOf: ', error);
    }
  }

  // 获取lpten授权额度
  getLptentokenAllowance(web3, userAddress) {
    try {
      return this.getAllowance(web3, config.lptentoken_contract_address, userAddress, config.tenet_contract_address);
    } catch (error) {
      console.error('getLptentokenAllowance: ', error);
    }
  }

  // 授权lpten扣款
  approveLpTentoken(web3, userAddress, amount = '0xffffffffffffffffffffffffffffffffffffffffff') {
    try {
      var contract = new web3.eth.Contract(config.erc20_abi, config.lptentoken_contract_address);
      return contract.methods
        .approve(config.tenet_contract_address, amount)
        .send({
          from: userAddress,
        })
        .on('error', function (error) {
          console.log('invoke LptenTokenContract.approve error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('invoke LptenTokenContract.approve pending: ' + transactionHash);
          console.log(transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('LptenTokenContract receipt');
        });
    } catch (error) {
      console.error('approveLpTentoken: ', error);
    }
  }

  // 获取池子大小
  getPoolLength(web3) {
    try {
      var coreContract = new web3.eth.Contract(config.core_abi, config.tenet_contract_address);
      return coreContract.methods.poolLength().call();
    } catch (error) {
      console.error('getPoolLength: ', error);
    }
  }

  // 获取池子列表
  async getPoolInfoList(web3) {
    if (!web3) {
      console.error('Error: web3 is not instantiated ');
      return;
    }
    var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
    var size = await this.getPoolLength(web3);

    let map = new Map();
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push(
        coreContract.methods
          .poolInfo(i)
          .call()
          .then((res) => (map[i] = res))
      );
    }
    await Promise.all(array);
    let poolInfo = [];
    for (let i = size - 1; i >= 0; i--) {
      if (map[i]) {
        poolInfo.push(map[i]);
      }
    }
    console.log(poolInfo);
    return poolInfo;
  }

  // 查询指定的池子信息
  async getPoolInfo(web3, pid) {
    if (!web3) {
      console.error('Error: web3 is not instantiated ');
      return;
    }
    var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
    var info = await coreContract.methods.poolInfo(parseInt(pid)).call();
    console.log(info);
    return info;
  }

  async getDigits(web3, projectTokenContractAddress) {
    var contract = new web3.eth.Contract(config.uni_abi, projectTokenContractAddress);
    return await contract.methods.decimals().call();
  }

  /**
   * 创建池子
   * @param {*} web3
   * @param {*} userAddress 用户钱包地址
   * @param {*} projectLptokenContractAddress 项目方lptoken合约地址(必填)
   * @param {*} projectTokenContractAddress 项目方的币的合约地址(必填)
   * @param {*} endBlockOffset 离结束的偏移量
   * @param {*} tokenPerBlock 每个块分多少项目方的币(必填)
   * @param {*} totalPools 总共需要扣除多少项目方的币
   * @param {*} options 可选参数()
   *
   */
  async addPool(web3, userAddress, projectLptokenContractAddress, projectTokenContractAddress, endBlockOffset, tokenPerBlock, totalPools, options = {}) {
    try {
      var o = options || {};
      //活动开始的块高度(0表示当前块)
      var startBlock = o.startBlock || 0;
      //头矿奖励的数量
      // var tokenBonusEndBlockOffset = 0;
      var tokenBonusEndBlockOffset = o.priorEndBlock || 0;
      //头矿奖励倍数
      var tokenBonusMultipler = o.tokenBonusmul || 1;
      // var tokenBonusMultipler = 1;
      //lptentoken的充值金额
      var depositAmount = o.depositAmount || 0;
      var digits = await this.getDigits(web3, projectTokenContractAddress);
      console.log(digits);
      let count = '0';
      for (var i = 1; i < Number(digits); i++) {
        var test = '0';
        count = count + test;
      }
      // console.log(count);
      console.log(startBlock);
      console.log(totalPools);
      console.log(
        projectLptokenContractAddress,
        projectTokenContractAddress,
        !/(^[1-9]\d*$)/.test(totalPools) ? Tool.mul(Number(totalPools), Number(`1${count}`)) + '' : totalPools + count,
        startBlock + '',
        endBlockOffset + '',
        !/(^[1-9]\d*$)/.test(tokenPerBlock) ? Tool.mul(Number(tokenPerBlock), Number(`1${count}`)) + '' : tokenPerBlock + count,
        tokenBonusEndBlockOffset + '',
        tokenBonusMultipler + '',
        web3.utils.toWei(String(depositAmount || 0), 'ether') + ''
        // !/(^[1-9]\d*$)/.test(depositAmount) ? Number(depositAmount) * Number(`1${count}`) : depositAmount + count
      );
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      console.log('invoke coreContract.add...');
      return coreContract.methods
        .add(
          projectLptokenContractAddress,
          projectTokenContractAddress,
          !/(^[1-9]\d*$)/.test(totalPools) ? Tool.mul(Number(totalPools), Number(`1${count}`)) + '' : totalPools + count,
          startBlock + '',
          endBlockOffset + '',
          !/(^[1-9]\d*$)/.test(tokenPerBlock) ? Tool.mul(Number(tokenPerBlock), Number(`1${count}`)) + '' : tokenPerBlock + count,
          tokenBonusEndBlockOffset + '',
          tokenBonusMultipler + '',
          web3.utils.toWei(String(depositAmount || 0), 'ether') + ''
        )
        .send({
          from: userAddress,
        })
        .on('error', (error) => {
          console.log('invoke coreContract.add error: ', error);
          console.log('invoke coreContract.add error: ');
          console.log(error);
          return error;
        })
        .on('transactionHash', (transactionHash) => {
          console.log('coreContract.add pending ', transactionHash);
          console.log('coreContract.add pending: ' + transactionHash);
          console.log(transactionHash);
          return transactionHash;
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.add receipt', receipt);
          console.log('coreContract.add receipt');
          return receipt;
        });
    } catch (error) {
      console.error('addPool:', error);
    }
  }

  // 机构为指定交易对充值lpten,来挖ten币
  depositTenByProject(web3, userAddress, pid, depositAmount) {
    try {
      console.log(`invoke coreContract.depositTenByProject pid: ${pid} depositAmount: ${depositAmount}...`);

      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods
        .depositTenByProject(pid + '', depositAmount + '')
        .send({ from: userAddress })
        .on('error', function (error) {
          console.log('invoke coreContract.depositTenByProject error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.depositTenByProject pending: ' + transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.depositTenByProject receipt');
        });
    } catch (error) {
      console.error('depositTenByProject:', error);
    }
  }

  // 机构提取为指定交易对充值的lpten,停止挖ten币
  withdrawTenByProject(web3, userAddress, pid, withdrawAmount) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      console.log('invoke coreContract.withdrawTenByProject...');
      return coreContract.methods
        .withdrawTenByProject(pid + '', withdrawAmount + '')
        .send({
          from: userAddress,
        })
        .on('error', function (error) {
          console.log('invoke coreContract.withdrawTenByProject error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.withdrawTenByProject pending: ' + transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.withdrawTenByProject receipt');
        });
    } catch (error) {
      console.error('withdrawTenByProject:', error);
    }
  }

  // 查询提供lpten的机构还有多少TEN币可以领取
  getPendingTenByProject(web3, userAddress, pid) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_proxy_abi, config.tenet_proxy_contract_address, {
        from: userAddress,
      });
      return coreContract.methods.getPendingTenByProject(pid + '').call();
    } catch (error) {
      console.error('getPendingTenByProject:', error);
    }
  }

  //用户挖项目方代币(充值项目方lptoken)
  depositLPToken(web3, userAddress, pid, depositAmount) {
    try {
      console.log('invoke coreContract.depositLPToken...');
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods
        .depositLPToken(pid + '', depositAmount + '')
        .send({
          from: userAddress,
        })
        .on('error', function (error) {
          console.log('invoke coreContract.depositLPToken error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.depositLPToken pending: ' + transactionHash);
          return transactionHash;
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.depositLPToken receipt');
        });
    } catch (error) {
      console.error('depositLPToken:', error);
    }
  }

  // 用户提取项目方lptoken
  withdrawLPToken(web3, userAddress, pid, withdrawAmount) {
    try {
      let coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      console.log('invoke coreContract.withdrawLPToken...');
      return coreContract.methods
        .withdrawLPToken(pid + '', withdrawAmount + '')
        .send({
          from: userAddress,
        })
        .on('error', function (error) {
          console.log('invoke coreContract.withdrawLPToken error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.withdrawLPToken pending: ' + transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.withdrawLPToken receipt');
        });
    } catch (error) {
      console.error('withdrawLPToken:', error);
    }
  }

  // 用户充值lpten来挖ten币 - 质押
  depositTenByUser(web3, userAddress, depositAmount) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods
        .depositTenByUser(depositAmount + '')
        .send({
          from: userAddress,
        })
        .on('error', function (error) {
          console.log('invoke coreContract.depositTenByUser error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.depositTenByUser pending: ' + transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.depositTenByUser receipt');
        });
    } catch (error) {
      console.error('depositTenByUser:', error);
    }
  }

  // 用户提取lpten停止挖ten币 - 解锁
  withdrawTenByUser(web3, userAddress, withdrawAmount) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      console.log('invoke coreContract.withdrawtenByUser...');
      return coreContract.methods
        .withdrawTenByUser(withdrawAmount + '')
        .send({ from: userAddress })
        .on('error', function (error) {
          console.log('invoke coreContract.withdrawTenByUser error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.withdrawTenByUser pending: ' + transactionHash);
          return transactionHash;
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.withdrawtenByUser receipt');
        });
    } catch (error) {
      console.error('withdrawTenByUser:', error);
    }
  }

  // 查询用户还有多少TEN币可以领取
  getPendingTenByUser(web3, userAddress) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_proxy_abi, config.tenet_proxy_contract_address);
      return coreContract.methods.getPendingTenByUser(userAddress).call();
    } catch (error) {
      console.error('getPendingTenByUser:', error);
    }
  }

  // 查询用户还有多少机构空投的代币可以领取
  async getPendingToken(web3, pid, userAddress) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_proxy_abi, config.tenet_proxy_contract_address);
      return coreContract.methods.getPendingToken(pid + '', userAddress).call();
    } catch (error) {
      console.error('getPendingToken:', error);
    }
  }

  // 查询用户在这个池子还有多少TEN币可以领取
  async getPendingTen(web3, pid, userAddress) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_proxy_abi, config.tenet_proxy_contract_address);
      return coreContract.methods.getPendingTen(pid + '', userAddress).call();
    } catch (error) {
      console.error('getPendingTen:', error);
    }
  }

  // 用户提取lpten挖到的TEN币 - 收获
  mineLPTen(web3, userAddress) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      console.log('invoke coreContract.mineLPTen...');
      return coreContract.methods
        .mineLPTen()
        .send({ from: userAddress })
        .on('error', function (error) {
          console.log('invoke coreContract.mineLPTen error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.mineLPTen pending: ' + transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.mineLPTen receipt');
        });
    } catch (error) {
      console.error('mineLPTen:', error);
    }
  }

  // 用户提取项目方lptoken挖到的TEN币 - 收获项目方池
  mineLPToken(web3, userAddress, pid) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      console.log(`invoke coreContract.mineLPToken pid: ${pid}...`);
      return coreContract.methods
        .mineLPToken(pid)
        .send({ from: userAddress })
        .on('error', function (error) {
          console.log('invoke coreContract.mineLPToken error: ');
          console.log(error);
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.mineLPToken pending: ' + transactionHash);
        })
        .on('receipt', (receipt) => {
          console.log('coreContract.mineLPToken receipt');
        });
    } catch (error) {
      console.error('mineLPToken:', error);
    }
  }

  // 查询质押lptoken余额 --- 用户质押项目方
  getUserZYLPToken(web3, pid, userAddress) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods.userInfo(pid, userAddress).call();
    } catch (error) {
      console.error('getUserZYLPToken', error);
    }
  }

  // 查询质押lptoken余额 --- 用户质押官方
  getUserZYGfLPToken(web3, userAddress) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods.userInfoUserPool(userAddress).call();
    } catch (error) {
      console.error('getUserZYGfLPToken', error);
    }
  }

  // 查询质押lptoken余额 --- 项目方质押官方
  getProjectZYGfLPToken(web3, pid) {
    try {
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods.userInfoProjectPool(pid).call();
    } catch (error) {
      console.error('getUserZYGfLPToken', error);
    }
  }

  // 10的倍数
  async getWeiMul(web3, contracAddress = config.lptenet_token_contract_address) {
    try {
      let coreContract = new web3.eth.Contract(config.uni_abi, contracAddress);
      let num = await coreContract.methods.decimals().call();
      return Math.pow(10, num);
    } catch (error) {
      console.error('getUserZYLPToken', error);
    }
  }
  async fmtUnitMul(web3, val, address = config.lptenet_token_contract_address) {
    let num = await this.getWeiMul(web3, address);
    return Tool.mul(val || 0, num || 1);
  }
  async fmtUnitDiv(web3, val, address = config.lptenet_token_contract_address) {
    let num = await this.getWeiMul(web3, address);
    return num ? Tool.div(val || 0, num || 1) : 0;
  }
}

export default new DefiUtil();

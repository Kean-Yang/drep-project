const KoaRouter = require('koa-router')
const rp = require('request-promise')
const router = new KoaRouter({ prefix: '/api' })

const apiHost = 'http://39.99.44.60:7001'
const base = 'pro'

async function request({ path, data }) {
  // eslint-disable-next-line no-return-await
  return await rp({
    uri: apiHost + path,
    method: 'POST',
    form: {
      key: 'DREP_Exp666',
      ...data
    },
    json: true
  })
}

async function requestFaucet({ path, data }) {
  // eslint-disable-next-line no-return-await
  return await rp({
    uri: 'http://39.99.44.60:7001/faucet',
    method: 'POST',
    form: {
      key: 'DREP_Exp666',
      ...data
    },
    json: true
  })
}
// 切换测试环境
router.get('/testMain', async function (ctx) {
  ctx.body = {
    base: base
  }
})

router.get('/home', async (ctx, next) => {
  try {
    const [
      // BlockHeight,
      // getPeakTPS,
      // getNumTxs,
      getHotData
      // LatestTxs,
      // getBlocks
      // getTxsInBlockByHash
    ] = await Promise.all([
      // request({ path: '/getBlockHeight' }),
      // request({ path: '/getPeakTPS' }),
      // request({ path: '/getNumTxs' }),
      request({ path: '/getHotData' })
      // request({ path: '/getLatestTxs', data: { numTxs: 5 } }),
      // request({ path: '/getBlocks', data: { numBlocks: 5 } })
      // request({ path: '/getTxsInBlockByNumber', data: { number: 12 } })
    ])

    ctx.body = {
      success: true,
      BlockHeight: getHotData.data.blockHeight,
      txNum: getHotData.data.txNum,
      gasPrice: getHotData.data.gasPrice,
      DREPUSDT: getHotData.data.prices,
      blockTime: getHotData.data.blockTime,
      reward: getHotData.data.blockReward
      // LatestTxs: LatestTxs.data.Txs.slice(0, 5),
      // Blocks: getBlocks.data.blocks,
      // Txs: getTxsInBlockByHash.data
    }
    // console.log(BlockHeight.data.blockHeight)
  } catch (e) {
    console.error(e)
  }
})

router.get('/getBlocksTxs', async function (ctx) {
  try {
    const [
      LatestTxs,
      getBlocks
      // getTxsInBlockByHash
    ] = await Promise.all([
      request({ path: '/getLatestTxs', data: { pageSize: 5, pageNum: 1 } }),
      request({ path: '/getBlocks', data: { pageSize: 5, pageNum: 1 } })
      // request({ path: '/getTxsInBlockByNumber', data: { number: 12 } })
    ])
    ctx.body = {
      success: true,
      LatestTxs: LatestTxs.data.data,
      Blocks: getBlocks.data.data
      // Txs: getTxsInBlockByHash.data
    }
  } catch (e) {
    console.error(e)
  }
})

router.get('/blocks', async function (ctx) {
  const { page, limit } = ctx.query
  const result = await request({
    path: '/getBlocks',
    data: { pageNum: page, pageSize: limit }
  })

  if (result.success) {
    ctx.body = {
      success: true,
      blocks: result.data.data,
      totalCount: result.data.totalCount
    }
  } else {
    ctx.body = {
      success: false,
      errorMessage: result.data.errorMessage
    }
  }
})

router.get('/block', async function (ctx) {
  const { hash, height } = ctx.query

  if (hash) {
    const result = await request({
      path: '/getBlockByHash', // getBlockByHash
      data: { hash }
    })
    if (result.success) {
      ctx.body = {
        success: true,
        block: result.data.data
      }
    } else {
      ctx.body = {
        success: false,
        errorMessage: result.data.errorMessage
      }
    }
  }

  if (height) {
    const result = await request({
      path: '/getBlockByNumber',
      data: { number: height }
    })
    if (result.success) {
      ctx.body = {
        success: true,
        block: result.data
      }
    } else {
      ctx.body = {
        success: false,
        errorMessage: result.data.errorMessage
      }
    }
  }
})

router.get('/blockpage', async function (ctx) {
  const { page, limit, height } = ctx.query
  const result = await request({
    path: '/getTxsInBlockByNumber',
    data: { pageNum: page, pageSize: limit, number: height }
  })

  if (result.success) {
    ctx.body = {
      success: true,
      data: result.data
    }
  } else {
    ctx.body = {
      success: false,
      errorMessage: result.data.errorMessage
    }
  }
})

router.get('/supernode', async function (ctx) {
  const result = await request({
    path: '/getSuperNodes'
  })
  if (result.success) {
    ctx.body = {
      success: true,
      node: result.data
    }
  } else {
    ctx.body = {
      success: false,
      errorMessage: 'not found'
    }
  }
})

router.get('/transactions', async function (ctx) {
  const { page, limit } = ctx.query
  const result = await request({
    path: '/getLatestTxs',
    data: {
      bulkGet: true,
      pageSize: limit,
      pageNum: page
    }
  })
  if (result.success) {
    ctx.body = {
      success: true,
      transactions: result.data
    }
  } else {
    ctx.body = {
      success: false,
      errorMessage: result.data.errorMessage
    }
  }
})

router.get('/transaction', async function (ctx) {
  const { hash, height } = ctx.query

  if (hash) {
    const result = await request({
      path: '/getTx',
      data: { hash }
    })
    if (result.success) {
      ctx.body = {
        success: true,
        transaction: result.data
      }
    } else {
      ctx.redirect('/nodata')
      ctx.body = {
        success: false,
        errorMessage: result.data.errorMessage
      }
    }
  }

  if (height) {
    const result = await request({
      path: '/getTxsInBlockByNumber',
      data: { hash }
    })
    if (result.success) {
      ctx.body = {
        success: true,
        transaction: result.data
      }
    } else {
      ctx.body = {
        success: false,
        errorMessage: result.data.errorMessage
      }
    }
  }
})

router.post('/search', async function (ctx) {
  const { hash } = ctx.request.body

  if (hash === 42 || hash === 40) {
    // address
    const block = await request({
      path: '/getAddressProfile',
      data: { address: hash }
    })

    if (block.success) {
      return (ctx.body = block)
    } else {
      ctx.redirect('/nodata')
    }
  } else if (hash === 66 || hash === 44) {
    // tx
    const block = await request({
      path: '/getBlockByHash',
      data: { hash }
    })

    if (block.success === true) {
      return (ctx.body = block)
    } else {
      ctx.redirect('/nodata')
    }
  } else {
    const block = await request({
      path: '/getBlockByNumber',
      data: { number: hash }
    })
    if (block.success) {
      return (ctx.body = block)
    } else {
      ctx.redirect('/nodata')
    }
  }

  // const block = await request({
  //   path: '/getBlockByHash',
  //   data: { hash }
  // })
})

router.get('/faucet', async function (ctx, next) {
  const { address } = ctx.query
  // console.log(address)
  const result = await requestFaucet({
    path: '/faucet',
    data: { address }
  })

  ctx.body = result
  // ctx.body = {}
})

router.get('/addrTxHistory', async function (ctx) {
  const { address, page, limit } = ctx.query
  const result = await request({
    path: '/getTxHistoryByAddress',
    data: { address, page, limit }
  })

  if (result.success) {
    ctx.body = {
      success: true,
      transactions: result.data
    }
  } else {
    ctx.body = {
      success: false,
      errorMessage: 'not found'
    }
  }
})

router.get('/balance', async function (ctx) {
  try {
    const { address } = ctx.query
    const [
      getAddressProfile,
      getDelegators
    ] = await Promise.all([
      request({ path: '/getAddressProfile', data: { address: address } }),
      request({ path: '/getDelegators', data: { address: address } })
    ])

    ctx.body = {
      success: true,
      balance: getAddressProfile.data,
      delegators: getDelegators.data
    }

    // console.log(BlockHeight.data.blockHeight)
  } catch (e) {
    console.error(e)
  }

  //   const { address } = ctx.query

  // const result = await request({
  //   path: '/getAddressProfile',
  //   data: { address: address }
  // })
  // if (result.success) {
  //   ctx.body = {
  //     success: true,
  //     balance: balance.data,
  //     getAddressProfile
  //   }
  // } else {
  //   ctx.body = {
  //     success: false,
  //     errorMessage: result.data.errorMessage
  //   }
  // }
})

module.exports = router

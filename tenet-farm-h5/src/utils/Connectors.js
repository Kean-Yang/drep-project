import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { LedgerConnector } from '@web3-react/ledger-connector';
// import { TrezorConnector } from '@web3-react/trezor-connector';
// import { FrameConnector } from '@web3-react/frame-connector';
// import { AuthereumConnector } from '@web3-react/authereum-connector';
// import { FortmaticConnector } from '@web3-react/fortmatic-connector';
// import { MagicConnector } from '@web3-react/magic-connector';
// import { PortisConnector } from '@web3-react/portis-connector';
// import { SquarelinkConnector } from '@web3-react/squarelink-connector';
// import { TorusConnector } from '@web3-react/torus-connector';

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: process.env.REACT_APP_RPC_URL_1,
  3: process.env.REACT_APP_RPC_URL_3,
  4: process.env.REACT_APP_RPC_URL_4,
  5: process.env.REACT_APP_RPC_URL_5,
  42: process.env.REACT_APP_RPC_URL_42,
};

// https://infura.io/dashboard/ethereum/e9acee51d9044305865a135e4bbdcb3d/settings
// 1: Mainnet 3:Ropsten 4:Rinkeby 5:goerli 42:testnet Kovan
export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 3: RPC_URLS[3], 4: RPC_URLS[4], 5: RPC_URLS[5], 42: RPC_URLS[42] },
  defaultChainId: 1,
});

export const walletconnect = new WalletConnectConnector({
  // rpc: { 1: RPC_URLS[1] },
  rpc: { [process.env.REACT_APP_RPC_URL_KEY]: process.env.REACT_APP_RPC_URL_DEFAULT },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

// export const walletlink = new WalletLinkConnector({
//   url: process.env.REACT_APP_RPC_URL_DEFAULT,
//   appName: 'Tenet',
// });

// export const ledger = new LedgerConnector({ chainId: 1, url: RPC_URLS[1], pollingInterval: POLLING_INTERVAL });

// export const trezor = new TrezorConnector({
//   chainId: 1,
//   url: RPC_URLS[1],
//   pollingInterval: POLLING_INTERVAL,
//   manifestEmail: 'dummy@abc.xyz',
//   manifestAppUrl: 'http://localhost:1234',
// });

// export const frame = new FrameConnector({ supportedChainIds: [1] });

// export const authereum = new AuthereumConnector({ chainId: 42 });

// export const fortmatic = new FortmaticConnector({ apiKey: process.env.REACT_APP_FORTMATIC_API_KEY, chainId: 4 })

// export const magic = new MagicConnector({
//   apiKey: process.env.REACT_APP_MAGIC_API_KEY,
//   chainId: 4,
//   email: 'hello@example.org'
// })

// export const portis = new PortisConnector({ dAppId: process.env.REACT_APP_PORTIS_DAPP_ID, networks: [1, 100] })

// export const squarelink = new SquarelinkConnector({
//   clientId: process.env.REACT_APP_SQUARELINK_CLIENT_ID,
//   networks: [1, 100]
// })

// export const torus = new TorusConnector({ chainId: 1 });

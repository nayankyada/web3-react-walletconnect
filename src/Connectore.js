import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5],
});

const POLLING_INTERVAL = 25000;
export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: "https://mainnet.infura.io/v3/c42cdaff77b14d8aa379fd73d2585210",
    4: "https://rinkeby.infura.io/v3/c42cdaff77b14d8aa379fd73d2585210",
  },
  bridge: "https://bridge.walletconnect.org",
  pollingInterval: POLLING_INTERVAL,
});

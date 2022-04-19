import React, { useCallback, useEffect } from "react";
import "./style/index.css";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "./Connectore";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

function App() {
  const {
    connector,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
    library: web3,
  } = useWeb3React();
  const login = useCallback(
    async (connector) => {
      if (connector) {
        await activate(connector, async (res, err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        });
      }
    },
    [activate]
  );
  const logout = async () => {
    if (connector instanceof WalletConnectConnector) {
      await connector.close();
      // window.location.reload();
    } else {
      deactivate();
      // window.location.reload();
    }
  };
  useEffect(() => {
    web3?.eth.getBalance(account).then((p) => {
      console.log(web3?.utils.fromWei(p, "ether"));
    });
  }, [account]);
  return (
    <div className="p-2">
      <button
        onClick={() => {
          login(injected);
        }}
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Connect to Metamask
      </button>
      <button
        onClick={() => {
          login(walletconnect);
        }}
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Connect to other wallet
      </button>
      <button
        onClick={() => {
          logout();
        }}
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Logout
      </button>
      <p>{account}</p>
    </div>
  );
}

export default App;

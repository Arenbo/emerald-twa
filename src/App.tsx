import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import './App.css';
import { useTonConnect } from './hooks/useTonConnect';
import { Jetton } from './components/Jetton';

function App() {
  const {network} = useTonConnect()

  return (
    <div>
      <div>
        <TonConnectButton />
        <span>
          {network
            ? network === CHAIN.MAINNET
              ? "mainnet"
              : "testnet"
            : "N/A"}
        </span>
      </div>
      <Jetton />
    </div>
  );
}

export default App

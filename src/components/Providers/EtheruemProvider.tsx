import { ReactNode } from 'react';
import { MetaMask } from '@web3-react/metamask';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import {
  EtheruemProvider as SDKProvider,
  WalletProvider,
} from '@xld-sdk-react/wallet';

import { etherChains, etherNetworks } from '@/constants';

const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  actions => new MetaMask({ actions })
);

export const connectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
];

interface Props {
  children: ReactNode;
}

function EtheruemProvider({ children }: Props) {
  return (
    <WalletProvider
      etheruemConnectors={connectors}
      supportedChainIds={etherChains}
      supportedNetworks={etherNetworks}
    >
      <SDKProvider connectors={connectors}>{children}</SDKProvider>
    </WalletProvider>
  );
}

export default EtheruemProvider;

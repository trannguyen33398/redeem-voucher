import {
  ETHER_MAINNET_CHAINS,
  ETHER_MAIN_NETWORKS,
  ETHER_TESTNET_CHAINS,
  ETHER_TEST_NETWORKS,
} from '@xld-sdk-react/wallet';

const isProd = process.env.NODE_ENV === 'production';

export const etherChains = isProd ? ETHER_MAINNET_CHAINS : ETHER_TESTNET_CHAINS;

export const etherNetworks = isProd ? ETHER_MAIN_NETWORKS : ETHER_TEST_NETWORKS;

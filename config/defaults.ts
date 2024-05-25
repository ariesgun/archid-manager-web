import { assets, chains } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';

export const defaultChainName = 'archwaytestnet';

export const getChainAssets = (chainName: string = defaultChainName) => {
  return assets.find((chain) => chain.chain_name === chainName) as AssetList;
};

export const getCoin = (chainName: string = defaultChainName) => {
  const chainAssets = getChainAssets(chainName);
  getChainInfo(chainName);
  return chainAssets.assets[0] as Asset;
};

export const getChainInfo = (chainName: string = defaultChainName) => {
  const chain = chains.find((chain) => chain.chain_name === chainName);  
  return chain;
}

export const getExponent = (chainName: string) => {
  return getCoin(chainName).denom_units.find(
    (unit) => unit.denom === getCoin(chainName).display
  )?.exponent as number;
};

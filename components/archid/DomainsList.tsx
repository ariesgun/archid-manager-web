import { useChain } from '@cosmos-kit/react';
import { ChainName } from 'cosmos-kit';
import { Box, Spinner, Text } from '@interchain-ui/react';

import { useStakingData, useValidatorLogos } from '@/hooks';
import { Domain } from './Domain';
import { useEffect, useState } from 'react';

import { contracts } from "@/contracts/codegen"


export const DomainsList = ({ chainName }: { chainName: ChainName }) => {
  const { isWalletConnected } = useChain(chainName);
//   const { data, isLoading, refetch } = useStakingData(chainName);
//   const { data: logos, isLoading: isFetchingLogos } = useValidatorLogos(
//     chainName,
//     data?.allValidators || []
//   );
  
  const { address, getCosmWasmClient } = useChain(chainName);
  const [ domains, setDomains ] = useState([]);

  useEffect(() => {

    getCosmWasmClient()
      .then(async (client) => {
        console.log("Client ", client);

        const {
          Sg721QueryClient,
          Sg721Client,
          Sg721MessageComposer
        } = contracts.Sg721;

        const {
            ArchidRegistryClient,
            ArchidRegistryMsgComposer,
            ArchidRegistryQueryClient
        } = contracts.ArchidRegistry;

        const sg721ContractAddr = "archway146htsfvftmq8fl26977w9xgdwmsptr2quuf7yyra4j0gttx32z3secq008";
        const queryClient = new Sg721QueryClient(client, sg721ContractAddr);

        let res = await queryClient.ownerOf({ includeExpired: false, tokenId: "testdomainx5.arch"})
        console.log(res);

        res = await queryClient.tokens({ owner: "archway1xtsm2ezhklnvmvw08y6ugjtmd6stdsqngkfmfn"});
        console.log("NFTS ", res);

        const archidAddr = "archway1lr8rstt40s697hqpedv2nvt27f4cuccqwvly9gnvuszxmcevrlns60xw4r";
        const archidQueryClient = new ArchidRegistryQueryClient(client, archidAddr);
        let domains = await res.tokens.reduce(async (memo, domain) => {
            const results = await memo;
            let res = await archidQueryClient.resolveRecord({ name: domain });
            res["domain"] = domain;
            res["isDefault"] = false;
            return [...results, res];
        }, []);
        console.log(domains);

        setDomains(domains);

      })
  }, []);

  return (
    <>
        <h1 className='text-3xl pb-4'>My Domains</h1>
        <div className="flex flex-col gap-y-6">
            {domains && domains.map((domain, idx) => (
                <Domain
                    key={idx}
                    chainName={chainName}
                    domain={domain}
                />
            ))}
        </div>
    </>
  );
};
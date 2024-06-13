import { useChain } from '@cosmos-kit/react';
import { ChainName } from 'cosmos-kit';
import { Box, Spinner, Text } from '@interchain-ui/react';

import { useStakingData, useValidatorLogos } from '@/hooks';
import { Domain } from './Domain';
import { useEffect, useState } from 'react';

import { contracts } from "@/contracts/codegen"
import { ArchidManagerQueryClient } from '@/contracts/codegen/ArchidManager.client';


export const DomainsList = ({ chainName }: { chainName: ChainName }) => {
  const { isWalletConnected } = useChain(chainName);
//   const { data, isLoading, refetch } = useStakingData(chainName);
//   const { data: logos, isLoading: isFetchingLogos } = useValidatorLogos(
//     chainName,
//     data?.allValidators || []
//   );
  
  const { address, getCosmWasmClient } = useChain(chainName);
  const [ domains, setDomains ] = useState<any[]>([]);

  useEffect(() => {

    getCosmWasmClient()
      .then(async (client) => {
        console.log("Client ", client);

        const {
          Sg721QueryClient,
          Sg721Client
        } = contracts.Sg721;

        const {
            ArchidRegistryClient,
            ArchidRegistryMsgComposer,
            ArchidRegistryQueryClient
        } = contracts.ArchidRegistry;

        console.log("HIHI ", process.env.NEXT_PUBLIC_SG721_CONTRACT_ADDR);
        console.log("HIHI2 ", process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR);

        const queryClient = new Sg721QueryClient(client, process.env.NEXT_PUBLIC_SG721_CONTRACT_ADDR!);

        let res = await queryClient.tokens({ owner: address!});
        const archidManagerQueryClient = new ArchidManagerQueryClient(client, process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!);
        const archidQueryClient = new ArchidRegistryQueryClient(client, process.env.NEXT_PUBLIC_ARCHID_REGISTRY_ADDR!);
        let domains = await res.tokens.reduce<Promise<any[]>>(async (memo, domain, _index, _array) => {
            const results = await memo;
            let resolve_record_res = await archidQueryClient.resolveRecord({ name: domain });
            let res : any = {
              "address": resolve_record_res.address!,
              "expiration": resolve_record_res.expiration
            };
            let default_domain = await archidManagerQueryClient.queryDomainDefault({ address: address! });
            console.log("Default ", default_domain);
            res["domain"] = domain;
            if (default_domain.domain_id === domain) {
              res["isDefault"] = true;
            } else {
              res["isDefault"] = false;
            }
            
            let autoRenew = await archidManagerQueryClient.queryRenewMap({ domainName: domain.split('.')[0] });
            res["renew_info"] = autoRenew.renew_info;
            
            return [...results, res];
        }, Promise.resolve([]));
        console.log("A ", domains);

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

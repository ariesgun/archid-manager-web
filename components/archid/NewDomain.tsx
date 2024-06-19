import { useChain } from '@cosmos-kit/react';
import { ChainName } from 'cosmos-kit';
import { useState } from 'react';
import { contracts } from '@/contracts';
import { coins } from '@cosmjs/stargate';

export const NewDomain = ({ chainName, demo }: { chainName: ChainName, demo: boolean }) => {
  const { address, getSigningCosmWasmClient } = useChain(chainName);
  // const { data, isLoading, refetch } = useStakingData(chainName);
  // const { data: logos, isLoading: isFetchingLogos } = useValidatorLogos(
  //   chainName,
  //   data?.allValidators || []
  // );
  const [domain, setDomain] = useState("");

  const  mint = async (event: any) => {
    event.preventDefault();
    const domain_name = domain;

    let signingClient = await getSigningCosmWasmClient();
    
    const {
        ArchidManagerClient
    } = contracts.ArchidManager;

    const sender = address!;
    const client = new ArchidManagerClient(
      signingClient, 
      sender, 
      demo ? process.env.NEXT_PUBLIC_ARCHID_MANAGER_DEMO_ADDR! : process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!);


    client.mintDomain({ domainName: domain_name}, "auto", "mint domain", coins (
      "250000000000000000", "aconst"
    )).then(() => {
      window.location.reload(); 
    }).catch((e) => {
      alert(e)
    })

  }

  const onChanged = (e: any) => {
    setDomain(e.target.value)
  }

  return (
    <form onSubmit={mint}>
      <h2 className="text-3xl font-semibold leading-7 text-gray-900">Mint Domain</h2>
      <div className="mt-8">
        <label htmlFor="domain-name" className="block text-md font-medium leading-6 text-gray-900">Domain Name</label>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-6 mt-2">
          <div className="col-span-5">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
              <input type="text" name="domain-name" id="domain-name"
                onChange={onChanged}
                className="block w-full rounded-md border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
              <span className="flex select-none items-center pl-3 pr-3 text-gray-500 sm:text-sm">.arch</span>
            </div>
          </div>
          <button 
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" 
              type="submit"
          >
              Mint
          </button>
        </div>
      </div>
    </form>
  );
};

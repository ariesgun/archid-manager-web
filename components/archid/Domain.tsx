import { useChain } from '@cosmos-kit/react';
import { ChainName } from 'cosmos-kit';


export const Domain = ({ chainName, domain }: { chainName: ChainName, domain: any }) => {
  const { isWalletConnected } = useChain(chainName);

  const d = new Date(0);
  d.setUTCSeconds(domain.expiration);

  return (
    <>
        <div className="border rounded-lg py-6 px-8 bg-slate-50">
            <div className="flex flex-col w-full gap-y-2">
                <div className="flex flex-row w-full gap-x-2">
                    <div className="grow">
                        <h1 className="text-3xl font-bold underline">{domain.domain}</h1>
                    </div>
                    <div className="">
                        <h1 className="text-lg">{domain.isDefault ? "Default" : ""}</h1>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div>
                        <p>Expiration: {d.toDateString()}</p>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div>
                        <p>Address: {domain.address}</p>
                    </div>
                </div>
                <div className="flex flex-row-reverse w-full gap-x-3 pt-6">
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Set Default
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Renew
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                        Auto-Renew
                    </button>
                </div>
                
            </div>
        </div>
    </>
  );
};

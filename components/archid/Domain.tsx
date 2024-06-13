import { contracts } from '@/contracts';
import { coins } from '@cosmjs/stargate';
import { useChain } from '@cosmos-kit/react';
import { ChainName } from 'cosmos-kit';
import { useState } from 'react';


export const Domain = ({ chainName, domain }: { chainName: ChainName, domain: any }) => {
  const { address, isWalletConnected } = useChain(chainName);

  const d = new Date(0);
  d.setUTCSeconds(domain.expiration);

  const { getSigningCosmWasmClient } = useChain(chainName);

  const onSetDefaultClick = async (e: any) => {
    e.preventDefault();

    let signingClient = await getSigningCosmWasmClient();
    
    const {
        ArchidManagerClient
    } = contracts.ArchidManager;
  
    const sender = address!;
    const client = new ArchidManagerClient(signingClient, sender, process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!);

    await client.setDefault({domainName: e.target.value}, "auto", "set default registry")
    window.location.reload(); 
  };

  const onRenewClick = async (e: any) => {
    e.preventDefault();

    let signingClient = await getSigningCosmWasmClient();
    
    const {
        ArchidManagerClient
    } = contracts.ArchidManager;

    const {
        Sg721Client
      } = contracts.Sg721;

    const sender = address!;

    const sg721_client = new Sg721Client(signingClient, sender, process.env.NEXT_PUBLIC_SG721_CONTRACT_ADDR!);
    await sg721_client.approve(
        {
            spender: process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!,
            tokenId: e.target.value
        }, "auto", "approve NFT"
    );

    const client = new ArchidManagerClient(signingClient, sender, process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!);
    await client.renewDomain({domainName: e.target.value.split('.')[0]}, "auto", "renew domain", coins (
        "250000000000000000", "aconst"
    ))

    window.location.reload(); 
  }

  const onAutoRenewClick = async (e: any) => {
    e.preventDefault();

    let signingClient = await getSigningCosmWasmClient();
    
    const {
        ArchidManagerClient
    } = contracts.ArchidManager;

    const {
        Sg721Client
      } = contracts.Sg721;

    const sender = address!;

    const sg721_client = new Sg721Client(signingClient, sender, process.env.NEXT_PUBLIC_SG721_CONTRACT_ADDR!);
    await sg721_client.approve(
        {
            spender: process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!,
            tokenId: e.target.value
        }, "auto", "approve NFT"
    );

    const client = new ArchidManagerClient(signingClient, sender, process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!);
    await client.scheduleAutoRenew({domainName: e.target.value.split('.')[0]}, "auto", "set auto renew domain", coins (
        "010000000000000000", "aconst"
    ))

    window.location.reload(); 
  }

  const onCancelClick = async (e: any) => {
    e.preventDefault();

    let signingClient = await getSigningCosmWasmClient();
    
    const {
        ArchidManagerClient
    } = contracts.ArchidManager;

    const sender = address!;
    const client = new ArchidManagerClient(signingClient, sender, process.env.NEXT_PUBLIC_ARCHID_MANAGER_ADDR!);
    await client.cancelAutoRenew({domainName: e.target.value.split('.')[0]}, "auto", "cancel auto renew domain");
    window.location.reload(); 
  }

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
                        <p>Address: {domain.address}</p>
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    <div>
                        <p>Expiration: {d.toDateString()}</p>
                    </div>
                </div>
                { domain.renew_info !== null &&
                    <div className="flex flex-col w-full">
                        <div>
                            <p className="text-lg font-bold">Auto renew schedule</p>
                        </div>
                        <div className="flex flex-row w-full gap-x-4 justify-between">
                            {domain.renew_info.status === 0 && 
                                <>
                                    <p>Scheduled to be renewed in {domain.renew_info.block_idx * 7} days from registered at block height {domain.renew_info.callback_height}</p>
                                    <p>Status: Pending </p>
                                </>
                            }
                            {domain.renew_info.status !== 0 && <p>The domain has been successfully renewed at block height {domain.renew_info.status}</p>}
                        </div>
                    </div>
                }
                <div className="flex flex-row-reverse w-full gap-x-3 pt-6">
                    <button 
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" 
                        value={domain.domain}
                        onClick={onSetDefaultClick}
                    >
                        Set Default
                    </button>
                    <button 
                        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        value={domain.domain}
                        onClick={onRenewClick}
                    >
                        Renew
                    </button>
                    {domain.renew_info !== null && domain.renew_info.status === 0 && 
                        <button 
                            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            value={domain.domain}
                            onClick={onCancelClick}
                        >
                            Cancel Auto-Renew
                        </button>
                    }
                    {domain.renew_info === null &&
                        <button 
                            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                            value={domain.domain}
                            onClick={onAutoRenewClick}
                        >
                            Auto-Renew
                        </button>
                    }
                </div>
                
            </div>
        </div>
    </>
  );
};

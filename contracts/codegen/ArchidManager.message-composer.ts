/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.35.7.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { Coin } from "@cosmjs/amino";
import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { toUtf8 } from "@cosmjs/encoding";
import { Addr, InstantiateMsg, ExecuteMsg, QueryMsg, GetCountResponse, State, DomainDefaultResponse, QueryErrorsResponse, SudoError, RenewJobsMapResponse, Binary, RenewMapResponse, RenewInfo } from "./ArchidManager.types";
export interface ArchidManagerMsg {
  contractAddress: string;
  sender: string;
  increment: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
  mintDomain: ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  renewDomain: ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  scheduleAutoRenew: ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  cancelAutoRenew: ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  setDefault: ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  startCronJob: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
  stopCronJob: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
  deposit: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
  withdraw: (_funds?: Coin[]) => MsgExecuteContractEncodeObject;
}
export class ArchidManagerMsgComposer implements ArchidManagerMsg {
  sender: string;
  contractAddress: string;

  constructor(sender: string, contractAddress: string) {
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.increment = this.increment.bind(this);
    this.mintDomain = this.mintDomain.bind(this);
    this.renewDomain = this.renewDomain.bind(this);
    this.scheduleAutoRenew = this.scheduleAutoRenew.bind(this);
    this.cancelAutoRenew = this.cancelAutoRenew.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.startCronJob = this.startCronJob.bind(this);
    this.stopCronJob = this.stopCronJob.bind(this);
    this.deposit = this.deposit.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  increment = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          increment: {}
        })),
        funds: _funds
      })
    };
  };
  mintDomain = ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          mint_domain: {
            domain_name: domainName
          }
        })),
        funds: _funds
      })
    };
  };
  renewDomain = ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          renew_domain: {
            domain_name: domainName
          }
        })),
        funds: _funds
      })
    };
  };
  scheduleAutoRenew = ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          schedule_auto_renew: {
            domain_name: domainName
          }
        })),
        funds: _funds
      })
    };
  };
  cancelAutoRenew = ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          cancel_auto_renew: {
            domain_name: domainName
          }
        })),
        funds: _funds
      })
    };
  };
  setDefault = ({
    domainName
  }: {
    domainName: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          set_default: {
            domain_name: domainName
          }
        })),
        funds: _funds
      })
    };
  };
  startCronJob = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          start_cron_job: {}
        })),
        funds: _funds
      })
    };
  };
  stopCronJob = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          stop_cron_job: {}
        })),
        funds: _funds
      })
    };
  };
  deposit = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          deposit: {}
        })),
        funds: _funds
      })
    };
  };
  withdraw = (_funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          withdraw: {}
        })),
        funds: _funds
      })
    };
  };
}
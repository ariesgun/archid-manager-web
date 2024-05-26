import { useChain } from '@cosmos-kit/react';
import { ChainName } from 'cosmos-kit';
import { Box, Divider, Spinner, Text } from '@interchain-ui/react';

import Overview from './Overview';
import { DomainsList } from './DomainsList';
import { useStakingData, useValidatorLogos } from '@/hooks';

export const RegistrySection = ({ chainName }: { chainName: ChainName }) => {
  const { isWalletConnected } = useChain(chainName);
  const { data, isLoading, refetch } = useStakingData(chainName);
  const { data: logos, isLoading: isFetchingLogos } = useValidatorLogos(
    chainName,
    data?.allValidators || []
  );

  return (
    <Box my="$16">
      {!isWalletConnected ? (
        <Box
          height="$28"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontWeight="$semibold" fontSize="$xl">
            Please connect the wallet
          </Text>
        </Box>
      ) : isLoading || isFetchingLogos || !data ? (
        <Box
          height="$28"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="$7xl" />
        </Box>
      ) : (
        <>
          <Overview
            balance={data.balance}
            rewards={data.rewards}
            staked={data.totalDelegated}
            updateData={refetch}
            chainName={chainName}
            prices={data.prices}
          />
          
          <Divider height="0.1px" mt="$12" mb="$14" />

          <DomainsList
            chainName={chainName}
          />

          
        </>
      )}
    </Box>
  );
};

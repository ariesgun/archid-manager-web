import { Divider } from '@interchain-ui/react';
import NoSSR from 'react-no-ssr';
import { defaultChainName } from '@/config';
import { Layout, WalletSection } from '@/components';
import { RegistrySection } from '@/components/archid/RegistrySection';

export default function Demo() {
  return (
    <Layout>
      <WalletSection isMultiChain={false} />
      <Divider height="0.1px" mt="$12" />
      {/* TODO fix type error */}
      {/* Type error: This JSX tag's 'children' prop expects a single child of type 'ReactNode', but multiple children were provided. */}
      {/* @ts-ignore */}
      <NoSSR>
        <RegistrySection chainName={defaultChainName} demo={true}/>
      </NoSSR>
    </Layout>
  );
}

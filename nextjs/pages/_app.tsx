import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '../state/store';

import {
    cookieToInitialState,
    WagmiProvider,
    type Config,
    useClient,
    useConnectorClient,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage, http } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { scrollSepolia } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit';
import { createWeb3Modal, Web3Modal } from '@web3modal/wagmi';

import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';
import type { Account, Chain, Client, Transport } from 'viem';
import { FallbackProvider, JsonRpcProvider } from 'ethers';

const projectId = 'acd57ed82dc47b41ce8ff13f61d08518';

if (!projectId) throw new Error('Project ID is not defined');

// Set up metadata
const metadata = {
    name: 'appkit-example',
    description: 'AppKit Example',
    url: 'https://appkitexampleapp.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export function clientToProvider(client: Client<Transport, Chain>) {
    const { chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    if (transport.type === 'fallback') {
        const providers = (transport.transports as ReturnType<Transport>[]).map(
            ({ value }) => new JsonRpcProvider(value?.url, network)
        );
        if (providers.length === 1) return providers[0];
        return new FallbackProvider(providers);
    }
    return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
    const client = useClient<Config>({ chainId });
    return useMemo(
        () => (client ? clientToProvider(client) : undefined),
        [client]
    );
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
    const { account, chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address);
    return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
    const { data: client } = useConnectorClient<Config>({ chainId });
    return useMemo(
        () => (client ? clientToSigner(client) : undefined),
        [client]
    );
}

// Create wagmiConfig
const chains = [scrollSepolia] as const;

const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    auth: {
        email: true,
        socials: ['google', 'x', 'github', 'discord', 'apple'],
        showWallets: true,
        walletFeatures: true,
    },
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});

createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
    themeMode: 'light',
});

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
    const initialState = cookieToInitialState(config);

    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer position={'top-center'} />
                <Layout>
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
                </Layout>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default App;

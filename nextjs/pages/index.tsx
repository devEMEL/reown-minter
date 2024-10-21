import Collections from '@/components/Collections';
import Head from 'next/head';

// Export the Home component
export default function Home() {
    return (
        <div>
            <Head>
                <link
                    rel="shortcut icon"
                    href="favicon.ico"
                    type="image/x-icon"
                />
                <title>Reown Minter</title>
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                ></meta>
            </Head>
            {/* components for the home page below */}
            <Collections />
        </div>
    );
}

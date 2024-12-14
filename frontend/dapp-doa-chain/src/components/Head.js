import Head from "next/head";

export default function HeadNext({title}) {
    return (
        <Head>
            <title>{`DoaChain | ${title}`}</title>
            <meta charSet="utf-8" />
            <meta httpEquiv="Content-Language" content="en" />
            <meta
                name="description"
                content="DoaChain is a donation platform dApp, designed to meet various fundraising needs, such as NGO campaigns, individual and emergency crowdfunding."
            />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Erlon Dantas da Nobrega Junior" />
            <meta
                name="keywords"
                content="blockchain, donation platform, crowdfunding, fundraising, NGO, dApp, secure donations, decentralized donations, DoaChain"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta
                property="og:description"
                content="DoaChain is a decentralized donation platform (dApp) built on blockchain, empowering NGOs, individuals, and communities to raise funds with transparency and security."
            />
            {/* OG Cards */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://doa-chain.vercel.app/" />
            <meta property="og:image" content="https://doa-chain.vercel.app/banner.png" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`DoaChain | ${title}`} />
            <meta
                name="twitter:description"
                content="DoaChain is a decentralized donation platform (dApp) built on blockchain, empowering NGOs, individuals, and communities to raise funds with transparency and security."
            />
            <meta name="twitter:image" content="https://doa-chain.vercel.app/banner.png" />


            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
import Head from "next/head";

export default function HeadNext({title}) {
    return (
        <Head>
            <title>DoaChain | {title}</title>
            <meta charSet="utf-8" />
            <meta
                name="description"
                content="DoaChain is a donation platform dApp, designed to meet various fundraising needs, such as NGO campaigns, individual and emergency crowdfunding."
            />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
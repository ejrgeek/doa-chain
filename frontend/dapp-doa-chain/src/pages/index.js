import Head from "next/head";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

import { useState } from "react";
import { login } from "@/services/Web3Service";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

	const [wallet, setWallet] = useState("");

	const [error, setError] = useState("");

	function btnLoginClick(){
		login()
		.then(wallet => setWallet(wallet))
		.catch(error => setError(error.message));
	}

	return (
		<>
			<Head>
				<title>DoaChain | Index</title>
				<meta charSet="utf-8" />
				<meta name="description" content="DoaChain is a donation platform dApp, designed to meet various fundraising needs, such as NGO campaigns, individual and emergency crowdfunding." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="container px-4 py-5">
				<div className="row flex-lg-row align-items-center py-5 g-5">
					
					<div className="col-10 col-sm-8 col-lg-6">
						<img 
							src="https://images.unsplash.com/photo-1603827457577-609e6f42a45e" 
							className="d-block mx-lg-auto img-fluid" width="700" height="500" 
						/>
					</div>

					<div className="col-10 col-sm-8 col-lg-6">
						<h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
							DoaChain
						</h1>
						<p className="lead">
						DoaChain is a donation platform dApp, 
						designed to meet various fundraising needs, 
						such as NGO campaigns, individual and 
						emergency crowdfunding.
						</p>
						<p className="lead mb-3">
						Connect your wallet to create campaigns or help by donating.
						</p>

						<div className="d-grid gap-2 d-md-flex justify-content-md-start">
							<button
								type="button"
								className="btn btn-info px-4 btn-lg me-md-2"
								onClick={btnLoginClick}
							>
								<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png" height="36" className="me-3" />
								Connect
							</button>
							<p className="" >{wallet}</p>
							<p>{error}</p>
						</div>

					</div>

				</div>

				<Footer/>


			</div>
		</>
	);
}

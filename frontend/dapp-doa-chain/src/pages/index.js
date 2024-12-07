import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";
import HeadNext from "@/components/Head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

	function btnLoginClick() {
		login()
			.then(wallet => setWallet(wallet))
			.catch(error => setError(error.message));
	}

	return (
		<>
			<HeadNext title={"Home"} />

			<Header/>

			<div className="container px-4 py-5">
				<div className="row flex-lg-row-reverse align-items-center g-5">
					{/* DONATE OR CREATE CAMPAIGN */}
					{
						!wallet
						? (
							<div className="col-lg-5 text-center">
								<img
									src="banner.png"
									alt="DoaChain Banner"
									className="img-fluid rounded"
									style={{ maxHeight: "300px", objectFit: "cover" }}
								/>
							</div>
						)
						: (

							<div className="col-lg-5 text-center">
								<p className="mb-3"> Welcome {wallet}</p>
								<p className="mb-3">What you want to do?</p>
								<div className="col-12">
									<p> <Link href="/donate" className="btn btn-block btn-donate-neuro col-6 p-3">I want to make a donation</Link></p>
									<p> <Link href="/create" className="btn btn-block btn-create-neuro col-6 p-3">I wanna create a campaign</Link></p>
								</div>
							</div>


						) 
					}

					<div className="col-lg-7">
						<p className="lead mb-3">
							DoaChain is a donation platform dApp, designed to meet various
							fundraising needs, such as NGO campaigns, individual and
							emergency crowdfunding.
						</p>
						<p className="lead mb-3">
							DoaChain aims to provide a safe, transparent, and efficient
							environment to create, manage, and contribute to fundraising
							campaigns.
						</p>
						<p className="lead mb-4">
							Connect your wallet to create campaigns or help by donating.
						</p>
						<div className="d-flex flex-column flex-md-row align-items-center gap-3">

							{/* CONNECT TO METAMASK */}
							{
								!wallet
								? (
									<div>
										<ConnectButton func={btnLoginClick} />
										{/* <button
											type="button"
											className="btn-neuromorphic btn-lg fw-semibold d-flex align-items-center gap-2 connectButton"
											onClick={btnLoginClick}
										>
											<img
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
												alt="Metamask Logo"
												height="30"
											/>
											Connect to Metamask
										</button> */}

										<div>		
											<p className="mb-0 text-danger">{error}</p>
										</div>

									</div>
								)
								: <></>
							}

							
						</div>
					</div>
				</div>

				{/* Campaign Creation */}

				<div className="row flex-lg-row align-items-center g-5 my-5">

					<div className="col-lg-4 text-center">
						<img
							src="CREATE.png"
							alt="Campaign Creation"
							className="img-fluid rounded"
							style={{ maxHeight: "300px", objectFit: "cover" }}
						/>
					</div>

					<div className="col-lg-8">
						<h1 className="display-6 fw-bold mb-4" style={{color: "#ffa46f"}}>Campaign Creation</h1>
						<p className="lead mb-3">
						On DoaChain, anyone connected with a digital wallet can 
						create donation campaigns. Our platform is designed to meet 
						a variety of needs, such as fundraising for NGOs, personal 
						causes, emergencies, educational or cultural projects.
						</p>
						<p className="lead mb-3">
						When creating a campaign, you can customize it with a title, 
						description, image and fundraising goal, ensuring transparency 
						and engagement with donors.
						</p>
						<p className="lead mb-4">
						Join us to transform ideas into positive impact, safely and efficiently!
						</p>
					</div>
				</div>

				
				{/* Donates */}

				<div className="row flex-lg-row align-items-center g-5 my-5">

					<div className="col-lg-4 text-center">
						<img
							src="DONATE.png"
							alt="Donates"
							className="img-fluid rounded"
							style={{ maxHeight: "300px", objectFit: "cover" }}
						/>
					</div>

					<div className="col-lg-8">
						<h1 className="display-6 fw-bold mb-4 text-info">Donates</h1>
						<p className="lead mb-3">
						Turn your help into real impact! Explore inspiring campaigns 
						and choose where your contribution will make a difference. 
						Whether it’s to support an emergency, boost a social project 
						or collaborate with a cultural initiative, donating on DoaChain 
						is fast, safe and meaningful.
						</p>
						<p className="lead mb-3">
						Every donation is recorded on the blockchain, ensuring 
						traceability and trust. Choose a campaign that resonates 
						with you and make a difference with just a few clicks.
						</p>
						<p className="lead mb-4">
						Give and see the real impact of your generosity. Every action counts!
						</p>
					</div>
				</div>

				
				{/* Why Choose DoaChain? */}

				<div className="row flex-lg-row align-items-center g-5 my-5">

					<div className="col-lg-4 text-center">
						<img
							src="RESULT.png"
							alt="Donates"
							className="img-fluid rounded"
							style={{ maxHeight: "300px", objectFit: "cover" }}
						/>
					</div>

					<div className="col-lg-8">
						<h1 className="display-6 fw-bold mb-4" style={{color: "indigo"}}>Why Choose DoaChain?</h1>
						<p className="lead mb-3">
						DoaChain is more than a donation platform — it’s 
						a bridge between people and causes in need of support. 
						Our blockchain-based technology ensures complete transparency, 
						security, and trust in every transaction.
						</p>
						<p className="lead mb-3">
						Whether you’re creating campaigns or contributing, 
						we believe in the power of community to drive positive 
						change. Choose DoaChain and be part of a movement that 
						connects solidarity and innovation.
						</p>
						<p className="lead mb-4">
						Let's decentralize old businesses together!
						</p>
					</div>
				</div>

			</div>

			<Footer/>
		</>
	);
};
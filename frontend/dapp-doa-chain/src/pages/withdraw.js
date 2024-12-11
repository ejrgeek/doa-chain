import ConnectButton from "@/components/ConnectButton";
import HeadNext from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCampaignById, withdrawCampaignFunds, login, listenToFundsWithdrawnEvent } from "@/services/Web3Service";
import { dateFormatter, ethFormatter } from "@/utils/formatter";


import { useState, useEffect } from "react";

export default function Withdraw() {

    const [wallet, setWallet] = useState("");

    const [campaign, setCampaign] = useState({});

    const [canWithDraw, setCanWithDraw] = useState(false);

    const [missing, setMissing] = useState("0.0");

    const [message, setMessage] = useState("");

    const [events, setEvents] = useState(new Set());

    const [eventTrigger, setEventTrigger] = useState(false);

    function onChangeId(evt) {
        campaign.id = evt.target.value;
    }

    function checkIfCanWithdraw() {
        const fee = BigInt("15000000000000000");

        const goalBalance = campaign.goalBalance ? BigInt(campaign.goalBalance) : BigInt(0);
        const totalRaised = campaign.totalRaised ? BigInt(campaign.totalRaised) : BigInt(0);

        const required = goalBalance + fee;

        const missingReceive = totalRaised >= required ? BigInt(0) : required - totalRaised;

        setMissing(ethFormatter(missingReceive));

        return totalRaised >= required && campaign.active;
    }

    useEffect(() => {
        if (campaign.goalBalance && campaign.totalRaised) {
            const result = checkIfCanWithdraw();
            setCanWithDraw(result);
        }
        const userWallet = localStorage.getItem("wallet") || null;
        if (userWallet) {
            setWallet(userWallet);
        }
    }, [campaign]);

    useEffect(() => {
        if (campaign.id){
            listenToFundsWithdrawnEvent((event) => {
                setEvents(prevEvent => {
                    const updatedEvent = new Set(prevEvent);
                    const newEvent = `Refund Issued: ${event.returnValues.donor} received ${event.returnValues.amount} wei refund for campaign ID: ${event.returnValues.campaignId}, timestamp: ${event.returnValues.timestamp}`;
                    updatedEvent.add(newEvent);
                    return updatedEvent;
                });
            }, campaign.id);
        }
    }, [eventTrigger]);

    useEffect(() => {
        if (campaign.id) {
            getCampaignById(campaign.id)
                .then(result => {
                    setMessage("");
                    setCampaign(result);
                });
        }
    }, [eventTrigger]);

    function btnLoginClick() {
        login()
            .then(wallet => setWallet(wallet))
            .catch(error => setError(error.message));
    }

    function btnSearchClick() {
        setMessage("Searching for Campaign, please wait...");

        getCampaignById(campaign.id)
            .then(result => {
                setMessage("");
                setCampaign(result);
            })
            .catch(error => {
                console.log(error);
                setMessage(`Error: ${error.message}`);
            });
    }

    function btnWithdrawClick() {
        setMessage("Please wait, the balance is being sent to your wallet ...");

        withdrawCampaignFunds(campaign.id)
            .then(tx => {
                setEventTrigger(prev => !prev);
                setMessage("Transaction registered, soon the balance will be available to you")
            })
            .catch(error => setMessage(error.message));
    }

    return (
        <>
            <HeadNext title={"Withdraw"} />
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <div className="container px-4 py-5">

                <h1 className="text-info">Withdraw</h1>
                {
                    !campaign.id
                        ? (
                            <>
                                <p className="mb-4 lead">
                                    Search Campaign Id
                                </p>

                                <div className="col-8">
                                    <div className="input-group mb-3">
                                        <input id="campaignId" className="form-control" onChange={onChangeId} value={campaign.id} />
                                        <input type="button" value="Search" className="btn btn-neuro p-3" onClick={btnSearchClick} />
                                    </div>
                                </div>
                            </>
                        )
                        : (
                            <>
                                {/* {JSON.stringify(campaign, (_, value) =>
                                    typeof value === 'bigint' ? value.toString() : value
                                )} */}
                                <p className="lead">Please check if this is the campaign you want to withdraw</p>
                                <p className="lead">Rules for withdrawal:</p>
                                <ul className="lead">
                                    <li>You need to be the campaign creator</li>
                                    <li>The total amount raised must be greater than or equal to the established target plus the platform fee*</li>
                                </ul>
                                <p className="lead">*Business decision made so that you can reach your target without much loss</p>
                                <hr className="mb-4" />

                                <h3 className="mb-3 lead" style={{ fontSize: 28 }}>Campaign Details</h3>

                                <div className="col-lg-6 mt-5 px-4">
                                    <p className="lead"><strong>Title:</strong> {campaign.title}</p>
                                    <p className="lead"><strong>Campaign Id:</strong> {campaign.id}</p>
                                    <p className="lead"><strong>Author:</strong> {campaign.authorName}</p>
                                    <p className="lead"><strong>Author Wallet:</strong> {campaign.authorWallet}</p>
                                    <p className="lead"><strong>Descripton:</strong></p>
                                    <p className="lead">{campaign.description}</p>
                                    <p className="lead"><strong>Goal:</strong> {ethFormatter(campaign.goalBalance)} TBNB</p>
                                    <p className="lead"><strong>Total Raised:</strong> {ethFormatter(campaign.totalRaised)} TBNB</p>
                                    <p className="lead"><strong>Created at:</strong> {dateFormatter(campaign.startDate)}</p>
                                    <p className="lead"><strong>End Date:</strong> {dateFormatter(campaign.endDate)}</p>
                                    <p className="lead"><strong>Campaign Active:</strong>{campaign.active ? " Yes" : " No"}</p>
                                    <p className="lead"><strong>Can Withdraw:</strong>{canWithDraw ? " Yes" : " No"}</p>
                                    {
                                        missing > 0
                                        ? (
                                            <>
                                                <p className="lead"><strong>Missing to Withdraw:</strong>{missing}</p>
                                            </>
                                        )
                                        : <></>
                                    }

                                </div>
                                {
                                    canWithDraw
                                        ? (
                                            <>
                                                {
                                                    !wallet
                                                        ? (
                                                            <>
                                                                <p className="lead">You need to connect your wallet</p>
                                                                <ConnectButton func={btnLoginClick} />
                                                            </>
                                                        )
                                                        : (
                                                            <>
                                                                <div className="mb-3 mt-4 col-lg-6">
                                                                    <p className="lead">Thank you for using my platform, I hope you get what you came for. Come back soon!</p>
                                                                </div>
                                                                <div className="mb-3 col-lg-6">
                                                                    <div className="input-group">
                                                                        <input type="button" value="Withdraw" className="btn btn-neuro" onClick={btnWithdrawClick} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                }
                                            </>
                                        )
                                        : (
                                            <>
                                                <div className="mb-3 mt-4 col-lg-6">
                                                    <p className="lead">It is not possible to withdraw at the moment!</p>
                                                </div>
                                            </>
                                        )
                                }

                            </>
                        )
                }
                {/* message */}
                {
                    !message
                        ?
                        <>
                        </>
                        : <div className="mt-3 alert alert-info p-3" role="alert">{message}</div>
                }

                <div className="mt-4">
                    <h4>Events:</h4>
                    <ul>
                        {Array.from(events).map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
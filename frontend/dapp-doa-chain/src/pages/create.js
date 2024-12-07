import Link from "next/link";
import ConnectButton from "@/components/ConnectButton";
import HeadNext from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createCampaign, getLastCampaignByAuthor, login } from "@/services/Web3Service";


import { useEffect, useState } from "react";

export default function Create() {

    const [campaign, setCampaign] = useState({
        authorName: "",
        title: "",
        description: "",
        videoUrl: "",
        imageUrl: "",
        goalBalance: 1,
        endDate: 1,
    });

    const [wallet, setWallet] = useState("");

    const [message, setMessage] = useState("");

    function onInputChange(evt) {
        const { id, value } = evt.target;
        setCampaign((prevState) => ({
            ...prevState,
            [id]: id === "goalBalance" || id === "endDate" ? Number(value) : value,
        }));
    }

    useEffect(() => {
        const userWallet = localStorage.getItem("wallet") || null;
        if (userWallet) {
            setWallet(userWallet);
        }
    });

    function btnLoginClick() {
        login()
            .then(wallet => setWallet(wallet))
            .catch(error => setError(error.message));
    }

    function btnSaveClick() {
        setMessage("Creating contract, please wait a moment...");

        createCampaign(campaign)
            .then(tx => getLastCampaignByAuthor())
            .then(id => setMessage(`Campaign created successfully, save your campaign id <strong>${id}</strong> and share so people can donate!`))
            .catch(err => {
                console.log(err);
                setMessage(err.message);
            })
    }

    return (
        <>
            <HeadNext title={"Create Campaign"} />
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <div className="container px-4 py-5">

                <h1 style={{ color: "#ffa46f" }} >Create Your Campaign</h1>
                <p className="lead">Complete the form to create a new campaign</p>
                <p className="lead">The platform fee is 0.015 eth</p>
                <hr className="mb-4" />
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
                                <form className="form-floating">
                                    {/* Author Name and Title */}
                                    <div className="row">

                                        <div className="col-lg-6 mb-3">
                                            <label for="authorName" className="form-label lead">Author Name</label>
                                            <input required id="authorName" className="form-control" minLength={3} value={campaign.authorName} onChange={onInputChange} />
                                        </div>

                                        <div className="col-lg-6">
                                            <label for="title" className="form-label lead">Campaign Title</label>
                                            <input required id="title" className="form-control" minLength={10} value={campaign.title} onChange={onInputChange} />
                                        </div>
                                    </div>
                                    {/* Description */}
                                    <div className="row">

                                        <div className="col-lg-12 mb-3">
                                            <label for="description" className="form-label lead">Description</label>
                                            <textarea required id="description" className="form-control" minLength={50} rows={3} value={campaign.description} onChange={onInputChange}></textarea>
                                        </div>
                                    </div>
                                    {/* videoUrl and imageUrl */}
                                    <div className="row">

                                        <div className="col-lg-6 mb-3">
                                            <label for="videoUrl" className="form-label lead">Video URL (YouTube Embed Url)</label>
                                            <input required id="videoUrl" className="form-control" type="url" value={campaign.videoUrl} onChange={onInputChange} />
                                        </div>

                                        <div className="col-lg-6">
                                            <label for="imageUrl" className="form-label lead">Image Url</label>
                                            <input required id="imageUrl" className="form-control" type="url" value={campaign.imageUrl} onChange={onInputChange} />
                                        </div>
                                    </div>
                                    {/* goalBalance and endDate */}
                                    <div className="row">

                                        <div className="col-lg-6 mb-3">
                                            <label for="goalBalance" className="form-label lead">Goal (TBNB)</label>
                                            <input required id="goalBalance" className="form-control" type={"number"} value={campaign.goalBalance} onChange={onInputChange} />
                                        </div>

                                        <div className="col-lg-6">
                                            <label for="endDate" className="form-label lead">End Date (Days)</label>
                                            <input required id="endDate" className="form-control" type={"number"} value={campaign.endDate} onChange={onInputChange} />
                                        </div>
                                    </div>
                                    {/* BTN SEND */}
                                    <div className="row">

                                        <div className="col-lg-12 mb-3">
                                            {
                                                !message
                                                    ?
                                                    <>
                                                    </>
                                                    : <div className="mt-3 alert alert-info p-3" role="alert">{message}</div>
                                            }
                                            <button className="mt-3 btn btn-create-neuro" style={{ width: "100%" }} type="button" onClick={btnSaveClick}>
                                                <span className="h5">Create Campaign</span>
                                            </button>
                                            <Link href="/" className="mt-4 mb-3 btn btn-donate-neuro" style={{ width: "100%" }}>
                                                <span className="h5">Back to Home</span>
                                            </Link>

                                        </div>
                                    </div>

                                </form>
                            </>
                        )
                }



            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
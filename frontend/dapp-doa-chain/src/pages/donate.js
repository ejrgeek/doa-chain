import HeadNext from "@/components/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCampaignById, donate } from "@/services/Web3Service";
import { dateFormatter, ethFormatter } from "@/utils/formatter";


import { useState } from "react";

export default function Donate() {

    const [campaign, setCampaign] = useState({});

    const [donation, setDonation] = useState(0);

    const [message, setMessage] = useState("");

    function onChangeId(evt) {
        campaign.id = evt.target.value;
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

    function onChangeValue(evt) {
        setDonation(evt.target.value);
    }

    function btnDonateClick() {
        setMessage("Sending donation ...");

        donate(campaign.id, donation)
        .then(tx => setMessage(`Donation sent, ${campaign.authorName} thanks you for your support.`))
        .catch(error => setMessage(error.message));
    }

    return (
        <>
            <HeadNext title={"Donate"} />
            {/* HEADER */}
            <Header />

            {/* BODY */}
            <div className="container px-4 py-5">

                <h1 className="text-info" >Donate</h1>
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
                                <p className="lead">Please check that this is the correct campaign before making your donation.</p>
                                <hr className="mb-4" />

                                <h3 className="mb-3 lead" style={{ fontSize: 28 }}>Campaign Details</h3>
                                <div className="row flex-lg-row align-items-center g-5">
                                    {/* VIDEO */}
                                    {
                                        campaign.videoUrl
                                            ? (

                                                <div className="col-lg-12">
                                                    <p className="lead">Watch the campaign video</p>
                                                    <iframe className="show-media-neuro" width="100%" height="400" src={campaign.videoUrl} > </iframe>
                                                </div>
                                            )
                                            : <></>
                                    }
                                </div>

                                <div className="row flex-lg-row-reverse align-items-center g-5 mt-3">

                                    {/* IMAGE */}
                                    {
                                        campaign.imageUrl
                                            ? (

                                                <div className="col-lg-6 px-5">
                                                    <img className="show-media-neuro" height="500" src={campaign.imageUrl} />
                                                </div>
                                            )
                                            : <></>
                                    }

                                    <div className="col-lg-6 mt-5 px-4">
                                        <h2 className="mb-3 lead fw-bold" style={{ fontSize: 28 }}>{campaign.title}</h2>
                                        <p className="lead"><strong>Campaign Id:</strong> {campaign.id}</p>
                                        <p className="lead"><strong>Author:</strong> {campaign.authorName}</p>
                                        <p className="lead"><strong>Author Wallet:</strong> {campaign.authorWallet}</p>
                                        <p className="lead"><strong>Descripton:</strong></p>
                                        <p className="lead">{campaign.description}</p>
                                        <p className="lead"><strong>Goal:</strong> {ethFormatter(campaign.goalBalance)} TBNB</p>
                                        <p className="lead"><strong>Total Raised:</strong> {ethFormatter(campaign.totalRaised)} TBNB</p>
                                        <p className="lead"><strong>Created at:</strong> {dateFormatter(campaign.startDate)}</p>
                                        <p className="lead"><strong>End Date:</strong> {dateFormatter(campaign.endDate)}</p>
                                        <p className="lead"><strong>Campaign Active:</strong>{campaign.active ? " Yes" : " No" }</p>
                                    </div>
                                </div>
                                <div className="mb-3 mt-4 col-lg-6">
                                    <p className="lead">What did you think of the campaign? How about helping {campaign.authorName}?</p>
                                </div>
                                <div className="mb-3 col-lg-3">
                                    <div className="input-group">
                                        <input type="number" id="donation" className="form-control" style={{ width: "20px" }} onChange={onChangeValue} value={donation} />
                                        <span className="input-group-text" style={{ backgroundColor: "orange" }}>TBNB</span>
                                        <input type="button" value="Donate" className="btn btn-neuro p-3" onClick={btnDonateClick} />
                                    </div>
                                </div>

                            </>
                        )
                }
                {
                    !message
                        ?
                        <>
                        </>
                        : <div className="mt-3 alert alert-info p-3" role="alert">{message}</div>
                }

            </div>

            {/* FOOTER */}
            <Footer />
        </>
    );
}
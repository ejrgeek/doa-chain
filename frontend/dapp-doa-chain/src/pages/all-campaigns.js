import CampaignCard from "@/components/CampaignCard";
import Footer from "@/components/Footer";
import HeadNext from "@/components/Head";
import Header from "@/components/Header";

import { useState, useEffect } from "react";
import { getAllCampaigns } from "@/services/Web3Service";

export default function AllCampaigns() {

    const [campaigns, setCampaigns] = useState([]);
    const [message, setMessage] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const campaignsPerPage = 8;

    function btnLoadCampaigns() {
        setMessage("Searching for Campaigns ...");

        getAllCampaigns()
            .then((campaigns) => {
                setCampaigns(campaigns);
                setMessage("");
            })
            .catch(error => setMessage(error.message));
    }

    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    const reverseCampaigns = [...campaigns].reverse();
    const currentCampaigns = reverseCampaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

    const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (

        <>
            <HeadNext title={"All Campaigns"} />

            <Header />

            <div className="container px-4 py-5">
                <div className="row flex-lg-row align-items-center g-5 mb-4">
                    <div className="col-lg-3">
                        <h1 style={{ color: "#ffa46f" }}>All campaigns</h1>

                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-lg-3">
                        {
                            campaigns.length == 0
                                ?
                                <>
                                    <button className="btn btn-neuro lead" style={{ width: "90%" }} onClick={btnLoadCampaigns}>Load Campaigns</button>
                                </>
                                : <></>
                        }
                    </div>

                </div>

                <div className="row flex-lg-row align-items-center g-5 mt-4 px-3">
                    {/* Message */}
                    {
                        message
                            ? (
                                <>
                                    <div className="mt-3 alert alert-info p-3" role="alert">{message}</div>
                                </>
                            )
                            : <></>
                    }

                    {
                        currentCampaigns.length == 0
                            ? (
                                <>
                                    <div className="mt-3 alert alert-info p-3" role="alert">No campaigns found</div>
                                </>
                            )
                            : (
                                <>
                                    {
                                        currentCampaigns.map(campaign => (
                                            <div key={campaign.id}>
                                                <CampaignCard campaign={campaign} />
                                            </div>
                                            
                                        ))
                                    }
                                </>
                            )
                    }

                    {/* Botões de Paginação */}
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-neuro"
                            disabled={currentPage === 1}
                            onClick={previousPage}
                        >
                            Previous
                        </button>
                        <span className="lead">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn btn-neuro"
                            disabled={currentPage === totalPages}
                            onClick={nextPage}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>

            <Footer />

        </>

    );
}
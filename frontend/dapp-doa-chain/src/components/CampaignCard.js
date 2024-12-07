import Link from "next/link";


export default function CampaignCard({ campaign }) {

    return (
        <>
            <div className="neuromorphic-card mx-3" style={{ width: "18rem" }}>
                <img src={campaign.imageUrl} className="card-img-top" alt="Campaign Image" />
                <div className="card-body mt-3">
                    <h5 className="card-title">{campaign.title.substring(0, 25)}...</h5>
                    <p className="card-text">{campaign.description.substring(0, 100)}...</p>
                    
                    <Link 
                        href={`/donate?id=${campaign.id}`} 
                        className="btn btn-neuro mt-1 mb-1 lead" 
                        style={{
                            pointerEvents: (campaign.active) ? "auto" : "none",
                            color: (campaign.active) ? "" : "white",
                            backgroundColor: (campaign.active) ? "" : "red",
                            fontWeight: (campaign.active) ? "400" : "bold"
                        }}
                    >
                        {campaign.active ? <>See more</> : <>Finished</>}
                    </Link>
                </div>
            </div>
        </>
    );

}
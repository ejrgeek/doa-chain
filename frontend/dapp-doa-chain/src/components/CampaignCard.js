import Link from "next/link";


export default function CampaignCard({ campaing }) {

    return (
        <>
            <div class="card" style="width: 18rem;">
                <img src={campaing.imageUrl} class="card-img-top" alt="Campaign Image" />
                    <div class="card-body">
                        <h5 class="card-title">{campaing.title}</h5>
                        <p class="card-text">{campaing.description}</p>
                        <Link href="#">See more</Link>
                    </div>
            </div>
        </>
    );

}
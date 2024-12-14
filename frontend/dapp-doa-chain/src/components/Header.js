import Link from "next/link";


export default function Header(){
    return (
        <nav className="footer-neuromorphic d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 container">
            <div className="nav col-md-3 mb-0 ">
                <img src="logo.png" className="logo"/>
                <Link href="/" className="text-info fw-bold h1">DoaChain</Link>
            </div>
            <div className="nav col-md-3 mb-0 justify-content-center">
                <h3 className="lead fw-bold" style={{color: "#ffa46f"}}>Using <a style={{color: "#ffa46f"}} href="https://testnet.bscscan.com">BSC Testnet Network</a></h3>
            </div>
            <ul className="nav col-md-6 justify-content-end">
                <li className="nav-item" >
                    <Link href="/create" className="nav-link px-2 text-body-secondary">Create Campaign</Link>
                </li>
                <li className="nav-item" >
                    <Link href="/donate" className="nav-link px-2 text-body-secondary">Donate</Link>
                </li>
                <li className="nav-item" >
                    <Link href="/all-campaigns" className="nav-link px-2 text-body-secondary">All Campaigns</Link>
                </li>
                <li className="nav-item" >
                    <Link href="/withdraw" className="nav-link px-2 text-body-secondary">Withdraw</Link>
                </li>
            </ul>
        </nav>
    )
}
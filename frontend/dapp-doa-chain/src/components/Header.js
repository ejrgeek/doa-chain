export default function Header(){
    return (
        <footer className="footer-neuromorphic d-flex flex-wrap justify-content-between align-items-center py-3 mb-4 container">
            <div className="nav col-md-6 mb-0 ">
                <img src="logo.png" className="logo"/>
                <h1 className="text-info fw-bold">
                    DoaChain
                </h1>
            </div>
            <ul className="nav col-md-6 justify-content-end">
                <li className="nav-item" >
                    <a href="/" className="nav-link px-2 text-body-secondary"> Home </a>
                </li>
                <li className="nav-item" >
                    <a href="/create-campaign" className="nav-link px-2 text-body-secondary"> Create Campaign </a>
                </li>
                <li className="nav-item" >
                    <a href="/donate-campaign" className="nav-link px-2 text-body-secondary"> Donate </a>
                </li>
                <li className="nav-item" >
                    <a href="/withdraw" className="nav-link px-2 text-body-secondary"> Withdraw </a>
                </li>
            </ul>
        </footer>
    )
}
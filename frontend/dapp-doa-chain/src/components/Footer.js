import Link from "next/link";


export default function Footer(){
    return (
        <footer className="footer-neuromorphic d-flex flex-wrap justify-content-between align-items-center py-3 my-4 container">
            <p className="col-md-6 mb-0 text-body-secondary">
                &copy; {new Date().getFullYear()}&nbsp;
                 <a href="https://github.com/ejrgeek/doa-chain" target="_blank" className="fw-bold">DoaChain</a>
                 &nbsp;made with ❤️ by&nbsp;
                 <a href="https://erlondnjr.com.br/" target="_blank" className="creatorName fw-bold">Erlon Dantas</a>
            </p>
            <ul className="nav col-md-6 justify-content-end">
                
                <li className="nav-item" >
                    <Link href="/about" className="nav-link px-2 text-body-secondary">About</Link>
                </li>
                <li className="nav-item" >
                    <Link href="/terms-of-use" className="nav-link px-2 text-body-secondary">Terms of Use</Link>
                </li>
                <li className="nav-item" >
                    <Link href="/privacy-policy" className="nav-link px-2 text-body-secondary">Privacy Policy</Link>
                </li>
            </ul>
        </footer>
    )
}
export default function Footer(){
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-6 mb-0 text-body-secondary">
                &copy; 2024 DoaChain made with ❤️ by Erlon Dantas
            </p>
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
                    <a href="/about" className="nav-link px-2 text-body-secondary"> About </a>
                </li>
                <li className="nav-item" >
                    <a href="https://erlondnjr.com.br/" target="_blank" className="nav-link px-2 text-body-secondary"> Portfolio </a>
                </li>
                <li className="nav-item" >
                    <a href="https://www.linkedin.com/in/erlondnjr/" target="_blank" className="nav-link px-2 text-body-secondary"> GitHub </a>
                </li>
            </ul>
        </footer>
    )
}
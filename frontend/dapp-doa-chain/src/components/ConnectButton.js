
export default function ConnectButton ( {func} ) {
    return (
        <>
            <button
                type="button"
                className="btn-neuromorphic btn-lg fw-semibold d-flex align-items-center gap-2 connectButton"
                onClick={func}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
                    alt="Metamask Logo"
                    height="30"
                />
                Connect to Metamask
            </button>
        </>
    );
}
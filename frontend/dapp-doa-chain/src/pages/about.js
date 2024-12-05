
import HeadNext from "@/components/Head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function About() {
  return (
    <>
      
      <HeadNext title={"About"} />

      <Header />

      <div className="container px-4 py-5">
        <div className="row flex-lg-row align-items-center g-5 my-5">
          {/* About Me Section */}
          <div className="col-lg-6">
            <h1 className="display-6 fw-bold mb-4" style={{ color: "#ffa46f" }}>
              About the Creator
            </h1>
            <p className="lead mb-3">
              My name is Erlon Dantas, and I’m a passionate developer with a
              deep interest in both technology and social impact. I have
              experience in backend development, including cloud computing with
              AWS, as well as mobile and software development. My focus is on
              creating innovative solutions that make a positive difference in
              people’s lives.
            </p>
            <p className="lead mb-3">
              I’m also a professor with a background in computer science and
              research, and I believe that technology can drive meaningful change
              in various sectors, especially in social good and fundraising.
            </p>
            <p className="lead mb-4">
              The DoaChain project is the result of my vision to create a
              transparent, secure, and efficient platform for donations. By
              leveraging blockchain technology, I aim to bring a new level of
              trust and accountability to the world of crowdfunding and charity.
            </p>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src="https://erlondnjr.com.br/assets/photo/erlon.jpg"
              alt="Erlon Dantas"
              className="img-fluid rounded-circle"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* About the Project */}
        <div className="row flex-lg-row align-items-center g-5 my-5">
          <div className="col-lg-6 text-center">
            <img
              src="banner.png"
              alt="DoaChain"
              className="img-fluid rounded-circle"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          <div className="col-lg-6">
            <h1 className="display-6 fw-bold mb-4" style={{ color: "indigo" }}>
              About DoaChain
            </h1>
            <p className="lead mb-3">
              DoaChain is a decentralized donation platform designed to meet
              various fundraising needs, such as NGO campaigns, individual
              causes, and emergency crowdfunding. Built on blockchain technology,
              DoaChain ensures full transparency, security, and efficiency in
              every transaction.
            </p>
            <p className="lead mb-3">
              The platform allows anyone with a digital wallet to create or
              donate to campaigns, empowering both individuals and organizations
              to raise funds for causes that matter. Whether you're looking to
              support an emergency, fund a personal project, or help an NGO, the
              DoaChain platform provides a simple and secure way to make a real
              impact.
            </p>
            <p className="lead mb-4">
              The project's goal is to foster a global community where
              transparency, trust, and accessibility form the foundation of
              charitable giving. Join us in making a difference, and together, we
              can create positive change for the world.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

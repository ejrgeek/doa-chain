
import HeadNext from "@/components/Head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TermsOfUse() {
  return (
    <>
      
      <HeadNext title={"Terms Of Use"} />

      <Header />

      <div className="container px-4 py-5">
        <h1 className="display-6 fw-bold mb-4" style={{ color: "#ffa46f" }}>
          Terms of Use
        </h1>

        <p className="lead mb-3">
          Welcome to DoaChain! By accessing or using our platform, you agree to
          comply with these Terms of Use. Please read them carefully.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          1. Introduction
        </h2>
        <p className="lead mb-3">
          DoaChain is a decentralized donation platform that allows users to
          create and contribute to fundraising campaigns. By using the platform,
          you agree to these Terms of Use, which govern your access to and
          interaction with DoaChain.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          2. Eligibility
        </h2>
        <p className="lead mb-3">
          To use DoaChain, you must be at least 18 years old and have the legal
          capacity to enter into a contract. By using our services, you represent
          and warrant that you meet these eligibility requirements.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          3. User Responsibilities
        </h2>
        <p className="lead mb-3">
          Users of DoaChain are responsible for the following:
        </p>
        <ul className="lead mb-3">
          <li>Providing accurate and truthful information during registration.</li>
          <li>Maintaining the confidentiality of your wallet and account credentials.</li>
          <li>Complying with all applicable laws and regulations related to donations and fundraising.</li>
          <li>Using the platform solely for lawful purposes, and not for any fraudulent, abusive, or illegal activities.</li>
        </ul>

        <h2 className="fw-bold mb-3 fs-2" style={{ color: "#ffa46f" }}>
          4. Campaign Creation and Donations
        </h2>
        <p className="lead mb-3">
          Users who wish to create campaigns on DoaChain agree to:
        </p>
        <ul className="lead mb-3">
          <li>Provide a clear, accurate, and honest description of the campaign.</li>
          <li>Set a reasonable fundraising goal and ensure funds are used as described in the campaign.</li>
          <li>Comply with any applicable laws and regulations regarding crowdfunding and donations.</li>
        </ul>

        <p className="lead mb-3">
          Donors are responsible for ensuring they are contributing to a legitimate and trustworthy cause.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          5. Payment and Blockchain Transactions
        </h2>
        <p className="lead mb-3">
          All transactions on DoaChain are conducted through blockchain technology and are irreversible. By making a donation or creating a campaign, you acknowledge and accept the risks involved, including the volatility of cryptocurrency values.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          6. Privacy and Data Collection
        </h2>
        <p className="lead mb-3">
          DoaChain respects your privacy. By using the platform, you consent to the collection and use of personal information as described in our Privacy Policy.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          7. Disclaimers and Limitation of Liability
        </h2>
        <p className="lead mb-3">
          DoaChain makes no guarantees regarding the outcome of any campaign, the use of donations, or the success of fundraising efforts. The platform is provided "as is" and we do not assume any liability for damages or losses resulting from your use of the platform.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          8. Termination of Service
        </h2>
        <p className="lead mb-3">
          DoaChain reserves the right to suspend or terminate a user's account or access to the platform if they violate these Terms of Use or engage in fraudulent or illegal activities.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          9. Governing Law
        </h2>
        <p className="lead mb-3">
          These Terms of Use are governed by and construed in accordance with the laws of the jurisdiction in which DoaChain operates. Any disputes will be resolved through binding arbitration.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          10. Changes to Terms
        </h2>
        <p className="lead mb-3">
          DoaChain reserves the right to update or modify these Terms of Use at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the updated terms.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          11. Contact Information
        </h2>
        <p className="lead mb-3">
          If you have any questions or concerns about these Terms of Use, please contact us at support@doachain.com.
        </p>
      </div>

      <Footer />
    </>
  );
}

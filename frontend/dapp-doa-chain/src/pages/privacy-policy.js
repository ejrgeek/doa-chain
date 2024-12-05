
import HeadNext from "@/components/Head";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PrivacyPolicy() {
  return (
    <>
      
      <HeadNext title={"Privacy Policy"} />

      <Header />

      <div className="container px-4 py-5">
        <h1 className="display-6 fw-bold mb-4" style={{ color: "#ffa46f" }}>
          Privacy Policy
        </h1>

        <p className="lead mb-3">
          At DoaChain, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          1. Information We Collect
        </h2>
        <p className="lead mb-3">
          We collect the following types of information:
        </p>
        <ul className="lead mb-3">
          <li><strong>Personal Information:</strong> When you create an account or make a donation, we may collect your name, email address, and payment details (if applicable).</li>
          <li><strong>Blockchain Data:</strong> As a decentralized platform, we use blockchain technology to process donations. This means that transaction details (e.g., wallet addresses, donation amounts) are recorded on the blockchain.</li>
          <li><strong>Usage Data:</strong> We collect information about your interactions with the platform, such as the pages you visit, your IP address, and your device information, to improve user experience and site performance.</li>
        </ul>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          2. How We Use Your Information
        </h2>
        <p className="lead mb-3">
          We use the information we collect for the following purposes:
        </p>
        <ul className="lead mb-3">
          <li>To provide and maintain our services.</li>
          <li>To process donations and support fundraising campaigns.</li>
          <li>To communicate with you regarding your account or donations.</li>
          <li>To improve our platform and user experience.</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          3. Data Security
        </h2>
        <p className="lead mb-3">
          We take the security of your personal information seriously. We employ a variety of security measures, including encryption and secure storage, to protect your data. However, as with any online service, we cannot guarantee absolute security, and users should take appropriate precautions to protect their account credentials.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          4. Sharing Your Information
        </h2>
        <p className="lead mb-3">
          We do not sell, rent, or trade your personal information to third parties. However, we may share your data in the following circumstances:
        </p>
        <ul className="lead mb-3">
          <li>With service providers who assist us in operating the platform (e.g., payment processors, hosting providers).</li>
          <li>When required by law, such as in response to a subpoena, court order, or government request.</li>
          <li>To protect the rights, property, or safety of DoaChain, our users, or others.</li>
        </ul>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          5. Blockchain Transparency
        </h2>
        <p className="lead mb-3">
          Donations and campaign details on DoaChain are recorded on a public blockchain, meaning that certain information (such as donation amounts and wallet addresses) is accessible to anyone on the blockchain. Please be aware that while your personal information is kept private, blockchain transactions are immutable and transparent.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          6. Your Rights
        </h2>
        <p className="lead mb-3">
          You have the right to:
        </p>
        <ul className="lead mb-3">
          <li>Access the personal information we hold about you.</li>
          <li>Request corrections to any inaccurate or incomplete data.</li>
          <li>Request the deletion of your account, subject to legal obligations and platform policies.</li>
        </ul>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          7. Changes to This Privacy Policy
        </h2>
        <p className="lead mb-3">
          We may update this Privacy Policy from time to time. When we make significant changes, we will notify users through the platform or via email. By continuing to use the platform after any changes to this policy, you accept the updated terms.
        </p>

        <h2 className="fw-bold mb-3" style={{ color: "#ffa46f" }}>
          8. Contact Information
        </h2>
        <p className="lead mb-3">
          If you have any questions or concerns about our Privacy Policy, or if you would like to exercise any of your rights, please contact me at&nbsp;<a href="mailto:contato@erlondnjr.com.br">contato@erlondnjr.com.br</a>
        </p>
      </div>

      <Footer />
    </>
  );
}

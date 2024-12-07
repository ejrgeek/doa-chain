
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

# Frontend - dApp DoaChain

This is the frontend of a blockchain-based campaign creation and donation management platform. The project allows users to create campaigns, view details about existing campaigns, and withdraw funds when they reach their fundraising goal.

## Technologies Used
- React - JavaScript library for building the user interface.
- Web3.js - Library for interacting with the Ethereum blockchain (or Binance Smart Chain).
- Bootstrap - CSS framework for responsive layout and design.


## Requirements
Before you begin, you need to have the following tools installed in your development environment:

- [Node.js](https://nodejs.org/) (version 14 or higher) - Install Node.js
- [npm (Node.js package manager)](https://www.npmjs.com/) - Installed along with Node.js.
- [Metamask](https://metamask.io/)

## Installation
Follow the steps below to run the project locally:

1. **Clone the repository:**
```bash
git clone git@github.com:ejrgeek/doa-chain.git
cd doa-chain/frontend/dapp-doa-chain/
```

2. **Install dependencies:** Run the command below to install the project dependencies:
```bash
npm install
```
3. **Set environment variables:** Create a .env file in the project root with the following environment variables:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=<contract_address_here>
```
4. **Run the project:** Now, you can run the project locally with the command:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features:
1. Create Campaign

The user can create a new campaign by filling in the following fields:

- Author's name
- Campaign title
- Description
- Video URL (optional)
- Image URL (optional)
- Funding goal (in TBNB)
- End date (in days from the current date)

2. Search Campaign

Users can search for campaigns by entering a unique Campaign ID, which will be used to retrieve campaign information from the blockchain. The system displays detailed campaign information such as the campaign title, author, description, creation date, end date, and amount raised to date.

3. Donate

After verifying the campaign information, users can make a donation by inputting the amount in TBNB. The donation amount is sent to the campaign’s smart contract on the blockchain, supporting the campaign author.

4. Check if you can withdraw and withdraw

The system checks whether the campaign has reached the fundraising target + platform fee, allowing or not the withdrawal of the amount raised.

Caso a campanha tenha atingido a meta de arrecadação e a taxa, o usuário pode solicitar o saque dos fundos diretamente para sua carteira.

5. User Feedback

The system displays messages about the status of the donation, including:

Success message after the donation is submitted.
Error messages if something goes wrong during the transaction.

6. Components

- HeadNext: Responsible for adding metadata and page title.
- Header: Component that displays the navigation bar at the top of the page.
- Footer: Displays the footer with additional information.

7. Formatters

- ethFormatter: Formats TBNB values ​​to a human-readable representation.
- dateFormatter: Formats dates to human-readable format.

## How to Contribute

- Fork the repository.
- Create a branch for your feature (git checkout -b feature/feature-name).
- Make your changes and commit (git commit -am 'Add new feature').
- Push to your branch (git push origin feature/feature-name).
- Submit a Pull Request.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

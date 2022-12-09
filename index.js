// index.js
const provider = new ethers.providers.Web3Provider(Web3.givenProvider);
const ens = new ENSJS({ provider });

// Log in using an Ethereum wallet
async function login() {
  // Prompt the user to sign a message
  const message = "Please sign this message to log in.";
  const sig = await provider.send("eth_signTypedData_v3", [
    {
      data: [
        {
          type: "string",
          name: "Message",
          value: message,
        },
      ],
    },
  ]);

  // Get the Ethereum address of the user
  const address = ethers.utils.recoverAddress(message, sig);

  // Get the primary ENS domain of the user's wallet
  const domain = await ens.reverse(address);

  // Get the records of the user's primary ENS domain
  const records = await ens.resolver(domain).records();

  // Display the user's ENS domain info on the page
  document.getElementById("ens-domain-info").innerHTML = JSON.stringify(records, null, 2);
}

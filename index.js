const Moralis = require("moralis").default;
const runApp = async () => {
    await Moralis.start({
        apiKey: "Your Key",
    });

    const ERC20TransferABI = [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "from",
                    type: "address",
                },
                {
                    indexed: true,
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
    ];

    const topic = "Transfer(address,address,uint256)";

    const response = await Moralis.Streams.update({
        id: "c08375f6-678b-46f8-b046-124f0d1e829a", // your steam ID
        abi: ERC20TransferABI,
        demo: false,
        webhookUrl: "https://webhook.site/d6992abf-5136-4f2b-869f-e1d7943d5f0e", // your webhook URL
        includeContractLogs: true,
        includeNativeTxs: false,
        topic0: [topic],
        description: "Monitor ERC20 contract mints and burns",
        tag: "erc20_mint_burn",
        advancedOptions: [
            {
                includeNativeTxs: false,
                topic0: "Transfer(address,address,uint256)",
                filter: {
                    or: [
                        {
                            eq: [
                                "from",
                                "0x0000000000000000000000000000000000000000",
                            ],
                        },
                        {
                            eq: [
                                "to",
                                "0x0000000000000000000000000000000000000000",
                            ],
                        },
                    ],
                },
            },
        ],
        chains: ["0x5"], // use your chain ID, in this example we use Goerli
    });

    console.log(response.toJSON());
};

runApp();

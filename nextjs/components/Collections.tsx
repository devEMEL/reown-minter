import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '@/state/appStateSlice';
import { AppDispatch } from '@/state/store';
import {
    getTokenURI,
    imageURIToSrc,
    truncateAddress,
    weiToEther,
} from '@/helpers';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import LoadingAlert from './alerts/LoadingAlert';
import ErrorAlert from './alerts/ErrorAlert';
import SuccessAlert from './alerts/SuccessAlert';
import { useEthersProvider, useEthersSigner } from '@/pages/_app';
import { ethers } from 'ethers';
import NFTCollection from '../abi/NFTCollection.json';
import CollectionItems from './CollectionItems';

const queryURL =
    'https://api.studio.thegraph.com/query/91585/nft-factory-subgraph/version/latest';

const query = `
query {      
    collectionFactories(first: 5) {
        id
        collections {
            id
        }
    }
    collections(first: 5) {
        id
        factory {
            id
        }
        owner
        name
        symbol
        description
        price
        maxSupply
        imageURI
        timeCreated
    }
}       
`;

const Collections = () => {
    const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
    const [successStatus, setSuccessStatus] = useState<boolean>(false);
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<any>('Error...');

    const router = useRouter();

    const dispach = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: any) => state.appState);

    const provider = useEthersProvider();
    const signer = useEthersSigner();

    const clearAlert = () => setErrorStatus(false);

    const updatedItems = items.map((item: any) => ({
        ...item,
        imageURI: imageURIToSrc(item.imageURI),
    }));

    const getTokenId = async(contractAddress: string) => {

        const contract = new ethers.Contract(
            contractAddress,
            NFTCollection.abi,
            provider
        );
        const tokenId = await contract._tokenIds();
        return Number(String(tokenId));

    };

    const handleMintNFT = async (
        imageURI: string,
        name: string,
        description: string,
        contractAddress: string,
        price: number
    ) => {
        const contract = new ethers.Contract(
            contractAddress,
            NFTCollection.abi,
            provider
        );
        const tokenId = await contract._tokenIds();
        const nameAdd = Number(String(tokenId)) + 1;

        const metadata = {
            name: `${name} #${nameAdd}`, // next time
            description,
            image: imageURI,
            attributes: [
                {
                    trait_type: 'Background',
                    value: 'Blue',
                },
                {
                    trait_type: 'Body',
                    value: 'Robot',
                },
                {
                    trait_type: 'Eyes',
                    value: 'Red',
                },
                {
                    trait_type: 'Mouth',
                    value: 'Smile',
                },
                {
                    trait_type: 'Hat',
                    value: 'Cap',
                },
            ],
            external_url: 'https://my-nft-project.com/nft/12345',
            animation_url: 'ipfs://QmExampleHash67890/animation.mp4',
        };
        const tokenURI = await getTokenURI(metadata);
        console.log(tokenURI);

        const mintNFTcontract = new ethers.Contract(
            contractAddress,
            NFTCollection.abi,
            signer
        );

        const tx = await mintNFTcontract.mintNFT(
            // 'https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreid4xdpjo2bmjiurykquhsnni5yaf44jwbkslpin6yv5eeig45wcii'

            // 'ipfs://bafkreid4xdpjo2bmjiurykquhsnni5yaf44jwbkslpin6yv5eeig45wcii',
            tokenURI,

            {
                value: BigInt(price),
            }
        );
        const response = await tx.wait();
        console.log(response);
        const contract_ = new ethers.Contract(
            contractAddress,
            NFTCollection.abi,
            provider
        );
        const newTokenId = (await contract_._tokenIds()).toString();
        const _imageURI = await contract_._imageURI();
        const srcImage = imageURIToSrc(_imageURI);
        console.log(String(newTokenId));
        console.log({
            newTokenId,
            srcImage,
        });

        return { newTokenId, srcImage };
    };

    const mintNFT = async (
        imageURI: string,
        name: string,
        description: string,
        contractAddress: string,
        price: number
    ) => {
        setLoadingStatus(true);
        const toastId = toast.loading('Minting NFT...');

        try {
            const { newTokenId, srcImage } = await handleMintNFT(
                imageURI,
                name,
                description,
                contractAddress,
                price
            );

            toast.update(toastId, {
                render: (
                    <div className="text-[#000000] bg-white p-4">
                        {srcImage && (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="my-4">
                                    NFT minted successfully...
                                </h1>

                                <Image
                                    src={srcImage}
                                    alt="loading image"
                                    width={150}
                                    height={150}
                                    className="rounded-lg"
                                />

                                <div className="my-4 text-center">
                                    {name} #{newTokenId}
                                </div>
                            </div>
                        )}
                    </div>
                ),
                type: 'success',
                isLoading: false,
                autoClose: 5000, // Close after 5 seconds
            });

            setLoadingStatus(false);
        } catch (err) {
            toast.update(toastId, {
                render: 'Something went wrong. Try again.',
                type: 'error',
                isLoading: false,
                autoClose: 5000, // Close after 5 seconds
            });

            setErrorStatus(true);
            setErrorMessage(err);
        }
    };

    useEffect(() => {
        console.log('Fetching data from blockchain...');
        if (loading === false) {
            dispach(fetchCollections({ queryURL, query }));
        }
        console.log(updatedItems);
    }, []);

    return (
        <div className="py-16">
            {/* <div>
                {loadingStatus && (
                    <div className="mb-4">
                        <LoadingAlert message="" />
                    </div>
                )}
                {errorStatus && (
                    <div className="mb-4">
                        <ErrorAlert message={errorMessage} clear={clearAlert} />
                    </div>
                )}
                {successStatus && (
                    <div className="mb-4">
                        <SuccessAlert message="" />
                    </div>
                )}
            </div> */}

            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8 bg-[#ffffff] text-[#000000] rounded-2xl mt-10 min-h-screen overflow-x-scroll">

                <table className="shadow-2xl border-2 border-black-400 w-full">
                    {/* add overflow-hidden later */}
                    <thead>
                        <tr>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                N
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Image
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Name
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Address (CA)
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Price (ETH)
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Total Supply
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Amount Minted
                            </th>
                            <th className="py-3 bg-gray-800 text-[#ffffff]">
                                Mint
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-center">
                        {updatedItems &&
                            updatedItems.map((el: any, index: any) => (
                                <CollectionItems
                                    data={el}
                                    index={index}
                                    key={index}
                                    mintNFT={mintNFT}
                                    getTokenId={getTokenId}
                                />
                            ))}
                    </tbody>
                </table>

                {/* <MintSuccessNotification isVisible={isVisible} setVisibility={setVisibility} /> */}

                {/* <button className='p-4 text-white bg-black' onClick={mintNFT}>mint nft</button> */}
            </div>
        </div>
    );
};

export default Collections;

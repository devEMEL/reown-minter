import { ethers, parseEther, parseUnits, toNumber } from 'ethers';
import Blockies from 'react-blockies';

import { FileObject, PinataSDK } from 'pinata';

export const SCROLL_SEPOLIA_CA = '0x68df4D3380823335e69909Bd4E2a17E93093Ee77';

const IMAGE_SAMPLE =
    'https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i';

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: 'maroon-major-crawdad-175.mypinata.cloud',
});

export const identiconTemplate = (address: string) => {
    return (
        <Blockies
            size={14} // number of pixels square
            scale={4} // width/height of each 'pixel'
            className="identicon border-2 border-white rounded-full" // optional className
            seed={address} // seed used to generate icon data, default: random
        />
    );
};

export const truncateAddress = (
    address: string,
    startLength = 6,
    endLength = 4
) => {
    if (!address) return '';
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const imageURIToSrc = (imageURI: string) => {
    let imageSrc;
    if (imageURI.includes('//')) {
        imageSrc = `https://maroon-major-crawdad-175.mypinata.cloud/ipfs/${
            imageURI.split('//')[1]
        }`;
    } else {
        imageSrc = IMAGE_SAMPLE;
    }

    return imageSrc;
};

export const etherToWei = (amountInEther: string) => {
    return ethers.parseEther(amountInEther);
};

export const weiToEther = (amountInWei: string) => {
    return ethers.formatEther(amountInWei);
};

export const getImageURI = async (imageFile: FileObject) => {
    const upload = await pinata.upload.file(imageFile);
    console.log(`ipfs://${upload.IpfsHash}`);
    return `ipfs://${upload.IpfsHash}`;
};

export const getTokenURI = async (metadata: object) => {
    const upload = await pinata.upload.json(metadata);
    console.log(`ipfs://${upload.IpfsHash}`);
    return `ipfs://${upload.IpfsHash}`;
};

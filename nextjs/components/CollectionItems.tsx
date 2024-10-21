import { truncateAddress, weiToEther } from '@/helpers';
import React, { useEffect, useState } from 'react';

const CollectionItems = ({ data, index, key, mintNFT, getTokenId }) => {

    const [tokenId, setTokenId] = useState(0);

    const getToken = async() => {
        console.log("hello collection");
        const tokenId_ = await getTokenId(data.id);
        setTokenId(tokenId_)
        console.log(tokenId);
    }

    useEffect(() => {
        getToken();
    }, [mintNFT])
    return (
        <tr key={`${key}l`} className="bg-[#ffffff] text-center">
            <td className="py-6 px-6">{index}</td>
            <td className="py-6 px-6">
                <img src={data.imageURI} className="w-20 rounded-lg" />
            </td>
            <td className="py-6 px-6">{data.name}</td>
            <td className="py-6 px-6">
                {truncateAddress(data.contractAddress)}
            </td>
            <td className="py-6 px-6">
                {Number(weiToEther(String(data.price)))}
            </td>
            <td className="py-6 px-6">{data.maxSupply}</td>
            <td className="py-6 px-6">{tokenId || 0}</td>
            <td className="py-6 px-6">
                <button
                    className="bg-gray-800 text-[#ffffff] py-1 px-4"
                    onClick={() =>
                        mintNFT(
                            data.imageURI,
                            data.name,
                            data.description,
                            data.id, // contractAddress
                            data.price
                        )
                    }
                >
                    Mint
                </button>
            </td>
        </tr>
    );
};

export default CollectionItems;

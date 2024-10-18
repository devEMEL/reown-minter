import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FactoryProps {
    id: number
}

interface collectionProps {
    id: number;
    factory: FactoryProps;
    name: string;
    symbol: string;
    description: string;
    price: number;
    maxSupply: number;
    imageURI: string;
    timeCreated: number;

}

const Collections = () => {
    const [collections, setCollections] = useState<collectionProps[]>([]);
    const queryURL =
        'https://api.studio.thegraph.com/query/91585/nft-factory-subgraph/version/latest';

    const fetchNFTCollections = async () => {
        console.log('Fetching nft collections...');

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
        const response = await axios.post(queryURL,{
                query: query
            }
        );
        const result = await response.data.data;
        return result;
    };

    const callFetchNFTCollections = async() => {
        const res = await fetchNFTCollections();
        setCollections(res.collections);
        console.log(res.collections);
    }

    useEffect(() => {
        console.log('Fetching data from blockchain...');
        callFetchNFTCollections();
    }, []);
    return (
        <>
            <div>Collections</div>
            <div>
               {
                collections && (
                    <div>
                        {
                            collections.map((collection: collectionProps) => (
                                <div className='mb-3' key={`${collection.id} + 1`}>
                                    { collection.id }
                                    { collection.factory.id }
                                    { collection.name }
                                    { collection.symbol }
                                    { collection.description }
                                    { collection.price }
                                    { collection.maxSupply }
                                    { collection.imageURI }
                                    { collection.timeCreated }
                                </div>
                            ))
                    }
                    </div>
                )
               }
            </div>
        </>
    );
};

export default Collections;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '@/state/appStateSlice';
import { AppDispatch } from '@/state/store';
import { imageURIToSrc } from '@/helpers';
import Image from 'next/image';
import { LinkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

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
    const router = useRouter();

    const dispach = useDispatch<AppDispatch>();
    const { items, loading } = useSelector((state: any) => state.appState);

    const updatedItems = items.map((item: any) => ({
        ...item,
        imageURI: imageURIToSrc(item.imageURI),
    }));

    useEffect(() => {
        console.log('Fetching data from blockchain...');
        if (loading === false) {
            dispach(fetchCollections({ queryURL, query }));
        }
        console.log(updatedItems);
    }, []);
    return (
        <>
            <div>Collections</div>

            <div className="flex flex-wrap pt-4 pb-10 my-10">
                {updatedItems &&
                    updatedItems.map((item: any) => (
                        <div
                            className="w-1/2 md:w-1/3 mb-10 cursor-pointer"
                            key={`${item.id}`}
                            onClick={() => {
                                //
                                router.push(`/collection/${item.id}`);
                            }}
                        >
                            <div className="flex justify-center">
                                <div className="w-full">
                                    <Image
                                        src={item.imageURI}
                                        alt={item.name}
                                        width={700}
                                        height={500}
                                        className="w-[95%] max-h-[250px] rounded-lg"
                                    />
                                    <div className="flex gap-2 mt-8 justify-center italic tracking-wide ">
                                        <p className="bg-gradient-to-r from-red-900 to-black bg-clip-text text-transparent">
                                            Visit Page
                                        </p>
                                        <LinkIcon width="25" cursor="pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Collections;

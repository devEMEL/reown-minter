import { imageURIToSrc } from '@/helpers';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const CollectionPage = () => {
    console.log('collection page mounted...');

    const router = useRouter();
    const { items, loading } = useSelector((state: any) => state.appState);

    const { id } = router.query;

    // const getFilteredCollection = () => {
    //     return items.filter((collection: any) => {
    //         return collection.id.toString() === id?.toString();
    //     });
    // }

    const filteredCollection = items.filter((collection: any) => {
        return collection.id.toString() === id?.toString();
    });

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if there are filtered results
    if (!filteredCollection.length) {
        return <div>No collections found. {id}</div>;
    }

    useEffect(() => {
        // setID_(id as string)
        console.log('items from redux: ', items);
    }, []);

    return (
        <div>
            <button
                onClick={() => {
                    console.log(filteredCollection);
                }}
            >
                hcjdbdca
            </button>
            <div>
                <p>{filteredCollection[0].id}</p>
                <p>{filteredCollection[0].name}</p>
                <p>{filteredCollection[0].symbol}</p>
            </div>
        </div>
    );
};

export default CollectionPage;

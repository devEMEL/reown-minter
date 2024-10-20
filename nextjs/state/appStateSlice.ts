import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface FactoryProps {
    id: number;
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

interface queryParams {
    queryURL: string;
    query: any;
}

interface stateInterface {
    items: Array<collectionProps>;
    loading: boolean;
    error: any;
}

const initialState: stateInterface = {
    items: [
        //     {
        //     chainId: 111555,
        //     contractAddress: "0xsknnkkflepo",
        //     name: "Dominic Art",
        //     symbol: "DAT",
        //     creator: "0xhjkkajioHIOICHIHoonciiowowoowowwolooo",
        //     timestamp: 1908494909101,
        //     price: 12,
        //     maxSupply: 1000,
        //     imageURL: "ipfs://bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i",
        // }
    ],
    loading: false,
    error: null,
};

export const fetchCollections = createAsyncThunk(
    'nfts/fetchCollections',
    async (params: queryParams) => {
        const response = await axios.post(params.queryURL, {
            query: params.query,
        });
        const result = await response.data.data;
        return result.collections;
    }
);

const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                console.log(action.payload);
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    /*..FUNCTIONS FROM REDUCERS AND EXTRAREDUCERS..*/
} = appStateSlice.actions;
export default appStateSlice.reducer;

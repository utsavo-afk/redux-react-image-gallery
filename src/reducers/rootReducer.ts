import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockFetchData } from '@src/api';

import data from '../data.json';

interface RootState {
	categories: null | string[];
	activeTab: string | undefined;
	search: string | undefined;
	activeData: null | Array<{ image: string; text: string }>;
	opacity: number;
	loading: boolean;
}

const initialState: RootState = {
	categories: null,
	activeTab: '',
	search: '',
	activeData: null,
	opacity: 1.0,
	loading: true,
};

//  async thun to get data from data.json
export const fetchApiData = createAsyncThunk('/fetch-data', async () => {
	const response = await mockFetchData();
	return response.data;
});

export const rootSlice = createSlice({
	name: 'apiData',
	initialState,
	reducers: {
		// active tab will set a category
		setActiveTab: (state, action: PayloadAction<string>) => {
			if (action.payload) state.activeTab = action.payload;
		},
		// search will set a search string
		setSearchVal: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		// active data will set the images
		setActiveData: (state, action: PayloadAction<string>) => {
			if (action.payload) state.activeData = data[action.payload];
		},
		setOpacity: (state, action: PayloadAction<number>) => {
			if (action.payload >= 0 && action.payload <= 1) state.opacity = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchApiData.fulfilled, (state, action) => {
			state.categories = Object.keys(action.payload);
			state.activeTab = state.categories[0]; // set to 0th index of categories
			state.activeData = action.payload[state.activeTab]; // bracket notation to access key:value pair
			state.loading = false;
		});
	},
});

export const { setActiveTab, setActiveData, setSearchVal, setOpacity } =
	rootSlice.actions;

export default rootSlice.reducer;

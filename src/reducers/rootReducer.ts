import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import data from '../data.json';

interface RootState {
	categories: string[];
	activeTab: string | undefined;
	search: string | undefined;
	activeData: Array<{ image: string; text: string }> | null;
	opacity: number;
}

const initialState: RootState = {
	categories: Object.keys(data),
	activeTab: '',
	search: '',
	activeData: null,
	opacity: 1.0,
};

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
			if (action.payload) state.search = action.payload;
		},
		// active data will set the images
		setActiveData: (state, action: PayloadAction<string>) => {
			if (action.payload) state.activeData = data[action.payload];
		},
		setOpacity: (state, action: PayloadAction<number>) => {
			if (action.payload >= 0 && action.payload <= 1) state.opacity = action.payload;
		},
	},
});

export const { setActiveTab, setActiveData, setSearchVal, setOpacity } =
	rootSlice.actions;

export default rootSlice.reducer;

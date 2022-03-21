// mock api response from data.json

import { JSONdata } from '@src/typings';

import data from './../data.json';

export const mockFetchData = (): Promise<JSONdata> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ data: data }), 1000);
	});
};

import { setActiveTab, setSearchVal } from '@src/reducers/rootReducer';
import { RootState } from '@src/store';
import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {
	const searchVal = useSelector((state: RootState) => state.rootState.search);
	const dispatch = useDispatch();
	return (
		<Form className="d-flex">
			<FormControl
				type="search"
				placeholder="Search"
				aria-label="Search"
				className="mx-5"
				size="sm"
				value={searchVal}
				onChange={(changeEvent) => {
					dispatch(setSearchVal(String(changeEvent.target.value)));
					dispatch(setActiveTab(String(changeEvent.target.value)));
				}}
			/>
		</Form>
	);
};

export default SearchBar;

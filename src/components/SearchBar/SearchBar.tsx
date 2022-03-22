import { setSearchVal } from '@src/reducers/rootReducer';
import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

interface SearchBarProps {
	search: string | undefined;
}

const SearchBar = ({ search }: SearchBarProps) => {
	const dispatch = useDispatch();
	return (
		<Form className="d-flex">
			<FormControl
				type="search"
				placeholder="Search"
				aria-label="Search"
				className="mx-5"
				size="sm"
				value={search}
				onChange={(changeEvent) => {
					dispatch(setSearchVal(String(changeEvent.target.value)));
				}}
			/>
		</Form>
	);
};

export default SearchBar;

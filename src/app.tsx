import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ImageGrid from './components/ImageGrid/ImageGrid';
import SearchBar from './components/SearchBar/SearchBar';
import SideMenu from './components/SideMenu/SideMenu';
import { fetchApiData } from './reducers/rootReducer';
import { RootState } from './store';

const App = () => {
	// state
	const rootState = useSelector((state: RootState) => state.rootState);
	const loading = useSelector((state: RootState) => state.rootState.loading);
	const searchVal = useSelector((state: RootState) => state.rootState.search);
	const categories = useSelector((state: RootState) => state.rootState.categories);
	const opacity = useSelector((state: RootState) => state.rootState.opacity);
	const data = useSelector((state: RootState) => state.rootState.activeData);
	const activeTab = useSelector((state: RootState) => state.rootState.activeTab);
	const dispatch = useDispatch();

	console.log(rootState);

	useEffect(() => {
		dispatch(fetchApiData());
	}, []);

	return (
		<Container fluid>
			{loading ? (
				<div className="d-flex vh-100 justify-content-center align-items-center">
					<Spinner animation="grow" variant="primary" />
					<p>Loading...</p>
				</div>
			) : (
				<>
					<Row>
						<Col className="p-3 border border-dark">
							<SearchBar searchVal={searchVal} />
						</Col>
					</Row>
					<Row className="vh-100">
						<Col xs={4} className="border border-top-0 border-dark">
							<SideMenu categories={categories} opacity={opacity} />
						</Col>
						<Col>
							<ImageGrid data={data} activeTab={activeTab} search={searchVal} />
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default App;

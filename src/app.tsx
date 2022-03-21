import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ImageGrid from './components/ImageGrid/ImageGrid';
import SearchBar from './components/SearchBar/SearchBar';
import SideMenu from './components/SideMenu/SideMenu';
import { fetchApiData } from './reducers/rootReducer';
import { RootState } from './store';

const App = () => {
	const rootState = useSelector((state: RootState) => state.rootState);
	const loading = useSelector((state: RootState) => state.rootState.loading);
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
							<SearchBar />
						</Col>
					</Row>
					<Row className="vh-100">
						<Col xs={4} className="border border-top-0 border-dark">
							<SideMenu />
						</Col>
						<Col>
							<ImageGrid />
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};

export default App;

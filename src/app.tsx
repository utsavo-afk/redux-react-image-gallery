import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ImageGrid from './components/ImageGrid/ImageGrid';
import SearchBar from './components/SearchBar/SearchBar';
import SideMenu from './components/SideMenu/SideMenu';

const App = () => {
	return (
		<Container fluid>
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
		</Container>
	);
};

export default App;

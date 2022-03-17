import { isEmpty } from 'lodash';
import React from 'react';
import { Card, Col, Container, Form, FormControl, ListGroup, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch, useSelector } from 'react-redux';

import {
	setActiveData,
	setActiveTab,
	setOpacity,
	setSearchVal,
} from './reducers/rootReducer';
import { RootState } from './store';

const App = () => {
	const categories = useSelector((state: RootState) => state.rootState.categories);
	const activeTab = useSelector((state: RootState) => state.rootState.activeTab);
	const activeData = useSelector((state: RootState) => state.rootState.activeData);
	const searchVal = useSelector((state: RootState) => state.rootState.search);
	const opacityVal = useSelector((state: RootState) => state.rootState.opacity);
	const dispatch = useDispatch();

	console.log(activeData);

	return (
		<Container fluid>
			<Row>
				<Col className="p-3 border border-dark">
					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="Search"
							aria-label="Search"
							className="mx-5"
							size="sm"
							value={searchVal}
							onChange={(changeEvent) => {
								changeEvent.preventDefault();
								dispatch(setSearchVal(String(changeEvent.target.value)));
								dispatch(setActiveTab(String(changeEvent.target.value)));
							}}
						/>
					</Form>
				</Col>
			</Row>
			<Row className="vh-100">
				<Col xs={4} className="border border-top-0 border-dark">
					<ListGroup variant="flush">
						{!isEmpty(categories) &&
							categories.map((c, idx) => (
								<ListGroup.Item
									action
									onClick={() => {
										dispatch(setActiveTab(c));
										dispatch(setActiveData(c));
										dispatch(setSearchVal(c));
									}}
									key={idx}
								>
									{c}
								</ListGroup.Item>
							))}
					</ListGroup>

					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<RangeSlider
								size="sm"
								value={opacityVal}
								max={1.0}
								min={0.0}
								step={0.01}
								tooltipPlacement="top"
								onChange={(changeEvent) =>
									dispatch(setOpacity(Number(changeEvent.target.value)))
								}
							/>
							<Form.Control
								size="sm"
								type="number"
								placeholder="opacity"
								value={opacityVal}
								onChange={(changeEvent) =>
									dispatch(setOpacity(Number(changeEvent.target.value)))
								}
							/>
						</Form.Group>
					</Form>
				</Col>
				<Col>
					<Row xs={1} md={3} className="p-3 g-4">
						{activeTab ? (
							searchVal ? (
								activeData &&
								activeData
									.filter((d) => d.text.toLowerCase().includes(searchVal.toLowerCase()))
									.map(({ image, text }, idx) => (
										<Col key={idx}>
											<Card>
												<Card.Img
													variant="top"
													src={image}
													style={{ opacity: opacityVal }}
												/>
												<Card.Body>
													<Card.Text>{text}</Card.Text>
												</Card.Body>
											</Card>
										</Col>
									))
							) : (
								activeData &&
								activeData.map(({ image, text }, idx) => (
									<Col key={idx}>
										<Card>
											<Card.Img
												variant="top"
												src={image}
												style={{ opacity: opacityVal }}
											/>
											<Card.Body>
												<Card.Text>{text}</Card.Text>
											</Card.Body>
										</Card>
									</Col>
								))
							)
						) : (
							<div className="w-100">
								<p className="lead">Select a category</p>
								<p className="text-muted">Nothing to display</p>
							</div>
						)}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default App;

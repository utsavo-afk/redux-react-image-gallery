import { RootState } from '@src/store';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ImageGrid = () => {
	const activeTab = useSelector((state: RootState) => state.rootState.activeTab);
	const searchVal = useSelector((state: RootState) => state.rootState.search);
	const activeData = useSelector((state: RootState) => state.rootState.activeData);
	const opacityVal = useSelector((state: RootState) => state.rootState.opacity);

	return (
		<Row xs={1} md={3} className="p-3 g-4">
			{activeTab ? (
				searchVal ? (
					activeData &&
					activeData
						.filter((d) => d.text.toLowerCase().includes(searchVal.toLowerCase()))
						.map(({ image, text }, idx) => (
							<Col key={idx}>
								<Card>
									<Card.Img variant="top" src={image} style={{ opacity: opacityVal }} />
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
								<Card.Img variant="top" src={image} style={{ opacity: opacityVal }} />
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
	);
};

export default ImageGrid;

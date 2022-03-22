import { RootState } from '@src/store';
import { activeData } from '@src/typings';
import { isEmpty } from 'lodash';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

interface ListProps {
	data: Array<{ image: string; text: string }> | null | undefined;
}

const List = ({ data }: ListProps) => {
	return (
		<>
			{isEmpty(data) && (
				<div className="w-100">
					<p className="lead">Select a category</p>
					<p className="text-muted">Nothing to display</p>
				</div>
			)}
			{!isEmpty(data) &&
				data?.map(({ image, text }, idx) => (
					<ListItem key={idx} image={image} text={text} index={idx} />
				))}
		</>
	);
};

interface ListItemProps {
	key: number;
	image: string;
	text: string;
	index: number;
}

const ListItem = ({ image, text, index }: ListItemProps) => {
	const opacity = useSelector((state: RootState) => state.rootState.opacity);
	return (
		<Col key={index}>
			<Card>
				<Card.Img variant="top" src={image} style={{ opacity: opacity }} />
				<Card.Body>
					<Card.Text>{text}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
};

interface ImageGridProps {
	data: activeData | null;
	activeTab: string | null | undefined;
	search: string | null | undefined;
}

const ImageGrid = ({ data, activeTab, search }: ImageGridProps) => {
	// return (
	// 	<Row xs={1} md={3} className="p-3 g-4">
	// 		{activeTab ? (
	// 			searchVal ? (
	// 				activeData &&
	// 				activeData
	// 					.filter((d) => d.text.toLowerCase().includes(searchVal.toLowerCase()))
	// 					.map(({ image, text }, idx) => (
	// 						<Col key={idx}>
	// 							<Card>
	// 								<Card.Img variant="top" src={image} style={{ opacity: opacityVal }} />
	// 								<Card.Body>
	// 									<Card.Text>{text}</Card.Text>
	// 								</Card.Body>
	// 							</Card>
	// 						</Col>
	// 					))
	// 			) : (
	// 				activeData &&
	// 				activeData.map(({ image, text }, idx) => (
	// 					<Col key={idx}>
	// 						<Card>
	// 							<Card.Img variant="top" src={image} style={{ opacity: opacityVal }} />
	// 							<Card.Body>
	// 								<Card.Text>{text}</Card.Text>
	// 							</Card.Body>
	// 						</Card>
	// 					</Col>
	// 				))
	// 			)
	// 		) : (
	// 			<div className="w-100">
	// 				<p className="lead">Select a category</p>
	// 				<p className="text-muted">Nothing to display</p>
	// 			</div>
	// 		)}
	// 	</Row>
	// );
	return (
		<Row xs={1} md={3} className="p-3 g-4">
			{activeTab ? (
				search ? (
					<List
						data={data?.filter((el) =>
							el.text.toLowerCase().includes(search.toLowerCase()),
						)}
					/>
				) : (
					<List data={data} />
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

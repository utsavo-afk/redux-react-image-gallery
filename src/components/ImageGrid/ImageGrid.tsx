import { RootState } from '@src/store';
import { activeData } from '@src/typings';
import { map } from 'lodash';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

interface ListProps {
	data: Array<{ image: string; text: string }> | null | undefined;
}

const List = ({ data }: ListProps) => {
	return (
		<>
			{map(data, ({ image, text }, idx) => (
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
	search: string | null | undefined;
}

const ImageGrid = ({ data, search }: ImageGridProps) => {
	return (
		<Row xs={1} md={3} className="p-3 g-4">
			{search ? (
				<List
					data={data?.filter((el) =>
						el.text.toLowerCase().includes(search.toLowerCase()),
					)}
				/>
			) : (
				<List data={data} />
			)}
		</Row>
	);
};

export default ImageGrid;

import {
	setActiveData,
	setActiveTab,
	setOpacity,
	setSearchVal,
} from '@src/reducers/rootReducer';
import { RootState } from '@src/store';
import { isEmpty } from 'lodash';
import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch, useSelector } from 'react-redux';

const SideMenu = () => {
	const categories = useSelector((state: RootState) => state.rootState.categories);
	const opacityVal = useSelector((state: RootState) => state.rootState.opacity);

	const dispatch = useDispatch();
	return (
		<>
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
		</>
	);
};

export default SideMenu;

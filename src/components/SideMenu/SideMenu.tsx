import { setActiveData, setActiveTab, setOpacity } from '@src/reducers/rootReducer';
import { isEmpty } from 'lodash';
import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { useDispatch } from 'react-redux';

interface SideMenuProps {
	categories: string[] | null;
	opacity: number;
	currentTab: string | undefined;
}

const SideMenu = ({ categories, opacity, currentTab }: SideMenuProps) => {
	const dispatch = useDispatch();
	return (
		<>
			<ListGroup variant="flush">
				{!isEmpty(categories) &&
					categories?.map((c, idx, arr) => (
						<ListGroup.Item
							action
							onClick={() => {
								dispatch(setActiveTab(c));
								dispatch(setActiveData(c));
							}}
							key={idx}
							active={currentTab === arr[idx] ? true : false}
						>
							{c}
						</ListGroup.Item>
					))}
			</ListGroup>

			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<RangeSlider
						size="sm"
						value={opacity}
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
						value={opacity}
						onChange={(changeEvent) => {
							if (opacity >= 0.0 || opacity <= 1.0)
								dispatch(setOpacity(Number(changeEvent.target.value)));
						}}
					/>
				</Form.Group>
			</Form>
		</>
	);
};

export default SideMenu;

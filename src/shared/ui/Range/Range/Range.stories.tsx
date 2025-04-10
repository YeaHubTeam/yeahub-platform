import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Range } from './Range';
import { RangeProps } from '../types';
import { Icon } from '../../Icon';

const meta = {
	title: 'shared/Range',
	component: Range,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

const RangeWithHooks = (props: RangeProps) => {
	const [value, setValue] = React.useState(props.value);

	React.useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	const handleChange = (value: number) => {
		setValue(value);
	};

	return <Range {...props} value={value} onChange={handleChange} />;
};

export const RangeWithScaleIcons: Story = {
	args: {
		value: 4,
		min: 0,
		max: 10,
		step: 2,
		hasScale: true,
		minValueIcon: <Icon size={32} icon="arrowDownSquare" color="purple-700" />,
		maxValueIcon: <Icon size={32} icon="arrowUpSquare" color="purple-700" />,
	},
	render: (args) => {
		return (
			<div style={{ width: '500px' }}>
				<RangeWithHooks {...args} />
			</div>
		);
	},
};

export const RangeWithScale: Story = {
	args: {
		value: 4,
		min: 0,
		max: 5,
		step: 1,
		hasScale: true,
	},
	render: (args) => {
		return (
			<div style={{ width: '500px' }}>
				<RangeWithHooks {...args} />
			</div>
		);
	},
};

export const RangeWithoutScaleIcons: Story = {
	args: {
		value: 40,
		min: 0,
		max: 100,
		hasScale: false,
		minValueIcon: <Icon size={32} icon="arrowDownSquare" color="purple-700" />,
		maxValueIcon: <Icon size={32} icon="arrowUpSquare" color="purple-700" />,
	},
	render: (args) => {
		return (
			<div style={{ width: '500px' }}>
				<RangeWithHooks {...args} />
			</div>
		);
	},
};

export const RangeWithoutScale: Story = {
	args: {
		value: 40,
		min: 0,
		max: 500,
		hasScale: false,
	},
	render: (args) => {
		return (
			<div style={{ width: '500px' }}>
				<RangeWithHooks {...args} />
			</div>
		);
	},
};

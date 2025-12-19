import { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';

import { Radio } from './Radio';
import { RadioProps } from './types';

const meta = {
	title: 'shared/Radio',
	component: Radio,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const RadioWithHooks = (props: RadioProps) => {
	const [checked, setChecked] = useState<boolean>(!!props.checked);

	useEffect(() => {
		setChecked(!!props.checked);
	}, [props.checked]);

	const handleChange = () => {
		setChecked(!checked);
	};

	return <Radio {...props} checked={checked} onChange={handleChange} />;
};

export const BaseCheckbox: Story = {
	render: (props) => {
		return (
			<div>
				<RadioWithHooks {...props} label="Checked" />
				<br />
				<RadioWithHooks {...props} label="Default" checked={false} />
				<br />
				<RadioWithHooks {...props} label="Disabled" disabled checked={false} />
				<br />
				<RadioWithHooks {...props} label="Checked&Disabled" disabled checked />
			</div>
		);
	},
	name: 'Basic',
	args: {
		checked: true,
	},
};

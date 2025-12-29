import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Switch } from './Switch';
import { SwitchProps } from './types';

const meta = {
	title: 'Components/Toggles/Switch',
	component: Switch,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const SwitchWithHooks = (props: SwitchProps) => {
	const [checked, setChecked] = useState<boolean>(!!props.checked);

	useEffect(() => {
		setChecked(!!props.checked);
	}, [props.checked]);

	const handleChange = () => {
		setChecked(!checked);
	};

	return <Switch {...props} checked={checked} onChange={handleChange} />;
};

export const SwitchToggle: Story = {
	args: {
		checked: false,
	},
	render: (args) => {
		return (
			<>
				<SwitchWithHooks {...args} />
				<br />
				<SwitchWithHooks label="text label" {...args} />
				<br />
				<SwitchWithHooks checked label="checked" onChange={args.onChange} />
				<br />
				<SwitchWithHooks disabled label="disabled" {...args} />
				<br />
				<SwitchWithHooks disabled label="disabled checked" checked onChange={args.onChange} />
			</>
		);
	},
};

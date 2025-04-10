import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { TextAreaProps } from './types';

import { TextArea } from './TextArea';

const meta = {
	title: 'Data Entry/TextArea',
	component: TextArea,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const TextAreaWithHooks = (props: TextAreaProps) => {
	const [value, setValue] = React.useState(props.value);

	React.useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	return <TextArea {...props} value={value} onChange={handleChange} />;
};

export const TextAreaDefault: Story = {
	args: {
		placeholder: 'Default TextArea',
	},
	render: (args) => {
		return <TextAreaWithHooks {...args} />;
	},
};

export const TextAreaDisabled: Story = {
	args: {
		placeholder: 'Disabled TextArea',
		disabled: true,
	},
	render: (args) => {
		return <TextAreaWithHooks {...args} />;
	},
};

export const TextAreaError: Story = {
	args: {
		placeholder: 'Error TextArea',
		state: 'error',
	},
	render: (args) => {
		return <TextAreaWithHooks {...args} />;
	},
};

export const TextAreaValid: Story = {
	args: {
		placeholder: 'Valid TextArea',
		state: 'valid',
	},
	render: (args) => {
		return <TextAreaWithHooks {...args} />;
	},
};

import type { Meta, StoryObj } from '@storybook/react';

import { StatusChip } from './StatusChip';

type StoryArgs = {
	variant: 'green' | 'yellow' | 'red' | 'purple';
	text: string;
};

const meta: Meta<StoryArgs> = {
	title: 'shared/StatusChip',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['green', 'yellow', 'red', 'purple'],
			description: 'Сhip color option',
			table: {
				category: 'Status',
			},
		},
		text: {
			control: 'text',
			description: 'Text in status chip',
			table: {
				category: 'Status properties',
			},
		},
	},
	parameters: {
		controls: {
			exclude: ['status'],
		},
	},
};
export default meta;

type Story = StoryObj<StoryArgs>;

const Template: Story = {
	render: (args) => <StatusChip status={{ variant: args.variant, text: args.text }} />,
};

export const Green = {
	...Template,
	args: { variant: 'green', text: 'Green chip' },
};

export const Yellow = {
	...Template,
	args: { variant: 'yellow', text: 'Yellow chip' },
};

export const Red = {
	...Template,
	args: { variant: 'red', text: 'Red chip' },
};

export const Purple = {
	...Template,
	args: { variant: 'purple', text: 'Purple chip' },
};

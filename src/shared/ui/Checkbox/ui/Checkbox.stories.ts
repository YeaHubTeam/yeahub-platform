import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
	component: Checkbox,
	title: 'shared/Checkbox',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		disabled: { control: 'boolean' },
		checked: { control: 'boolean' },
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Выберите меня',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Отключенный',
		disabled: true,
	},
};

export const Checked: Story = {
	args: {
		label: 'Включенный',
		checked: true,
	},
};

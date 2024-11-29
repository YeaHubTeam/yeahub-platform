import type { Meta, StoryObj } from '@storybook/react';

import { BackButton } from './BackButton';

const meta = {
	component: BackButton,
	title: 'shared/BackButton',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Primary: Story = {
	args: {},
};

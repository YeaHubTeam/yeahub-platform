import { Meta, StoryObj } from '@storybook/react';

import { mockAvatar } from '@/shared/assets';

import { Avatar } from './Avatar';

type StoryArgs = {
	image?: string;
	size?: number;
	borderRadius?: number;
	withBorder?: boolean;
	className?: string;
};

const meta: Meta<StoryArgs> = {
	title: 'shared/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		image: {
			control: 'text',
			description: 'Avatar image url',
		},
		size: {
			description: 'Avatar size (width & height)',
		},
		borderRadius: {
			description: 'Border radius',
		},
		withBorder: {
			description: 'Show border around avatar',
		},
	},
};

export default meta;

type Story = StoryObj<StoryArgs>;

const Template: Story = {
	render: (args) => <Avatar {...args} />,
};

export const Default: Story = {
	...Template,
	args: {
		size: 50,
		borderRadius: 25,
		withBorder: false,
	},
};

export const WithoutImage: Story = {
	...Template,
	args: {
		size: 50,
	},
};

export const WithBorder: Story = {
	...Template,
	args: {
		borderRadius: 25,
		withBorder: true,
	},
};

export const WithImage: Story = {
	...Template,
	args: {
		image: mockAvatar,
		size: 50,
	},
};

export const WithBorderAndImage: Story = {
	...Template,
	args: {
		image: mockAvatar,
		withBorder: true,
	},
};

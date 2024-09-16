import type { Meta, StoryObj } from '@storybook/react';

import { sidebarMenuListMock } from '../../model/data/sidebarTestData';

import { Sidebar } from './Sidebar';

const meta = {
	title: 'widget/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		menuItems: sidebarMenuListMock,
	},
};

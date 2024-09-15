import type { Meta, StoryObj } from '@storybook/react';

import { sidebarMenuListMock } from '../../model/data/sidebarTestData';

import { SidebarMenuItem } from './SidebarMenuItem';

const meta = {
	title: 'widget/Sidebar/SidebarMenuItem',
	component: SidebarMenuItem,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SidebarMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullView: Story = {
	args: {
		menuItem: sidebarMenuListMock[0],
		fullWidth: false,
	},
};

export const ShortView: Story = {
	args: {
		menuItem: sidebarMenuListMock[0],
		fullWidth: true,
	},
};

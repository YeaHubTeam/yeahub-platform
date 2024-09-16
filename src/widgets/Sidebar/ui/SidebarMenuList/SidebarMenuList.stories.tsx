import type { Meta, StoryObj } from '@storybook/react';

import { sidebarMenuListMock } from '../../model/data/sidebarTestData';

import { SidebarMenuList } from './SidebarMenuList';

const meta = {
	title: 'widget/Sidebar/SidebarMenuList',
	component: SidebarMenuList,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SidebarMenuList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullView: Story = {
	args: {
		menuItems: sidebarMenuListMock,
		fullWidth: false,
	},
};

export const ShortView: Story = {
	args: {
		menuItems: sidebarMenuListMock,
		fullWidth: true,
	},
};

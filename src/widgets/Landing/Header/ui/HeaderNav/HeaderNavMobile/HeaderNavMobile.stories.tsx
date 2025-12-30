import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { HeaderNavMobile } from './HeaderNavMobile';
import { HeaderNavMobileSkeleton } from './HeaderNavMobile.skeleton';

const meta = {
	title: 'widgets/Landing/Header/HeaderNav/HeaderNavMobile',
	component: HeaderNavMobile,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Mobile navigation menu with popover',
			},
		},
		viewport: {
			defaultViewport: 'mobile',
		},
	},
} satisfies Meta<typeof HeaderNavMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	decorators: [
		(Story) => (
			<Flex>
				<Story />
			</Flex>
		),
		StoreDecorator({}, {}),
	],
	parameters: {
		docs: {
			description: {
				story: 'Default mobile navigation with popover button',
			},
		},
	},
};

export const Loading: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Loading state showing skeleton placeholder',
			},
		},
	},
	render: () => <HeaderNavMobileSkeleton />,
};

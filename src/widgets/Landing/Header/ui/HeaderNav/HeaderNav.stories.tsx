import { Meta, StoryObj } from '@storybook/react';

import { Flex } from '@/shared/ui/Flex';

import { HeaderNav } from './HeaderNav';
import { HeaderNavDesktop } from './HeaderNavDesktop/HeaderNavDesktop';
import { HeaderNavDesktopSkeleton } from './HeaderNavDesktop/HeaderNavDesktop.skeleton';
import { HeaderNavMobile } from './HeaderNavMobile/HeaderNavMobile';
import { HeaderNavMobileSkeleton } from './HeaderNavMobile/HeaderNavMobile.skeleton';

const meta = {
	title: 'widgets/Landing/Header/HeaderNav/HeaderNav',
	component: HeaderNav,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Adaptive navigation (switches between desktop/mobile)',
			},
		},
	},
} satisfies Meta<typeof HeaderNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
	decorators: [
		(Story) => (
			<Flex>
				<Story />
			</Flex>
		),
	],
	parameters: {
		docs: {
			description: {
				story: 'Default desktop navigation showing all header links horizontally',
			},
		},
	},
	render: () => <HeaderNavDesktop />,
};

export const DesktopLoading: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Loading state showing skeleton placeholder',
			},
		},
	},
	render: () => <HeaderNavDesktopSkeleton />,
};

export const Mobile: Story = {
	decorators: [
		(Story) => (
			<Flex justify="start">
				<Story />
			</Flex>
		),
	],
	parameters: {
		viewport: {
			defaultViewport: 'mobile',
		},
		docs: {
			description: {
				story: 'Mobile version - shows navigation menu in popover when clicked',
			},
		},
	},
	render: () => <HeaderNavMobile />,
};

export const MobileLoading: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Loading state showing skeleton placeholder',
			},
		},
	},
	render: () => <HeaderNavMobileSkeleton />,
};

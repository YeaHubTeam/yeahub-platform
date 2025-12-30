import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { HeaderAuth } from './HeaderAuth';
import { HeaderAuthDesktop } from './HeaderAuthDesktop/HeaderAuthDesktop';
import { HeaderAuthDesktopSkeleton } from './HeaderAuthDesktop/HeaderAuthDesktop.skeketon';
import { HeaderAuthMobile } from './HeaderAuthMobile/HeaderAuthMobile';
import { HeaderAuthMobileSkeleton } from './HeaderAuthMobile/HeaderAuthMobile.skeleton';

const meta = {
	title: 'widgets/Landing/Header/HeaderAuth',
	component: HeaderAuth,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Adaptive auth block (switches between desktop/mobile based on screen size)',
			},
		},
	},
} satisfies Meta<typeof HeaderAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopVersion: Story = {
	decorators: [
		(Story) => (
			<Flex justify="end">
				<Story />
			</Flex>
		),
		StoreDecorator({}, {}),
	],
	parameters: {
		viewport: {
			defaultViewport: 'desktop',
		},
		docs: {
			description: {
				story: 'Desktop version with auth buttons/profile',
			},
		},
	},
	render: () => <HeaderAuthDesktop />,
};

export const DesktopLoading: Story = {
	decorators: [
		(Story) => (
			<Flex justify="end">
				<Story />
			</Flex>
		),
		StoreDecorator({}, {}),
	],
	parameters: {
		docs: {
			description: {
				story: 'Loading state showing skeleton placeholder',
			},
		},
	},
	render: () => <HeaderAuthDesktopSkeleton />,
};

export const MobileVersion: Story = {
	decorators: [
		(Story) => (
			<Flex justify="end">
				<Story />
			</Flex>
		),
		StoreDecorator({}, {}),
	],
	parameters: {
		viewport: {
			defaultViewport: 'mobile',
		},
		docs: {
			description: {
				story: 'Mobile version with burger menu/profile',
			},
		},
	},
	render: () => <HeaderAuthMobile />,
};

export const MobileLoading: Story = {
	decorators: [
		(Story) => (
			<Flex justify="end">
				<Story />
			</Flex>
		),
		StoreDecorator({}, {}),
	],
	parameters: {
		docs: {
			description: {
				story: 'Loading state showing skeleton placeholder',
			},
		},
	},
	render: () => <HeaderAuthMobileSkeleton />,
};

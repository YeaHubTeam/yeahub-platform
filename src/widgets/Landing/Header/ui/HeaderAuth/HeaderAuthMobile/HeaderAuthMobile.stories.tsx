import { Meta, StoryObj } from '@storybook/react';

import avatarImage from '@/shared/assets/icons/authorized_profile_photo.avif';
import { StoreDecorator } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { AuthorizedBlock } from '../../AuthorizedBlock/AuthorizedBlock';

import { HeaderAuthMobile } from './HeaderAuthMobile';
import { HeaderAuthMobileSkeleton } from './HeaderAuthMobile.skeleton';

const meta = {
	title: 'widgets/Landing/Header/HeaderAuth/HeaderAuthMobile',
	component: HeaderAuthMobile,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Mobile authentication block with burger menu for auth actions',
			},
		},
		viewport: {
			defaultViewport: 'mobile',
		},
	},
} satisfies Meta<typeof HeaderAuthMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authenticated: Story = {
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
				story: 'Displays user profile when authenticated on mobile',
			},
		},
	},
	render: () => <AuthorizedBlock username="Анастасия" avatarURL={avatarImage} />,
};

export const NotAuthenticated: Story = {
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
				story: 'Shows burger icon that opens auth menu for non-authenticated users',
			},
		},
	},
};

export const Loading: Story = {
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

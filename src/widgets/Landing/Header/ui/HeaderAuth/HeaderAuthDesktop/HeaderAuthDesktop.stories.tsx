import { Meta, StoryObj } from '@storybook/react';

import avatarImage from '@/shared/assets/icons/authorized_profile_photo.avif';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Flex } from '@/shared/ui/Flex';

import { AuthorizedBlock } from '../../AuthorizedBlock/AuthorizedBlock';

import { HeaderAuthDesktop } from './HeaderAuthDesktop';
import { HeaderAuthDesktopSkeleton } from './HeaderAuthDesktop.skeketon';

const meta = {
	title: 'widgets/Landing/Header/HeaderAuth/HeaderAuthDesktop',
	component: HeaderAuthDesktop,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Desktop authentication block that toggles between auth buttons and user profileInfo',
			},
		},
	},
} satisfies Meta<typeof HeaderAuthDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Authenticated: Story = {
	decorators: [
		(Story) => (
			<Flex justify="end">
				<Story />
			</Flex>
		),
		StoreDecorator({}),
	],
	parameters: {
		docs: {
			description: {
				story: 'Displays user profileInfo block when authenticated',
			},
		},
	},
	render: () => <AuthorizedBlock username={'Анастасия'} avatarURL={avatarImage} />,
};

export const NotAuthenticated: Story = {
	decorators: [
		(Story) => (
			<Flex justify="end">
				<Story />
			</Flex>
		),
		StoreDecorator({}),
	],
	parameters: {
		docs: {
			description: {
				story: 'Shows login/register buttons for non-authenticated users',
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
		StoreDecorator({}),
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

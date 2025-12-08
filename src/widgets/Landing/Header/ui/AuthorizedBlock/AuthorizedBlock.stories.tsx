import { Meta, StoryObj } from '@storybook/react';

import avatarImage from '@/shared/assets/icons/authorized_profile_photo.avif';
import { StoreDecorator } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { AuthorizedBlock } from './AuthorizedBlock';

/**
 * AuthorizedBlock - displays user avatar and name for authenticated users.
 *
 * Props:
 * - username: string - user's display name
 * - avatarURL: string | null - URL for user's avatar image
 *
 * Behavior:
 * - Clicking on the block navigates to platform route
 * - Shows default avatar if avatarURL is null
 */

const meta = {
	title: 'widgets/Landing/Header/AuthorizedBlock',
	component: AuthorizedBlock,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Clickable user profile block that displays username and avatar, and navigates to platform page on click. Handles both custom and default avatar states.',
			},
		},
	},
} satisfies Meta<typeof AuthorizedBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const createMockUser = (avatarURL: string | null, username: string = 'Анастасия') => ({
	username,
	avatarURL,
});

export const Default: Story = {
	args: createMockUser(avatarImage),
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
				story:
					'Default state with mocked user avatar. In real usage, avatarURL comes from API/backend response.',
			},
		},
	},
};

export const NoAvatar: Story = {
	args: createMockUser(null),
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
				story: 'Shows default avatar when no avatar URL provided',
			},
		},
	},
};

import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { HeaderNavDesktop } from './HeaderNavDesktop';
import { HeaderNavDesktopSkeleton } from './HeaderNavDesktop.skeleton';

const meta = {
	title: 'widgets/Landing/Header/HeaderNav/HeaderNavDesktop',
	component: HeaderNavDesktop,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Desktop navigation menu for header with links',
			},
		},
	},
} satisfies Meta<typeof HeaderNavDesktop>;

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
				story: 'Default desktop navigation with all links',
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
	render: () => <HeaderNavDesktopSkeleton />,
};

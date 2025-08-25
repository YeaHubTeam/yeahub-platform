import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Flex } from '@/shared/ui/Flex';

import { FooterLinks } from './FooterLinks';
import { FooterLinksSkeleton } from './FooterLinks.skeleton';

const meta = {
	title: 'widgets/Landing/Footer/FooterLinks',
	component: FooterLinks,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Footer links section with docs, media and social links',
			},
		},
	},
} satisfies Meta<typeof FooterLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
				story: 'Default footer links with all navigation and social links',
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
	render: () => <FooterLinksSkeleton />,
};

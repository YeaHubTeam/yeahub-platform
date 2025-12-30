import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { Footer } from './Footer';
import { FooterSkeleton } from './Footer.skeleton';

const meta = {
	title: 'widgets/Landing/Footer',
	component: Footer,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Complete footer component with main content and meta section',
			},
		},
	},
} satisfies Meta<typeof Footer>;

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
				story: 'Default footer with all sections',
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
	render: () => <FooterSkeleton />,
};

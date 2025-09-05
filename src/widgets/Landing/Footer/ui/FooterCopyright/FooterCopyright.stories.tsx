import { Meta, StoryObj } from '@storybook/react';

import { FooterCopyright } from './FooterCopyright';
import { FooterCopyrightSkeleton } from './FooterCopyright.skeleton';

const meta = {
	title: 'widgets/Landing/Footer/FooterCopyright',
	component: FooterCopyright,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Displays copyright text with current year',
			},
		},
	},
} satisfies Meta<typeof FooterCopyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Default copyright text with dynamic year',
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
	render: () => <FooterCopyrightSkeleton />,
};

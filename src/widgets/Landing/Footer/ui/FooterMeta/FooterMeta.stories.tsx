import { Meta, StoryObj } from '@storybook/react';

import { FooterMeta } from './FooterMeta';
import { FooterMetaSkeleton } from './FooterMeta.skeleton';

const meta = {
	title: 'widgets/Landing/Footer/FooterMeta',
	component: FooterMeta,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Meta section of footer containing copyright and links',
			},
		},
	},
} satisfies Meta<typeof FooterMeta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Default footer meta section layout',
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
	render: () => <FooterMetaSkeleton />,
};

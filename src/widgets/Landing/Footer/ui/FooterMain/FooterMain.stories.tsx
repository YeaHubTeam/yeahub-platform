import { Meta, StoryObj } from '@storybook/react';

import { FooterMain } from './FooterMain';
import { FooterMainSkeleton } from './FooterMain.skeleton';

const meta = {
	title: 'widgets/Landing/Footer/FooterMain',
	component: FooterMain,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'Main footer section with logo, title and description',
			},
		},
	},
} satisfies Meta<typeof FooterMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Default footer main section with all content',
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
	render: () => <FooterMainSkeleton />,
};

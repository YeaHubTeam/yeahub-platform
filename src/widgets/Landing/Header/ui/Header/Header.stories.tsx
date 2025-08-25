import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { Header } from './Header';
import { HeaderSkeleton } from './Header.skeleton';

/**
 * Header component for the landing page containing:
 * - Application logo (with link to homepage)
 * - Navigation menu (HeaderNav)
 * - Authorization block (HeaderAuth)
 *
 * States:
 * - Default - basic state with logo, navigation and auth buttons
 * - Loading - loading state (displays skeleton)
 */

const meta = {
	title: 'widgets/Landing/Header/Header',
	component: Header,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		loki: {
			skip: false,
			waitForTimeout: 1000,
		},
		docs: {
			description: {
				component: 'Header - landing page header with logo, navigation and auth elements',
			},
		},
	},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	decorators: [StoreDecorator({})],
	parameters: {
		docs: {
			description: {
				story: 'Default header state for non-authenticated users',
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
	render: () => <HeaderSkeleton />,
};

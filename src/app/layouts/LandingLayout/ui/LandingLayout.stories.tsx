import { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { LandingLayout } from './LandingLayout';
import { LandingLayoutSkeleton } from './LandingLayout.skeleton';

/**
 * LandingLayout — the main landing page layout with built-in routing support.
 *
 * Included components:
 * - Header — page header
 * - Main — main content area rendering nested routes via Outlet
 * - Footer — page footer
 * - AutoScrollToTop — automatically scrolls to top on navigation
 * - CookiesWarning — cookie consent notification
 *
 * Variants:
 * - Default — standard state with content rendered inside Outlet
 * - Loading — loading state with fallback skeleton and placeholder content
 */

const meta = {
	title: 'app/layouts/LandingLayout',
	component: LandingLayout,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		loki: {
			skip: false,
			waitForTimeout: 1000,
		},
		docs: {
			description: {
				component:
					'LandingLayout — the main layout for landing pages, including Header, Outlet, Footer, AutoScrollToTop and CookiesWarning.',
			},
		},
	},
} satisfies Meta<typeof LandingLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Стандартное состояние:
 */
export const Default: Story = {
	decorators: [StoreDecorator({})],
	parameters: {
		docs: {
			description: {
				story: 'Standard state with content rendered inside Outlet',
			},
		},
	},
};

/**
 * Состояние загрузки:
 */
export const Loading: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Loading state with fallback skeleton and placeholder content',
			},
		},
	},
	render: () => <LandingLayoutSkeleton />,
};

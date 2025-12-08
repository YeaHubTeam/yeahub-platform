import { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

import { StoreDecorator } from '@/shared/config';

import { CookiesWarning } from './CookiesWarning';

/**
 * CookiesWarning - A component that displays a cookie consent banner with an accept button.
 *
 * Features:
 * - Uses React Portal to render in a separate DOM element
 * - Saves consent state in localStorage
 * - Disappears after user consent
 *
 * States:
 * - Default - Shows the cookie consent banner
 */

const meta = {
	title: 'widgets/Landing/CookiesWarningBlock/CookiesWarning',
	component: CookiesWarning,
	tags: ['autodocs'],
	decorators: [
		(Story) => {
			useEffect(() => {
				localStorage.removeItem('YH-cookie-modal');
				return () => localStorage.removeItem('YH-cookie-modal');
			}, []);

			return <Story />;
		},
		StoreDecorator({}, {}),
	],
	parameters: {
		layout: 'fullscreen',
		loki: {
			skip: false,
		},
		docs: {
			description: {
				component: 'Cookie consent banner component that renders via React Portal.',
			},
		},
	},
} satisfies Meta<typeof CookiesWarning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Default state showing the cookie consent banner',
			},
		},
	},
};

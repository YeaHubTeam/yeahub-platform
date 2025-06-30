import { StoryObj, Meta } from '@storybook/react';

import { filters } from '../../model/constants';

import { FiltersBlock } from './FiltersBlock';

/*
 * Filter block for landing page collections for filtering collection cards
 * Uses mock filter list
 * In the future, it will receive filters via props and filter chips will be wrapped in a slider
 */

const meta = {
	title: 'widgets/Landing/CollectionBlock/FiltersBlock',
	component: FiltersBlock,
	tags: ['autodocs'],
	args: {},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Component for displaying collection filters. Currently uses mock data but will be refactored to accept props.',
			},
		},
	},
} satisfies Meta<typeof FiltersBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		filters: { control: filters },
	},
	parameters: {
		docs: {
			description: {
				story: 'Current implementation using mock data from constants',
			},
		},
	},
};

export const WithCustomFilters: Story = {
	args: {
		filters: [
			{ src: '/custom1.svg', alt: 'Custom 1' },
			{ src: '/custom2.svg', alt: 'Custom 2' },
		],
	},
	parameters: {
		docs: {
			description: {
				story:
					'Example of how component will work after refactoring to accept filters prop (not functional yet)',
			},
		},
	},
};

export const WithManyFilters: Story = {
	args: {
		filters: Array(10)
			.fill(0)
			.map((_, i) => ({
				src: `/filter${i + 1}.svg`,
				alt: `Filter ${i + 1}`,
			})),
	},
	parameters: {
		docs: {
			description: {
				story: 'Example of scroll behavior with many filters (not functional yet)',
			},
		},
	},
};

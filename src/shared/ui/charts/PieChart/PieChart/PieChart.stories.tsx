import type { Meta, StoryObj } from '@storybook/react';

import { PieChart } from './PieChart';
import { PieChartSkeleton } from './PieChart.skeleton';

const meta = {
	title: 'shared/charts/PieChart',
	component: PieChart,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		totalAttempt: 10,
		pieData: [
			{ name: 'Segment1', value: 50, itemStyle: { color: '#400799' } },
			{ name: 'Segment2', value: 50, itemStyle: { color: '#E1CEFF' } },
		],
	},
	parameters: {
		docs: {
			description: {
				story: 'Example with multiple segments.',
			},
		},
	},
	render: (args) => <PieChart {...args} />,
};

export const Skeleton: StoryObj<typeof PieChartSkeleton> = {
	args: {
		attemptStatsLength: 2,
	},
	argTypes: {
		attemptStatsLength: {
			description: 'Count of segments in the sidebar.',
			control: { type: 'number' },
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'PieChartSkeleton which is shown during data loading.',
			},
		},
		controls: {
			exclude: ['totalAttempt', 'pieData'],
			expanded: true,
		},
	},
	render: (args) => <PieChartSkeleton {...args} />,
};

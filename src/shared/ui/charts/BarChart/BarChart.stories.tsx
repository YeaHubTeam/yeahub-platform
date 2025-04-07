import { Meta, StoryObj } from '@storybook/react';

import { BarChart } from './BarChart';
import { BarChartSkeleton } from './BarChart.skeleton';

const meta = {
	title: 'shared/charts/BarChart',
	component: BarChart,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'BarChart displays progress as a horizontal fill bar. Supports values from 0 to 100. Includes a skeleton for loading state.',
			},
		},
	},
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		progress: {
			value: 0,
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Initial state of the progress bar. Progress value is 0%.',
			},
		},
	},
};

export const HalfProgress: Story = {
	args: {
		progress: {
			value: 50,
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Progress bar is filled to 50%.',
			},
		},
	},
};

export const FullProgress: Story = {
	args: {
		progress: {
			value: 100,
		},
	},
	parameters: {
		docs: {
			description: {
				story: 'Fully filled progress bar. Progress value is 100%.',
			},
		},
	},
};

export const Skeleton: StoryObj<typeof BarChartSkeleton> = {
	parameters: {
		docs: {
			description: {
				story: 'BarChartSkeleton displays a placeholder while BarChart data is loading.',
			},
		},
	},
	render: () => <BarChartSkeleton />,
};

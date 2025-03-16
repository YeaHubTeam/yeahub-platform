import { Meta, StoryObj } from '@storybook/react';

import { GaugeChart } from './GaugeChart';
import { GaugeChartSkeleton } from './GaugeChart.skeleton';
const meta = {
	title: 'shared/charts/GaugeChart',
	component: GaugeChart,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'GaugeChart displays progress as a circle fill bar. Supports values from 0 to 100. Includes a skeleton for loading state.',
			},
		},
	},
} satisfies Meta<typeof GaugeChart>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {
		total: 10,
		learned: 0,
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
		total: 10,
		learned: 5,
	},
	parameters: {
		docs: {
			description: {
				story: 'Progress chart is filled to 50%.',
			},
		},
	},
};

export const FullProgress: Story = {
	args: {
		total: 10,
		learned: 10,
	},
	parameters: {
		docs: {
			description: {
				story: 'Fully filled progress bar. Progress value is 100%.',
			},
		},
	},
};
export const CustomPercent: Story = {
	args: {
		percent: 75,
	},
	parameters: {
		docs: {
			description: {
				story: 'Custom percent example. Chart is filled to 75%.',
			},
		},
	},
};

export const Skeleton: StoryObj<typeof GaugeChartSkeleton> = {
	parameters: {
		docs: {
			description: {
				story: 'GaugeChartSkeleton displays a placeholder while GaugeChart data is loading.',
			},
		},
	},
	render: () => <GaugeChartSkeleton />,
};

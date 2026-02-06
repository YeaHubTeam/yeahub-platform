import type { Meta, StoryObj } from '@storybook/react';

import { Icon, type IconProps } from './Icon';
import { icons } from './icons';

const meta: Meta<typeof Icon> = {
	title: 'shared/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'select',
			options: Object.keys(icons),
			description: 'Icon name to display',
		},
		size: {
			control: 'select',
			options: [14, 18, 20, 24, 26, 28, 32, 34, 36, 40],
			description: 'Icon size in pixels',
		},
		color: {
			control: 'select',
			options: [
				'purple-950',
				'purple-900',
				'purple-800',
				'purple-700',
				'purple-600',
				'purple-500',
				'purple-400',
				'purple-300',
				'purple-200',
				'purple-100',
				'purple-50',
				'red-900',
				'red-800',
				'red-700',
				'red-600',
				'red-500',
				'red-400',
				'red-300',
				'red-200',
				'red-100',
				'red-25',
				'yellow-900',
				'yellow-800',
				'yellow-700',
				'yellow-600',
				'yellow-500',
				'yellow-400',
				'yellow-300',
				'yellow-200',
				'green-900',
				'green-800',
				'green-750',
				'green-700',
				'green-600',
				'green-500',
				'green-400',
				'green-300',
				'green-200',
				'green-100',
				'green-007',
				'black-1000',
				'black-900',
				'black-850',
				'black-800',
				'black-700',
				'black-600',
				'black-500',
				'black-400',
				'black-300',
				'black-200',
				'black-150',
				'black-100',
				'black-50',
				'black-30',
				'black-25',
				'white-900',
			],
			description: 'Icon color from palette',
		},
	},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
	args: {
		size: 24,
		color: 'black-900',
	},
	render: (args) => {
		const sortedIconNames = Object.keys(icons).sort();

		return (
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
				{sortedIconNames.map((iconName) => (
					<div
						key={iconName}
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<Icon icon={iconName as IconProps['icon']} size={args.size} color={args.color} />
						<span style={{ fontSize: '12px' }}>{iconName}</span>
					</div>
				))}
			</div>
		);
	},
};

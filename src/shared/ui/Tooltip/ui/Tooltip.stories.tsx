/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { Tooltip } from './Tooltip';

const meta = {
	title: 'Components/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Offer concise feedback to inform people about the outcomes of actions or provide brief information about interface components when their cursor interacts with them. Prioritize the specific control, use action-oriented language, and keep the messages brief. Tooltips visually stand out by using contrasting colors with the theme interface.',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			name: '🔗 title',
		},
		children: {
			control: {
				disable: 'true',
			},
		},
		ariaLabel: {
			control: {
				disable: true,
			},
		},
		className: {
			control: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 50,
				}}
			>
				<Tooltip {...args} />
			</div>
		);
	},
	name: 'Basic',
	args: {
		title: (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 5,
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<span>Тестирование</span> <Icon icon="arrowRight" />
				</div>
				<span style={{ color: 'green' }}>Пройдено</span>
			</div>
		),
		children: <Button variant="tertiary">Hover me</Button>,
	},
};

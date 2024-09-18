import type { Meta, StoryObj } from '@storybook/react';

import { Flex } from './Flex';

const meta = {
	title: 'shared/Flex',
	component: Flex,
	parameters: {
		style: { height: '100%' },
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = (
	<>
		<div style={{ background: 'red', padding: '8px' }}>Блок 1</div>
		<div style={{ background: 'green', padding: '10px' }}>Блок 2</div>
		<div style={{ background: 'blue', padding: '12px' }}>Блок 3</div>
	</>
);

export const Primary: Story = {
	args: {
		children,
	},
};

export const DirectionRow: Story = {
	args: {
		direction: 'row',
		children,
	},
};

export const DirectionColumn: Story = {
	args: {
		direction: 'column',
		children,
	},
};

export const JustifyContentAround: Story = {
	args: {
		justify: 'around',
		children,
	},
};

export const JustifyContentEnd: Story = {
	args: {
		justify: 'end',
		children,
	},
};

export const JustifyContentStart: Story = {
	args: {
		justify: 'start',
		children,
	},
};

export const JustifyContentCenter: Story = {
	args: {
		justify: 'center',
		children,
	},
};

export const JustifyContentBetween: Story = {
	args: {
		justify: 'between',
		children,
	},
};

export const AlignItemsEnd: Story = {
	args: {
		align: 'end',
		children,
	},
};

export const AlignItemsCenter: Story = {
	args: {
		align: 'center',
		children,
	},
};

export const AlignItemsStart: Story = {
	args: {
		align: 'start',
		children,
	},
};

export const Gap4: Story = {
	args: {
		gap: '4',
		children,
	},
};

export const Gap8: Story = {
	args: {
		gap: '8',
		children,
	},
};

export const Gap12: Story = {
	args: {
		gap: '12',
		children,
	},
};

export const Gap16: Story = {
	args: {
		gap: '16',
		children,
	},
};

export const Gap24: Story = {
	args: {
		gap: '24',
		children,
	},
};

export const Gap32: Story = {
	args: {
		gap: '32',
		children,
	},
};

export const Gap40: Story = {
	args: {
		gap: '40',
		children,
	},
};

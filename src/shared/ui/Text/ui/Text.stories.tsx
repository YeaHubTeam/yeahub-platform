import type { Meta, StoryObj } from '@storybook/react';
import { Text, textMaxRows, type TextProps, variantToTagMapping } from './Text';

const meta: Meta<typeof Text> = {
	title: 'shared/Text',
	component: Text,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Variant: Story = {
	render: () => (
		<div>
			{Object.keys(variantToTagMapping).map((variant) => (
				<Text key={variant} variant={variant as TextProps['variant']}>
					{variant}
				</Text>
			))}
		</div>
	),
};

export const MaxRows: Story = {
	render: () => (
		<div style={{ display: 'grid', gap: '16px' }}>
			{textMaxRows.map((rows) => (
				<Text key={rows} variant="body1" maxRows={rows}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non diam nec neque
					efficitur ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
					diam nec neque efficitur ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing
					elit. Donec non diam nec neque efficitur ultrices. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Donec non diam nec neque efficitur ultrices. Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Donec non diam nec neque efficitur ultrices. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Donec non diam nec neque efficitur
					consectetur adipiscing elit. Donec non diam nec neque efficitur ultrices.
				</Text>
			))}
		</div>
	),
};

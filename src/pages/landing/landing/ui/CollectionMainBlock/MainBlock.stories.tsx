import { StoryObj, Meta } from '@storybook/react';

import { MainBlock } from './MainBlock';

/*
 * MainBlock groups collections cards
 */

const meta = {
	title: 'widgets/Landing/CollectionBlock/MainBlock',
	component: MainBlock,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
	argTypes: {},
} satisfies Meta<typeof MainBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

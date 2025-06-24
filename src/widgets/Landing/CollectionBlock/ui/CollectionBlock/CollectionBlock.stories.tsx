import { StoryObj, Meta } from '@storybook/react';

import { CollectionBlock } from './CollectionBlock';

/**
 * Collections block for Landing, which groups collection cards, additional info and filters
 */

const meta = {
	title: 'widgets/Landing/CollectionBlock',
	component: CollectionBlock,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof CollectionBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

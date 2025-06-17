import { StoryObj, Meta } from '@storybook/react';

import { AdditionalBlock } from './AdditionalBlock';

/**
 * Additional block for Landing, which groups info cards
 */

const meta = {
	title: 'widgets/Landing/CollectionBlock/AdditionalBlock',
	component: AdditionalBlock,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof AdditionalBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

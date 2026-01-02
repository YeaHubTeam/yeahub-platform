import type { Meta, StoryObj } from '@storybook/react';

import { filters } from '../../model/constants/collection';

import { FilterChip } from './FilterChip';

/*
 * The chip acts as the image and text of the props, used to group them and act as a button filter.
 */

const meta: Meta<typeof FilterChip> = {
	title: 'widgets/Landing/CollectionBlock/FilterChip',
	component: FilterChip,
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {
	args: {
		...filters.sber,
	},
};

export const WithLongText: Story = {
	args: {
		src: filters.sber.src,
		alt: 'Lorem ipsum dolor sit amet',
	},
};

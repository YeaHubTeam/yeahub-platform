import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from './Accordion';

const meta = {
	title: 'shared/Accordion',
	component: Accordion,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithChildren: Story = {
	args: {
		title: 'Как выглядит базовая структура HTML страницы?',
		children: <div>Базовая структура состоит из DOCTYPE, html, head, body</div>,
	},
};

import type { Meta, StoryObj } from '@storybook/react';

import { FormField } from './FormField';

const meta = {
	component: FormField,
	title: 'shared/FormField',
	tags: ['autodocs'],
	argTypes: {
		label: { description: 'Заголовок поля' },
		description: { description: 'Дополнительное описание под заголовком' },
		direction: {
			description: 'Расположение заголовка относительно контента',
			options: ['row', 'column'],
			control: { type: 'radio' },
		},
		isLimitWidth: { description: 'Ограничение максимальной ширины поля' },
		children: { description: 'Контент поля (инпут, селект и т.д.)' },
	},

	args: {
		children: <input style={{ width: '100%' }} placeholder="Введите данные..." />,
	},
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
	args: {
		label: 'Заголовок поля',
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Поле с подсказкой',
		description: 'Это вспомогательный текст, который поясняет, что нужно вводить',
	},
};

export const ColumnDirection: Story = {
	args: {
		label: 'Вертикальная верстка',
		direction: 'column',
		description: 'В этом режиме заголовок находится над инпутом',
	},
};

export const LimitWidth: Story = {
	args: {
		label: 'С ограничением ширины',
		isLimitWidth: true,
	},
};

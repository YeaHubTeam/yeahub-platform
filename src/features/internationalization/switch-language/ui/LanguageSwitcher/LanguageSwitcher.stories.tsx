import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { LanguageSwitcher } from './LanguageSwitcher';

const meta = {
	title: 'feature/changingLanguage/LanguageSwitcher',
	component: LanguageSwitcher,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

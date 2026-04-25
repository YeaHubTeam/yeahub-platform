import { Meta, StoryObj } from '@storybook/react';

import { SimpleStub } from './SimpleStub';

const meta: Meta<typeof SimpleStub> = {
	title: 'shared/SimpleStub',
	component: SimpleStub,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['no-access', 'empty', 'no-authorized'],
			description: 'Option that defines which icon is displayed',
		},
		text: {
			control: 'text',
			description: 'Text in simple stub',
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
	render: (args) => <SimpleStub {...args} />,
};

export const NoAuthorized: Story = {
	...Template,
	args: {
		variant: 'no-authorized',
		text: 'Доступ только для зарегистрированных пользователей',
	},
};

export const Empty: Story = {
	...Template,
	args: {
		variant: 'empty',
		text: 'Контент скоро появится',
	},
};

export const NoAccess: Story = {
	...Template,
	args: {
		variant: 'no-access',
		text: 'Доступ появится у участников сообщества',
	},
};

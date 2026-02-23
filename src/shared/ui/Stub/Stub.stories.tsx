import type { Meta, StoryObj } from '@storybook/react';

import { Stub } from './Stub';

const meta = {
	title: 'shared/Stub',
	component: Stub,
	tags: ['autodocs'],
	argTypes: {
		type: {
			description: 'Defines appearance of the stub',
			table: {
				type: {
					summary: 'StubType',
				},
			},
			control: false,
		},
		title: {
			description: 'Defines stub title over default',
			control: false,
		},
		subtitle: {
			description: 'Defines stub subtitle over default',
			control: false,
		},
		buttonText: {
			description: 'Defines default action button text',
			control: false,
		},
		onClick: {
			description: 'Callback for action button',
			action: 'click',
			control: false,
		},
	},
} satisfies Meta<typeof Stub>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: { type: 'empty' },
};

export const FilterEmpty: Story = {
	args: { type: 'filter-empty' },
};

export const Error: Story = {
	args: { type: 'error' },
};

export const AccessDenied: Story = {
	args: { type: 'access-denied' },
};

export const AccessDeniedVerify: Story = {
	args: { type: 'access-denied-verify' },
};

export const AccessDeniedSubscription: Story = {
	args: { type: 'access-denied-subscription' },
};

export const ErrorDisabledAction: Story = {
	args: { type: 'error', onClick: undefined },
};

export const EmptyWithAction: Story = {
	args: { type: 'empty', buttonText: 'Try again' },
};

export const EmptyWithoutText: Story = {
	args: { type: 'empty', title: '', subtitle: '' },
};

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tabs } from './Tabs';

const TabsWrapper: React.FC = () => {
	const [tabToggle, setTabToggle] = useState(0);

	const tabs = [
		{
			id: 0,
			title: 'tab1',
			label: 'Tab_1',
			Component: () => <div>Content_1</div>,
		},
		{
			id: 1,
			title: 'tab2',
			label: 'Tab_2',
			Component: () => <div>Content_2</div>,
		},
	];

	return (
		<div>
			<Tabs tabs={tabs} tabToggle={tabToggle} setTabToggle={setTabToggle} />
			<div>{tabs[tabToggle]?.Component()}</div>
		</div>
	);
};

const meta: Meta<typeof Tabs> = {
	title: 'shared/Tabs',
	component: TabsWrapper,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		tabs: {
			description: 'An array of objects representing the tabs.',
			control: { type: 'object' },
			table: {
				type: { summary: 'EditTab[]' },
			},
		},
		tabToggle: {
			description: 'The index of the currently active tab.',
			control: { type: 'number' },
			table: {
				type: { summary: 'number' },
				defaultValue: { summary: 0 },
			},
		},
		setTabToggle: {
			description: 'A function to update the currently active tab index.',
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

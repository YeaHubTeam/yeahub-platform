import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Tab, Tabs } from './Tabs';

type StoryTab = 'tab1' | 'tab2';

const tabs: Tab<StoryTab>[] = [
	{
		id: 'tab1',
		label: 'Tab_1',
		Component: () => <div>Content_1</div>,
	},
	{
		id: 'tab2',
		label: 'Tab_2',
		Component: () => <div>Content_2</div>,
	},
];

const TabsWrapper = () => {
	const [tabToggle, setTabToggle] = useState<Tab<StoryTab>>(tabs[0]);

	return (
		<div>
			<Tabs tabs={tabs} activeTab={tabToggle} setActiveTab={setTabToggle} />
			<div>{tabToggle.Component()}</div>
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
				type: { summary: 'Tab[]' },
			},
		},
		activeTab: {
			description: 'The item of the currently active tab.',
			control: { type: 'object' },
			table: {
				type: { summary: 'Tab' },
				defaultValue: { summary: tabs[0] },
			},
		},
		setActiveTab: {
			description: 'A function to update the currently active tab.',
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import { StoryFn, Meta } from '@storybook/react';
import React, { useState, useEffect } from 'react';

import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import {
	PopoverProps,
	PopoverMenuItem,
	PopoverHeaderConfig,
	PopoverFooterConfig,
} from '../../model/types/types';

import { Popover } from './Popover';

export default {
	title: 'shared/Popover',
	component: Popover,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Help people conveniently access functionality or info. Popover is a modular element that appears above other content when triggered. Should ideally not obstruct the element that triggered them or essential content. Including a Close button is recommended for clarity, but a Popover often closes by clicking outside or selecting an item within. Should not be obscured by other elements, except for alerts. Avoid making a Popover too big.',
			},
		},
	},
	argTypes: {
		body: {
			control: 'text',
			description: 'Content of the popover body',
		},
		header: {
			control: 'object',
			description: 'Header configuration or React node',
		},
		footer: {
			control: 'object',
			description: 'Footer configuration or React node',
		},
		menuItems: {
			control: 'object',
			description: 'Array of menu items',
		},
		placement: {
			control: 'select',
			options: [
				'auto',
				'auto-start',
				'auto-end',
				'top',
				'top-start',
				'top-end',
				'bottom',
				'bottom-start',
				'bottom-end',
				'right',
				'right-start',
				'right-end',
				'left',
				'left-start',
				'left-end',
			],
			description: 'Placement of the popover',
		},
		onClickOutside: {
			action: 'onClickOutside',
			description: 'Callback for click outside the popover',
		},
		isMobile: {
			control: 'boolean',
			description: 'Simulate mobile view',
		},
		isTablet: {
			control: 'boolean',
			description: 'Simulate tablet view',
		},
		isOpen: {
			control: 'boolean',
			description: 'Control the open state of the Popover',
		},
	},
} as Meta;

const Template: StoryFn<PopoverProps> = (args) => {
	const [open, setOpen] = useState(args.isOpen || false);

	useEffect(() => {
		setOpen(args.isOpen || false);
	}, [args.isOpen]);

	const toggleOpen = () => {
		setOpen(!open);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Popover {...args} isOpen={open} onClickOutside={() => setOpen(false)}>
				<Button onClick={toggleOpen} variant="primary">
					Toggle Popover
				</Button>
			</Popover>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	body: 'Some content inside the popover',
	isOpen: false,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
	header: {
		titleText: 'Popover Title',
		dismissible: true,
		onDismiss: () => alert('Dismissed!'),
	} as PopoverHeaderConfig,
	body: 'Some content inside the popover with header',
	isOpen: false,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
	body: 'Some content inside the popover with footer',
	footer: {
		primaryAction: {
			text: 'Confirm',
			onClick: () => alert('Confirmed!'),
		},
		secondaryAction: {
			text: 'Cancel',
			onClick: () => alert('Canceled!'),
		},
		footerContent: 'Additional information',
	} as PopoverFooterConfig,
	isOpen: false,
};

export const WithMenuItems = Template.bind({});
WithMenuItems.args = {
	menuItems: [
		{
			title: 'Profile',
			onClick: () => alert('Go to profile!'),
			icon: <Icon icon="student" />,
		},
		{
			title: 'Settings',
			onClick: () => alert('Go to settings!'),
			icon: <Icon icon="settings" />,
		},
		{
			renderComponent: () => <Button onClick={() => alert('Logout!')}>Logout</Button>,
		},
	] as PopoverMenuItem[],
	isOpen: false,
};

export const WithCustomPlacement = Template.bind({});
WithCustomPlacement.args = {
	body: 'Popover with custom placement',
	placement: 'bottom-end',
	isOpen: false,
};

export const MobileView = Template.bind({});
MobileView.args = {
	body: 'Popover in mobile view',
	isMobile: true,
	isOpen: false,
};

export const TabletView = Template.bind({});
TabletView.args = {
	body: 'Popover in tablet view',
	isTablet: true,
	isOpen: false,
};

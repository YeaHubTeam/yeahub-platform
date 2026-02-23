import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Stepper } from './Stepper';
import type { Step } from './types';

type StoryStep = 'step1' | 'step2' | 'step3' | 'step4' | 'step5';

const steps: Step<StoryStep>[] = [
	{
		id: 'step1',
		label: 'Step_1',
		image: 'student',
		Component: () => <div>Content_1</div>,
	},
	{
		id: 'step2',
		label: 'Step_2',
		image: 'student',
		Component: () => <div>Content_2</div>,
	},
	{
		id: 'step3',
		label: 'Step_3',
		image: 'student',
		Component: () => <div>Content_3</div>,
	},
	{
		id: 'step4',
		label: 'Step_4',
		image: 'student',
		Component: () => <div>Content_4</div>,
	},
	{
		id: 'step5',
		label: 'Step_5',
		image: 'student',
		Component: () => <div>Content_5</div>,
	},
];

const StepperWrapper = () => {
	const [stepToggle, setStepToggle] = useState<Step<StoryStep>>(steps[0]);

	return (
		<div
			style={{
				display: 'flex',
				gap: '40px',
				padding: '30px',
				backgroundColor: '#6A0BFF',
			}}
		>
			<Stepper steps={steps} activeStep={stepToggle} setActiveStep={setStepToggle} />
			<div style={{ width: '100px', paddingTop: '20px' }}>
				<stepToggle.Component />
			</div>
		</div>
	);
};

const MobileStepperWrapper = () => {
	const [stepToggle, setStepToggle] = useState<Step<StoryStep>>(steps[0]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '40px',
				padding: '30px',
			}}
		>
			<Stepper isMobile steps={steps} activeStep={stepToggle} setActiveStep={setStepToggle} />
			<stepToggle.Component />
		</div>
	);
};

const meta: Meta<typeof Stepper> = {
	title: 'shared/Stepper',
	component: StepperWrapper,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		steps: {
			description: 'An array of objects representing the steps.',
			control: { type: 'object' },
			table: {
				type: { summary: 'Step[]' },
			},
		},
		activeStep: {
			description: 'The item of the currently active step.',
			control: { type: 'object' },
			table: {
				type: { summary: 'Step' },
				defaultValue: { summary: steps[0] },
			},
		},
		setActiveStep: {
			description: 'A function to update the currently active step.',
			control: false,
		},
		isMobile: {
			description: 'Defines the mobile display mode of the component.',
			control: false,
			table: {
				type: { summary: 'boolean' },
				defaultValue: { summary: false },
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <StepperWrapper />,
};
export const MobileStepper: Story = {
	render: () => <MobileStepperWrapper />,
};

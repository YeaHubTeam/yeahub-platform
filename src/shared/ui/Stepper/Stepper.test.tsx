import { screen, fireEvent, render } from '@testing-library/react';

import type { IconProps } from '@/shared/ui/Icon';

import { stepperTestIds } from './constants';
import { Stepper, StepperProps } from './Stepper';
import type { Step } from './types';

type TestStep = 'step-1' | 'step-2' | 'step-3';

const mockSteps: Step<TestStep>[] = [
	{ id: 'step-1', label: 'Step 1', image: 'student', Component: () => <div>Step 1 Content</div> },
	{ id: 'step-2', label: 'Step 2', image: 'student', Component: () => <div>Step 2 Content</div> },
	{ id: 'step-3', label: 'Step 3', image: 'student', Component: () => <div>Step 3 Content</div> },
];

const defaultProps: StepperProps<TestStep> = {
	steps: mockSteps,
	activeStep: mockSteps[0],
	setActiveStep: jest.fn(),
};

jest.mock('@/shared/ui/Icon', () => ({
	Icon: (props: IconProps) => (
		<div
			data-testid="mock-icon"
			data-icon-name={props.icon}
			data-icon-color={props.color}
			data-icon-size={props.size}
		/>
	),
}));

describe('Stepper Component', () => {
	describe('Step labels', () => {
		test('renders correct label names', () => {
			render(<Stepper {...defaultProps} />);

			const step1 = screen.getByTestId(stepperTestIds.item('step-1'));
			const step2 = screen.getByTestId(stepperTestIds.item('step-2'));
			const step3 = screen.getByTestId(stepperTestIds.item('step-3'));

			expect(step1).toHaveTextContent('Step 1');
			expect(step2).toHaveTextContent('Step 2');
			expect(step3).toHaveTextContent('Step 3');
		});

		test('visually distinguishes active and inactive steps', () => {
			render(<Stepper {...defaultProps} />);

			const activeStepLabel = screen.getByText('Step 1');
			const inactiveStepLabel = screen.getByText('Step 2');

			expect(activeStepLabel).toHaveClass('text-white-900');
			expect(inactiveStepLabel).toHaveClass('text-black-200');
		});
	});

	describe('Step icons', () => {
		test('applies correct icon classes', () => {
			render(<Stepper {...defaultProps} activeStep={mockSteps[1]} />);

			const completedStepIcon = screen.getByTestId(stepperTestIds.icon('step-1'));
			const activeStepIcon = screen.getByTestId(stepperTestIds.icon('step-2'));
			const inactiveStepIcon = screen.getByTestId(stepperTestIds.icon('step-3'));

			expect(completedStepIcon).toHaveClass('icon-completed');
			expect(activeStepIcon).toHaveClass('icon-active');
			expect(inactiveStepIcon).toHaveClass('icon-inactive');
		});

		test('applies correct icon styles based on step status', () => {
			render(<Stepper {...defaultProps} activeStep={mockSteps[1]} />);

			const icons = screen.getAllByTestId('mock-icon');

			expect(icons[0]).toHaveAttribute('data-icon-color', 'purple-700');
			expect(icons[0]).toHaveAttribute('data-icon-name', 'check');
			expect(icons[1]).toHaveAttribute('data-icon-color', 'white-900');
			expect(icons[2]).toHaveAttribute('data-icon-color', 'white-900');
		});

		test('renders correct icon size', () => {
			render(<Stepper {...defaultProps} />);

			const icons = screen.getAllByTestId('mock-icon');

			icons.forEach((icon) => expect(icon).toHaveAttribute('data-icon-size', '26'));
		});
	});

	describe('Step items', () => {
		test('applies correct item classes', () => {
			render(<Stepper {...defaultProps} activeStep={mockSteps[1]} />);

			const completedStepItem = screen.getByTestId(stepperTestIds.item('step-1'));
			const activeStepItem = screen.getByTestId(stepperTestIds.item('step-2'));
			const inactiveStepItem = screen.getByTestId(stepperTestIds.item('step-3'));

			expect(activeStepItem).toHaveClass('active');
			expect(inactiveStepItem).not.toHaveClass('active');
			expect(completedStepItem).not.toHaveClass('active');
		});
	});

	describe('Step separators', () => {
		test('renders correct amount of separators', () => {
			render(<Stepper {...defaultProps} />);

			const separators = screen.getAllByTestId(stepperTestIds.separator);

			expect(separators).toHaveLength(2);
		});

		test('does not render separators when Stepper has one step', () => {
			render(<Stepper {...defaultProps} steps={[mockSteps[0]]} />);

			const separators = screen.queryAllByTestId(stepperTestIds.separator);

			expect(separators).toHaveLength(0);
		});
	});

	describe('Step activation logic', () => {
		test('activates next step when clicked', () => {
			render(<Stepper {...defaultProps} />);

			const step2Item = screen.getByTestId(stepperTestIds.item('step-2'));

			fireEvent.click(step2Item);
			expect(defaultProps.setActiveStep).toHaveBeenCalledWith(mockSteps[1]);
		});

		test('ignores clicks on more than one step forward', () => {
			render(<Stepper {...defaultProps} />);

			const step3Item = screen.getByTestId(stepperTestIds.item('step-3'));

			fireEvent.click(step3Item);
			expect(defaultProps.setActiveStep).not.toHaveBeenCalled();
		});

		test('handles click on the currently active step', () => {
			render(<Stepper {...defaultProps} />);

			const activeStepItem = screen.getByTestId(stepperTestIds.item('step-1'));

			fireEvent.click(activeStepItem);
			expect(defaultProps.setActiveStep).toHaveBeenCalledWith(mockSteps[0]);
		});

		test('allows activation of any previous step', () => {
			render(<Stepper {...defaultProps} activeStep={mockSteps[2]} />);

			const step1Item = screen.getByTestId(stepperTestIds.item('step-1'));

			fireEvent.click(step1Item);
			expect(defaultProps.setActiveStep).toHaveBeenCalledWith(mockSteps[0]);
		});

		test('allows activation of step when Stepper has one step', () => {
			render(<Stepper {...defaultProps} steps={[mockSteps[0]]} />);

			const step1Item = screen.getByTestId(stepperTestIds.item('step-1'));

			fireEvent.click(step1Item);
			expect(defaultProps.setActiveStep).toHaveBeenCalledWith(mockSteps[0]);
		});
	});

	describe('Mobile layout', () => {
		beforeEach(() => render(<Stepper {...defaultProps} isMobile={true} />));

		test('applies correct separator classes', () => {
			const separators = screen.getAllByTestId(stepperTestIds.separator);

			separators.forEach((separator) => {
				expect(separator).toHaveClass('mobile');
			});
		});

		test('hides labels', () => {
			expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
			expect(screen.queryByText('Step 2')).not.toBeInTheDocument();
			expect(screen.queryByText('Step 3')).not.toBeInTheDocument();
		});

		test('applies correct icon classes', () => {
			const step1Icon = screen.getByTestId(stepperTestIds.icon('step-1'));
			const step2Icon = screen.getByTestId(stepperTestIds.icon('step-2'));
			const step3Icon = screen.getByTestId(stepperTestIds.icon('step-3'));

			expect(step1Icon).toHaveClass('mobile');
			expect(step2Icon).toHaveClass('mobile');
			expect(step3Icon).toHaveClass('mobile');
		});

		test('renders correct icon size ', () => {
			const icons = screen.getAllByTestId('mock-icon');

			icons.forEach((icon) => expect(icon).toHaveAttribute('data-icon-size', '18'));
		});

		test('applies correct step item classes', () => {
			const step1Item = screen.getByTestId(stepperTestIds.item('step-1'));
			const step2Item = screen.getByTestId(stepperTestIds.item('step-2'));
			const step3Item = screen.getByTestId(stepperTestIds.item('step-3'));

			const stepItems = [step1Item, step2Item, step3Item];

			stepItems.forEach((stepItem) => {
				expect(stepItem).not.toHaveClass('step-item-desktop');
				expect(stepItem).toHaveClass('step-item-mobile');
			});
		});
	});
});

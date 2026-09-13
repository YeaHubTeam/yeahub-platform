import { render, screen } from '@testing-library/react';

import { progressBarTestIds } from './constants';
import { ProgressBar } from './ProgressBar';
import { ProgressBarSkeleton } from './ProgressBar.skeleton';

describe('ProgressBar label', () => {
	test('renders label when label prop is passed', () => {
		render(<ProgressBar currentCount={1} totalCount={1} label="Label" />);

		const label = screen.getByTestId(progressBarTestIds.label);

		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent('Label');
	});

	test('does not render label when label prop is not passed', () => {
		render(<ProgressBar currentCount={1} totalCount={1} />);

		expect(screen.queryByTestId(progressBarTestIds.label)).toBeNull();
	});
});

describe('ProgressBar progress', () => {
	test('renders progress element with correct value and max', () => {
		render(<ProgressBar currentCount={1} totalCount={10} />);

		const progress = screen.getByTestId(progressBarTestIds.progress);

		expect(progress).toBeInTheDocument();
		expect(progress).toHaveAttribute('value', '1');
		expect(progress).toHaveAttribute('max', '10');
	});

	test('does not apply color class when color prop is not passed', () => {
		render(<ProgressBar currentCount={1} totalCount={10} />);

		const progress = screen.getByTestId(progressBarTestIds.progress);

		expect(progress).toHaveClass('progress-bar-small');
		expect(progress.className).not.toMatch(/progress-bar-(green|yellow|red)/);
	});

	test('applies green color class when color prop is "green"', () => {
		render(<ProgressBar currentCount={1} totalCount={10} color="green" />);

		const progress = screen.getByTestId(progressBarTestIds.progress);

		expect(progress).toBeInTheDocument();
		expect(progress).toHaveClass('progress-bar-green');
	});
});

describe('ProgressBar variant', () => {
	test('renders small variant when variant prop is not passed', () => {
		render(<ProgressBar currentCount={1} totalCount={10} label="Label" />);

		const progress = screen.getByTestId(progressBarTestIds.progress);
		const label = screen.getByTestId(progressBarTestIds.label);

		expect(progress).toBeInTheDocument();
		expect(label).toBeInTheDocument();

		expect(progress).toHaveClass('progress-bar-small');
		expect(label).toHaveClass('label-small');
	});

	test('applies medium variant classes when variant prop is "medium"', () => {
		render(<ProgressBar currentCount={1} totalCount={10} label="Label" variant="medium" />);

		const progress = screen.getByTestId(progressBarTestIds.progress);

		expect(progress).toBeInTheDocument();

		expect(progress).toHaveClass('progress-bar-medium');
	});

	test('applies large variant classes when variant prop is "large"', () => {
		render(<ProgressBar currentCount={1} totalCount={10} label="Label" variant="large" />);

		const progress = screen.getByTestId(progressBarTestIds.progress);
		const label = screen.getByTestId(progressBarTestIds.label);

		expect(progress).toBeInTheDocument();
		expect(label).toBeInTheDocument();

		expect(progress).toHaveClass('progress-bar-large');
		expect(label).toHaveClass('label-large');
	});
});

describe('ProgressBar', () => {
	test('applies custom classname to wrapper', () => {
		render(<ProgressBar currentCount={1} totalCount={10} className="custom-class" />);

		const wrapper = screen.getByTestId(progressBarTestIds.wrapper);

		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('custom-class');
	});
});

describe('ProgressBarSkeleton', () => {
	test('renders progress bar skeleton', () => {
		render(<ProgressBarSkeleton currentCount={1} totalCount={10} />);

		const skeleton = screen.getByTestId(progressBarTestIds.skeleton);

		expect(skeleton).toBeInTheDocument();
	});

	test('renders text skeleton when label prop is passed', () => {
		render(<ProgressBarSkeleton currentCount={1} totalCount={10} label="Label" />);

		const textSkeleton = screen.getByTestId(progressBarTestIds.textSkeleton);

		expect(textSkeleton).toBeInTheDocument();
	});

	test('does not render text skeleton when label prop is not passed', () => {
		render(<ProgressBarSkeleton currentCount={1} totalCount={10} />);

		expect(screen.queryByTestId(progressBarTestIds.textSkeleton)).toBeNull();
	});
});

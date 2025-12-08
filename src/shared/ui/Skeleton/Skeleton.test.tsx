import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
	const testProps = {
		dataTestId: 'data-test-id',
		width: 50,
		height: '50%',
		borderRadius: '8px',
		style: { marginBottom: '20px' },
		className: 'wrapper-skeleton',
	};

	beforeEach(() => {
		renderComponent(<Skeleton {...testProps} />);
	});

	test('should render with correct props', () => {
		const skeletonElement = screen.getByTestId(testProps.dataTestId);
		expect(skeletonElement).toBeInTheDocument();
	});
	test('applies custom width, height and and borderRadius via styles', () => {
		const skeletonElement = screen.getByTestId(testProps.dataTestId);
		expect(skeletonElement).toHaveStyle({ width: '50px', height: '50%', borderRadius: '8px' });
	});
	test('applies custom style', () => {
		const skeletonElement = screen.getByTestId(testProps.dataTestId);
		expect(skeletonElement).toHaveStyle({ marginBottom: '20px' });
	});
	test('applies custom className', () => {
		const skeletonElement = screen.getByTestId(testProps.dataTestId);
		expect(skeletonElement).toHaveClass('wrapper-skeleton');
	});
	test('has base skeleton class', () => {
		const skeletonElement = screen.getByTestId(testProps.dataTestId);
		expect(skeletonElement).toHaveClass('skeleton');
	});
});

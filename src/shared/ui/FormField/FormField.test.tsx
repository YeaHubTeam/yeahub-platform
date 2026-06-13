import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { FlexProps } from '../Flex';

import { formFieldTestIds } from './constants';
import { FormField, FormFieldProps } from './FormField';
import { FormFieldSkeleton } from './FormField.skeleton';

const render = (props: FormFieldProps, dataTestId: keyof typeof formFieldTestIds) => {
	renderComponent(<FormField {...props} />);
	const component = screen.getByTestId(formFieldTestIds[dataTestId]);
	return component;
};

const renderSkeleton = (props?: Partial<FormFieldProps>) => {
	renderComponent(<FormFieldSkeleton {...props} />);
	const skeleton = screen.getByTestId(formFieldTestIds.formFieldSkeletonChildren);
	return skeleton;
};

jest.mock('@/shared/ui/Flex', () => ({
	Flex: ({ gap, dataTestId, className, children }: FlexProps) => (
		<div data-testid={dataTestId} data-gap={gap} className={className}>
			{children}
		</div>
	),
}));

describe('FormField', () => {
	test('constants are defined', () => {
		expect(formFieldTestIds).toBeDefined();
		expect(formFieldTestIds.formFieldChildren).toBeDefined();
		expect(formFieldTestIds.formFieldDescription).toBeDefined();
		expect(formFieldTestIds.formFieldLabel).toBeDefined();
	});

	test('label', () => {
		const label = 'Название коллекции';
		const labelText = render({ label, children: null }, 'formFieldLabel');
		expect(labelText.textContent).toBe(label);
	});

	test('description', () => {
		const label = 'Название коллекции';
		const description = 'Добавьте название коллекции';
		const descriptionText = render({ label, description, children: null }, 'formFieldDescription');
		expect(descriptionText.textContent).toBe(description);
	});

	test('gap column', () => {
		const label = 'Название коллекции';
		const description = 'Добавьте название коллекции';
		const component = render(
			{ label, description, children: null, direction: 'column' },
			'formFieldChildren',
		);
		expect(component).toHaveAttribute('data-gap', '20');
	});

	test('gap row', () => {
		const label = 'Название коллекции';
		const description = 'Добавьте название коллекции';
		const component = render({ label, description, children: null }, 'formFieldChildren');
		expect(component).toHaveAttribute('data-gap', '120');
	});

	test('limit width', () => {
		const label = 'Название коллекции';
		const component = render({ label, children: null, isLimitWidth: true }, 'formFieldChildren');
		expect(component.className).toContain('limit-width');
	});
});

describe('FormFieldSkeleton', () => {
	test('render', () => {
		const skeleton = renderSkeleton();
		expect(skeleton).toBeInTheDocument();
	});

	test('gap row', () => {
		const skeleton = renderSkeleton();
		expect(skeleton).toHaveAttribute('data-gap', '120');
	});

	test('gap column', () => {
		const skeleton = renderSkeleton({ direction: 'column' });
		expect(skeleton).toHaveAttribute('data-gap', '20');
	});

	test('limit width', () => {
		const skeleton = renderSkeleton({ isLimitWidth: true });
		expect(skeleton.className).toContain('limit-width');
	});
});

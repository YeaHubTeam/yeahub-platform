import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/libs';

import { formFieldTestIds } from './constants';
import { FormField, FormFieldProps } from './FormField';
import { FormFieldSkeleton } from './FormField.skeleton';

const label = 'Название коллекции';
const description = 'Добавьте название коллекции';

const render = ({ label, ...props }: FormFieldProps, dataTestId: keyof typeof formFieldTestIds) => {
	renderComponent(<FormField label={label} {...props} />);
	const component = screen.getByTestId(formFieldTestIds[dataTestId]);
	return component;
};

const renderSkeleton = (props?: Partial<FormFieldProps>) => {
	renderComponent(<FormFieldSkeleton {...props} />);
	const skeleton = screen.getByTestId(formFieldTestIds.formFieldSkeletonChildren);
	return skeleton;
};

describe('FormField', () => {
	test('constants are defined', () => {
		expect(formFieldTestIds).toBeDefined();
		expect(formFieldTestIds.formFieldChildren).toBeDefined();
		expect(formFieldTestIds.formFieldDescription).toBeDefined();
		expect(formFieldTestIds.formFieldLabel).toBeDefined();
	});

	test('wrapper', () => {
		const component = render(
			{ label, children: <div data-testid="children">Дочерний компонент</div> },
			'formFieldChildren',
		);
		expect(component).toBeInTheDocument();
		expect(component).toHaveClass('form-field');
	});

	test('label', () => {
		const labelText = render({ label, children: null }, 'formFieldLabel');
		expect(labelText.textContent).toBe(label);
		expect(labelText).toHaveClass('body4');
		expect(labelText).toHaveClass('text-black-800');
	});

	test('description', () => {
		const descriptionText = render({ label, description, children: null }, 'formFieldDescription');
		expect(descriptionText.textContent).toBe(description);
		expect(descriptionText).toHaveClass('body2');
		expect(descriptionText).toHaveClass('text-black-800');
	});

	test('gap column', () => {
		const component = render(
			{ label, description, children: null, direction: 'column' },
			'formFieldChildren',
		);
		expect(component).toHaveClass('gap20');
	});

	test('gap row', () => {
		const component = render({ label, description, children: null }, 'formFieldChildren');
		expect(component).toHaveClass('gap120');
	});

	test('limit width', () => {
		const component = render({ label, children: null, isLimitWidth: true }, 'formFieldChildren');
		expect(component.className).toContain('limit-width');
	});

	test('children', () => {
		render(
			{ label, children: <div data-testid="children">Дочерний компонент</div> },
			'formFieldChildren',
		);
		expect(screen.getByTestId('children')).toBeInTheDocument();
	});
});

describe('FormFieldSkeleton', () => {
	test('render', () => {
		const skeleton = renderSkeleton();
		expect(skeleton).toBeInTheDocument();
	});
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { renderComponent } from '@/shared/libs';

import { CreateOrEditSpecializationFormValues } from '../../model/types/specialization';

import { SpecializationForm } from './SpecializationForm';

const defaultValues: CreateOrEditSpecializationFormValues = {
	id: 1,
	title: '',
	description: '',
};

interface RenderFormOptions {
	defaultValues?: CreateOrEditSpecializationFormValues;
	onSubmit?: jest.Mock;
	withErrors?: boolean;
}

interface TestFormProviderProps {
	children: ReactNode;
	defaultValues: CreateOrEditSpecializationFormValues;
	onSubmit?: jest.Mock;
	withErrors?: boolean;
}

const TestFormProvider = ({
	children,
	defaultValues,
	onSubmit = jest.fn(),
	withErrors = false,
}: TestFormProviderProps) => {
	const methods = useForm<CreateOrEditSpecializationFormValues>({
		defaultValues,
	});

	useEffect(() => {
		if (withErrors) {
			methods.setError('title', { message: 'Title is required' });
			methods.setError('description', { message: 'Description is required' });
		}
	}, [methods, withErrors]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				{children}
				<button type="submit">submit</button>
			</form>
		</FormProvider>
	);
};

const renderSpecializationForm = ({
	defaultValues: values = defaultValues,
	onSubmit,
	withErrors,
}: RenderFormOptions = {}) => {
	return renderComponent(
		<TestFormProvider defaultValues={values} onSubmit={onSubmit} withErrors={withErrors}>
			<SpecializationForm />
		</TestFormProvider>,
	);
};

describe('SpecializationForm', () => {
	test('renders create form title and fields', () => {
		renderSpecializationForm();

		expect(screen.getByText('create.page.title')).toBeInTheDocument();

		expect(screen.getByText('title.full')).toBeInTheDocument();
		expect(screen.getByText('title.label')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('title.full')).toBeInTheDocument();

		expect(screen.getByText('description.full')).toBeInTheDocument();
		expect(screen.getByText('description.label')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('description.placeholder')).toBeInTheDocument();
	});

	test('fills fields from form defaultValues', () => {
		renderSpecializationForm({
			defaultValues: {
				id: 1,
				title: 'Frontend Developer',
				description: 'Frontend specialization description',
			},
		});

		expect(screen.getByPlaceholderText('title.full')).toHaveValue('Frontend Developer');
		expect(screen.getByPlaceholderText('description.placeholder')).toHaveValue(
			'Frontend specialization description',
		);
	});

	test('submits typed values', async () => {
		const user = userEvent.setup();
		const onSubmit = jest.fn();

		renderSpecializationForm({ onSubmit });

		await user.type(screen.getByPlaceholderText('title.full'), 'Backend Developer');
		await user.type(
			screen.getByPlaceholderText('description.placeholder'),
			'Backend specialization description',
		);

		await user.click(screen.getByRole('button', { name: 'submit' }));

		expect(onSubmit).toHaveBeenCalledWith(
			{
				id: 1,
				title: 'Backend Developer',
				description: 'Backend specialization description',
			},
			expect.anything(),
		);
	});

	test('shows form control errors', () => {
		renderSpecializationForm({ withErrors: true });

		expect(screen.getByText('Title is required')).toBeInTheDocument();
		expect(screen.getByText('Description is required')).toBeInTheDocument();

		expect(screen.getByPlaceholderText('title.full')).toHaveAttribute('aria-invalid');
		expect(screen.getByPlaceholderText('description.placeholder')).toBeInTheDocument();
	});
});

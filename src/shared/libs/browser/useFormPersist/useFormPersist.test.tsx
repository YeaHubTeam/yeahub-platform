import { act, fireEvent, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { renderComponent } from '@/shared/libs';

import { LS_ADMIN_FORMS_KEY } from '../constants';

import { useFormPersist } from './useFormPersist';

interface TestFormValues {
	title: string;
	description: string;
}

const defaultValues: TestFormValues = {
	title: '',
	description: 'Default description',
};

const TestForm = () => {
	const {
		formState: { isDirty },
		register,
		reset,
		watch,
	} = useForm<TestFormValues>({ defaultValues });
	const { clearFormDraft } = useFormPersist<TestFormValues>({
		watch,
		reset,
		defaultValues,
	});

	return (
		<>
			<input aria-label="title" {...register('title')} />
			<input aria-label="description" {...register('description')} />
			<span data-testid="is-dirty">{String(isDirty)}</span>
			<button type="button" onClick={() => reset()}>
				Reset
			</button>
			<button type="button" onClick={clearFormDraft}>
				Clear draft
			</button>
		</>
	);
};

const renderPersistComponent = (pathname = '/admin/specializations/create') => {
	return renderComponent(<TestForm />, { route: pathname });
};

const getTitleInput = () => screen.getByRole('textbox', { name: 'title' });
const getDescriptionInput = () => screen.getByRole('textbox', { name: 'description' });

describe('useFormPersist', () => {
	beforeEach(() => {
		jest.useFakeTimers();
		localStorage.clear();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
		localStorage.clear();
	});

	it('restores the entity draft, keeps missing default values and preserves initial defaults', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({ specializations: { title: 'Frontend' } }),
		);

		renderPersistComponent();

		expect(getTitleInput()).toHaveValue('Frontend');
		expect(getDescriptionInput()).toHaveValue('Default description');
		expect(screen.getByTestId('is-dirty')).toHaveTextContent('true');

		fireEvent.click(screen.getByRole('button', { name: 'Reset' }));

		expect(getTitleInput()).toHaveValue('');
		expect(getDescriptionInput()).toHaveValue('Default description');
		expect(screen.getByTestId('is-dirty')).toHaveTextContent('false');
	});

	it('keeps an empty stored draft when the page is opened', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({ specializations: {}, skills: { title: 'React' } }),
		);

		renderPersistComponent();

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			specializations: {},
			skills: { title: 'React' },
		});
	});

	it('saves changed values after debounce and preserves other entity drafts', () => {
		localStorage.setItem(LS_ADMIN_FORMS_KEY, JSON.stringify({ skills: { title: 'React' } }));

		renderPersistComponent();

		fireEvent.change(getTitleInput(), { target: { value: 'Backend' } });

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
		});

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
			specializations: {
				title: 'Backend',
				description: 'Default description',
			},
		});
	});

	it('saves the current draft when all form fields are cleared', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({
				specializations: { title: 'Backend', description: 'Description' },
				skills: { title: 'React' },
			}),
		);

		renderPersistComponent();

		fireEvent.change(getTitleInput(), { target: { value: '' } });
		fireEvent.change(getDescriptionInput(), { target: { value: '' } });

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
			specializations: { title: '', description: '' },
		});
	});

	it('saves the current draft when values return to defaults', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({ specializations: { title: 'Backend' } }),
		);

		renderPersistComponent();

		fireEvent.change(getTitleInput(), { target: { value: '' } });
		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			specializations: {
				title: '',
				description: 'Default description',
			},
		});
	});

	it.each([
		'/admin/questions/create-multiple',
		'/admin/specializations/1/edit',
		'/specializations/create',
	])('does not persist values on %s', (pathname) => {
		renderPersistComponent(pathname);

		fireEvent.change(getTitleInput(), { target: { value: 'Ignored' } });
		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(localStorage.getItem(LS_ADMIN_FORMS_KEY)).toBeNull();
	});

	it('clears only the current draft and blocks an already scheduled save', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({
				specializations: { title: 'Old value' },
				skills: { title: 'React' },
			}),
		);

		renderPersistComponent();

		fireEvent.change(getTitleInput(), { target: { value: 'New value' } });
		fireEvent.click(screen.getByRole('button', { name: 'Clear draft' }));

		act(() => {
			jest.advanceTimersByTime(500);
		});

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
		});
	});

	it('uses default values when localStorage contains invalid JSON', () => {
		localStorage.setItem(LS_ADMIN_FORMS_KEY, '{invalid json');

		renderPersistComponent();

		expect(getTitleInput()).toHaveValue(defaultValues.title);
		expect(getDescriptionInput()).toHaveValue(defaultValues.description);
	});
});

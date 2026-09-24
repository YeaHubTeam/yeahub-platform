import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';

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

const createWrapper = (pathname: string) => {
	const RouterWrapper = ({ children }: PropsWithChildren) => (
		<MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
	);

	return RouterWrapper;
};

const renderPersistHook = (pathname = '/admin/specializations/create') => {
	return renderHook(
		() => {
			const methods = useForm<TestFormValues>({ defaultValues });
			const persist = useFormPersist<TestFormValues>({
				watch: methods.watch,
				reset: methods.reset,
				defaultValues,
			});

			return { methods, ...persist };
		},
		{ wrapper: createWrapper(pathname) },
	);
};

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

	it('restores the entity draft and keeps missing default values', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({ specializations: { title: 'Frontend' } }),
		);

		const { result } = renderPersistHook();

		expect(result.current.methods.getValues()).toEqual({
			title: 'Frontend',
			description: 'Default description',
		});
	});

	it('removes an empty stored draft when the page is opened', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({ specializations: {}, skills: { title: 'React' } }),
		);

		renderPersistHook();

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
		});
	});

	it('saves changed values after debounce and preserves other entity drafts', () => {
		localStorage.setItem(LS_ADMIN_FORMS_KEY, JSON.stringify({ skills: { title: 'React' } }));

		const { result } = renderPersistHook();

		act(() => {
			result.current.methods.setValue('title', 'Backend');
		});

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

	it('removes the current draft when all form fields are cleared', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({
				specializations: { title: 'Backend', description: 'Description' },
				skills: { title: 'React' },
			}),
		);

		const { result } = renderPersistHook();

		act(() => {
			result.current.methods.setValue('title', '');
			result.current.methods.setValue('description', '');
			jest.advanceTimersByTime(500);
		});

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
		});
	});

	it('removes the current draft when values return to defaults', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({ specializations: { title: 'Backend' } }),
		);

		const { result } = renderPersistHook();

		act(() => {
			result.current.methods.setValue('title', '');
			jest.advanceTimersByTime(500);
		});

		expect(localStorage.getItem(LS_ADMIN_FORMS_KEY)).toBeNull();
	});

	it.each(['/admin/questions/create-multiple', '/admin/questions/1/edit', '/resources/create'])(
		'does not persist values on %s',
		(pathname) => {
			const { result } = renderPersistHook(pathname);

			act(() => {
				result.current.methods.setValue('title', 'Ignored');
				jest.advanceTimersByTime(500);
			});

			expect(localStorage.getItem(LS_ADMIN_FORMS_KEY)).toBeNull();
		},
	);

	it('clears only the current draft and blocks an already scheduled save', () => {
		localStorage.setItem(
			LS_ADMIN_FORMS_KEY,
			JSON.stringify({
				specializations: { title: 'Old value' },
				skills: { title: 'React' },
			}),
		);

		const { result } = renderPersistHook();

		act(() => {
			result.current.methods.setValue('title', 'New value');
			result.current.clearFormDraft();
			jest.advanceTimersByTime(500);
		});

		expect(JSON.parse(localStorage.getItem(LS_ADMIN_FORMS_KEY) ?? '{}')).toEqual({
			skills: { title: 'React' },
		});
	});

	it('uses default values when localStorage contains invalid JSON', () => {
		localStorage.setItem(LS_ADMIN_FORMS_KEY, '{invalid json');

		const { result } = renderPersistHook();

		expect(result.current.methods.getValues()).toEqual(defaultValues);
	});
});

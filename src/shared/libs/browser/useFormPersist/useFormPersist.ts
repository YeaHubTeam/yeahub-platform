import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { DefaultValues, FieldValues, UseFormReset, UseFormWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useDebounce } from '../../fp';
import { LS_ADMIN_FORMS_KEY } from '../constants';

const FORM_PERSIST_DELAY = 500;

type StoredForm = Record<string, unknown>;
type StoredForms = Record<string, StoredForm>;

interface UseFormPersistParams<T extends FieldValues> {
	watch: UseFormWatch<T>;
	reset: UseFormReset<T>;
	defaultValues: NoInfer<DefaultValues<T>>;
}

const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isEmptyFormValue = (value: unknown): boolean => {
	if (value === undefined || value === null || value === '') {
		return true;
	}

	if (Array.isArray(value)) {
		return value.length === 0 || value.every(isEmptyFormValue);
	}

	if (isObject(value)) {
		return Object.values(value).every(isEmptyFormValue);
	}

	return false;
};

const areFormValuesEqual = (left: unknown, right: unknown): boolean => {
	if (Object.is(left, right)) {
		return true;
	}

	if (Array.isArray(left) || Array.isArray(right)) {
		return (
			Array.isArray(left) &&
			Array.isArray(right) &&
			left.length === right.length &&
			left.every((item, index) => areFormValuesEqual(item, right[index]))
		);
	}

	if (isObject(left) && isObject(right)) {
		const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

		return [...keys].every((key) => areFormValuesEqual(left[key], right[key]));
	}

	return false;
};

const readStoredForms = (): StoredForms => {
	try {
		const storedValue = localStorage.getItem(LS_ADMIN_FORMS_KEY);

		if (!storedValue) {
			return {};
		}

		const parsedValue: unknown = JSON.parse(storedValue);

		if (!isObject(parsedValue)) {
			return {};
		}

		return parsedValue as StoredForms;
	} catch {
		return {};
	}
};

const writeStoredForms = (forms: StoredForms): boolean => {
	try {
		localStorage.setItem(LS_ADMIN_FORMS_KEY, JSON.stringify(forms));

		return true;
	} catch {
		return false;
	}
};

const removeStoredForms = (): boolean => {
	try {
		localStorage.removeItem(LS_ADMIN_FORMS_KEY);

		return true;
	} catch {
		return false;
	}
};

const removeStoredForm = (forms: StoredForms, entity: string) => {
	delete forms[entity];

	if (Object.keys(forms).length === 0) {
		removeStoredForms();
		return;
	}

	writeStoredForms(forms);
};

const getEntityFromPathname = (pathname: string): string | null => {
	const segments = pathname.split('/').filter(Boolean);

	const isAdminCreatePage =
		segments.length === 3 && segments[0] === 'admin' && segments[2] === 'create';

	return isAdminCreatePage ? segments[1] : null;
};

export const useFormPersist = <T extends FieldValues>({
	watch,
	reset,
	defaultValues,
}: UseFormPersistParams<T>) => {
	const { pathname } = useLocation();

	const skipPersistRef = useRef(false);

	const entity = useMemo(() => {
		return getEntityFromPathname(pathname);
	}, [pathname]);

	useEffect(() => {
		skipPersistRef.current = false;

		if (!entity) {
			return;
		}

		const storedForms = readStoredForms();
		const storedForm = storedForms[entity];

		if (!isObject(storedForm)) {
			return;
		}

		const restoredValues = {
			...defaultValues,
			...storedForm,
		} as unknown as T;

		if (isEmptyFormValue(storedForm) || areFormValuesEqual(restoredValues, defaultValues)) {
			removeStoredForm(storedForms, entity);
			return;
		}

		reset(restoredValues);
	}, [defaultValues, entity, reset]);

	const persistForm = useCallback(
		(values: unknown) => {
			if (!entity || skipPersistRef.current || !isObject(values)) {
				return;
			}

			const storedForms = readStoredForms();

			if (isEmptyFormValue(values) || areFormValuesEqual(values, defaultValues)) {
				removeStoredForm(storedForms, entity);
				return;
			}

			writeStoredForms({
				...storedForms,
				[entity]: values,
			});
		},
		[defaultValues, entity],
	);

	const debouncedPersistForm = useDebounce(persistForm, FORM_PERSIST_DELAY);

	useEffect(() => {
		if (!entity) {
			return;
		}

		const subscription = watch((values) => {
			debouncedPersistForm(values);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [debouncedPersistForm, entity, watch]);

	const clearFormDraft = useCallback(() => {
		if (!entity) {
			return;
		}

		skipPersistRef.current = true;

		const storedForms = readStoredForms();

		removeStoredForm(storedForms, entity);
	}, [entity]);

	return {
		clearFormDraft,
	};
};

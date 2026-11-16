import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { DefaultValues, FieldValues, UseFormReset, UseFormWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useDebounce } from '../../fp';
import { LS_ADMIN_FORMS_KEY } from '../constants';
import { getJSONFromLS, removeFromLS, setToLS } from '../manageLocalStorage';

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

const removeStoredForm = (forms: StoredForms, entity: string) => {
	delete forms[entity];

	if (Object.keys(forms).length === 0) {
		removeFromLS(LS_ADMIN_FORMS_KEY);
		return;
	}

	setToLS(LS_ADMIN_FORMS_KEY, forms);
};

const getEntityFromPathname = (pathname: string): string | null => {
	const [project, entity, action] = pathname.split('/').filter(Boolean);

	const isAdminCreatePage = project === 'admin' && action === 'create';

	return isAdminCreatePage ? entity : null;
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

		const storedForms: StoredForms = getJSONFromLS(LS_ADMIN_FORMS_KEY) ?? {};
		const storedForm = storedForms[entity];

		if (!isObject(storedForm)) {
			return;
		}

		const restoredValues = {
			...defaultValues,
			...storedForm,
		} as unknown as T;

		reset(restoredValues, { keepDefaultValues: true });
	}, [defaultValues, entity, reset]);

	const persistForm = useCallback(
		(values: unknown) => {
			if (!entity || skipPersistRef.current || !isObject(values)) {
				return;
			}

			const storedForms: StoredForms = getJSONFromLS(LS_ADMIN_FORMS_KEY) ?? {};

			setToLS(LS_ADMIN_FORMS_KEY, {
				...storedForms,
				[entity]: values,
			});
		},
		[entity],
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

		const storedForms: StoredForms = getJSONFromLS(LS_ADMIN_FORMS_KEY) ?? {};

		removeStoredForm(storedForms, entity);
	}, [entity]);

	return {
		clearFormDraft,
	};
};

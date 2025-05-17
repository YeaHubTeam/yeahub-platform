import { useMemo } from 'react';
import { useWatch, Control, FieldValues } from 'react-hook-form';

const isValueNonEmpty = (value: unknown): boolean => {
	if (value == null || value === '') return false;
	if (typeof value === 'object') return Object.keys(value).length > 0;
	return true;
};

export function useIsFormNonEmpty<T extends FieldValues>(control: Control<T>, names?: (keyof T)[]) {
	const watchesParams = names ? { control, name: names } : { control };
	const values = useWatch<T>(watchesParams);

	return useMemo(() => {
		const entries = Object.values(values ?? {});
		return entries.some(isValueNonEmpty);
	}, [values]);
}

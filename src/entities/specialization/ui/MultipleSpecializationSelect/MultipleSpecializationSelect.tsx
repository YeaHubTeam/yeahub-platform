import { useMemo } from 'react';
import { Select } from 'yeahub-ui-kit';

import { useGetSpecializationsListQuery } from '../../api/specializationApi';

interface SpecializationSelectProps {
	value: number[];
	onChange: (value: string[]) => void;
}

export const MultipleSpecializationSelect = ({ onChange, value }: SpecializationSelectProps) => {
	const { data: specializationsList } = useGetSpecializationsListQuery({ limit: 100 });

	const onChangeHandler = (value?: string) => {
		onChange([String(value)]);
	};

	const options = useMemo(() => {
		return (specializationsList?.data || []).map((specialization) => ({
			label: specialization.title,
			value: specialization.id.toString(),
		}));
	}, [specializationsList]);

	return (
		<Select
			onChange={onChangeHandler}
			options={options}
			type="default"
			placeholder={'No available options'}
			value={String(value)}
		/>
	);
};

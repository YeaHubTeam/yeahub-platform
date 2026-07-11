import { useTranslation } from 'react-i18next';

import { i18Namespace, Companies } from '@/shared/config';
import { EntitySelect, type EntitySelectProps } from '@/shared/ui/EntitySelect';

import { useGetCompaniesListQuery } from '../../api/companyApi';

export type CompanySelectProps = Pick<
	EntitySelectProps<string>,
	'value' | 'onChange' | 'hasMultiple' | 'disabled'
>;

export const CompanySelect = ({ onChange, value, hasMultiple, disabled }: CompanySelectProps) => {
	const { t } = useTranslation(i18Namespace.companies);

	const { data: companies } = useGetCompaniesListQuery({
		titleOrLegalNameOrDescriptionSearch: '',
		limit: 20,
	});

	return (
		<EntitySelect
			items={companies?.data || []}
			value={value}
			onChange={onChange}
			hasMultiple={hasMultiple}
			disabled={disabled}
			chooseTranslationKey={t(Companies.SELECT_CHOOSE)}
			emptyTranslationKey={t(Companies.SELECT_EMPTY)}
			selectedTranslationKey={t(Companies.SELECT_SELECTED)}
		/>
	);
};

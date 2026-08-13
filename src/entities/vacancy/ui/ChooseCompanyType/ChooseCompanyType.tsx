import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { VacancyCompanyType } from '@/entities/vacancy';

import { COMPANY_TYPE } from '../../model/constants';

interface ChooseCompanyTypeProps {
	selectedCompanyTypes?: VacancyCompanyType[];
	onChangeCompanyType: (companyType?: VacancyCompanyType[]) => void;
}

export const ChooseCompanyType = ({
	selectedCompanyTypes,
	onChangeCompanyType,
}: ChooseCompanyTypeProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const onCompanyType = (id: number) => {
		const newValue = COMPANY_TYPE.find((companyType) => companyType.id === id)?.value;
		if (newValue) {
			const isDataExist = selectedCompanyTypes?.some((companyType) => newValue === companyType);
			const updates = isDataExist
				? (selectedCompanyTypes || []).filter((item) => newValue !== item)
				: [...(selectedCompanyTypes || []), newValue];
			onChangeCompanyType(updates.length === 0 ? undefined : updates);
		}
	};

	const preparedData = COMPANY_TYPE.map((companyType) => ({
		...companyType,
		active: selectedCompanyTypes?.some(
			(selectedCompanyType) => companyType.title === selectedCompanyType,
		),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Vacancies.COMPANY_TYPE)}
			onClick={onCompanyType}
		/>
	);
};

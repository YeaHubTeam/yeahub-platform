import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { getSpecializationId } from '@/entities/profile';
import { SkillsListField } from '@/entities/skill';
import {
	ChooseCompanyType,
	ChooseEmploymentForm,
	ChooseEnglishLevel,
	ChooseGrade,
	ChooseIndustry,
	ChooseSalary,
	ChooseWorkFormat,
	VacanciesFilterParams,
} from '@/entities/vacancy';

import styles from './VacanciesFilters.module.css';

interface VacanciesFilterProps {
	filters: VacanciesFilterParams;
	onChangeSearch: (search?: VacanciesFilterParams['search']) => void;
	onChangeSkillId: (skillId?: VacanciesFilterParams['skillId']) => void;
	onChangeCompanyType: (companyType?: VacanciesFilterParams['companyType']) => void;
	onChangeIndustry: (industry?: VacanciesFilterParams['industry']) => void;
	onChangeGrade: (grade?: VacanciesFilterParams['grade']) => void;
	onChangeEmploymentForm: (employmentForm?: VacanciesFilterParams['employmentForm']) => void;
	onChangeSalaryBucket: (salaryBucket?: VacanciesFilterParams['salaryBucket']) => void;
	onChangeEnglishLevel: (englishLevel?: VacanciesFilterParams['englishLevel']) => void;
	onChangeWorkFormat: (workFormat?: VacanciesFilterParams['workFormat']) => void;
}

export const VacanciesFilters = ({
	filters,
	onChangeEmploymentForm,
	onChangeSalaryBucket,
	onChangeEnglishLevel,
	onChangeWorkFormat,
	onChangeSearch,
	onChangeSkillId,
	onChangeCompanyType,
	onChangeIndustry,
	onChangeGrade,
}: VacanciesFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);

	const specializationId = useAppSelector(getSpecializationId);

	return (
		<Flex direction="column" gap="24">
			<SearchInput
				className={styles.search}
				placeholder={t(Vacancies.VACANCIES_SEARCH_PLACEHOLDER)}
				onSearch={onChangeSearch}
			/>
			<ChooseWorkFormat
				selectedWorkFormats={filters.workFormat}
				onChangeWorkFormat={onChangeWorkFormat}
			/>
			<SkillsListField
				selectedSkills={filters.skillId}
				onChangeSkills={onChangeSkillId}
				selectedSpecialization={specializationId}
			/>
			<ChooseIndustry selectedIndustries={filters.industry} onChangeIndustry={onChangeIndustry} />
			<ChooseGrade selectedGrades={filters.grade} onChangeGrade={onChangeGrade} />
			<ChooseCompanyType
				selectedCompanyTypes={filters.companyType}
				onChangeCompanyType={onChangeCompanyType}
			/>
			<ChooseEmploymentForm
				selectedEmploymentForms={filters.employmentForm}
				onChangeEmploymentForm={onChangeEmploymentForm}
			/>
			<ChooseSalary selectedSalaries={filters.salaryBucket} onChangeSalary={onChangeSalaryBucket} />
			<ChooseEnglishLevel
				selectedEnglishLevels={filters.englishLevel}
				onChangeEnglishLevel={onChangeEnglishLevel}
			/>
		</Flex>
	);
};

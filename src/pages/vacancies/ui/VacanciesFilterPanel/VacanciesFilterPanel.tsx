import { useTranslation } from 'react-i18next';

import { Vacancies, i18Namespace } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { SkillsListField } from '@/entities/skill';
import { SpecializationsListField } from '@/entities/specialization';
import {
	ChooseCompanyType,
	ChooseEmploymentType,
	ChooseEnglishLevel,
	ChooseGrade,
	ChooseIndustry,
	ChooseSalary,
	ChooseWorkFormat,
} from '@/entities/vacancy';

import { VacanciesFilterProps } from '../../model/types/vacanciesFilter';

import styles from './VacanciesFilterPanel.module.css';

export const VacanciesFilterPanel = ({
	filter,
	selectedSpecialization,
	handlers,
}: VacanciesFilterProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	return (
		<Flex direction="column" gap="24">
			<SearchInput
				className={styles.search}
				placeholder={t(Vacancies.VACANCIES_SEARCH_PLACEHOLDER)}
				onSearch={handlers.onSearch}
			/>
			<ChooseWorkFormat
				selectedFilter={filter.workFormat}
				onChangeFilter={handlers.onChangeWorkFormat}
			/>
			<SpecializationsListField
				selectedSpecialization={selectedSpecialization}
				onChangeSpecialization={handlers.onChangeSpecialization}
			/>
			<SkillsListField
				selectedSkills={filter.skills}
				onChangeSkills={handlers.onChangeSkills}
				selectedSpecialization={selectedSpecialization}
			/>
			<ChooseIndustry selectedFilter={filter.industry} onChangeFilter={handlers.onChangeIndustry} />
			<ChooseGrade selectedFilter={filter.grade} onChangeFilter={handlers.onChangeGrade} />
			<ChooseCompanyType
				selectedFilter={filter.companyType}
				onChangeFilter={handlers.onChangeCompanyType}
			/>
			<ChooseEmploymentType
				selectedFilter={filter.employmentType}
				onChangeFilter={handlers.onChangeEmploymentType}
			/>
			<ChooseSalary
				selectedFilter={filter.salaryBucket}
				onChangeFilter={handlers.onChangeSalaryBucket}
			/>
			<ChooseEnglishLevel
				selectedFilter={filter.englishLevel}
				onChangeFilter={handlers.onChangeEnglishLevel}
			/>
		</Flex>
	);
};

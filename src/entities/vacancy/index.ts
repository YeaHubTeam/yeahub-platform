// export { getVacancies } from './api/vacancyApi/';
// export { getVacancyById } from './api/getVacancyById';

export type {
	GetVacanciesListResponse,
	Vacancy,
	GetVacanciesListParamsRequest,
	VacancyAiProfile,
} from './model/types/vacancy';

export type { VacancyPreparation } from './model/types/vacancy';

export { VacancyActions } from './ui/VacancyActions/VacancyActions';
export { VacancyEnglish } from './ui/VacancyEnglishLevel/VacancyEnglishLevel';
export { VacancyHeader } from './ui/VacancyHeader/VacancyHeader';
export { VacancyKeywords } from './ui/VacancyKeywords/VacancyKeywords';
export { VacancyTags } from './ui/VacancyTags/VacancyTags';
export { VacancyTasks } from './ui/VacancyTasks/VacancyTasks';
export { VacancySkills } from './ui/VacancySkills/VacancySkills';
export { VacancyStats } from './ui/VacancyStats/VacancyStats';
export { VacancySource } from './ui/VacancySource/VacancySource';
export { VacancyPriority } from './ui/VacancyPriority/VacancyPriority';

export { useGetVacancyByIdQuery, useGetVacanciesListQuery } from './api/vacancyApi';

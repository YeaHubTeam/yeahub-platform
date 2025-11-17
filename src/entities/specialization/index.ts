export type {
	Specialization,
	CreateOrEditSpecializationFormValues,
} from './model/types/specialization';
export type { SpecializationsProgress } from './model/types/specializationsProgress';
export {
	useGetSpecializationsListQuery,
	useGetSpecializationByIdQuery,
	useGetSpecializationsGeneralProgressQuery,
} from './api/specializationApi';
export { SpecializationCard } from './ui/SpecializationCard/SpecializationCard';
export { SpecializationForm } from './ui/SpecializationForm/SpecializationForm';
export { SpecializationSelect } from './ui/SpecializationSelect/SpecializationSelect';
export { SpecializationSelectSkeleton } from './ui/SpecializationSelect/SpecializationSelect.skeleton';
export { SpecializationsList } from './ui/SpecializationsList/SpecializationsList';
export { SpecializationsListField } from './ui/SpecializationsListField/SpecializationsListField';
export { SpecializationsListFieldSkeleton } from './ui/SpecializationsListField/SpecializationsListField.skeleton';
export { SpecializationsListSkeleton } from './ui/SpecializationsList/SpecializationsList.skeleton';
export { SpecializationProgressTable } from './ui/SpecializationProgressTable/SpecializationProgressTable';
export { specializationHandlers, specializationsProgressHandlers } from './api/__mocks__';

export { specializationsMock, specializationsProgressMock } from './api/__mocks__/data';

export {
	LS_ACTIVE_SPECIALIZATION_ID,
	DEFAULT_SPECIALIZATION_ID,
} from './model/constants/specializationConstants';

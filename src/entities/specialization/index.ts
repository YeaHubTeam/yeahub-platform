export type {
	Specialization,
	CreateOrEditSpecializationFormValues,
} from './model/types/specialization';
export {
	useGetSpecializationsListQuery,
	useGetSpecializationByIdQuery,
} from './api/specializationApi';
export { SpecializationCard } from './ui/SpecializationCard/SpecializationCard';
export { SpecializationForm } from './ui/SpecializationForm/SpecializationForm';
export { SpecializationSelect } from './ui/SpecializationSelect/SpecializationSelect';
export { SpecializationSelectSkeleton } from './ui/SpecializationSelect/SpecializationSelect.skeleton';
export { SpecializationsList } from './ui/SpecializationsList/SpecializationsList';
export { SpecializationsListField } from './ui/SpecializationsListField/SpecializationsListField';
export { SpecializationsListFieldSkeleton } from './ui/SpecializationsListField/SpecializationsListField.skeleton';

export { specializationHandlers } from './api/__mocks__';

export { specializationsMock } from './api/__mocks__/data';

export {
	LS_ACTIVE_SPECIALIZATION_ID,
	DEFAULT_SPECIALIZATION_ID,
} from './model/constants/specializationConstants';

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
export { getSpecializationDefaultIcon } from './utils/getSpecializationDefaultIcon';
export { SpecializationsList } from './ui/SpecializationsList/SpecializationsList';

export { specializationHandlers } from './api/__mocks__';

export { specializationsMock } from './api/__mocks__/data';

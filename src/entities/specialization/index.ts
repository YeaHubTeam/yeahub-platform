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

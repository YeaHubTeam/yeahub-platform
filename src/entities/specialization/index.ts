export type { Specialization, SpecializationFormValues } from './model/types/specialization';
export {
	useGetSpecializationsListQuery,
	useGetSpecializationByIdQuery,
} from './api/specializationApi';

export { SingleSpecializationSelect } from './ui/SingleSpecializationSelect/SingleSpecializationSelect';
export { MultipleSpecializationSelect } from './ui/MultipleSpecializationSelect/MultipleSpecializationSelect';

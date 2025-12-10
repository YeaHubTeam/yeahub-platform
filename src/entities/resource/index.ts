export * from './model/types/resource';
export * from './api/__mock__/data/resourcesMock';
export * from './ui/ResourceCard/ResourceCard';
export * from './ui/MyResourceCard/MyResourceCard';
export * from './api/resourceApi';

export type { Resource, ResourceCreateError } from './model/types/resource';

export { isResourceDisabled } from './model/helpers/isResourceDisabled';
export { KeywordsListSection } from './ui/KeywordsListSection/KeywordsListSection';
export { ResourceForm } from './ui/ResourceForm/ResourceForm';
export { ResourcesTypesFilterSection } from './ui/ResourcesTypesFilterSection/ResourcesTypesFilterSection';
export { ResourcesTypesFilterSectionSkeleton } from './ui/ResourcesTypesFilterSection/ResourcesTypesFilterSection.skeleton';
export { ResourceCard } from './ui/ResourceCard/ResourceCard';
export { ResourceCardSkeleton } from './ui/ResourceCard/ResourceCard.skeleton';
export { ResourceRequestStatusChip } from './ui/ResourceRequestStatus/ResourceRequestStatus';
export { ResourcesSelect } from './ui/ResourceSelect/ResourceSelect';
export { ResourcesStatusBlock } from './ui/ResourcesStatusBlock/ResourcesStatusBlock';
export { ResourceEditFormHeader } from './ui/ResourceEditFormHeader/ResourceEditFormHeader';
export { ResourceAdditionalInfo } from './ui/ResourceAdditionalInfo/ResourceAdditionalInfo';
export { ResourceAdditionalInfoSkeleton } from './ui/ResourceAdditionalInfo/ResourceAdditionalInfo.skeleton';

export type {
	ResourceRequest,
	ResourceRequestStatus,
	GetResourceRequestsParams,
	GetResourceRequestsResponse,
	SelectedResourceRequestEntity,
	SelectedResourceRequestEntities,
	ResourceRequestFormValues,
	ResourceRequestCreateError,
} from './model/types/resourceRequest';
export {
	useGetResourceRequestsQuery,
	useGetResourceByIdQuery,
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourceRequestByIdQuery,
} from './api/resourceApi';

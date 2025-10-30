export * from './model/types/resource';
export * from './api/__mock__/data/resourcesMock';
export * from './ui/ResourceCard/ResourceCard';
export * from './ui/MyResourceCard/MyResourceCard';
export * from './api/resourceApi';

export type { Resource } from './model/types/resource';

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

export type {
	ResourceRequest,
	ResourceRequestStatus,
	GetResourceRequestsParams,
	GetResourceRequestsResponse,
	SelectedResourceRequestEntity,
	SelectedResourceRequestEntities,
	ResourceRequestFormValues,
} from './model/types/resourceRequest';
export {
	useGetResourceRequestsQuery,
	useGetResourceByIdQuery,
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourceRequestByIdQuery,
} from './api/resourceApi';

export { useResourceRequestsFilters } from './model/hooks/useResourceRequestsFilters';
export { useGetResourcesFilterParams } from './model/hooks/useGetResourcesFilterParams';
export { useResourcesFilters } from './model/hooks/useResourcesFilters';
export { useGetResourceRequestsFilterParams } from './model/hooks/useGetResourceRequestsFilterParams';
export type { ResourcesFilterParams, ResourceRequestsFilterParams } from './model/types/filters';

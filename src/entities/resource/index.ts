export * from './model/types/resource';
export * from './api/__mock__/data/resourcesMock';
export * from './ui/ResourceCard/ResourceCard';
export * from './ui/MyResourceCard/MyResourceCard';
export * from './api/resourceApi';

export type { FilterParams, MyResourcesFilterParams } from './model/types/filters';
export type { Resource } from './model/types/resource';

export { isResourceDisabled } from './model/helpers/isResourceDisabled';
export { KeywordsListSection } from './ui/KeywordsListSection/KeywordsListSection';
export { ResourcesFilterSection } from './ui/ResourcesFilterSection/ResourcesFilterSection';
export { ResourceForm } from './ui/ResourceForm/ResourceForm';
export { ResourcesFilterSectionSkeleton } from './ui/ResourcesFilterSection/ResourcesFilterSection.skeleton';
export { ResourceCard } from './ui/ResourceCard/ResourceCard';
export { ResourceCardSkeleton } from './ui/ResourceCard/ResourceCard.skeleton';
export { ResourceRequestStatusChip } from './ui/ResourceRequestStatus/ResourceRequestStatus';
export { ResourcesSelect } from './ui/ResourceSelect/ResourceSelect';

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

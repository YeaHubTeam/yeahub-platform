import { useAppSelector, calculatePageNavigation } from '@/shared/libs';

import { Collection, useGetCollectionsListQuery } from '@/entities/collection';
import { getSpecializationId } from '@/entities/profile';

import { CollectionNavigation } from '../types/collectionNavigationTypes';

import { useInitCollectionId } from './useInitCollectionId';

export const useCollectionNavigation = ({ collectionId, filter }: CollectionNavigation) => {
	const { page, title } = filter;
	const currentCollectionId = Number(collectionId);
	const currentPage = page ?? 1;

	const specializationId = useAppSelector(getSpecializationId);

	const params = {
		titleOrDescriptionSearch: title,
		specializations: specializationId,
	};

	const { data: currentCollections, isLoading: isLoadingCurrentPage } = useGetCollectionsListQuery({
		...params,
		page: currentPage,
	});

	const currentCollectionsData = currentCollections?.data || [];
	const currentIndex = currentCollectionsData.findIndex((item) => item.id === currentCollectionId);
	const isNotFound = currentIndex === -1;

	const initCollectionId = useInitCollectionId(currentCollectionId, currentCollectionsData);

	const total = currentCollections?.total || 0;
	const limit = currentCollections?.limit || 10;
	const lastPage = Math.ceil(total / limit);

	const skipPrevPage = currentIndex > 0 && !isNotFound;
	const skipNextPage = currentIndex < currentCollectionsData.length - 1 && !isNotFound;

	const prevPageNum = currentPage > 1 ? currentPage - 1 : lastPage;
	const nextPageNum = currentPage < lastPage && !isNotFound ? currentPage + 1 : 1;

	const { data: prevCollections, isFetching: isLoadingPrevPage } = useGetCollectionsListQuery(
		{ ...params, page: prevPageNum },
		{ skip: skipPrevPage || !lastPage },
	);
	const { data: nextCollections, isFetching: isLoadingNextPage } = useGetCollectionsListQuery(
		{ ...params, page: nextPageNum },
		{ skip: skipNextPage || !lastPage },
	);

	const isLoading = isLoadingCurrentPage || isLoadingPrevPage || isLoadingNextPage;

	const { prevId, nextId, nextPage, prevPage } = calculatePageNavigation<Collection>({
		currentItemId: currentCollectionId,
		initItemId: initCollectionId,
		currentPageData: currentCollections,
		prevPageData: prevCollections,
		nextPageData: nextCollections,
		currentPage,
	});

	const isDisabled = isLoading || !prevId || !nextId;

	return { prevId, nextId, prevPage, nextPage, isDisabled };
};

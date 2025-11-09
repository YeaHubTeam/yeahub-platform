import { calculatePageNavigation } from '@/shared/helpers/calculatePageNavigation';

import { Collection, useGetPublicCollectionsListQuery } from '@/entities/collection';

import { CollectionNavigation } from '../types/collectionNavigationTypes';

import { useInitCollectionId } from './useInitCollectionId';

export const usePublicCollectionNavigation = ({ filter, collectionId }: CollectionNavigation) => {
	const { page, title, specialization } = filter;
	const currentCollectionId = Number(collectionId);
	const currentPage = page ?? 1;

	const params = {
		titleOrDescriptionSearch: title,
		specializations: specialization,
	};

	const { data: currentPublicCollections, isLoading: isLoadingCurrentPage } =
		useGetPublicCollectionsListQuery({
			...params,
			page: currentPage,
		});

	const currentCollectionsData = currentPublicCollections?.data || [];
	const currentIndex = currentCollectionsData.findIndex((item) => item.id === currentCollectionId);
	const isNotFound = currentIndex === -1;

	const initCollectionId = useInitCollectionId(currentCollectionId, currentCollectionsData);

	const total = currentPublicCollections?.total || 0;
	const limit = currentPublicCollections?.limit || 10;
	const lastPageNum = Math.ceil(total / limit);

	const skipPrevPage = currentIndex > 0 && !isNotFound;
	const skipNextPage = currentIndex < currentCollectionsData.length - 1 && !isNotFound;

	const prevPageNum = currentPage > 1 ? currentPage - 1 : lastPageNum;
	const nextPageNum = currentPage < lastPageNum && !isNotFound ? currentPage + 1 : 1;

	const { data: prevPublicCollections, isFetching: isLoadingPrevPage } =
		useGetPublicCollectionsListQuery(
			{ ...params, page: prevPageNum },
			{ skip: skipPrevPage || !lastPageNum },
		);
	const { data: nextPublicCollections, isFetching: isLoadingNextPage } =
		useGetPublicCollectionsListQuery(
			{ ...params, page: nextPageNum },
			{ skip: skipNextPage || !lastPageNum },
		);

	const isLoading = isLoadingCurrentPage || isLoadingPrevPage || isLoadingNextPage;

	const { prevId, nextId, nextPage, prevPage } = calculatePageNavigation<Collection>({
		currentItemId: currentCollectionId,
		initItemId: initCollectionId,
		currentPageData: currentPublicCollections,
		prevPageData: prevPublicCollections,
		nextPageData: nextPublicCollections,
		currentPage,
	});

	const isDisabled = isLoading || !prevId || !nextId;

	return { prevId, nextId, prevPage, nextPage, isDisabled };
};

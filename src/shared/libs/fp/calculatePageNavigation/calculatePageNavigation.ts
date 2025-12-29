import { Response } from '@/shared/libs';

type CalculatePageNavigation<T> = {
	currentPageData?: Response<T[]>;
	firstPageData?: Response<T[]>;
	lastPageData?: Response<T[]>;
	prevPageData?: Response<T[]>;
	nextPageData?: Response<T[]>;
	currentItemId?: number | string;
	initItemId?: number | string;
	currentPage: number;
};

type CalculatePageNavigationResult = {
	prevId: number | string;
	nextId: number | string;
	prevPage: number;
	nextPage: number;
};

export const calculatePageNavigation = <T extends { id: number | string }>({
	firstPageData,
	lastPageData,
	prevPageData,
	nextPageData,
	currentPageData,
	currentPage,
	initItemId,
	currentItemId,
}: CalculatePageNavigation<T>): CalculatePageNavigationResult => {
	if (!currentPageData || currentPageData.total <= 1) {
		return { prevId: 0, nextId: 0, prevPage: currentPage, nextPage: currentPage };
	}

	const getFirsItemId = (array?: T[]) => {
		return array && array.length ? array[0].id : 0;
	};
	const getLastItemId = (array?: T[]) => {
		return array && array.length ? array[array.length - 1].id : 0;
	};

	const { data: currentItems, total, limit } = currentPageData;
	const lastPageNum = Math.ceil(total / limit);
	const currentIndex = currentItems.findIndex((item: T) => item.id === currentItemId);

	const handleNotFound = () => {
		return {
			prevId: getLastItemId(lastPageData?.data ?? prevPageData?.data),
			nextId: getFirsItemId(firstPageData?.data ?? nextPageData?.data),
			prevPage: lastPageNum,
			nextPage: 1,
		};
	};

	const handleMiddle = () => {
		return {
			prevId: currentItems[currentIndex - 1].id,
			nextId: currentItems[currentIndex + 1].id,
			prevPage: currentPage,
			nextPage: currentPage,
		};
	};

	const handleFirst = () => {
		const nextId = currentItems[1]?.id ?? getFirsItemId(nextPageData?.data);
		const nextPage = currentItems[1]?.id ? currentPage : 1;

		if (currentPage > 1) {
			return {
				prevId: getLastItemId(prevPageData?.data),
				prevPage: currentPage - 1,
				nextId,
				nextPage,
			};
		}

		if (initItemId) {
			return { prevId: initItemId, prevPage: currentPage, nextId, nextPage };
		}

		if (lastPageNum > 1) {
			return { prevId: getLastItemId(prevPageData?.data), prevPage: lastPageNum, nextId, nextPage };
		}

		return { prevId: getLastItemId(currentItems), prevPage: currentPage, nextId, nextPage };
	};

	const handleLast = () => {
		const prevId = currentItems[currentIndex - 1]?.id ?? 0;
		const prevPage = currentPage;

		if (currentPage < lastPageNum) {
			return {
				prevId,
				prevPage,
				nextId: getFirsItemId(nextPageData?.data),
				nextPage: currentPage + 1,
			};
		}

		if (initItemId) {
			return { nextId: initItemId, nextPage: 1, prevId, prevPage };
		}

		if (lastPageNum > 1) {
			return { prevId, prevPage, nextId: getFirsItemId(nextPageData?.data), nextPage: 1 };
		}

		return { prevId, prevPage, nextId: getFirsItemId(currentItems), nextPage: currentPage };
	};

	if (currentIndex === -1) return handleNotFound();
	if (currentIndex > 0 && currentIndex < currentItems.length - 1) return handleMiddle();
	if (currentIndex === 0) return handleFirst();
	if (currentIndex === currentItems.length - 1) return handleLast();

	return { prevId: 0, nextId: 0, prevPage: currentPage, nextPage: currentPage };
};

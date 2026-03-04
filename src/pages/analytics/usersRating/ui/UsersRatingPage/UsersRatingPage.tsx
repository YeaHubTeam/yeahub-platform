import { useTranslation } from 'react-i18next';

import { trophyIcon } from '@/shared/assets';
import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId, getUserId } from '@/entities/profile';
import { useGetUsersRatingQuery, useGetUsersRatingStatsQuery } from '@/entities/user';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { getRankedUsers } from '@/widgets/analytics/UsersRatingWidget';

import { PLACES_COUNT_ON_PAGE } from '../../model/constants';
import { CurrentUserRating } from '../CurrentUserRating/CurrentUserRating';
import { UsersRatingList } from '../UsersRatingList/UsersRatingList';
import { UsersRatingTable } from '../UsersRatingTable/UsersRatingTable';

export const UsersRatingPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);
	const { filters, onChangePage, onResetFilters, onChangeSpecialization } = useAnalyticFilters({
		specialization: specializationId,
		page: 1,
	});
	const page = filters?.page || 1;

	const currentSpecialization = filters.specialization || specializationId;

	const isFilterActive = page > 1 || String(currentSpecialization) !== String(specializationId);

	const { data: ratingData } = useGetUsersRatingQuery({
		specializationId: currentSpecialization,
		page,
		limit: PLACES_COUNT_ON_PAGE,
	});

	const { data: statsData } = useGetUsersRatingStatsQuery(currentSpecialization);

	const usersOnPage = getRankedUsers({ data: ratingData, limit: PLACES_COUNT_ON_PAGE, page });

	const maxRating = statsData?.allQuestions ?? 0;
	const usersCount = statsData?.allUsers ?? 0;
	const averageProgress = statsData?.averageProgress ?? 0;

	const userId = useAppSelector(getUserId);
	const currentUserRating = ratingData?.data?.find((u) => u.userId === userId);

	const showCurrentUserRating = !usersOnPage?.filter((u) => u.userId === currentUserRating?.userId)
		.length;

	return (
		<AnalyticPageTemplate
			title={
				<Flex direction="row" gap="12" align="center">
					<img src={trophyIcon} alt="" />
					{t(Analytics.USERS_RATING_TITLE_PAGE, {
						specialization: statsData?.specialization?.title,
					})}
				</Flex>
			}
			list={
				<UsersRatingList
					rankedUsers={usersOnPage}
					maxRating={maxRating}
					currentUserRating={currentUserRating}
				/>
			}
			tooltip={
				<>
					{t(Analytics.USERS_RATING_TOOLTIP_USERS_COUNT, { usersCount })} <br />
					{t(Analytics.USERS_RATING_TOOLTIP_PROGRESS, { averageProgress })} <br />
				</>
			}
			table={
				<UsersRatingTable
					rankedUsers={usersOnPage}
					maxRating={maxRating}
					currentUserRating={currentUserRating}
				/>
			}
			filters={{
				page,
				specialization: currentSpecialization,
				limit: PLACES_COUNT_ON_PAGE,
				total: usersCount,
				onChangeSpecialization,
				onChangePage,
				onResetFilters,
				hasFilters: isFilterActive,
			}}
			suffix={
				currentUserRating &&
				showCurrentUserRating && (
					<CurrentUserRating user={currentUserRating} maxRating={maxRating} />
				)
			}
		/>
	);
};

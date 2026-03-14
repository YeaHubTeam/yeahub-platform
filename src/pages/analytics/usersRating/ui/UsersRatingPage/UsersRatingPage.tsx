import { useTranslation } from 'react-i18next';

import { trophyIcon } from '@/shared/assets';
import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId, getProfileId } from '@/entities/profile';
import {
	useGetUserProfilePositionQuery,
	useGetUsersRatingQuery,
	useGetUsersRatingStatsQuery,
} from '@/entities/user';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';

import { PLACES_COUNT_ON_PAGE } from '../../model/constants';
import { CurrentUserRating } from '../CurrentUserRating/CurrentUserRating';
import { UsersRatingList } from '../UsersRatingList/UsersRatingList';
import { UsersRatingTable } from '../UsersRatingTable/UsersRatingTable';

export const UsersRatingPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);

	const profileId = useAppSelector(getProfileId);
	const specializationId = useAppSelector(getSpecializationId);
	const { filters, onChangePage, onResetFilters, onChangeSpecialization } = useAnalyticFilters({
		specialization: specializationId,
		page: 1,
	});
	const page = filters?.page || 1;

	const currentSpecialization = filters.specialization || specializationId;

	const isFilterActive = page > 1 || currentSpecialization !== specializationId;

	const { data: ratingData } = useGetUsersRatingQuery({
		specializationId: currentSpecialization,
		page,
		limit: PLACES_COUNT_ON_PAGE,
	});

	const { data: statsData } = useGetUsersRatingStatsQuery(currentSpecialization);

	const usersOnPage = ratingData?.data ?? [];
	const maxRating = statsData?.allQuestions ?? 0;
	const usersCount = statsData?.allUsers ?? 0;
	const averageProgress = statsData?.averageProgress ?? 0;
	const { data: currentUserRating } = useGetUserProfilePositionQuery(profileId);
	const currentUserRatingMapped = currentUserRating && {
		userId: String(currentUserRating.userId),
		username: currentUserRating.username,
		avatarUrl: currentUserRating.imageSrc,
		ratingScore: currentUserRating.ratingPoints,
		place: currentUserRating.place,
	};

	const hasCurrentUserInPage = usersOnPage.some(
		(u) => u.userId === currentUserRatingMapped?.userId,
	);

	const showCurrentUserRating = !!currentUserRatingMapped && !hasCurrentUserInPage;

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
					currentUserRating={currentUserRatingMapped}
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
					currentUserRating={currentUserRatingMapped}
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
				currentUserRatingMapped &&
				showCurrentUserRating && (
					<CurrentUserRating user={currentUserRatingMapped} maxRating={maxRating} />
				)
			}
		/>
	);
};

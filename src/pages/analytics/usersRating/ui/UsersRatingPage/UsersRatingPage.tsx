import { useTranslation } from 'react-i18next';

import { trophyIcon } from '@/shared/assets';
import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
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
import { RatingStatsTooltip } from '../RatingStatsTooltip/RatingStatsTooltip';
import { UsersRatingList } from '../UsersRatingList/UsersRatingList';
import { UsersRatingTable } from '../UsersRatingTable/UsersRatingTable';

export const UsersRatingPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const { isMobile } = useScreenSize();

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
	const { data: currentUserRating } = useGetUserProfilePositionQuery(profileId);

	const usersOnPage = ratingData?.data ?? [];
	const maxRating = statsData?.allQuestions ?? 0;
	const usersCount = statsData?.allUsers ?? 0;

	const hasCurrentUserInPage = usersOnPage.some((u) => u.username === currentUserRating?.username);

	const showCurrentUserRating =
		!!currentUserRating &&
		!hasCurrentUserInPage &&
		!!statsData &&
		currentUserRating.specialization === statsData.specialization.title;

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
					showCurrentUserRating={showCurrentUserRating}
				/>
			}
			tooltip={
				statsData ? (
					<RatingStatsTooltip
						allUsers={statsData.allUsers}
						allQuestions={statsData.allQuestions}
						averageProgress={statsData.averageProgress}
					/>
				) : null
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
				showCurrentUserRating &&
				!isMobile && <CurrentUserRating user={currentUserRating} maxRating={maxRating} />
			}
		/>
	);
};

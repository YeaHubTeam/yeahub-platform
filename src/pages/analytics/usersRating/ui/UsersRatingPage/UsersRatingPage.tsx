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
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

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

	const {
		data: ratingData,
		isError: isRatingDataError,
		isLoading: isRatingDataLoading,
		refetch: ratingDataRefetch,
	} = useGetUsersRatingQuery({
		specializationId: currentSpecialization,
		page,
		limit: PLACES_COUNT_ON_PAGE,
	});

	const {
		data: statsData,
		isError: isStatsDataError,
		isLoading: isStatsDataLoading,
		refetch: statsDataRefetch,
	} = useGetUsersRatingStatsQuery(currentSpecialization);
	const {
		data: currentUserRating,
		isError: isCurrentUserRatingError,
		isLoading: isCurrentUserRatingLoading,
		refetch: currentUserRatingRefetch,
	} = useGetUserProfilePositionQuery(profileId);

	const usersOnPage = ratingData?.data ?? [];
	const maxRating = statsData?.allQuestions ?? 0;
	const usersCount = statsData?.allUsers ?? 0;

	const hasCurrentUserInPage = usersOnPage.some((u) => u.username === currentUserRating?.username);

	const showCurrentUserRating =
		!!currentUserRating &&
		!hasCurrentUserInPage &&
		!!statsData &&
		currentUserRating.specialization === statsData.specialization.title;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: () => {
				isRatingDataError && ratingDataRefetch();
				isStatsDataError && statsDataRefetch();
				isCurrentUserRatingError && currentUserRatingRefetch();
			},
		},
		empty: {
			title: t(Analytics.USERS_RATING_STUB_EMPTY_TITLE),
			subtitle: t(Analytics.USERS_RATING_STUB_EMPTY_SUBTITLE),
		},
	};

	return (
		<PageWrapper
			isLoading={isRatingDataLoading || isStatsDataLoading || isCurrentUserRatingLoading}
			hasError={isRatingDataError || isStatsDataError}
			hasData={usersOnPage.length > 0}
			shouldVerify
			stubs={stubs}
			content={
				isMobile ? (
					<UsersRatingList
						rankedUsers={usersOnPage}
						maxRating={maxRating}
						currentUserRating={currentUserRating}
						showCurrentUserRating={showCurrentUserRating}
					/>
				) : (
					<>
						<UsersRatingTable
							rankedUsers={usersOnPage}
							maxRating={maxRating}
							currentUserRating={currentUserRating}
						/>
						{currentUserRating && showCurrentUserRating && (
							<CurrentUserRating user={currentUserRating} maxRating={maxRating} />
						)}
					</>
				)
			}
		>
			{({ content }) => (
				<AnalyticPageTemplate
					title={
						<Flex direction="row" gap="12" align="center">
							<img src={trophyIcon} alt="" />
							{t(Analytics.USERS_RATING_TITLE_PAGE, {
								specialization: statsData?.specialization?.title,
							})}
						</Flex>
					}
					list={content}
					tooltip={
						statsData ? (
							<RatingStatsTooltip
								allUsers={statsData.allUsers}
								allQuestions={statsData.allQuestions}
								averageProgress={statsData.averageProgress}
							/>
						) : null
					}
					table={content}
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
				/>
			)}
		</PageWrapper>
	);
};

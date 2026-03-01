import { useTranslation } from 'react-i18next';

import { trophyIcon } from '@/shared/assets';
import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetUsersRatingBySpecializationQuery, useGetRatingStatsQuery } from '@/entities/user';

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

	const { data } = useGetUsersRatingBySpecializationQuery(currentSpecialization);

	const { data: statsData } = useGetRatingStatsQuery(currentSpecialization);

	const usersOnPage = getRankedUsers({ data, limit: PLACES_COUNT_ON_PAGE, page });

	const maxRating = statsData?.allQuestions ?? 0;

	const currentUserRating = data?.users.find((u) => u.userId === '7');
	const showCurrentUserRating = !usersOnPage.filter((u) => u.userId === currentUserRating?.userId)
		.length;

	return (
		<AnalyticPageTemplate
			title={
				<Flex direction="row" gap="12" align="center">
					<img src={trophyIcon} alt="" />
					{t(Analytics.USERS_RATING_TITLE_PAGE, {
						specialization: statsData?.specialization?.title ?? '',
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
					{t(Analytics.USERS_RATING_TOOLTIP_USERS_COUNT, { usersCount: statsData?.allUsers ?? 0 })}{' '}
					<br />
					Всего вопросов: {statsData?.allQuestions ?? 0} <br />
					{t(Analytics.USERS_RATING_TOOLTIP_PROGRESS, {
						averageProgress: statsData?.averageProgress ?? 0,
					})}{' '}
					<br />
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
				total: statsData?.allUsers ?? 0,
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

import { useTranslation } from 'react-i18next';

import { trophyIcon } from '@/shared/assets';
import { i18Namespace, Analytics } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetUsersRatingBySpecializationQuery } from '@/entities/user';

import { AnalyticPageTemplate, useAnalyticFilters } from '@/widgets/analytics/AnalyticPageTemplate';
import { getRankedUsers } from '@/widgets/analytics/UsersRatingWidget';

import { getOverallProgress } from '../../lib/getOverallProgress/getOverallProgress';
import { PLACES_COUNT_ON_PAGE } from '../../model/constants';
import { CurrentUserRating } from '../CurrentUserRating/CurrentUserRating';
import { UsersRatingList } from '../UsersRatingList/UsersRatingList';
import { UsersRatingTable } from '../UsersRatingTable/UsersRatingTable';

export const UsersRatingPage = () => {
	const { t } = useTranslation(i18Namespace.analytics);
	const specializationId = useAppSelector(getSpecializationId);
	const { filters, hasFilters, onChangePage, onResetFilters, onChangeSpecialization } =
		useAnalyticFilters({
			specialization: specializationId,
			page: 1,
		});
	const page = filters?.page || 1;
	const { data } = useGetUsersRatingBySpecializationQuery(
		filters.specialization || specializationId,
	);

	const usersOnPage = getRankedUsers({ data, limit: PLACES_COUNT_ON_PAGE, page });
	const maxRating = data?.questionsCount ?? 0;
	const usersCount = data?.users.length ?? 0;
	const averageProgress = getOverallProgress(data);
	const updatedAt = data?.updatedAt ?? '';

	// TODO: use this block when backend for users rating is ready
	// const userId = useAppSelector(getUserId);
	// const currentUserRating = data?.users.find((u) => u.userId === userId);

	// TODO: comment this block when backend for users rating is ready
	const currentUserRating = data?.users.find((u) => u.userId === '7');

	const showCurrentUserRating = !usersOnPage.filter((u) => u.userId === currentUserRating?.userId)
		.length;

	return (
		<AnalyticPageTemplate
			title={
				<Flex direction="row" gap="12" align="center">
					<img src={trophyIcon} alt="" />
					{t(Analytics.USERS_RATING_TITLE_PAGE, { specialization: data?.specialization.title })}
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
					{t(Analytics.USERS_RATING_TOOLTIP_UPDATED_AT, { updatedAt })} <br />
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
				specialization: filters.specialization,
				limit: PLACES_COUNT_ON_PAGE,
				total: usersCount,
				onChangeSpecialization,
				onChangePage,
				onResetFilters,
				hasFilters,
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

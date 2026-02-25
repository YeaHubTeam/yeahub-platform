import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import { type UserRating } from '@/entities/user';

import {
	PLACE_ICONS,
	PRIZE_PLACES_COUNT,
	type PrizePlace,
} from '@/widgets/analytics/UsersRatingWidget';

import { UsersRatingProgressBar } from '../UsersRatingProgressBar/UsersRatingProgressBar';
import { UsersTitle } from '../UsersTitle/UsersTitle';

import styles from './UsersRatingTable.module.css';

export interface UsersRatingTableRow {
	id: string;
	rowId: number;
	place: number;
	progress: ReactNode;
	user: ReactNode;
	studiedQuestions: string;
}

type UsersRatingTableProps = {
	rankedUsers: UserRating[];
	maxRating: number;
	currentUserRating?: UserRating;
};

export const UsersRatingTable = ({
	rankedUsers,
	maxRating,
	currentUserRating,
}: UsersRatingTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);
	const tableClassName = (i: number) => {
		return i < 2 ? styles.center : i === 2 ? styles.left : styles.right;
	};

	const tableItems: UsersRatingTableRow[] = rankedUsers.map((rankedUser) => {
		return {
			id: rankedUser.userId,
			place: rankedUser.place,
			user: <UsersTitle rankedUser={rankedUser} />,
			avatarUrl: rankedUser.avatarUrl,
			studiedQuestions: `${rankedUser.ratingScore}/${maxRating}`,
			progress: <UsersRatingProgressBar rankedUser={rankedUser} maxRating={maxRating} />,
			rowId: rankedUser.place,
		};
	});

	const renderTableHeader = () => {
		const columns = {
			index: t(Analytics.USERS_RATING_TABLE_INDEX),
			place: t(Analytics.USERS_RATING_TABLE_PLACE),
			user: t(Analytics.USERS_RATING_TABLE_USER),
			questionsCount: t(Analytics.USERS_RATING_TABLE_QUESTIONS_COUNT),
			progress: t(Analytics.USERS_RATING_TABLE_PROGRESS),
		};

		return Object.entries(columns).map(([k, v], i) => (
			<th key={k}>
				<Text variant="body3-accent" color="white-900" className={classNames(i)}>
					{v}
				</Text>
			</th>
		));
	};

	const renderTableBody = (tableItem: UsersRatingTableRow) => {
		const isPrizePlace = tableItem.place > 0 && tableItem.place <= PRIZE_PLACES_COUNT;
		const columns = {
			index: tableItem.rowId,
			place: isPrizePlace && (
				<img
					src={PLACE_ICONS[tableItem.place as PrizePlace]}
					alt="medal"
					width="13px"
					height="20px"
				/>
			),
			user: tableItem.user,
			questionsCount: tableItem.studiedQuestions,
			progress: tableItem.progress,
		};

		const isCurrentUser = tableItem.id === currentUserRating?.userId;

		return Object.entries(columns).map(([k, v], i) => (
			<td
				key={k}
				className={classNames(isCurrentUser && styles['current-user-rating'], tableClassName(i))}
			>
				{v}
			</td>
		));
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			index: '4.5%',
			place: '8%',
			user: '47.5%',
			questionsCount: '20%',
			progress: '20%',
		};
		return Object.values(columnWidths).map((width, i) => <col key={i} style={{ width }} />);
	};

	return (
		<Table
			items={tableItems}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderTableColumnWidths={renderTableColumnWidths}
		/>
	);
};

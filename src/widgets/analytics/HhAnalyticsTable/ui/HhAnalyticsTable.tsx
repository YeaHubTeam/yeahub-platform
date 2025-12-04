import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Analytics } from '@/shared/config';
import { SelectedEntity } from '@/shared/libs';
import { Table } from '@/shared/ui/Table';
import { Text } from '@/shared/ui/Text';

import styles from './HhAnalyticsTable.module.css';

export type HhAnalyticsMode = 'skills' | 'keywords';
export type HhAnalyticsRow = SelectedEntity<number> & {
	index: number;
	count: number;
	isTop20: boolean;
};

type HhAnalyticsTableProps = {
	rows: HhAnalyticsRow[];
	mode: HhAnalyticsMode;
};

export const HhAnalyticsTable = ({ rows, mode }: HhAnalyticsTableProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	const renderTableColumnWidths = () => {
		const column = {
			index: '48px',
			title: 'auto',
			count: '120px',
		};

		return Object.values(column).map((width, idx) => {
			return <col key={idx} style={{ width }} />;
		});
	};

	const renderTableHeader = () => {
		const column = {
			index: t(Analytics.HH_ANALYTICS_TABLE_INDEX),
			title:
				mode === 'skills'
					? t(Analytics.HH_ANALYTICS_TABLE_SKILLS)
					: t(Analytics.HH_ANALYTICS_TABLE_KEYWORDS),
			count: t(Analytics.HH_ANALYTICS_TABLE_COUNT),
		};

		return Object.entries(column).map(([key, value]) => {
			return <td key={key}>{value}</td>;
		});
	};

	const renderTableBody = (row: HhAnalyticsRow) => {
		const column = {
			index: row.index,
			title: row.title,
			count: row.count,
		};

		return Object.entries(column).map(([key, value]) => {
			return (
				<td
					key={key}
					className={classNames(styles.cell, key === 'count' && styles['count-column'])}
				>
					<Text variant="body3-accent" className={row.isTop20 ? styles['top-row-cell'] : undefined}>
						{value}
					</Text>
				</td>
			);
		});
	};

	return (
		<Table
			items={rows}
			renderTableColumnWidths={renderTableColumnWidths}
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
		/>
	);
};

import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics, Specializations } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { Icon } from '@/shared/ui/Icon';
import { Table } from '@/shared/ui/Table';
import { TableMobile } from '@/shared/ui/TableMobile';
import { Text } from '@/shared/ui/Text';
import { Tooltip } from '@/shared/ui/Tooltip';

import {
	SpecializationSelect,
	SpecializationsProgress,
	useGetSpecializationsGeneralProgressQuery,
} from '@/entities/specialization';

import styles from './ProgressSpecializationsPage.module.css';

export const ProgressSpecializationsPage = () => {
	const { control, watch } = useForm();
	const { isMobile } = useScreenSize();

	const selectedSpecializations = watch('specializations') || [];

	const { data: specializationsProgress } = useGetSpecializationsGeneralProgressQuery({
		specializationId: selectedSpecializations,
	});

	const { t: tAnalytics } = useTranslation(i18Namespace.analytics);
	const { t: tSpecialization } = useTranslation(i18Namespace.specialization);

	const renderTableHeader = () => {
		const columns = {
			number: tSpecialization(Specializations.PROGRESS_TABLE_NUMBER),
			specialization: tSpecialization(Specializations.PROGRESS_TABLE_SPECIALIZATION),
			skillCount: tSpecialization(Specializations.PROGRESS_TABLE_SKILLS),
			questionCount: tSpecialization(Specializations.PROGRESS_TABLE_QUESTIONS),
			averageProgress: tSpecialization(Specializations.PROGRESS_TABLE_PROGRESS),
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td
				className={classnames({
					[styles['td-right']]: k !== 'specialization' && k !== 'number',
				})}
				key={k}
			>
				{v}
			</td>
		));
	};

	const renderTableBody = (stats: SpecializationsProgress, index?: number) => {
		const columns = {
			number: typeof index === 'number' && ++index,
			specialization: stats.specialization.title,
			skillCount: stats.skillCount,
			questionCount: stats.questionCount,
			averageProgress: `${stats.averageProgress}%`,
		};
		return Object.entries(columns)?.map(([k, v]) => (
			<td
				className={classnames({
					[styles['td-center']]: k === 'number',
					[styles['td-right']]: k !== 'specialization' && k !== 'number',
				})}
				key={k}
			>
				{v}
			</td>
		));
	};

	const renderTableColumnWidths = () => {
		const columnWidths = {
			number: '50px',
			specialization: 'auto',
			skillCount: '120px',
			questionCount: '120px',
			averageProgress: '120px',
		};
		return Object.values(columnWidths)?.map((width, index) => (
			<col key={index} style={{ width }} />
		));
	};

	const renderTableMobileHead = (stats: SpecializationsProgress) => {
		const columns = {
			title: stats.specialization.title,
		};
		return (
			<tr>
				<th className={styles['title-table']}>
					<Text variant="body3-accent">{columns.title}</Text>
				</th>
			</tr>
		);
	};

	const renderTableMobileBody = (stats: SpecializationsProgress) => {
		const columns = [
			{
				title: tSpecialization(Specializations.PROGRESS_TABLE_SKILLS),
				value: stats.skillCount,
			},
			{
				title: tSpecialization(Specializations.PROGRESS_TABLE_QUESTIONS),
				value: stats.questionCount,
			},
			{
				title: tSpecialization(Specializations.PROGRESS_TABLE_PROGRESS),
				value: `${stats.averageProgress}%`,
			},
		];

		return columns.map((item, index) => (
			<tr key={index}>
				<td className={styles['mobile-td']}>
					<Text variant="body3-accent">{item.title}</Text>
				</td>
				<td className={styles['mobile-td']}>
					<Text variant="body3-accent">{item.value}</Text>
				</td>
			</tr>
		));
	};

	if (!specializationsProgress?.data) {
		return null;
	}

	return (
		<Card>
			<Flex justify="between">
				<h2 className={styles.title}>{tSpecialization(Specializations.PROGRESS_TITLE)}</h2>
				<Tooltip
					className={styles.tooltip}
					title={tAnalytics(Analytics.TOOLTIP_SPECIFY)}
					placement="bottom"
				>
					<Icon icon="info" size={18} color="black-600" />
				</Tooltip>
			</Flex>
			<FormControl className={styles['form-control']} name="specializations" control={control}>
				{({ onChange, value }) => (
					<SpecializationSelect
						onChange={onChange}
						value={value}
						defaultValue={tSpecialization(Specializations.SELECT_SPECIFY)}
						withoutPrefix={true}
					/>
				)}
			</FormControl>
			{isMobile ? (
				<TableMobile
					items={specializationsProgress.data}
					renderTableMobileHead={renderTableMobileHead}
					renderTableMobileBody={renderTableMobileBody}
				/>
			) : (
				<Table
					items={specializationsProgress.data}
					renderTableHeader={renderTableHeader}
					renderTableBody={renderTableBody}
					renderTableColumnWidths={renderTableColumnWidths}
				/>
			)}
		</Card>
	);
};

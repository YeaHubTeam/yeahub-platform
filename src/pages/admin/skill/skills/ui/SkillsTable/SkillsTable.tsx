import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Skills, Translation, i18Namespace, ROUTES } from '@/shared/config';
import { formatDate, route, SelectedAdminEntities } from '@/shared/libs';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellLink } from '@/shared/ui/TableCellLink';
import { TableCellWithTooltip } from '@/shared/ui/TableCellWithTooltip';
import { TableV2 } from '@/shared/ui/TableV2';
import { type TableColumn, type TableRowId } from '@/shared/ui/TableV2';

import { Skill } from '@/entities/skill';

import { useDeleteSkillMutation } from '@/features/skill/deleteSkill';

import styles from './SkillsTable.module.css';
interface SkillTableRow {
	id: number;
	imageSrc: string;
	disabled?: boolean;
	title: string;
	specializations: Skill['specializations'];
	description: string;
	author: string;
	createdAt: string;
}

interface SkillsTableProps {
	skills?: Skill[];
	selectedSkills?: SelectedAdminEntities;
	onSelectSkills?: (ids: SelectedAdminEntities) => void;
}

export const SkillsTable = ({ skills, selectedSkills, onSelectSkills }: SkillsTableProps) => {
	const { t } = useTranslation([i18Namespace.skill, i18Namespace.translation]);
	const [deleteSkill] = useDeleteSkillMutation();

	const tableData: SkillTableRow[] =
		skills?.map((skill) => ({
			id: skill.id,
			imageSrc: skill.imageSrc ?? '',
			title: skill.title,
			specializations: skill.specializations,
			description: skill.description,
			author: skill.createdBy?.username ?? '-',
			createdAt: skill.createdAt ? formatDate(new Date(skill.createdAt), 'dd.MM.yyyy') : '',
		})) ?? [];

	const columns: Array<TableColumn<SkillTableRow>> = [
		{
			id: 'imageSrc',
			header: t(Skills.ICON_TITLE_SHORT),
			width: '10%',
			cell: ({ row }) => (
				<ImageWithWrapper
					src={row.imageSrc || ''}
					alt={`${t(Translation.LOGO)} ${row.title}`}
					className={styles['card-image']}
				/>
			),
		},
		{
			id: 'title',
			header: t(Skills.TITLE_SHORT),
			width: '10%',
			cell: ({ row, value }) => (
				<TableCellLink to={route(ROUTES.admin.skills.details.page, row.id)} text={String(value)} />
			),
		},
		{
			id: 'specializations',
			header: t(Skills.SPECIALIZATIONS_TITLE),
			width: '15%',
			cell: ({ row }) => (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={row.specializations}
					showCount={1}
				/>
			),
		},
		{
			id: 'description',
			header: t(Skills.DESCRIPTION_SHORT),
			width: 'auto',
			cell: ({ row }) => (
				<TableCellWithTooltip title={String(row.description)}>
					{row.description}
				</TableCellWithTooltip>
			),
		},
		{
			id: 'author',
			header: t(Skills.AUTHOR),
			width: '10%',
		},
		{
			id: 'createdAt',
			header: t(Skills.CREATED_AT),
			width: '15%',
		},
	];

	const selectedRowIds = selectedSkills?.map((skill) => skill.id);

	const selectedById = useMemo(() => {
		const byId = new Map<number, { id: number; title?: string }>();

		selectedSkills?.forEach((skill) => byId.set(skill.id, skill));

		skills?.forEach((skill) => {
			byId.set(skill.id, { id: skill.id, title: skill.title });
		});

		return byId;
	}, [skills, selectedSkills]);

	const onSelectedRowIdsChange = useCallback(
		(ids: TableRowId[]) => {
			onSelectSkills?.(ids.map((id) => selectedById.get(id as number) ?? { id: id as number }));
		},
		[onSelectSkills, selectedById],
	);

	if (!skills) {
		return null;
	}

	return (
		<TableV2
			data={tableData}
			columns={columns}
			selectedRowIds={selectedRowIds}
			onSelectedRowIdsChange={onSelectedRowIdsChange}
			actions={['detail', 'edit', 'delete', 'copy']}
			entity="skills"
			onDelete={(id) => deleteSkill(Number(id))}
		/>
	);
};

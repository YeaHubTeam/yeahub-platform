import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Skills, Translation, i18Namespace, ROUTES } from '@/shared/config';
import { formatDate, route, SelectedAdminEntities } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Table } from '@/shared/ui/Table';
import { TableCellEntityList } from '@/shared/ui/TableCellEntityList';
import { TableCellWithTooltip } from '@/shared/ui/TableCellWithTooltip';
import { Text } from '@/shared/ui/Text';

import { Skill } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

import styles from './SkillsTable.module.css';

interface SkillsTableProps {
	skills?: Skill[];
	selectedSkills?: SelectedAdminEntities;
	onSelectSkills?: (ids: SelectedAdminEntities) => void;
}

export const SkillsTable = ({ skills, selectedSkills, onSelectSkills }: SkillsTableProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.skill, i18Namespace.translation]);

	const renderTableColumnWidths = () => {
		const columnWidths = {
			imageSrc: '10%',
			title: '10%',
			specializations: '15%',
			description: 'auto',
			author: '10%',
			createdAt: '15%',
		};

		return Object.values(columnWidths)?.map((width, idx) => <col key={idx} style={{ width }} />);
	};

	const renderTableHeader = () => {
		const columns = {
			imageSrc: t(Skills.ICON_TITLE_SHORT),
			title: t(Skills.TITLE_SHORT),
			specializations: t(Skills.SPECIALIZATIONS_TITLE),
			description: t(Skills.DESCRIPTION_SHORT),
			author: t(Skills.AUTHOR),
			createdAt: t(Skills.CREATED_AT),
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k}>
				<Text variant="body2-accent" color="white-900">
					{v}
				</Text>
			</td>
		));
	};

	const renderTableBody = (skill: Skill) => {
		const columns = {
			imageSrc: (
				<ImageWithWrapper
					src={skill.imageSrc || ''}
					alt={`${t(Translation.LOGO)} ${skill.title}`}
					className={styles['card-image']}
				/>
			),
			title: skill.title,
			specializations: (
				<TableCellEntityList
					url={ROUTES.admin.specializations.details.page}
					items={skill.specializations}
					showCount={1}
				/>
			),
			description: skill.description,
			author: skill.createdBy?.username,
			createdAt: skill.createdAt ? formatDate(new Date(skill.createdAt), 'dd.MM.yyyy') : '',
		};

		return Object.entries(columns)?.map(([k, v]) => {
			if (k === 'description') {
				return (
					<td key={k}>
						<TableCellWithTooltip title={v}>{v}</TableCellWithTooltip>
					</td>
				);
			}

			return (
				<td key={k}>
					{k === 'title' ? (
						<Link to={route(ROUTES.admin.skills.detail.page, skill.id)}>
							<Text variant="body3-accent">{v}</Text>
						</Link>
					) : (
						<Text variant="body3-accent">{v}</Text>
					)}
				</td>
			);
		});
	};

	const renderActions = (skill: Skill) => {
		const menuItems: PopoverMenuItem[] = [
			{
				icon: <Icon icon="eye" size={24} />,
				title: t(Translation.SHOW, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.skills.detail.page, skill.id));
				},
			},
			{
				icon: <Icon icon="pen" size={24} />,
				title: t(Translation.EDIT, { ns: i18Namespace.translation }),
				onClick: () => {
					navigate(route(ROUTES.admin.skills.edit.page, skill.id));
				},
			},
			{
				renderComponent: () => <DeleteSkillButton skillId={skill.id} />,
			},
		];

		return (
			<Flex gap="4">
				<Popover menuItems={menuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to details"
							form="square"
							icon={<Icon icon="dotsThreeVertical" />}
							size="medium"
							variant="tertiary"
							onClick={onToggle}
						/>
					)}
				</Popover>
			</Flex>
		);
	};

	if (!skills) {
		return null;
	}

	return (
		<Table
			renderTableHeader={renderTableHeader}
			renderTableBody={renderTableBody}
			renderActions={renderActions}
			items={skills}
			selectedItems={selectedSkills}
			onSelectItems={onSelectSkills}
			renderTableColumnWidths={renderTableColumnWidths}
			hasCopyButton
		/>
	);
};

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Popover, IconButton } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Skills, Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { route } from '@/shared/helpers/route';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Table } from '@/shared/ui/Table';

import { Skill } from '@/entities/skill';

import { DeleteSkillButton } from '@/features/skill/deleteSkill';

import styles from './SkillsTable.module.css';

interface SkillsTableProps {
	skills?: Skill[];
	selectedSkills?: number[];
	onSelectSkills?: (ids: number[]) => void;
}

export const SkillsTable = ({ skills, selectedSkills, onSelectSkills }: SkillsTableProps) => {
	const [openPopovers, setOpenPopovers] = useState<number | null>(null);

	const { t } = useI18nHelpers([i18Namespace.skill, i18Namespace.translation]);

	const renderTableHeader = () => {
		const columns = {
			title: t(Skills.TITLE),
			description: t(Skills.DESCRIPTION),
		};

		return Object.entries(columns)?.map(([k, v]) => <td key={k}>{v}</td>);
	};

	const renderTableBody = (skill: Skill) => {
		const columns = {
			title: skill.title,
			description: skill.description,
		};

		return Object.entries(columns)?.map(([k, v]) => (
			<td key={k} className={k === 'description' ? styles.description : undefined}>
				{v}
			</td>
		));
	};

	const renderActions = (skill: Skill) => {
		const openActions = () => {
			setOpenPopovers(skill.id);
		};

		const closeActions = () => {
			setOpenPopovers(null);
		};

		return (
			<Flex gap="4">
				<Popover
					placement="bottom-start"
					body={
						<div>
							<NavLink to={route(ROUTES.admin.skills.detail.page, skill.id)}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto', justifyContent: 'flex-start' }}
										aria-label="Large"
										preffix={<Icon icon="eye" size={20} color={'--palette-ui-purple-700'} />}
										variant="tertiary"
									>
										{t(Translation.SHOW, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<NavLink to={route(ROUTES.admin.skills.edit.page, skill.id)}>
								<Flex align="center" gap="4">
									<Button
										style={{ width: 'auto', justifyContent: 'flex-start' }}
										aria-label="Large"
										preffix={<Icon icon="pencil" size={20} color={'--palette-ui-purple-700'} />}
										variant="tertiary"
									>
										{t(Translation.EDIT, { ns: i18Namespace.translation })}
									</Button>
								</Flex>
							</NavLink>
							<DeleteSkillButton skillId={skill.id} />
						</div>
					}
					isOpen={openPopovers === skill.id}
					onClickOutside={closeActions}
				>
					<div>
						<IconButton
							style={{ cursor: 'pointer' }}
							theme="tertiary"
							onClick={openActions}
							aria-label="Large"
							icon={<Icon icon="dotsThreeVertical" size={20} />}
						/>
					</div>
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
		/>
	);
};

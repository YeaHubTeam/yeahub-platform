import { useTranslation } from 'react-i18next';

import { i18Namespace, Profile } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getIsEdit } from '@/entities/profile';
import { UserEditButton } from '@/entities/user';

import styles from './SkillsBlockHeader.module.css';

export const SkillsBlockHeader = () => {
	const isEdit = useAppSelector(getIsEdit);

	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);

	return (
		<Flex gap="16" justify="between">
			<h3 className={styles['skills-title']}>{t(Profile.TABS_SKILLS)}</h3>
			{isEdit && <UserEditButton tab="skills" />}
		</Flex>
	);
};

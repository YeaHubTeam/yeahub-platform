import { useFormContext } from 'react-hook-form';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { SkillSelect } from '@/entities/skill';

import styles from './SkillsTabForm.module.css';

export const SkillsTabForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { control } = useFormContext();

	return (
		<Flex direction="column" gap="120">
			<Flex gap="120">
				<div className={styles.description}>
					<h3>{t(Profile.SKILLFORM_TITLE)}</h3>
					<p>{t(Profile.SKILLFORM_DESCRIPTION)}</p>
				</div>
				<FormControl className={styles.select} name="skills" control={control}>
					{({ onChange, value }) => <SkillSelect onChange={onChange} value={value} />}
				</FormControl>
			</Flex>
		</Flex>
	);
};

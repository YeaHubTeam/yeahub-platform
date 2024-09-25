import { useFormContext } from 'react-hook-form';
import { Button } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { SkillSelect } from '@/entities/skill';

import styles from './SkillsTabForm.module.css';

export const SkillsTabForm = () => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	const { control } = useFormContext();

	return (
		<>
			<Flex direction="column" gap="120">
				<Flex gap="120">
					<div className={styles.description}>
						<h3>{t('skillForm.yourSkills')}</h3>
						<p>{t('skillForm.yourSkillsText')}</p>
					</div>
					<FormControl className={styles.select} name="skills" control={control}>
						{({ onChange, value }) => <SkillSelect onChange={onChange} value={value} />}
					</FormControl>
				</Flex>
			</Flex>
			<Flex direction="column" align="end" className={styles['btn-container']}>
				<Button type="submit">{t('skillForm.submitButtonText')}</Button>
			</Flex>
		</>
	);
};

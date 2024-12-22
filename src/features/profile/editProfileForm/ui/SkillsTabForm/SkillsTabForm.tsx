import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import { SkillSelect } from '@/entities/skill';
import { SpecializationSelect } from '@/entities/specialization';

import styles from './SkillsTabForm.module.css';

export const SkillsTabForm = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { control } = useFormContext();

	return (
		<Flex direction="column" gap="40">
			<Flex className={styles.container} gap="20">
				<div className={styles.description}>
					<h3>{t(Profile.SPECIALIZATION_TITLE)}</h3>
					<p>{t(Profile.SPECIALIZATION_DESCRIPTION)}</p>
				</div>
				<FormControl
					className={styles.select}
					name="specializations"
					control={control}
					label={t(Profile.FORM_SPECIALIZATION)}
				>
					{({ onChange, value }) => (
						<SpecializationSelect onChange={onChange} value={value} hasMultiple />
					)}
				</FormControl>
			</Flex>
			<Flex className={styles.container} gap="20">
				<div className={styles.description}>
					<h3>{t(Profile.SKILLS_TITLE)}</h3>
					<p>{t(Profile.SKILLS_DESCRIPTION)}</p>
				</div>
				<FormControl
					className={styles.select}
					name="skills"
					control={control}
					label={t(Profile.FORM_SKILLS)}
				>
					{({ onChange, value }) => <SkillSelect onChange={onChange} value={value} />}
				</FormControl>
			</Flex>
		</Flex>
	);
};

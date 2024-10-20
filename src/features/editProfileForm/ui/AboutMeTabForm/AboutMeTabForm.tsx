import { useFormContext } from 'react-hook-form';
import { TextArea } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';

import styles from './AboutMeTabForm.module.css';

export const AboutMeTabForm = () => {
	const { control } = useFormContext();
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<Flex className={styles.container} gap="20">
			<div className={styles.description}>
				<h3>{t(Profile.ABOUTMEFORM_TITLE)}</h3>
				<p>{t(Profile.ABOUTMEFORM_DESCRIPTION)}</p>
			</div>
			<div className={styles['textarea-container']}>
				<FormControl name="aboutMe" control={control}>
					{(field) => (
						<TextArea
							placeholder={t(Profile.ABOUTMEFORM_PLACEHOLDER)}
							{...field}
							className={styles.textarea}
						/>
					)}
				</FormControl>
			</div>
		</Flex>
	);
};

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { TextEditor } from '@/shared/ui/TextEditor';

import styles from './AboutMeTabForm.module.css';

export const AboutMeTabForm = () => {
	const { control } = useFormContext();
	const { t } = useTranslation(i18Namespace.profile);

	return (
		<Flex className={styles.container} gap="20">
			<div className={styles.description}>
				<h3>{t(Profile.ABOUT_ME_TITLE)}</h3>
				<p>{t(Profile.ABOUT_ME_DESCRIPTION)}</p>
			</div>
			<div className={styles['textarea-container']}>
				<FormControl name="aboutMe" control={control}>
					{(field) => (
						<TextEditor
							id="aboutMe"
							isInline
							data={field.value}
							onChange={(value) => field.onChange(value)}
							onBlur={field.onBlur}
						/>
					)}
				</FormControl>
			</div>
		</Flex>
	);
};

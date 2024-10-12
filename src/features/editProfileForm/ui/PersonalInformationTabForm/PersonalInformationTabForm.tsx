import { useFormContext } from 'react-hook-form';
import { Input } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { ImageLoader } from '@/shared/ui/ImageLoader';
import { InputPhone } from '@/shared/ui/InputPhone';

import { SocialNetWorkInputs } from '@/entities/socialNetwork';
import { SpecializationSelect } from '@/entities/specialization';

import styles from './PersonalInformationTabForm.module.css';

export const PersonalInformationTabForm = () => {
	const { control } = useFormContext();
	const { t } = useI18nHelpers(i18Namespace.profile);

	return (
		<Flex direction="column" gap="120">
			<Flex gap="120">
				<div className={styles.description}>
					<h3>{t(Profile.PHOTO_TITLE)}</h3>
					<p>{t(Profile.PHOTO_DESCRIPTION)}</p>
				</div>
				<ImageLoader />
			</Flex>
			<Flex gap="120">
				<div className={styles.description}>
					<h3>{t(Profile.PERSONALINFORMATIONFORM_TITLE)}</h3>
					<p>{t(Profile.PERSONALINFORMATIONFORM_DESCRIPTION)}</p>
				</div>
				<Flex gap="20" className={styles['inputs-wrapper']}>
					<Flex maxWidth gap="20">
						<FormControl
							name="firstName"
							control={control}
							label={t(Profile.PERSONALINFORMATIONFORM_FIRSTNAME)}
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} />}
						</FormControl>
						<FormControl
							name="lastName"
							control={control}
							label={t(Profile.PERSONALINFORMATIONFORM_LASTNAME)}
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} />}
						</FormControl>
					</Flex>

					<FormControl
						name="specialization"
						control={control}
						label={t(Profile.PERSONALINFORMATIONFORM_SPECIALIZATION)}
						className={styles.form}
					>
						{({ onChange, value }) => <SpecializationSelect onChange={onChange} value={value} />}
					</FormControl>
					<Flex maxWidth gap="20">
						<FormControl
							name="phone"
							control={control}
							label={t(Profile.PERSONALINFORMATIONFORM_CONTACTNUMBER)}
							className={styles.form}
						>
							{(field) => <InputPhone fields={field} className={'edit'} />}
						</FormControl>
						<FormControl
							name="email"
							control={control}
							label={t(Profile.PERSONALINFORMATIONFORM_EMAIL)}
							className={styles.form}
						>
							{(field) => <Input {...field} className={styles.input} />}
						</FormControl>
					</Flex>

					<FormControl
						name="location"
						control={control}
						label={t(Profile.PERSONALINFORMATIONFORM_LOCATION)}
						className={styles.form}
					>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder={t(Profile.PERSONALINFORMATIONFORM_LOCATIONPLACEHOLDER)}
							/>
						)}
					</FormControl>
					<FormControl
						name="skillLevel"
						control={control}
						label={t(Profile.PERSONALINFORMATIONFORM_GRADE)}
					>
						{(field) => <Input {...field} className={styles.input} placeholder="Junior" />}
					</FormControl>
				</Flex>
			</Flex>
			<Flex gap="120">
				<div className={styles.description}>
					<h3>{t(Profile.PERSONALINFORMATIONFORM_PERSONALLINKS)}</h3>
					<p>{t(Profile.PERSONALINFORMATIONFORM_PERSONALLINKSTEXT)}</p>
				</div>
				<Flex gap="20" maxWidth className={styles['inputs-wrapper']}>
					<SocialNetWorkInputs />
				</Flex>
			</Flex>
		</Flex>
	);
};

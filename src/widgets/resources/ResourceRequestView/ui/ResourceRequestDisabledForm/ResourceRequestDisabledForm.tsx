import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField/FormField';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { Input } from '@/shared/ui/Input';
import { KeywordInput } from '@/shared/ui/KeywordInput/KeywordInput';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { ResourcesSelect } from '@/entities/resource';
import { SkillSelect } from '@/entities/skill';
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { SpecializationSelect } from '@/entities/specialization';

import styles from './ResourceRequestDisabledForm.module.css';

export const ResourceRequestDisableForm = () => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const { control, watch } = useFormContext();

	const selectedSpecializations = watch('specializations');
	const iconBase64 = watch('iconBase64');
	const [previewImg] = useState<string | null>(iconBase64 ?? null);

	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<Flex>
					<Text variant="body4" color="black-800">
						{t(Marketplace.NAME_SHORT)}
					</Text>
				</Flex>
				<div className={styles.form}>
					<FormControl name="name" control={control} label={t(Marketplace.NAME_LABEL)}>
						{(field, hasError) => (
							<TextArea
								{...field}
								disabled
								state={hasError ? 'error' : 'default'}
								className={styles.name}
								placeholder={t(Marketplace.NAME_LABEL)}
							/>
						)}
					</FormControl>
				</div>
			</Flex>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<Text variant="body4" color="black-800">
					{t(Marketplace.DESCRIPTION_SHORT)}
				</Text>
				<div className={styles.form}>
					<FormControl
						name="description"
						control={control}
						label={t(Marketplace.DESCRIPTION_LABEL)}
					>
						{(field, hasError) => (
							<TextArea
								{...field}
								disabled
								state={hasError ? 'error' : 'default'}
								className={styles.name}
								placeholder={t(Marketplace.DESCRIPTION_LABEL)}
							/>
						)}
					</FormControl>
				</div>
			</Flex>
			<FormField label={t(Marketplace.ICON_SHORT)} description={t(Marketplace.ICON_LABEL)}>
				<ImageLoaderWithoutCropper
					disabled
					removeImage={() => {}}
					changeImage={() => {}}
					initialSrc={previewImg}
				/>
			</FormField>
			<FormField
				label={t(Marketplace.SPECIALIZATIONS_SHORT)}
				description={t(Marketplace.SPECIALIZATIONS_LABEL)}
			>
				<FormControl name="specializations" control={control}>
					{({ onChange, value }) => (
						<div>
							<SpecializationSelect disabled onChange={onChange} value={value} hasMultiple />
						</div>
					)}
				</FormControl>
			</FormField>
			{!!selectedSpecializations?.length && (
				<FormField label={t(Marketplace.SKILLS_SHORT)} description={t(Marketplace.SKILLS_LABEL)}>
					<FormControl name="skills" control={control}>
						{({ onChange, value }) => {
							return (
								<div>
									<SkillSelect
										disabled
										onChange={onChange}
										value={value}
										selectedSpecializations={selectedSpecializations}
									/>
								</div>
							);
						}}
					</FormControl>
				</FormField>
			)}
			<FormField label={t(Marketplace.TYPES_SHORT)} description={t(Marketplace.TYPES_LABEL)}>
				<FormControl name="type" control={control}>
					{({ onChange, value }) => (
						<div>
							<ResourcesSelect disabled onChange={onChange} value={value} />
						</div>
					)}
				</FormControl>
			</FormField>
			<FormField label={t(Marketplace.KEYWORDS_SHORT)} description={t(Marketplace.KEYWORDS_LABEL)}>
				<FormControl name="keywords" control={control}>
					{({ onChange, value }) => (
						<div className={styles.keywords}>
							<KeywordInput disabled value={value} onChange={onChange} />
						</div>
					)}
				</FormControl>
			</FormField>
			<FormField label={t(Marketplace.URL_SHORT)} description={t(Marketplace.URL_LABEL)}>
				<FormControl name="url" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							disabled
							placeholder={t(Marketplace.URL_PLACEHOLDER)}
							error={hasError}
						/>
					)}
				</FormControl>
			</FormField>
		</Flex>
	);
};

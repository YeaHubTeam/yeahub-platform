import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Marketplace } from '@/shared/config';
import { removeBase64Data } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { FormControl } from '@/shared/ui/FormControl';
import { FormField } from '@/shared/ui/FormField';
import { ImageLoaderWithoutCropper } from '@/shared/ui/ImageLoaderWithoutCropper';
import { Input } from '@/shared/ui/Input';
import { KeywordInput } from '@/shared/ui/KeywordInput';
import { Text } from '@/shared/ui/Text';
import { TextArea } from '@/shared/ui/TextArea';

import { SkillSelect } from '@/entities/skill/@x/resource';
import { SpecializationSelect } from '@/entities/specialization/@x/resource';

import { ResourcesSelect } from '../ResourceSelect/ResourceSelect';

import styles from './ResourceForm.module.css';

interface ResourceFormProps {
	readonly?: boolean;
}

export const ResourceForm = ({ readonly }: ResourceFormProps) => {
	const { t } = useTranslation(i18Namespace.marketplace);
	const { control, watch, setValue } = useFormContext();

	const selectedSpecializations = watch('specializations');
	const iconBase64 = watch('iconBase64');
	const [previewImg, setPreviewImg] = useState<string | null>(iconBase64 ?? null);

	const changeImage = (imageBase64: string) => {
		const image = removeBase64Data(imageBase64);

		setPreviewImg(imageBase64);
		setValue('iconBase64', image);
	};

	const removeImage = () => {
		setPreviewImg(null);
		setValue('iconBase64', null);
	};

	return (
		<Flex direction="column" gap="60" className={styles.wrapper}>
			<Flex direction="column" gap="8" className={styles['form-field']}>
				<Text variant="body4" color="black-800">
					{t(Marketplace.NAME_SHORT)}
				</Text>
				<div className={styles.form}>
					<FormControl name="name" control={control} label={t(Marketplace.NAME_LABEL)}>
						{(field, hasError) => (
							<TextArea
								{...field}
								state={hasError ? 'error' : 'default'}
								className={styles.name}
								placeholder={t(Marketplace.NAME_LABEL)}
								disabled={readonly}
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
								state={hasError ? 'error' : 'default'}
								className={styles.name}
								placeholder={t(Marketplace.DESCRIPTION_LABEL)}
								disabled={readonly}
							/>
						)}
					</FormControl>
				</div>
			</Flex>
			<FormField label={t(Marketplace.ICON_SHORT)} description={t(Marketplace.ICON_LABEL)}>
				<ImageLoaderWithoutCropper
					removeImage={removeImage}
					changeImage={changeImage}
					initialSrc={previewImg}
					disabled={readonly}
				/>
			</FormField>
			<FormField
				label={t(Marketplace.SPECIALIZATIONS_SHORT)}
				description={t(Marketplace.SPECIALIZATIONS_LABEL)}
			>
				<FormControl name="specializations" control={control}>
					{({ onChange, value }) => (
						<div>
							<SpecializationSelect
								onChange={onChange}
								value={value}
								hasMultiple
								disabled={readonly}
							/>
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
										onChange={onChange}
										value={value}
										selectedSpecializations={selectedSpecializations}
										disabled={readonly}
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
							<ResourcesSelect onChange={onChange} value={value} disabled={readonly} />
						</div>
					)}
				</FormControl>
			</FormField>
			<FormField label={t(Marketplace.KEYWORDS_SHORT)} description={t(Marketplace.KEYWORDS_LABEL)}>
				<FormControl name="keywords" control={control}>
					{({ onChange, value }) => (
						<div className={styles.keywords}>
							<KeywordInput value={value} onChange={onChange} disabled={readonly} />
						</div>
					)}
				</FormControl>
			</FormField>
			<FormField label={t(Marketplace.URL_SHORT)} description={t(Marketplace.URL_LABEL)}>
				<FormControl name="url" control={control}>
					{(field, hasError) => (
						<Input
							{...field}
							placeholder={t(Marketplace.URL_PLACEHOLDER)}
							error={hasError}
							disabled={readonly}
						/>
					)}
				</FormControl>
			</FormField>
		</Flex>
	);
};

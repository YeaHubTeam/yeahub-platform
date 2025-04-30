import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { useCreateCollectionMutation } from '../../api/createCollectionApi';
import { CollectionCreateFormValues } from '../../model/types/collectionCreateTypes';
export interface CollectionCreateFormHeaderProps {
	children?: React.ReactNode;
}

const CollectionCreateFormHeader: React.FC<CollectionCreateFormHeaderProps> = () => {
	const [createCollectionMutation, { isLoading }] = useCreateCollectionMutation();
	const { t } = useTranslation([i18Namespace.collection, i18Namespace.translation]);
	const { handleSubmit } = useFormContext<CollectionCreateFormValues>();

	const onCreateCollection = async (data: CollectionCreateFormValues) => {
		try {
			await createCollectionMutation({ ...data }).unwrap();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return (
		<Flex align="center" gap="8" justify={'between'}>
			<BackButton />
			<Button disabled={isLoading} onClick={handleSubmit(onCreateCollection)}>
				{t(Translation.SAVE, { ns: i18Namespace.translation })}
			</Button>
		</Flex>
	);
};

export default CollectionCreateFormHeader;

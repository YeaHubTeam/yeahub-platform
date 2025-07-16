// import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { ResourceForm } from '@/entities/resource';

// import { useCreateResourceMutation } from '../../api/createResourceApi';
// import { CreateResourceFormValues } from '../../model/types/resourceCreateTypes';

import styles from './ResourceCreateFormWithHeader.module.css';

export const ResourceCreateFormWithHeader = () => {
	//TODO: implement the create resource logic when ready
	// const [createResourceMutation, { isLoading }] = useCreateResourceMutation();

	// const { handleSubmit } = useFormContext<CreateResourceFormValues>();
	const { t } = useTranslation(i18Namespace.marketplace);

	// const onCreateResource = async (data: CreateResourceFormValues) => {
	// 	await createResourceMutation(data);
	// };

	return (
		<Flex componentType="main" gap="24" className={styles.wrapper}>
			{/* <Flex align="center" gap="8" justify={'between'}> */}
			<div className={styles.back}>
				<BackButton />
			</div>
			<Flex gap="20" align="center" className={styles.buttons}>
				<Button variant="link" destructive className={styles['delete-button']}>
					{t(Marketplace.DELETE)}
				</Button>
				{/* TODO: uncomment when the create resource logic is implemented */}
				{/* <Button disabled={isLoading} onClick={handleSubmit(onCreateResource)}> */}
				<Button onClick={() => {}} className={styles['submit-button']}>
					{t(Marketplace.ADD_RESOURCE_SUBMIT)}
				</Button>
			</Flex>
			{/* </Flex> */}
			<Card className={styles.content}>
				<Flex direction="column" gap="28">
					<Text variant="body5-strong" color="black-900">
						{t(Marketplace.ADD_RESOURCE_TITLE)}
					</Text>
					<ResourceForm />
				</Flex>
			</Card>
		</Flex>
	);
};

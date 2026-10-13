import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CompanyFormSkeleton } from '@/entities/company';

import { CompanyEditFormHeaderSkeleton } from '../CompanyEditFormHeader/CompanyEditFormHeader.skeleton';

import styles from './CompanyEditForm.module.css';

export const CompanyEditFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<CompanyEditFormHeaderSkeleton />
			<CardSkeleton className={styles.content}>
				<CompanyFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};

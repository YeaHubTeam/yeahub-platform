import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CompanyFormSkeleton } from '@/entities/company';

import { CompanyCreateFormHeaderSkeleton } from '../CompanyCreateFormHeader/CompanyCreateFormHeader.skeleton';

import styles from './CompanyCreateForm.module.css';

export const CompanyCreateFormSkeleton = () => {
	return (
		<Flex componentType="main" direction="column" gap="24">
			<CompanyCreateFormHeaderSkeleton />
			<CardSkeleton className={styles.content}>
				<CompanyFormSkeleton />
			</CardSkeleton>
		</Flex>
	);
};

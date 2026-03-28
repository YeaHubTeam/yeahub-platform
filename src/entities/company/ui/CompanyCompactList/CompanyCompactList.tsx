import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import { Company } from '../../model/types/companyTypes';

import styles from './CompanyCompactList.module.css';

interface CompanyCompactListProps {
	companies: Company[];
}

export const CompanyCompactList = ({ companies }: CompanyCompactListProps) => {
	const companiesTitles = companies.map((company) => company.title).join(', ');

	return (
		<Tooltip title={companiesTitles}>
			<Flex align="center" justify="center" gap="10" className={styles.list}>
				{companies.map((company) => (
					<img
						className={styles.image}
						key={company.id}
						src={company.imageSrc}
						alt={company.title}
						width="19px"
						height="19px"
					/>
				))}
			</Flex>
		</Tooltip>
	);
};

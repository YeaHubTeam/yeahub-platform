import { useLocation, useNavigate } from 'react-router-dom';

import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';

import styles from './IndustryTabs.module.css';

interface IndustryTabsProps {
	availableIndustries?: string[];
}

export const IndustryTabs = ({ availableIndustries = [] }: IndustryTabsProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	if (!availableIndustries || availableIndustries.length === 0) {
		return null;
	}

	const currentHash = location.hash ? location.hash.replace('#', '') : 'all';

	const handleTabClick = (tabValue: string) => {
		if (tabValue === 'all') {
			navigate({ hash: '' });
		} else {
			navigate({ hash: tabValue });
		}
	};

	return (
		<Flex direction="row" align="center" gap="10" className={styles.container}>
			<Chip
				label="Все"
				className={`${styles.tab} ${currentHash === 'all' ? styles.active : ''}`}
				onClick={() => handleTabClick('all')}
			/>
			{availableIndustries.map((industry) => (
				<Chip
					key={industry}
					label={industry}
					className={`${styles.tab} ${currentHash === industry ? styles.active : ''}`}
					onClick={() => handleTabClick(industry)}
				/>
			))}
		</Flex>
	);
};

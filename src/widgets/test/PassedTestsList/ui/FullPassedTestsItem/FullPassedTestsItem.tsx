import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, TestHistory, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import type { TestHistoryItem } from '@/entities/test';

import { TestCategories } from '../TestCategories/TestCategories';
import { TestParameters } from '../TestParameters/TestParameters';

import styles from './FullPassedTestsItem.module.css';

interface FullPassedTestsItemProps {
	test: TestHistoryItem;
	itemRef: RefObject<HTMLLIElement | null> | null;
}

export const FullPassedTestsItem = ({ test, itemRef }: FullPassedTestsItemProps) => {
	const { id, skills, testNumber } = test;
	const { t } = useTranslation(i18Namespace.testHistory);

	const notEmptySkills = skills.length > 0;

	return (
		<li ref={itemRef}>
			<Link to={route(ROUTES.testing.history.result.page, id)}>
				<Card
					className={styles.container}
					title={t(TestHistory.TEST_TITLE, { number: testNumber })}
					actionTitle={t(TestHistory.LINK)}
					actionRoute={route(ROUTES.testing.history.result.page, id)}
				>
					<TestParameters test={test} />
					{notEmptySkills && <TestCategories testCategories={skills} />}
				</Card>
			</Link>
		</li>
	);
};

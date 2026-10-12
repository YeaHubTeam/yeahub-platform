import { useTranslation } from 'react-i18next';

import { i18Namespace, TestCreate } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getProfileId } from '@/entities/profile';
import {
	CreateTestFilterParams,
	useCreateTestFilters,
	useLazyCreateNewTestQuery,
} from '@/entities/test';

import { PageWrapper } from '@/widgets/PageWrapper';

import { CreateTestFilters } from '../CreateTestFilters/CreateTestFilters';

import styles from './CreateTestPage.module.css';

const INITIAL_FILTERS: CreateTestFilterParams = {
	mode: 'RANDOM',
	count: 10,
};

const CreateTestPage = () => {
	const { t } = useTranslation(i18Namespace.testCreate);
	const profileId = useAppSelector(getProfileId);
	const { filters, onChangeMode, onChangeSkills, onChangeComplexity, onChangeCount } =
		useCreateTestFilters(INITIAL_FILTERS);
	const [createNewTest, { isFetching }] = useLazyCreateNewTestQuery();

	const onCreateNewTest = () => {
		if (!profileId) return;

		createNewTest({
			profileId,
			skills: filters.skills,
			complexity: filters.complexity,
			limit: filters.count ?? INITIAL_FILTERS.count ?? 10,
			mode: filters.mode ?? INITIAL_FILTERS.mode ?? 'RANDOM',
		});
	};

	return (
		<PageWrapper
			shouldVerify
			hasData
			stubs={{}}
			content={
				<section>
					<Card className={styles.container}>
						<Text isMainTitle variant="body6" className={styles.title}>
							{t(TestCreate.TITLE)}
						</Text>
						<CreateTestFilters
							filters={filters}
							onChangeMode={onChangeMode}
							onChangeSkills={onChangeSkills}
							onChangeComplexity={onChangeComplexity}
							onChangeCount={onChangeCount}
						/>
						<Button
							className={styles.button}
							onClick={onCreateNewTest}
							suffix={<Icon icon="arrowRight" size={24} />}
							disabled={isFetching || !profileId}
						>
							{t(TestCreate.CREATE_BUTTON)}
						</Button>
					</Card>
				</section>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CreateTestPage;

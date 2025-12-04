import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Landing, ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import styles from './InterviewCard.module.css';

interface InterviewCardProps {
	iconType: 'settings' | 'student';
	img: string;
	text: string;
}

export const InterviewCard = ({ img, text, iconType }: InterviewCardProps) => {
	const { t } = useTranslation([i18Namespace.landing]);
	const navigate = useNavigate();
	const { isMobile } = useScreenSize();

	return (
		<Flex
			gap="14"
			direction={isMobile ? 'column' : 'row'}
			align={isMobile ? 'center' : 'normal'}
			className={styles.card}
		>
			<div className={styles['image-wrapper']}>
				<img src={img} alt="example" className={styles['card-image']} />
			</div>
			<Flex gap="16" direction="column" className={styles['card-text']}>
				<div className={classNames(styles['text-icon'], styles[`icon-${iconType}`])}>
					<Icon color={iconType === 'settings' ? 'yellow-900' : 'green-900'} icon={iconType} />
				</div>
				<Text variant="body3">{text}</Text>
				<Button onClick={() => navigate(ROUTES.quiz.page)}>
					{t(Landing.TRAINING_INTERVIEW_LINK)}
				</Button>
			</Flex>
		</Flex>
	);
};

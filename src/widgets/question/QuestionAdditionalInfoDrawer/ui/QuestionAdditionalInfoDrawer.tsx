import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import PopoverIcon from '@/shared/assets/icons/DiplomaVerified.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize, useCurrentProject, useModal } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { IconButton } from '@/shared/ui/IconButton';

import { Question } from '@/entities/question';

import { ProgressBlock } from '@/widgets/question/ProgressBlock';
import { QuestionAdditionalInfo } from '@/widgets/question/QuestionAdditionalInfo';

import styles from './QuestionAdditionalInfoDrawer.module.css';

interface QuestionAdditionalInfoDrawerProps {
	question: Question;
}

export const QuestionAdditionalInfoDrawer = ({ question }: QuestionAdditionalInfoDrawerProps) => {
	const { isMobileS } = useScreenSize();
	const { isOpen, onToggle, onClose } = useModal();
	const project = useCurrentProject();
	const { createdBy, checksCount, rate, keywords, complexity, questionSkills } = question;
	const { t } = useTranslation(i18Namespace.questions);
	return (
		<div className={styles['popover-additional']}>
			<IconButton
				className={classNames({ active: isOpen })}
				aria-label={t(Questions.ADDITIONAL_INFO_ARIA_LABEL)}
				form="square"
				icon={<PopoverIcon />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				rootName={isMobileS || project === 'landing' ? 'body' : 'mainLayout'}
				className={classNames(styles.drawer, {
					[styles['drawer-mobile']]: isMobileS,
				})}
				hasCloseButton
			>
				<Card className={styles.main}>
					{project === 'platform' && (
						<ProgressBlock
							className={styles['additional-info-wrapper']}
							checksCount={checksCount}
						/>
					)}
					<QuestionAdditionalInfo
						className={styles['additional-info-wrapper']}
						rate={rate}
						keywords={keywords}
						complexity={complexity}
						questionSkills={questionSkills}
						createdBy={createdBy}
						route={ROUTES.wiki.questions.page}
					/>
				</Card>
			</Drawer>
		</div>
	);
};

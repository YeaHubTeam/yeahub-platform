import { Calendar } from 'react-calendar';

import './EventCalendar.css';

import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory } from '@/shared/config/i18n/i18nTranslations';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Popover } from '@/shared/ui/Popover';

import { Card } from '../../Card';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EventCalendarProps {
	onDateChange: (dates: Value) => void;
	selectedDates: Value;
}

export const EventCalendar = ({ onDateChange, selectedDates }: EventCalendarProps) => {
	const { t } = useTranslation(i18Namespace.interviewHistory);

	const PREV_LABEL = (
		<Icon
			icon="altArrowLeft"
			size={24}
			color="black-600"
			aria-label={t(InterviewHistory.PREV_MONTH)}
		/>
	);
	const NEXT_LABEL = (
		<Icon
			icon="altArrowRight"
			size={24}
			color="black-600"
			aria-label={t(InterviewHistory.NEXT_MONTH)}
		/>
	);

	return (
		<>
			<div className="popover-additional">
				<Popover
					body={
						<Card className={'calendar-block '}>
							<Calendar
								onChange={onDateChange}
								showNeighboringMonth={false}
								prevLabel={PREV_LABEL}
								nextLabel={NEXT_LABEL}
								prev2Label={null}
								next2Label={null}
								selectRange={true}
								value={selectedDates}
							/>
						</Card>
					}
				>
					{({ isOpen, onToggle }) => (
						<IconButton
							className={isOpen ? 'active' : ''}
							aria-label="go to filters"
							form="square"
							icon={<Icon icon="calendar" color="black-600" size={20} />}
							size="S"
							variant={'tertiary'}
							onClick={onToggle}
						/>
					)}
				</Popover>
			</div>
			<div className={'additional-info-wrapper'}>
				<Card className={'calendar-block'}>
					<Calendar
						onChange={onDateChange}
						showNeighboringMonth={false}
						prevLabel={PREV_LABEL}
						nextLabel={NEXT_LABEL}
						prev2Label={null}
						next2Label={null}
						selectRange={true}
						value={selectedDates}
					/>
				</Card>
			</div>
		</>
	);
};

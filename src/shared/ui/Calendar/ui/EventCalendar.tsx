import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { Icon } from 'yeahub-ui-kit';

import { Card } from '../../Card';
import './EventCalendar.css';

import 'react-calendar/dist/Calendar.css';
import { i18Namespace } from '@/shared/config/i18n';
import { A11y } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface EventCalendarProps {
	onDateChange: (dates: Value) => void;
	selectedDates: Value;
}

export const EventCalendar = ({ onDateChange, selectedDates }: EventCalendarProps) => {
	const [isOpenCalendar, setOpenCalendar] = useState<boolean>(false);
	const { t } = useI18nHelpers(i18Namespace.a11y);

	const PREV_LABEL = (
		<Icon
			icon="caretLeft"
			size={24}
			color="--palette-ui-black-600"
			aria-label={t(A11y.PREV_MONTH)}
		/>
	);
	const NEXT_LABEL = (
		<Icon
			icon="caretRight"
			size={24}
			color="--palette-ui-black-600"
			aria-label={t(A11y.NEXT_MONTH)}
		/>
	);

	const handleClick = (): void => {
		setOpenCalendar((prev) => !prev);
	};

	useEffect(() => {
		if (selectedDates) {
			setOpenCalendar((prev) => !prev);
		}
	}, [selectedDates]);

	return (
		<>
			<button className="mobile-calendar" onClick={handleClick}>
				<Icon icon="calendar" color="--palette-ui-black-700" />
			</button>
			<Card className={isOpenCalendar ? 'calendar-block  active' : 'calendar-block '}>
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
		</>
	);
};

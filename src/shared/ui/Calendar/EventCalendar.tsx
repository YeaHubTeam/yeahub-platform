import { useState } from 'react';
import { Calendar } from 'react-calendar';

import { Block } from '../Block';

import './EventCalendar.css';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const EventCalendar = () => {
	const [date, setDate] = useState<Value>(new Date());

	return (
		<Block className="calendar-block">
			<Calendar
				onChange={setDate}
				value={date}
				view="month"
				showNeighboringMonth={false}
				prev2Label={null}
				next2Label={null}
			/>
		</Block>
	);
};

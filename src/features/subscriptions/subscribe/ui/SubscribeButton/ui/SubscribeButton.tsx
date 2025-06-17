import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile } from '@/entities/profile';

import { useLazyGetOrderBySubscriptionIdQuery } from '../api/getNewSubscriptionOrderId';

import styles from './SubscribeButton.module.css';
interface SubscribeButtonProps {
	className?: string;
}

export const SubscribeButton = ({ className }: SubscribeButtonProps) => {
	const { trigger } = useFormContext();
	const [orderId, setOrderId] = useState('');
	const [formEvent, setFormEvent] = useState<EventTarget | null>(null);
	const profile = useAppSelector(getFullProfile);
	const [fetchOrderId] = useLazyGetOrderBySubscriptionIdQuery();

	useEffect(() => {
		if (orderId && formEvent) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			window.pay(formEvent);
			setOrderId('');
			setFormEvent(null);
		}
	}, [formEvent, orderId]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		const isValid = await trigger();
		event.preventDefault();
		try {
			if (isValid) {
				const response = await fetchOrderId('3').unwrap();
				setOrderId(response);
				setFormEvent(event.target);
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Ошибка при получении orderId', error);
		}
	};

	return (
		<form className="payform-tbank" name="payform-tbank" onSubmit={handleSubmit}>
			<input
				className="payform-tbank-row"
				type="hidden"
				name="terminalkey"
				value={process.env.TBANK_TERMINAL_KEY}
			/>
			<input className="payform-tbank-row" type="hidden" name="frame" value="false" />
			<input className="payform-tbank-row" type="hidden" name="language" value="ru" />
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="Сумма заказа"
				name="amount"
				value={200}
				required
			/>
			<input className="payform-tbank-row" type="hidden" name="order" value={orderId} />
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="Описание заказа"
				name="description"
				value={'Членство в сообществе'}
			/>
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="ФИО плательщика"
				name="name"
				value={profile.username}
			/>
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="E-mail"
				name="email"
				value={profile.email}
			/>
			<input
				className="payform-tbank-row"
				type="hidden"
				placeholder="Контактный телефон"
				name="phone"
				value=""
			/>
			<input className="payform-tbank-row" type="hidden" name="reccurentPayment" value="true" />
			<input className="payform-tbank-row" type="hidden" name="customerKey" value={profile.id} />
			<input
				className={classNames(
					'payform-tbank-row',
					'payform-tbank-btn',
					styles.subscribe,
					className,
				)}
				type="submit"
				value="Подписаться"
			/>
		</form>
	);
};

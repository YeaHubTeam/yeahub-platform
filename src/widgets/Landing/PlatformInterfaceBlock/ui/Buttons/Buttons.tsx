import cls from './Buttons.module.css';

export const Buttons = () => {
	return (
		<div className={cls.buttons}>
			<div className={cls.collapse}>
				<span className={cls.left}></span>
				<span className={cls.right}></span>
			</div>
			<div className={cls.info}>
				<span className={cls.top}></span>
				<span className={cls.middle}></span>
				<span className={cls.bottom}></span>
			</div>
		</div>
	);
};

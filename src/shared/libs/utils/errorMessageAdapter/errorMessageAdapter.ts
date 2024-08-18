type ErrorDictionary = Record<number, string>;

const errorDictionary: ErrorDictionary = {
	400: 'Ошибка 400: Некорректный запрос на сервер',
	401: 'Ошибка 401: Логин или пароль введен неверно',
	402: 'Ошибка 402: Требуется оплата',
	403: 'Ошибка 403: Доступ запрещен',
	404: 'Ошибка 404: Страница не найдена',
	500: 'Ошибка 500: Внутренняя ошибка сервера',
	501: 'Ошибка 501: Не реализовано',
};

type ErrorMessageAdapterProps = (errorType: keyof ErrorDictionary) => string;

export const errorMessageAdapter: ErrorMessageAdapterProps = (errorType) => {
	return errorDictionary[errorType];
};

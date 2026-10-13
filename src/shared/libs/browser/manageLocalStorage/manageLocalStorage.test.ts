import { setToLS, getFromLS, getJSONFromLS, removeFromLS } from './manageLocalStorage';

describe('setToLS', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('should save string as is (without JSON.stringify)', () => {
		const key = 'name';
		const value = 'Ivan';

		setToLS(key, value);
		expect(localStorage.getItem(key)).toBe('Ivan');
	});

	test('should save number as string', () => {
		const key = 'age';
		const value = 25;

		setToLS(key, value);

		expect(localStorage.getItem(key)).toBe('25');
	});

	test('should save object as JSON string', () => {
		const key = 'user';
		const value = { name: 'Ivan', age: 30 };

		setToLS(key, value);

		expect(localStorage.getItem(key)).toBe('{"name":"Ivan","age":30}');
	});
});

describe('getFromLS', () => {
	beforeEach(() => {
		localStorage.clear();
	});
	test('must receive the key as a string', () => {
		const key = 'user';
		const value = 'Ivan';
		localStorage.setItem(key, value);

		getFromLS(key);

		expect(localStorage.getItem(key)).toBe('Ivan');
	});
});

describe('getJSONFromLS', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('returns an object if there is a JSON object in localStorage', () => {
		const user = { name: 'Ivan', age: 32 };
		localStorage.setItem('user', JSON.stringify(user));

		expect(getJSONFromLS('user')).toEqual({ name: 'Ivan', age: 32 });
	});

	test('returns an arr if there is a JSON object in localStorage', () => {
		const arr = [1, 2, 3];
		localStorage.setItem('arr', JSON.stringify(arr));

		expect(getJSONFromLS('arr')).toEqual([1, 2, 3]);
	});

	test('returns null if the key is not in localStorage', () => {
		expect(getJSONFromLS('non-existent_key')).toBeNull();
	});
});

describe('removeFromLS', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('remove key', () => {
		const key = 'user';
		const age = 32;
		localStorage.setItem(key, age);

		removeFromLS(key);

		expect(localStorage.getItem(key)).toBeNull();
	});
});

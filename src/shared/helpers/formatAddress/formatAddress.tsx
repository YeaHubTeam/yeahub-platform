export const formatAddress = (country: string, city: string) => {
	if (country && city) return `${country}, ${city}`;
	if (country) return country;
	if (city) return city;

	return null;
};

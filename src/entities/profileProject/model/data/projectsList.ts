import type { ProfileProject } from '../types/profileProject';

// Временные данные
export const PROJECT_LIST: ProfileProject[] = [
	{
		id: '1',
		name: 'Clinically — clinic & health care website',
		imgUrl:
			'https://s3-alpha-sig.figma.com/img/ac4b/d848/42e8146c18b1e5f1565291e98cd03576?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MaDIdrZXOkOqmUm5052seIcuP~bKStOz2eZeJJnjRGf~8FaC3kKWz2ojP4NRjKMN9Zm5CqBOPw6tPixo2f1B76nSm6Acq0JlZnTtLrhGedcpgpSUwsvC3D2XGT0ukSV9diifbFyNummDxhpNZHeVgSr2Zd~YMDZ8y6o-4iMBSEg~kT6ne3OpalMshat4z-mrIO5y9zONbBfynxX-o5Rx9ymdKzKcVIORIpnQzixMnLKGUnSmLSjUnSoBHV0QhuGGQqd3HWGs~LD7aGvq3zdhzIpW5hImU~lafv1UUqHW4zXOQX4-26XOyI4FFGwn4RYBzJl2qABbcWFrue58Lm4BuA__',
	},
	{
		id: '2',
		name: 'Clinically — clinic & health care website',
		imgUrl:
			'https://s3-alpha-sig.figma.com/img/67ec/a933/d5b241dea30985aaaa4b94767eea8c5e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Nq4b1IpV0PnraCgKLFQ3X37BIeB4vYwwcZ6LPcO6aPZCnqg8640d9VP7~UjBT1xwrN4oXpYssO0AZl8Y-sPcdkk~CEGy~d5QZ1-UbId8V401PfveHIP1WGiqqiHlXrgLQMB6~Jph9MRm1D-fJ-DqikTPnLlxFiceDqAX3fvBbXnqY4rsnrNbTGkCyJSSdlo9cjgHky~r1ZdPtFQKIaeFolBXRoefOyoBtLlM83~LyBStPS7c4hgdYs8-mxaq3T0QPqk5pYR9mAziegCi0oTAnPxMC-qxqxOoDy33bncyfT5K9U97Y2LdNucS~QAZB~NVtWeLLepYuMY7dLB1TyKUAQ__',
	},
	{
		id: '3',
		name: 'Clinically — clinic & health care website',
		imgUrl:
			'https://s3-alpha-sig.figma.com/img/83fc/48b4/8605f77c1f184b81f881cb7b5b49c59a?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i29X1xjTMwRAo~tg2hfXR-66sOvy2DOc0eANIRekNK5fWtgcVomj7z3BdnNNNgRNor1NMzdUCKriCRETz1FD0sgOz5cAYr9qRYRAx6eO3wbGeQJYFCIePFnx5UPWTMyeMpQQyxY3hfsflchNF~Tjn6eNiAnxYUcunFO3jLUSJ6PfZjeMh8I3MXombXqUGOhcw-AC1EvLhSs5-N1N2iiiJ-tiXxuhjccn1oAtykVEKzW-X1daEYkMKqcOrUz3VUZP6o6TjZMKSGU5-Tn372N6~5uzQ~QCCnXLU3ZejHnlvpfixrbv58QgcS5NpsigjcVBVj46hIg1au9ItUndgi5CFg__',
	},
	{
		id: '4',
		name: 'Clinically — clinic & health care website',
		imgUrl:
			'https://s3-alpha-sig.figma.com/img/935f/b3b9/143caea88c9ad1fe057fdcb958e466ad?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dlgZ6BbENzXzrWyIIaBSIzAmCPILLZrIhZ1XFpTapBGQI7tEdOOW3h2SgtiZBG44qfWorpnEhlXoeWzB4qUCuFzlVLOCKSlDUT4QY-gQA4Mvro9ZtHsWhQe2RCnbvpa5vlkTlcJGBwNe76NEzeKqLj66tu3gaZlgNt1wB06XjC9nEiJFLV25KknnNl8M720Ncvwm7Zt6UPF4cWzYQVO46MvfFCPUEDKOZZiROBHAJ7Bd2sy3a3bvpdgmW0i3Cpu5jPb9-YVJu9EDnAUZhwPIZqAM~sbuv-p71QqfgWvO266p4Sr9A2TtAvEfqhAs-JyNk0qX3lMsZJkBj9KLDYlh8Q__',
	},
	{
		id: '5',
		name: 'Clinically — clinic & health care website',
		imgUrl:
			'https://s3-alpha-sig.figma.com/img/c4c7/b60e/4f63159ad7846452817ca5969c087226?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KcjnfSDQoWR0VK1hS8J9~HM~ee5LNqJoP7d1jSloIa0HTZgXuvbyFVFVIpzH0~VZDLFpDLT~QtRDDUujqO7bwEfewoNDK5zQWdALmPFQoHRcLsK08d6q~z1BxNP-oJNH2EG6p3EqQRngVXT41WE5Vg7jfA2azrByLbelNMg5CED53IPny38kfcV9ne5eMOVf96JmOIJ0yKixaZ~vDB9MIN0WvlNp4EEfl5UUPVYnUL0-bw9Zp-~9t970HFG4~SCB-oZVEv-6xhcfULHmzG9Xpt-ElZmcPYN9OxjMKRj8f03k237yrGizycStxnKWevpUuewhwx7WLqN8Gz7ONvhS7w__',
	},
];

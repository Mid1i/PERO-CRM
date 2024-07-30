import type { IRecentOrder } from "@/interfaces/IRecentOrder";
import type { IChartColors } from "@/interfaces/IChartColors"
import type { IAnalytics } from "@/interfaces/IAnalytics";
import type { IWidget } from "@/interfaces/IWidget";
import type { IUser } from "@/interfaces/IUser";


export const WIDGETS: IWidget[] = [
	{
		icon: `
			<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M6.84211 15.5556H4.73684V7.77778H6.84211V15.5556ZM11.0526 15.5556H8.94737V4.44444H11.0526V15.5556ZM15.2632 15.5556H13.1579V11.1111H15.2632V15.5556ZM17.8947 17.8889H2.10526V2.22222H17.8947V17.8889ZM17.8947 0H2.10526C0.947368 0 0 1 0 2.22222V17.7778C0 19 0.947368 20 2.10526 20H17.8947C19.0526 20 20 19 20 17.7778V2.22222C20 1 19.0526 0 17.8947 0Z" fill="currentColor"/>
			</svg>
		`,
		percentage: 61,
		title: "Общие продажи",
		value: 280
	},
	{
		icon: `
			<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M5 6.25H0V20H5V6.25Z" fill="currentColor"/>
				<path d="M20 11.25H15V20H20V11.25Z" fill="currentColor"/>
				<path d="M12.5 0H7.5V20H12.5V0Z" fill="currentColor"/>
			</svg>

		`,
		percentage: 50,
		title: "Общие затраты",
		value: 120440
	},
	{
		icon: `
			<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M0 18.4194L7.5 10.5058L11.5 14.7208L18.59 6.32244L20 7.80822L11.5 17.882L7.5 13.667L1.5 20L0 18.4194ZM1.5 13.6776L7.5 7.34457L11.5 11.5595L20 1.48577L18.59 0L11.5 8.39831L7.5 4.18335L0 12.0969L1.5 13.6776Z" fill="currentColor"/>
			</svg>
		`,
		percentage: 85,
		title: "Общая выручка",
		value: 250170
	}
];

export const ANALYTICS: IAnalytics[] = [
	{
		icon: `
			<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM0 0V2H2L5.6 9.59L4.25 12.04C4.09 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.48C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z" fill="currentColor"/>
			</svg>
		`,
		title: "Онлайн заказы",
		previousValue: 1024,
		value: 1500
	},
	{
		icon: `
			<svg fill="none" height="20" viewBox="0 0 18 20" width="18">
				<path d="M15.75 4H13.5C13.5 1.79 11.4862 0 9 0C6.51375 0 4.5 1.79 4.5 4H2.25C1.0125 4 0 4.9 0 6V18C0 19.1 1.0125 20 2.25 20H15.75C16.9875 20 18 19.1 18 18V6C18 4.9 16.9875 4 15.75 4ZM6.75 8C6.75 8.55 6.24375 9 5.625 9C5.00625 9 4.5 8.55 4.5 8V6H6.75V8ZM9 2C10.2375 2 11.25 2.9 11.25 4H6.75C6.75 2.9 7.7625 2 9 2ZM13.5 8C13.5 8.55 12.9937 9 12.375 9C11.7563 9 11.25 8.55 11.25 8V6H13.5V8Z" fill="currentColor"/>
			</svg>
		`,
		title: "Офлайн заказы",
		previousValue: 510,
		value: 492
	},
	{
		icon: `
			<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5C15 6.32608 14.4732 7.59785 13.5355 8.53553C12.5979 9.47322 11.3261 10 10 10C8.67392 10 7.40215 9.47322 6.46447 8.53553C5.52678 7.59785 5 6.32608 5 5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0ZM10 12.5C15.525 12.5 20 14.7375 20 17.5V20H0V17.5C0 14.7375 4.475 12.5 10 12.5Z" fill="currentColor"/>
			</svg>
		`,
		title: "Новые пользователи",
		previousValue: 219,
		value: 400
	}
];

export const RECENT_ORDERS: IRecentOrder[] = [
	{
		id: 10,
		creationDate: "20.07.2024",
		totalPrice: 10233,
		status: "Оплачен"
	},
	{
		id: 11,
		creationDate: "20.07.2024",
		totalPrice: 15423,
		status: "Доставлен"
	},
	{
		id: 12,
		creationDate: "22.07.2024",
		totalPrice: 5200,
		status: "Доставлен"
	},
	{
		id: 13,
		creationDate: "21.07.2024",
		totalPrice: 7103,
		status: "Отменен"
	},
	{
		id: 14,
		creationDate: "21.07.2024",
		totalPrice: 5895,
		status: "Доставлен"
	},
	{
		id: 15,
		creationDate: "22.07.2024",
		totalPrice: 9999,
		status: "Оплачен"
	},
	{
		id: 16,
		creationDate: "22.07.2024",
		totalPrice: 1058,
		status: "Оплачен"
	}
];

export const WEEK_SALES: number[] = [36, 75, 17, 91, 103, 47, 114];

export const WEEK_USERS: number[] = [8, 10, 10, 34, 20, 53, 15];

export const SALES_COLORS: IChartColors = {
	backgroundColor: "rgb(115, 128, 236, .2)",
	borderColor: "#7380EC",
	pointBackgroundColor: "#7380EC"
}

export const USERS_COLORS: IChartColors = {
	backgroundColor: "rgb(65, 241, 182, .2)",
	borderColor: "#41F1B6",
	pointBackgroundColor: "#41F1B6"
}

export const USERS_TABLE_HEADERS = ["Аватар", "Логин", "Почта", "Номер телефона", "Страна", "Дата рождения", "Дата регистрации"];

export const USER: IUser = {
	id: 1,
	avatar: "/src/assets/images/avatar.png",
	login: "midi",
	email: "testtest@mail.ru",
	phone: 79626373903,
	country: "Россия",
	dateOfBirth: "30.08.2003",
	dateOfRegistration: "26.07.2024"
};

export const USERS: IUser[] = new Array(45).fill(USER);

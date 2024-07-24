import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";


declare module "vue-router" {
	interface RouteMeta {
		title: string,
		headerTitle: String
	}
}


const routes = [
	{
		path: "/",
		component: () => import("@/views/Main.vue"),
		meta: {
			title: "Главная - PERO CRM",
			headerTitle: "Главная"
		}
	},
	{
		path: "/users",
		component: () => import("@/views/Users.vue"),
		meta: {
			title: "Пользователи - PERO CRM",
			headerTitle: "Пользователи"
		}
	},
	{
		path: "/orders",
		component: () => import("@/views/Orders.vue"),
		meta: {
			title: "Заказы - PERO CRM",
			headerTitle: "Заказы"
		}
	},
	{
		path: "/products",
		component: () => import("@/views/Products.vue"),
		meta: {
			title: "Товары - PERO CRM",
			headerTitle: "Товары"
		}
	},
	{
		path: "/calendar",
		component: () => import("@/views/Calendar.vue"),
		meta: {
			title: "Календарь - PERO CRM",
			headerTitle: "Календарь"
		}
	},
	{
		path: "/kanban",
		component: () => import("@/views/Kanban.vue"),
		meta: {
			title: "Канбан - PERO CRM",
			headerTitle: "Канбан доска"
		}
	},
	{
		path: "/text-editor",
		component: () => import("@/views/TextEditor.vue"),
		meta: {
			title: "Редактор текста - PERO CRM",
			headerTitle: "Редактор текста"
		}
	},
	{
		path: "/color-picker",
		component: () => import("@/views/ColorPicker.vue"),
		meta: {
			title: "Выбор цвета - PERO CRM",
			headerTitle: "Выбор цвета"
		}
	},
	{
		path: "/line-chart",
		component: () => import("@/views/LineChart.vue"),
		meta: {
			title: "Line Chart - PERO CRM",
			headerTitle: "Line Chart"
		}
	},
	{
		path: "/area-chart",
		component: () => import("@/views/AreaChart.vue"),
		meta: {
			title: "Area Chart - PERO CRM",
			headerTitle: "Area Chart"
		}
	},
	{
		path: "/pie-chart",
		component: () => import("@/views/PieChart.vue"),
		meta: {
			title: "Pie Chart - PERO CRM",
			headerTitle: "Pie Chart"
		}
	},
	{
		path: "/bar-chart",
		component: () => import("@/views/BarChart.vue"),
		meta: {
			title: "Bar Chart - PERO CRM",
			headerTitle: "Bar Chart"
		}
	}
];


export const router = createRouter({
	history: createWebHistory(),
	routes
});


router.afterEach(to => nextTick(() => document.title = to.meta.title));
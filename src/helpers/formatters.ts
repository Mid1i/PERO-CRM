export const onFormatPrice = (price: number): string => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;

export const onFormatPhone = (phone: string): string => `${phone[0] === "7" ? "+7" : "8"} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;
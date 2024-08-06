import { ref, Ref } from "vue";


export const usePopup = (): { isActivePopup: Ref<boolean>, togglePopup: () => void } => {
	const isActivePopup = ref<boolean>(false);

	const togglePopup = (): boolean => isActivePopup.value = !isActivePopup.value;


	return { isActivePopup, togglePopup };
}
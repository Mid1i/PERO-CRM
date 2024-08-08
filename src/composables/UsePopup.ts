import { Ref, ref } from "vue";


export const usePopup = (): { isActivePopup: Ref<boolean>, togglePopup: () => void } => {
	const isActivePopup = ref<boolean>(false);

	const togglePopup = (): void => { 
		isActivePopup.value = !isActivePopup.value;
	}


	return { isActivePopup, togglePopup };
}
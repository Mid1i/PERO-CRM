import { ref, Ref } from "vue";


export const useActivePopup = (): { activePopup: Ref<string | null>, updateActivePopup: (id: string | null) => void } => {
	const activePopup = ref<string | null>(null);


	const updateActivePopup = (id: string | null): void => {
		activePopup.value = activePopup.value === id ? null : id;
	}


	return { activePopup, updateActivePopup };
}
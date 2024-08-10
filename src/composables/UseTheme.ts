import type { TypeThemes } from "@/types/TypeThemes";
import { Ref, inject } from "vue";


type TypeSwitchThemeFunc = (currentTheme: TypeThemes) => void;


export const useTheme = (): { theme: Ref<TypeThemes>, switchTheme: TypeSwitchThemeFunc } => {
	const theme = inject<Ref<TypeThemes>>("theme");
	
	const switchTheme = inject<TypeSwitchThemeFunc>("switchTheme");

	if (!switchTheme || !theme) {
		throw new Error("Theme is not provided!");
	}


	return { theme, switchTheme };
}
import type { TypeThemes } from "@/types/TypeThemes";
import { Ref, inject } from "vue";


type TypeSwitchThemeFunc = (currentTheme: TypeThemes) => void;


export const useTheme = (): { theme: Ref<TypeThemes>, switchTheme: TypeSwitchThemeFunc } => {
	const theme = <Ref<TypeThemes>>inject("theme");

	const switchTheme = <TypeSwitchThemeFunc>inject("switchTheme");


	return { theme, switchTheme };
}
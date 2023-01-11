import LocaleContext from "/context/LocaleContext";
import { useContext } from "react";

export default function useLocaleState(ls=null) {
    const contextState = useContext(LocaleContext);
    return ls ? [ls, () => null] : contextState
}
import useLocaleState from "./useLocaleState";
import DictionaryService from "Services/DictionaryService";

const languageMap = {
    "al": "al",
    "en": "en"
}

export default function useLocaleProp() {
    const [localeState] = useLocaleState();

    const localText = (obj, prop, lang="al") => {

        if (!(lang in languageMap)) {
            return;
        }
        return DictionaryService.dtlProp(obj, prop, localeState);
    }
    
    return localText;
}
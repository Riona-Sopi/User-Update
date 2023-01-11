import DictionaryService from "/Services/DictionaryService";
import useLocaleState from "./useLocaleState";

const languageMap = {
    "al": DictionaryService.dtl,
    "en": DictionaryService.dtli
}

export default function useLocaleText() {
    const [localeState] = useLocaleState();


    const localText = (text, lang = "al") => {
        if (!(lang in languageMap)) {
            return;
        }
        return languageMap[lang](text, localeState);
    }

    return localText;
}
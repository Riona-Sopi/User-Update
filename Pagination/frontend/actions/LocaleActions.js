const initialLocale = 1;


const LocaleActions = (localeState, setLocaleState) => ({
    changeLocale: (locale) => {
        setLocaleState(locale);
    }
});

export { 
    initialLocale
}

export default LocaleActions;
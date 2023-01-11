class DictionaryService {

    static DTL_DICTIONARY = [];
    static DTLI_DICTIONARY = [];
  
    static dtl = (s, locale) => {
      if (parseInt(locale) === 1) return s;
      if (!(s.toLowerCase() in DictionaryService.DTL_DICTIONARY)) return `${s} - dtl`;
    
      return DictionaryService.DTL_DICTIONARY[s.toLowerCase()];
    };
    
    
    
    static dtli = (s, locale) => {
      if (parseInt(locale) === 0) return s;
      if (!(s.toLowerCase() in DictionaryService.DTLI_DICTIONARY)) return `${s} - dtli`;
    
      return DictionaryService.DTLI_DICTIONARY[s.toLowerCase()];
    }
    
    
    static dtlProp = (obj, prop, locale) => {
      const k = { [prop]: prop };
      const name = `${Object.keys(k)[0]}_en`;
    
      if (!(name in (obj ?? {}))) return obj?.[prop] ?? '';
      if (parseInt(locale) === 1) return obj[prop];
    
      return obj[name];
    }
  
    static setDictionaries = ({ dtl, dtli }) => {
      DictionaryService.DTL_DICTIONARY = dtl;
      DictionaryService.DTLI_DICTIONARY = dtli;
    }
  
  }
  
  export default DictionaryService
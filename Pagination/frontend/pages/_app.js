import { useEffect } from "react";
import Head from 'next/head';
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/adminstyle.css';
import "../styles/Brendet/Brendet.css";
import "../styles/Footer.css";
import "../styles/Navbar.css";
import "../styles/globals.css";
import "../styles/signup.css";
import "../styles/dashboard.css";
import {useCallback} from 'react';

import LocaleActions, { initialLocale } from '/actions/LocaleActions';
import LocaleContext from '/context/LocaleContext';





import {useState} from 'react';


function MyApp({ Component, pageProps }) {

  const [localeState, setLocaleState] = useState(initialLocale);
  const localeActions = useCallback(LocaleActions(localeState, setLocaleState), []);

    const [showing, setShowing] = useState(false);

      useEffect(() => {
        setShowing(true);
      }, []);
    
      if (!showing) {
        return null;
      }
    
      if (typeof window === 'undefined') {
        return <></>;
      } else {
return (
<>

    <Head>
<meta charSet="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
   <link rel="preload" href="https://via.placeholder.com/160" as="image"></link>
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
   <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous" async></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous" async></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
 <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
</Head>
  <LocaleContext.Provider value={[localeState, localeActions]}>
<Component {...pageProps} />
</LocaleContext.Provider>
</>
);
}}
export default MyApp;
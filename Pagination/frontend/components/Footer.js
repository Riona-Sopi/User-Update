import Link from 'next/link';
import NewsletterSubscribe from './NewsLetterSubscribe';

export default function Footer () {
    return(
      <>
      <div className='Footer'>
         <div>
           <div className='footerlogo'>
            <img className="log" src="/images/alb.png" alt="" />
           </div>
           <div className='footer1'>
            <div className='row'>
             <div className='col-lg-3 col-6 text-center p-0'>
               <div className='locationcon'>
                 <p className='firstcon'>Zona e Re Industriale, Veternik</p>
                 <p>10000 Prishtinë, Kosovë</p>
               </div>  
             </div>
             <div className='col-lg-3 col-6 text-center p-0'>
                <div className='phone'>
                 <p className='firstcon '>+381 (0) 38 500 202 100</p>
                 <p>albi@albicenter.com</p>
                </div>
             </div>
             <div className='col-lg-3 col-6 p-0' style={{margin:"auto"}}>
               <div className='thirdpart'>
                 <Link href="/lokacioni"><p className='thirdcon'> Lokacioni</p></Link>
                 <Link href="/faq"><p className='thirdcon'>FAQ</p></Link>
                 <Link href="/ankesat"><p className='thirdcon'>Ankesat</p></Link>
                 <Link href="/kontakti"><p>Kontakti</p></Link>
                </div>
             </div>
             <div className='col-lg-3 text-center p-0 justify-content-center'>
                  <div className='footerbtn'>
                     <Link href="/KonkursPune"><input type="button" id='workbtn' name='KonkursPune' value="KONKURS PUNE" /></Link>
                     <br />
                     <div className='msgtext'>
                        *Abonohu per me te rejat!
                    </div>
                     <NewsletterSubscribe/>
                  </div>
              </div>
               
             </div>
           </div>

            <div className="socials">
                 <img className="logos" src="/images/fb logo-01.svg" alt="" />
                 <img className="logos" src="/images/insta logo-01.svg" alt="" />
                 <img className="logos" src="/images/YT logo-01.svg" alt="" />
                 <img className="logos" src="/images/tw logo-01.svg" alt="" />
                 <img className="logos" src="/images/in logo-01.svg" alt="" />
             </div>
             
           </div>
           <hr className="footerhr" />
              <p className="copyr">	&#169;2022 ALBIMALL</p>
         </div>
      </>
    )
}


    // <div className="foot">
    //         <div className="row foot1">
    //             <div className="logg">
    //               <img className="log" src="/images/alb.png" alt="" />
    //             </div>
    //             <div className="col-lg-3  col-6">
    //               <div className="first">
    //                 <p className="fs">Zona e Re Industriale, Veternik</p>
    //                 <p className="ad">10000 Prishtinë, Kosovë</p>
    //               </div>
    //             </div>
    //             <div className="col-lg-3  col-6">
    //                <div className="firstt">
    //                 <p className='phf'>+381 (0) 38 500 202 100</p>
    //                 <p className='phf'>albi@albicenter.com</p>
    //                </div> 
    //             </div>
    //             <div className="col-lg-3  col-6">
    //                    <div className="sec">
    //                     <div className="row no-gutter">
    //                    <Link href="/Location"><div className="col-lg-3 col-3 pl-0 "><p className='lk'> Lokacioni</p></div></Link>
    //                     <Link href="/Faq"><div className="col-lg-3 col-3 pl-0 " ><p className='lk'>FAQ</p></div></Link>
    //                    <Link href="/Ankesat"><div className="col-lg-3 col-3 pl-0 "><p className='lk'>Ankesat</p></div></Link> 
    //                     <Link href="/Kontakti"><div className="col-lg-3 col-3 pl-0 "><p className='lk'>Kontakti</p></div></Link>
    //                 </div>
    //              </div>
    //             </div> 
    //             <div className="col-lg-3  col-sm-12 pl-0">
    //               <div className="Btt">
    //                 <Link href="/KonkursPune"><button className="btt">KONKURS PUNE</button></Link>
    //                 <br />
    //                 <button className="btt">ABONOHU PËR TË REJAT</button>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className="socials">
    //             <img className="logos" src="/images/fb logo-01.svg" alt="" />
    //             <img className="logos" src="/images/insta logo-01.svg" alt="" />
    //             <img className="logos" src="/images/YT logo-01.svg" alt="" />
    //             <img className="logos" src="/images/tw logo-01.svg" alt="" />
    //             <img className="logos" src="/images/in logo-01.svg" alt="" />
    //         </div>
    //             <hr className="hh" />
    //             <p className="copyr">	&#169;2022 ALBIMALL</p>
    //      </div>
    
   
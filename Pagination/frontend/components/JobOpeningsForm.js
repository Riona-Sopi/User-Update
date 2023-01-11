import { useState } from 'react';
import { decode } from 'html-entities';

const JobOpenings = ( { status, message, onValidated }) => {

  const [ error, setError ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [job, setJob] = useState("Interested");

  /**
   * Handle form submit.
   *
   * @return {{value}|*|boolean|null}
   */
  const handleFormSubmit = () => {

    setError(null);

    if ( ! email ) {
      setError( 'Please enter a valid email address' );
      return null;
    }

    const isFormValidated = onValidated({ EMAIL: email, JOBOPENING: job });

    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated && job;
  }

  /**
   * Handle Input Key Event.
   *
   * @param event
   */
  const handleInputKeyEvent = ( event ) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  }

  /**
   * Extract message from string.
   *
   * @param {String} message
   * @return {null|*}
   */
  const getMessage = (message) => {
    if ( !message ) {
     return null;
    }
    const result = message?.split('-') ?? null;
    if ( "0" !== result?.[0]?.trim() ) {
     return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode( formattedMessage ) : null;
  }

  return (

    // <div className="notifierSpace">
    //             <div className="notifier">
    //               <p>
    //                *Nëse ju dëshironi të informoheni në lidhje me konkurse të <br />         
    //                 reja pune, ju lutem abonohuni përmes butonit më poshtë.
    //               </p>
    //                <form action="" className="notifyForm">
    //                  <input type="email" placeholder="Email" name="Email" id="email1" />
    //                <div className="notifybtn"> <button className="notify">NJOFTIME</button></div>
                  
    //                </form>
    //           </div>
    //           </div>

    <div className="notifierSpace">
      <div className="notifier">
         <p>
            *Nëse ju dëshironi të informoheni në lidhje me konkurse të <br />         
            reja pune, ju lutem abonohuni përmes butonit më poshtë.
          </p>
        <div className="notifyForm">
          <input
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            id="email1"
            placeholder="Email"
            // className="subscribebtn"
            onKeyUp={(event) => handleInputKeyEvent(event)}
          />
            <div className="notifybtn"><button className="notify" onClick={handleFormSubmit}>NJOFTIME</button></div>
        <div class="mc-field-group">
            {/* <label for="mce-JOBOPENING">Job Openings </label> */}
            <input type="hidden" value="Interested" name="JOBOPENING" class="" id="mce-JOBOPENING" onKeyUp={(event) => handleInputKeyEvent(event)} onChange={(event) => setJob(event?.target?.value ?? 'Interested')}/>
            {/* <span id="mce-JOBOPENING-HELPERTEXT" class="helper_text"></span> */}
        </div>
        {/* <div className="button-wrap wp-block-button"> */}
          {/* <button className="wp-block-button__link subscribebtn_submit" onClick={handleFormSubmit}>
            Dërgo
          </button> */}
        </div>
        </div>
      {/* </div> */}
      <div className="newsletter-form-info msgtext">
        {status === "sending" && <div>Duke dërguar...</div>}
        {status === "error" || error ? (
          <div
            className="newsletter-form-error msgtext"
            dangerouslySetInnerHTML={{ __html: error || getMessage( message ) }}
          />
        ) : null }
        {status === "success" && status !== "error" && !error && (
          <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </div>
    </div>
  );
}

export default JobOpenings
import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';
import './style.css';

const ButtonMaker = ({  }) => {

    const [integrationType, setIntegrationType] = useState('SHARE');
    const [walletAddress, setWalletAddress] = useState('000');   

    const customizeTransakBtn = () => {
        return `<a href="https://staging-global.transak.com?apiKey=${process.env.REACT_APP_TRANSAK_STAGING_API_KEY}&walletAddress=${walletAddress}"><button type="button" class="tipfi-btn">💲TipFi💰</button></a>`
    }

    const [btnElmt, setBtnElmt] = useState(customizeTransakBtn()); 
          
    const [iFrameElmt, setIframeElmt] = useState(
        `<iframe height="625" title="Transak On/Off Ramp Widget"
        src="https://staging-global.transak.com?apiKey=${process.env.REACT_APP_TRANSAK_STAGING_API_KEY}" 
        frameborder="no" allowtransparency="true" allowfullscreen="" 
        style="display: block; width: 100%; max-height: 625px; max-width: 500px;">
        </iframe>`
      );

     const renderCodeEditor = () => {
        return <CodeEditor
            value={integrationType == 'SHARE' ? btnElmt : iFrameElmt}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setBtnElmt(evn.target.value)}
            padding={50}
            style={{
            fontSize: 16,
            backgroundColor: "#000",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            width: 425
            }}
        />
     }

     const renderCodeEditorWithTabs = () => {
        return(
            <div id="code-generator">
                <div id='tabs-selector'>
                    <span onClick={(e) => setIntegrationType('SHARE')}>Share</span>  {/* Button */}
                    <span onClick={(e) => setIntegrationType('EMBED')}>Embed</span>  {/* iFrame */}
                    {/* <ul className='tabs-choices'>
                        <li id='share'>Share (Button)</li>
                        <li id='embed'>Embed (iFrame)</li>
                    </ul> */}
                </div>
                {renderCodeEditor()}
            </div>
        )
     }

    useEffect(() => {
        setBtnElmt(customizeTransakBtn());
	}, [walletAddress])	

    // const location = useLocation();
	return (
		<div data-color-mode="dark">
            <p>STEP I. &nbsp; Customize your TipFi button</p>
        
            <div dangerouslySetInnerHTML={{__html: btnElmt}} />

            <div className="spacer"></div>

            <label htmlFor='address'>Your Wallet Address: </label> <br/>
               <input type='text' name='address' size='50' onChange={(e) => {setWalletAddress(e.target.value)}}/>
           

            <div className="spacer"></div>

            {renderCodeEditorWithTabs()}


            {/* Generate Code */}
            {/*<Link to={'/buttonMaker'}>Button Maker</Link>*/}
        </div>	
	)
}

export default ButtonMaker;
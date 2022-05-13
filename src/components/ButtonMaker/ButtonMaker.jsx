import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';
import './style.css';

/* TODO: TipMe Button: [ 💁🏻‍♀️TipMe 💌 ] [ 👮TipMe🔖 ] */

const ButtonMaker = ({  }) => {

    const [integrationType, setIntegrationType] = useState('SHARE');
    const [walletAddress, setWalletAddress] = useState('');   
    const [btnColor, setBtnColor] = useState('cyan');          
    const [network, setNetwork] = useState('Ethereum');
    const [crypto, setCrypto] = useState('ETH');
    const [networkChoice, setNetworkChoice] = useState('');
    const [cryptoChoice, setCryptoChoice] = useState('');

    // TODO: get list of all networks & currencies via Transak API
    const [networkAndCurrencies, setNetworkAndCurrencies] = useState(
        [ { blockchain: 'Ethereum', currencies: ['ETH', 'UNI', 'DAI', 'USDT', 'USDC',   'SAND', 'ENJ']}, 
            {blockchain: 'Polygon', currencies: ['MATIC', 'USDC', 'MANA', 'WETH']}, {blockchain: 'Solana', currencies: ['USDC']}, 
            {blockchain: 'Algorand', currencies: ['USDC']}, {blockchain: 'Mainnet', currencies: ['BTC', 'XRP', 'ONE'] } ]
        );

    const showCurrencyOptions = () => {
        return networkAndCurrencies.map((obj, i) => {
           if (obj.blockchain === network) {
                return networkAndCurrencies[i].currencies.map(str => {
                    return <option value={str === 'USDC' ? 'USD' : str}>{str}</option>
                })
           }
        })                  
    }

    /* Refactor Code */
    const getNetworkQuery = () => {
        switch(networkChoice.toUpperCase()) {            
            case 'PREFERRED':
              return `&defaultNetwork=${network}`;
              break;
            case 'REQUIRED':
              return `&network=${network}`;
              break;
            default:
              return '';
        }
    }    
    const getCryptoQuery = () => {
        switch(cryptoChoice.toUpperCase()) {
            case 'PREFERRED':
              return `&defaultCryptoCurrency=${crypto}`;
              break;
            case 'REQUIRED':
              return `&cryptoCurrencyCode=${crypto}`;
              break;
            default:
              return '';              
        }
    }  
    
    const customizeTransakBtn = () => {
        return `<a href="https://staging-global.transak.com?apiKey=${process.env.REACT_APP_TRANSAK_STAGING_API_KEY}${walletAddress ? '&walletAddress=' + walletAddress : ''}${getNetworkQuery()}${getCryptoQuery()}" target="_blank"><button type="button" class="tipfi-btn gradient-${btnColor}">💲TipFi💰</button></a>`
    }  
    const customizeTransakWidget = () => {
        return `<iframe height="625" title="Transak On/Off Ramp Widget"
        src="https://staging-global.transak.com?apiKey=${process.env.REACT_APP_TRANSAK_STAGING_API_KEY}${walletAddress ? '&walletAddress=' + walletAddress : ''}${getNetworkQuery()}${getCryptoQuery()}" target="_blank"><button type="button" class="tipfi-btn gradient-${btnColor}" 
        frameborder="no" allowtransparency="true" allowfullscreen="" 
        style="display: block; width: 100%; max-height: 625px; max-width: 500px;">
        </iframe>`
    }    

    const [btnElmt, setBtnElmt] = useState(customizeTransakBtn());

    const [iFrameElmt, setIframeElmt] = useState(customizeTransakWidget());

     const renderCodeEditor = () => {
        return <CodeEditor
            value={getCode()}
            language="js"
            placeholder="Please enter JS code."
            onChange={(evn) => setBtnElmt(evn.target.value)}
            padding={50}
            style={{
            fontSize: 16,
            backgroundColor: "#000",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            width: 600,
            border: `0.5px solid gray`
            }}
        />
     }

     //  TODO: Highlight active tab; change border color to cyan or btnColor
     //  FIX: Tab layout positioning
     const renderCodeEditorWithTabs = () => {
        return(
            <div id="code-generator">
                <div id='tabs-selector'>
                    <span onClick={(e) => setIntegrationType('SHARE')}>Button HTML</span>  {/* Button */}
                    <span onClick={(e) => setIntegrationType('EMBED')}>Widget HTML</span>  {/* iFrame */}   
                    <span onClick={(e) => setIntegrationType('CSS')}>CSS</span>
                    {/* <ul className='tabs-choices'>
                        <li id='share'>Share (Button)</li>
                        <li id='embed'>Embed (iFrame)</li>
                    </ul> */}
                </div>
                {renderCodeEditor()}
            </div>
        )
     }

     // TODO: Refactor
     const getCode = () => {
        switch(integrationType) {
          case 'SHARE':
            return btnElmt;
            break;
          case 'EMBED':
            return iFrameElmt;
            break;      
          case 'CSS':
            return `.tipfi-btn {
                border-radius: 0.5em;
                padding: 0.3em 2.5em;
                font-size: 1.2em;
                font-weight: 900;
                color: #fff;
                letter-spacing: 0.05em;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: darkslateblue;
                /* text-shadow: -1px -1px 0 #000; */
            }
            
            /* Gradients - Created with https://www.css-gradient.com */

            ${getGradientCSS()}
            `  
            // const el = document.querySelector('.tipfi-btn');
            // return JSON.stringify(getComputedStyle(el));
            // return cssCode;
            break;
        //   default: 
        }      
      }    
      
    const getGradientCSS = () => {
        switch(btnColor) {
          case 'cyan':
            return ` .gradient-cyan {
                background: #4BCBFE;
                background: -webkit-linear-gradient(top left, #4BCBFE, #51E69A);
                background: -moz-linear-gradient(top left, #4BCBFE, #51E69A);
                background: linear-gradient(to bottom right, #4BCBFE, #51E69A);
            }`;
            break;
          case 'green':
            return `.gradient-green {
                background: #C6DC98;
                background: -webkit-linear-gradient(top left, #C6DC98, #13C555);
                background: -moz-linear-gradient(top left, #C6DC98, #13C555);
                background: linear-gradient(to bottom right, #C6DC98, #13C555);   
            }`;
            break;              
          case 'purple':
            return `.gradient-purple {
                background: #B95299;
                background: -webkit-linear-gradient(top left, #B95299, #1B8BF3);
                background: -moz-linear-gradient(top left, #B95299, #1B8BF3);
                background: linear-gradient(to bottom right, #B95299, #1B8BF3);
            }`;
            break;          
          case 'pink':
            return `.gradient-pink {
                background: #FFFFFF;
                background: -webkit-linear-gradient(top left, #FFFFFF, #FD33A6);
                background: -moz-linear-gradient(top left, #FFFFFF, #FD33A6);
                background: linear-gradient(to bottom right, #FFFFFF, #FD33A6);    
            }`;
            break;          
          case 'orange':
            return `.gradient-orange {
                background: #FDD78F;
                background: -webkit-linear-gradient(top left, #FDD78F, #FB9C01);
                background: -moz-linear-gradient(top left, #FDD78F, #FB9C01);
                background: linear-gradient(to bottom right, #FDD78F, #FB9C01);
            }`;
            break;
            default:
                return '/* Add background color here! */';
                break;
    }}      

    const txtMedium = {fontSize:'0.9em'};

    const activeTab = {backgroundColor: 'gray'}

    const handleSwatchClick = (e) => {
        setBtnColor(e.target.getAttribute('data-color'));
    }    
    const handleCryptoChange = (e) => {
        setCrypto(e.target.value);
    }
      
    useEffect(() => {
        setBtnElmt(customizeTransakBtn());
        setIframeElmt(customizeTransakWidget());
	}, [walletAddress, btnColor, networkChoice, cryptoChoice, network, crypto])  
    
    useEffect(() => {
        showCurrencyOptions();
        setCrypto(document.querySelector('#crypto').value);
	}, [network])	        

    // const location = useLocation();
	return (
		<div data-color-mode="dark">
            <p>STEP I. &nbsp; Customize your TipFi button</p>
        
            <div dangerouslySetInnerHTML={{__html: btnElmt}} />

            <div className="spacer"></div>
            <div id="swatches">
                <img data-color='cyan' src={window.location.origin + '/assets/img/swatch-1.png'} width='30px' onClick={handleSwatchClick} /> &nbsp;
                <img data-color='green' src={window.location.origin + '/assets/img/swatch-2.png'} width='29px' onClick={handleSwatchClick} /> &nbsp;
                <img data-color='purple' src={window.location.origin + '/assets/img/swatch-3.png'} width='30px' onClick={handleSwatchClick} /> &nbsp;
                <img data-color='pink' src={window.location.origin + '/assets/img/swatch-4.png'} width='28.5px' onClick={handleSwatchClick} /> &nbsp;                
                <img data-color='orange' src={window.location.origin + '/assets/img/swatch-5.png'} width='28.5px' onClick={handleSwatchClick} /> &nbsp;
            </div>

            <div className="spacer"></div>

            {/* <div id='input-wallet'> */}
                <label for='input-wallet'>Your Wallet Address: </label> <br/>
                <input id='input-wallet' type='text' name='address' size='60' onChange={(e) => {setWalletAddress(e.target.value)}}/>
            {/* </div> */} <br/>
           
           <form id='network-selector'>
                <label for='network' style={txtMedium}>Select Network: </label> <br/>
                <select id='network' onChange={(e) => {setNetwork(e.target.value)}}> 
                    {networkAndCurrencies.map(obj => {
                        let blockchain = obj.blockchain;
                        return <option value={blockchain}>{blockchain}</option>
                    })}
                </select> 
                  
                <input type="radio" id="network-default" name="fav_language" value="Preferred" onClick={(e) => {setNetworkChoice(e.target.value)}}></input>
                <label for="network-default" style={txtMedium}>Preferred</label><input type="radio" id="network-required" name="fav_language" value="Required" onClick={(e) => {setNetworkChoice(e.target.value)}}></input>
                <label for="network-required" style={txtMedium}>Required</label><br/>
            </form>
            
            <form id='crypto-selector'>
                <label for='crypto' style={txtMedium}>Select Cryptocurrency: </label> <br/>
                <select id='crypto' onChange={handleCryptoChange}> 
                    {showCurrencyOptions()}
                </select> 
                  
                <input type="radio" id="crypto-default" name="fav_language" value="Preferred" onClick={(e) => {setCryptoChoice(e.target.value)}}></input>
                <label for="crypto-default" style={txtMedium}>Preferred</label><input type="radio" id="crypto-required" name="fav_language" value="Required" onClick={(e) => {setCryptoChoice(e.target.value)}}></input>
                <label for="crypto-required" style={txtMedium}>Required</label><br/>
            </form>
           

            <div className="spacer"></div>

            {renderCodeEditorWithTabs()}


            {/* Generate Code */}
            {/*<Link to={'/buttonMaker'}>Button Maker</Link>*/}
        </div>	
	)
}

export default ButtonMaker;
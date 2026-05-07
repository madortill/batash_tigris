import {useState} from "react";
import { useData } from "../../../context/DataContext";
import "../../../style/GearboxNav.css"
import backBtn from "../../../assets/images/backBtn.svg";

const  GearBox= ({changeToSection, changeToPage})=> {
    
    const [canContinue, setCanContinue] =useState(false);
      const { data } = useData();
    const pageData = data.Gearbox;
  const nextBtn = data.general[1].text;
  const backBtnText = data.general[0].text;
  const title = pageData[0].title;
  const text = pageData[0].text;
  const textbox1 = pageData[0].textBox1;
  const textbox2 = pageData[0].textBox2;


  const previousPage = () => {
    changeToSection(2, true);
  };
  const nextPage = () => {
    changeToPage(1);
  };
    return (
        <div className="tigris-general-page">
      <h1 className="tigris-general-title effect-box">{title}</h1>
      <div className="backBtn">
              <img
                src={backBtn}
                alt="backBtn"
                className="backBtnImg"
                onClick={previousPage}
              />
              <p className="backBtnText">{backBtnText}</p>
            </div>
                <p className="text-gearbox">{text}</p>


<div className="div-box">






        <div class="box-container">

<div class="box-container" id="box-1">
  <svg viewBox="0 0 342 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-svg">
    <path d="M14 100.596H327.979V315.849H14V100.596Z" fill="#B3862B"/>
    
    <g class="rising-item">
       <circle cx="171" cy="150" r="40" fill="none" stroke="#141414" stroke-width="4" stroke-dasharray="10 5"/>
       <path d="M171 120V180M141 150H201" stroke="#141414" stroke-width="6" stroke-linecap="round"/>
    </g>

    <g class="lid lid-left">
      <path d="M14.5615 100.596L67.1975 24.0135H170.766V100.596H14.5615Z" fill="#D39E33" stroke="#141414" stroke-width="4"/>
    </g>
    <g class="lid lid-right">
      <path d="M326.369 100.596L274.335 24.0135H170.766V100.596H326.369Z" fill="#D39E33" stroke="#141414" stroke-width="4"/>
    </g>

    <path d="M32.0626 96.3879H309.503C321.894 96.3879 331.981 106.474 331.981 118.865V297.613C331.981 310.004 321.894 320.091 309.503 320.091H32.0626C19.6718 320.091 9.58545 310.004 9.58545 297.613V118.865C9.58545 106.474 19.6718 96.3879 32.0626 96.3879Z" fill="#D39E33" stroke="#141414" stroke-width="8"/>
    
    <rect x="120" y="140" width="100" height="25" rx="12.5" fill="#26211E" stroke="#141414" stroke-width="4"/>
    
    <rect x="245" y="254" width="61" height="45" rx="8" fill="#A4704C" stroke="#111111" stroke-width="4"/>
    <text x="275" y="288" text-anchor="middle" font-family="Arial" font-size="26" font-weight="bold" fill="black">צ</text>

    <text class="box-label" x="50%" y="370" text-anchor="middle" font-family="Arial" font-size="30" font-weight="bold" fill="black">תיבת הילוכים</text>
  </svg>
</div>







  <svg viewBox="0 0 342 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-svg">
    <path d="M14 100.596H327.979V315.849H14V100.596Z" fill="#D39E33"/>
    
    <g id="lid-left" class="lid">
        <path d="M14.5615 100.596L67.1975 24.0135H170.766V100.596H14.5615Z" fill="#D39E33" stroke="#141414" stroke-width="4"/>
    </g>

    <g id="lid-right" class="lid">
        <path d="M326.369 100.596L274.335 24.0135H170.766V100.596H326.369Z" fill="#D39E33" stroke="#141414" stroke-width="4"/>
    </g>

    <path d="M32.0626 96.3879H309.503C321.894 96.3879 331.981 106.474 331.981 118.865V297.613C331.981 310.004 321.894 320.091 309.503 320.091H32.0626C19.6718 320.091 9.58545 310.004 9.58545 297.613V118.865C9.58545 106.474 19.6718 96.3879 32.0626 96.3879Z" fill="#D39E33" stroke="#141414" stroke-width="8"/>
    
    <rect x="120" y="140" width="100" height="25" rx="12.5" fill="#26211E" stroke="#141414" stroke-width="4"/>
    
    <rect x="246" y="256" width="57" height="40" rx="8" fill="#A4704C" stroke="#111111" stroke-width="4"/>
    <text x="275" y="287" text-anchor="middle" font-family="Arial" font-size="28" font-weight="bold" fill="black">צ</text>

    <text id="box-label" x="50%" y="365" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="black">
      {textbox1}
    </text>
  </svg>

<svg viewBox="0 0 342 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-svg">
    <path d="M14 100.596H327.979V315.849H14V100.596Z" fill="#B3862B"/>
    
    <g id="item-out" class="floating-item">
        <circle cx="171" cy="180" r="30" fill="#141414" />
        <path d="M171 140V155M171 205V220M211 180H196M146 180H131" stroke="#141414" stroke-width="8" stroke-linecap="round"/>
        </g>

    <g id="lid-left" class="lid">
        <path d="M14.5615 100.596L67.1975 24.0135H170.766V100.596H14.5615Z" fill="#D39E33" stroke="#141414" stroke-width="3"/>
    </g>
    <g id="lid-right" class="lid">
        <path d="M326.369 100.596L274.335 24.0135H170.766V100.596H326.369Z" fill="#D39E33" stroke="#141414" stroke-width="3"/>
    </g>

    <path d="M32.0626 96.3879H309.503C321.894 96.3879 331.981 106.474 331.981 118.865V297.613C331.981 310.004 321.894 320.091 309.503 320.091H32.0626C19.6718 320.091 9.58545 310.004 9.58545 297.613V118.865C9.58545 106.474 19.6718 96.3879 32.0626 96.3879Z" fill="#D39E33" stroke="#141414" stroke-width="8"/>
    
    <text id="box-label" x="50%" y="380" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="black">הילוכים</text>
  </svg>

  <svg viewBox="0 0 342 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-svg">
    <path d="M14 100.596H327.979V315.849H14V100.596Z" fill="#D39E33"/>
    
    <g id="lid-left" class="lid">
        <path d="M14.5615 100.596L67.1975 24.0135H170.766V100.596H14.5615Z" fill="#D39E33" stroke="#141414" stroke-width="4"/>
    </g>

    <g id="lid-right" class="lid">
        <path d="M326.369 100.596L274.335 24.0135H170.766V100.596H326.369Z" fill="#D39E33" stroke="#141414" stroke-width="4"/>
    </g>

    <path d="M32.0626 96.3879H309.503C321.894 96.3879 331.981 106.474 331.981 118.865V297.613C331.981 310.004 321.894 320.091 309.503 320.091H32.0626C19.6718 320.091 9.58545 310.004 9.58545 297.613V118.865C9.58545 106.474 19.6718 96.3879 32.0626 96.3879Z" fill="#D39E33" stroke="#141414" stroke-width="8"/>
    
    <rect x="120" y="140" width="100" height="25" rx="12.5" fill="#26211E" stroke="#141414" stroke-width="4"/>
    
    <rect x="246" y="256" width="57" height="40" rx="8" fill="#A4704C" stroke="#111111" stroke-width="4"/>             
    <text x="275" y="287" text-anchor="middle" font-family="Arial" font-size="28" font-weight="bold" fill="black">צ</text>

    <text id="box-label" x="50%" y="365" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="black">
      {textbox1}
    </text>
  </svg>
</div>
</div>
              <button
              className={`nextBtn tigris-next-btn ${
                !canContinue ? "nextBtnDisable" : ""
              }`}
              disabled={!canContinue}
              onClick={nextPage}
            >
              {nextBtn}
            </button>
    </div>

    );
}
export default GearBox;  
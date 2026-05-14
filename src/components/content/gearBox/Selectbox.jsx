import {useState} from "react";
import { useData } from "../../../context/DataContext";
import "../../../style/GearboxNav.css"
import backBtn from "../../../assets/images/backBtn.svg";

const  Selectbox= ({changeToPage,changeToSection})=> {
    
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
    <div className="divBox"
      onClick={nextPage}
    >
      {/* קופסה שמאלית - נפתחת ב-Hover */}
      <div className="boxContainer closedBox" onClick={nextPage}>
        <svg viewBox="0 0 342 380" fill="none" xmlns="w3.org" className="mainSvg">
          {/* גוף הקופסה האחורי (רקע) */}
          <path d="M14 100.596H327.979V315.849H14V100.596Z" fill="#D39E33"/>
          
          {/* כנף שמאל (מוסתרת בהתחלה מתחת לסרט הדבקה, נפתחת ב-Hover) */}
          <g className="lid lidLeft">
              <path d="M14.5615 100.596L67.1975 24.0135H170.766V100.596H14.5615Z" fill="#D39E33" stroke="#141414" strokeWidth="4"/>
          </g>

          {/* כנף ימין (מוסתרת בהתחלה מתחת לסרט הדבקה, נפתחת ב-Hover) */}
          <g className="lid lidRight">
              <path d="M326.369 100.596L274.335 24.0135H170.766V100.596H326.369Z" fill="#D39E33" stroke="#141414" strokeWidth="4"/>
          </g>

          {/* גוף הקופסה הראשי */}
          <path d="M32.0626 96.3879H309.503C321.894 96.3879 331.981 106.474 331.981 118.865V297.613C331.981 310.004 321.894 320.091 309.503 320.091H32.0626C19.6718 320.091 9.58545 310.004 9.58545 297.613V118.865C9.58545 106.474 19.6718 96.3879 32.0626 96.3879Z" fill="#D39E33" stroke="#141414" strokeWidth="8"/>
          
          {/* סרט הדבקה לבן - נעלם בצורה חלקה ב-Hover בזמן הפתיחה */}
          <path className="tape" d="M135 94H207V110H135V94Z" fill="#EAEAEA" stroke="#141414" strokeWidth="2"/>
          
          {/* ידית אחיזה שחורה */}
          <rect x="120" y="140" width="100" height="25" rx="12.5" fill="#26211E" stroke="#141414" strokeWidth="4"/>
          
          {/* מדבקת הריבוע הקטנה עם האות צ' */}
          <rect x="246" y="256" width="57" height="40" rx="8" fill="#A4704C" stroke="#111111" strokeWidth="4"/>
          <text x="275" y="287" textAnchor="middle" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="black">צ</text>

          {/* תווית טקסט מתחת לקופסה */}
          <text className="boxLabel" x="50%" y="365" textAnchor="middle" fontFamily="Arial" fontSize="32" fontWeight="bold" fill="black">
            {textbox1}
          </text>
        </svg>
      </div>
  <svg viewBox="0 0 342 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="main-svg">
    <path d="M14 100.596H327.979V315.849H14V100.596Z" fill="#D39E33"/>
    
    <g id="lid-left" class="lid">
        <path d="M14.5615 100.596L67.1975 24.0135H170.766V100.596H14.5615Z" fill="#D39E33" stroke="#141414" strokewidth="4"/>
    </g>

    <g id="lid-right" class="lid">
        <path d="M326.369 100.596L274.335 24.0135H170.766V100.596H326.369Z" fill="#D39E33" stroke="#141414" strokewidth="4"/>
    </g>

    <path d="M32.0626 96.3879H309.503C321.894 96.3879 331.981 106.474 331.981 118.865V297.613C331.981 310.004 321.894 320.091 309.503 320.091H32.0626C19.6718 320.091 9.58545 310.004 9.58545 297.613V118.865C9.58545 106.474 19.6718 96.3879 32.0626 96.3879Z" fill="#D39E33" stroke="#141414" stroke-width="8"/>
    
    <rect x="120" y="140" width="100" height="25" rx="12.5" fill="#26211E" stroke="#141414" strokeWidth="4"/>
    
    <rect x="246" y="256" width="57" height="40" rx="8" fill="#A4704C" stroke="#111111" strokeWidth="4"/>
    <text x="275" y="287" textAnchor="middle" fontFamily="Arial" fontSize="28" fontweight="bold" fill="black">צ</text>

    <text id="box-label" x="50%" y="365" textAnchor="middle" fontFamily="Arial" fontSize="32" fontWeight="bold" fill="black">
      {textbox2}
    </text>
  </svg>


{/* 
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
  </svg> */}
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

export default Selectbox;  
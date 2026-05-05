import Door from "./Door"
import { useData } from "../../../context/DataContext";
  const { data } = useData();
  const pageData = data.uses;


const UsesNav= ({ changeToSection, startingPage })=>{

return (
          <h1 className="tigris-general-title effect-underline">{pageData.title}</h1>

);
}
export default UsesNav;


import EBPopup from "./EBPopup";
import SimpleSystemPopup from "./SimpleSystemPopup";

const SystemPopup = ({ type, data, ui, onClose }) => {
  if (!data) {
    console.log("No popup data for:", type);
    return null;
  }

  if (type === "exhaust") {
    return <EBPopup data={data} ui={ui} onClose={onClose} />;
  }

  return (
    <SimpleSystemPopup
      type={type}
      data={data}
      ui={ui}
      onClose={onClose}
    />
  );
};

export default SystemPopup;
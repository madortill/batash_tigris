export default function HandleSvg({
  glowColor = "#E69907",
  mainColor = "black",
  className,
}) {
  return (
    <svg
      width="389"
      height="552"
      viewBox="0 0 389 552"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="57.6645"
        cy="52.159"
        rx="33.268"
        ry="32.159"
        fill={glowColor}
        fillOpacity="0.53"
      />

      {/* שאר הצורות */}
      <rect
        y="117.965"
        width="86.1836"
        height="10.1048"
        rx="5.0524"
        fill={mainColor}
      />
    </svg>
  );
}
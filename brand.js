/* Madarat Uttarpara Durgotsav Committee — brand: round emblem with Ma Durga (photo) + committee name */
window.BRAND = (() => {
  const BN = "মাদারাট উত্তরপাড়া দুর্গোৎসব কমিটি", EN = "MADARAT UTTARPARA DURGOTSAV COMMITTEE", FACE = "logo-face.jpg?v=7";
  let n = 0;
  const emblem = () => {
    const u = "em" + (++n);
    return `<svg viewBox="0 0 512 512" role="img" aria-label="Madarat Uttarpara Durgotsav Committee">
      <defs>
        <path id="${u}t" d="M 64 256 A 192 192 0 0 1 448 256"/>
        <path id="${u}b" d="M 46 256 A 210 210 0 0 0 466 256"/>
        <clipPath id="${u}c"><circle cx="256" cy="256" r="164"/></clipPath>
      </defs>
      <circle cx="256" cy="256" r="252" fill="#E8A317"/>
      <circle cx="256" cy="256" r="242" fill="#7A1710"/>
      <circle cx="256" cy="256" r="232" fill="none" stroke="#FFD36E" stroke-width="2" stroke-dasharray="2 6"/>
      <circle cx="256" cy="256" r="170" fill="#FFD36E"/>
      <image href="${FACE}" x="92" y="92" width="328" height="328" preserveAspectRatio="xMidYMid slice" clip-path="url(#${u}c)"/>
      <text font-family="'Hind Siliguri','Nirmala UI','Noto Sans Bengali',sans-serif" font-size="31" font-weight="700" fill="#FFE7B0"><textPath href="#${u}t" startOffset="50%" text-anchor="middle">${BN}</textPath></text>
      <text font-family="Inter,'Segoe UI',Arial,sans-serif" font-size="20.5" font-weight="800" letter-spacing="1.6" fill="#FFE7B0"><textPath href="#${u}b" startOffset="50%" text-anchor="middle">${EN}</textPath></text>
      <g fill="#FFD36E"><circle cx="31" cy="256" r="6"/><circle cx="481" cy="256" r="6"/></g>
    </svg>`;
  };
  return { emblem, ORG_BN: BN, ORG_EN: "Madarat Uttarpara Durgotsav Committee" };
})();

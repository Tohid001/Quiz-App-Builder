import { createGlobalStyle } from "styled-components";

export const GlobalReset = createGlobalStyle`
 *,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Trebuchet MS", sans-serif;
  scroll-behavior:smooth;
}
/* 
:root{--border: 5px;
  --color-primary: #ab79d6;
  --color-on-primary: #351d4a;
  --color-secondary: #d367c1;
  --color-background: #27272c;
  --color-on-background: #c5c5ce;
  --color-background-alt: #1e1c22;
  --color-background-alt-alpha: rgba(30, 28, 34, 0.75);
  --color-inverse: #fff;
  --color-gray: #8e8e8e;
  --color-yellow: #dedf40;
  --color-green: #62cb5c;
  --color-blue: #00bbcb;
  --color-on-blue: #004a09;
  --gradient: var(--color-secondary) 10%, var(--color-yellow) 25%,
    var(--color-green) 50%, var(--color-blue) 75%, var(--color-primary) 90%;
  --brand-font: "Kanit", serif;
  --brand-font-weight: 800;
  --brand-font-alt: "Baloo 2", system-ui, sans-serif;
  --brand-font-alt-weight: normal;
  --brand-font-alt-weight-bold: 500;}

body{
  background-color:black;
}
select,input{
  all:unset;
  font-weight:bold;

} */

 `;

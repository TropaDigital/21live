import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
}

:root {
  /*SCROLLBAR */
  --scrollbar-size: 10px;

  /*========== Colors ==========*/

  //Color-Primary
  --primary: #0046B5;
  --primary-50: #E2F2FF;
  --primary-100: #BADFFF;
  --primary-700: #0077E6;
  --primary-dark: #101E36;
  --primary-light: #3A6EC1;

  //Color-Secundary
  --secundary: #00C899;
  --secundary-dark: #15473C;
  --secundary-light: #3ED0AE;

  //Status-Color
  --success: #12B76A;
  --Danger: #F04438;
  --Warning: #F79009;
  --Info: #0098FF;

  //Gray-Color
  --gray-25: #FCFCFD;
  --gray-50: #F9FAFB;
  --gray-100: #F2F4F7;
  --gray-200: #EAECF0;
  --gray-300: #D0D5DD;
  --gray-400: #98A2B3;
  --gray-500: #667085;
  --gray-600: #475467;
  --gray-700: #344054;
  --gray-800: #1D2939;
  --gray-900: #101828;

  --dark: #18191A;
  --light: #ffffff;
  --background-primary: #ffffff;

  //Complementary-Colors
  --Purple: #8269B2;
  --Blue: #37C3FF;
  --Green: #93E088;
  --Orange: #FFA981;
  --Red: #F92B60;
  --Yellow: #FFD66E;
  --input-error: #e62965;
  --success-600: #039855;

  //Degrade
  --degrade-green: linear-gradient(250.88deg, #93E088 0%, #73B969 97.63%);
  --degrade-purple: linear-gradient(250.88deg, #8269B2 0%, #533D80 97.63%);
  --degrade-blue: linear-gradient(250.88deg, #37C3FF 0%, #2C98C6 97.63%);
  --degrade-red: linear-gradient(250.88deg, #F92B60 0%, #8E0C2E 97.63%);
  --degrade-yellow: linear-gradient(250.88deg, #FFD66E 0%, #BE9F51 97.63%);

  //Typography-color
  --title-color: #222222;
  --title-color-light: #DEE2E6;
  --text-color: #222222;
  --text-color-light: #6C757D;

  //Shadow

  --shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  --shadow-light: 0px 4px 4px rgba(0, 0, 0, 0.01);
  --newShadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);

  /*========== Fonts ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  /* --body-font: 'Poppins', sans-serif; */

  --h1-font-size: 2.5rem; // 45px
  --h2-font-size: 2rem; // 32px
  --h3-font-size: 1.75rem; // 28px
  --h4-font-size: 1.5rem; // 24px
  --h5-font-size: 1.25rem; // 20px
  --h6-font-size: 1rem; // 16px

  --normal-font-size: .938rem; // 15px
  --small-font-size: .875rem; // 14px
  --smaller-font-size: .75rem;  // 12px

  /*========== Fonts ==========*/
  /*.5rem = 8px | 1rem = 16px ...*/
  --body-font: 'Inter', sans-serif;

  --text-small-xs: 0.75rem; // 12px
  --text-small-sm: 0.875rem; // 14px
  --text-small-md: 1rem; // 16px
  --text-small-lg: 1.125rem; // 18px
  --text-small-xl: 1.25rem; // 20px
  --text-headline-sm: 1.5rem; // 24px
  --text-headline-md: 1.875rem; // 30px
  --text-headline-lg: 2.25rem; // 36px
  --text-display-sm: 3rem; // 48px
  --text-display-md: 3.75rem; // 60px
  --text-display-lg: 4.5rem; // 72px

  /*========== Font weight ==========*/

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}

html {
    scroll-behavior: smooth;
}

body {
  -webkit-font-smoothing: antialiased;
  background: var(--background);

}

body, input, textarea, button {
  font-family: var(--body-font);
  font-weight: 400;
}

table {
  border-collapse: separate !important;
}

input, button, textarea, select {
  font: inherit;
}

a {
  text-decoration: none;
}

ul{
    list-style: none;
}

img{
    max-width: 100%;
    height: auto;
}

button{
    cursor: pointer;
    border: none;
    outline: none;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  font-family: var(--body-font);
  color: var(--gray-800);
  font-weight: 400;
}

fieldset {
  margin-top: 12px;
  min-inline-size: auto;
  border: 0;
}

legend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);
  color: var(--gray-700);
}

 // font-size: 16px (desktop)
 html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }
    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
    scroll-behavior: smooth;
  }
  // REM = 1rem = 16px
  button {
    cursor: pointer;
  }

  .DialogOverlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    inset: 0;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 1;
  }

  .DialogContent {
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    max-width: 90vw;
    /* height: 80vh; */
    max-height: 95vh;
    overflow-y: auto;
    padding: 20px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 2;

    ::-webkit-scrollbar {
      width: 0.4rem;
      border-radius: 0.5rem;
      background-color: hsl(220, 8%, 76%);

      &-thumb {
        background-color: hsl(220, 8%, 64%);
        border-radius: 0.5rem;

        &:hover {
          background-color: hsl(220, 8%, 54%);
        }
      }
    }
  }
  .DialogContent:focus {
    outline: none;
  }

  .DialogTitle {
    font-size: var(--text-small-xl);
    font-weight: var(--weight-bold);
    color: var(--gray-600);
    margin: 0 0 14px;
  }

  .DialogDescription {
    margin: 10px 0 20px;
    color: var(--mauve11);
    font-size: 15px;
    line-height: 1.5;
  }

  .Button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 15px;
    line-height: 1;
    font-weight: 500;
    height: 35px;
  }

  .IconButton {
    font-family: inherit;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #6C757D;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .IconButton:hover {
    svg {
      path {
        fill: #fff;
      }
    }
    background-color: rgb(171 176 181);
  }
  .IconButton:focus {
    box-shadow: 0 0 0 2px #6C757D;
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

.PopoverContent {
  border-radius: 4px;
  padding: 20px;
  width: 260px;
  max-height: 60vh;
  overflow-y: auto;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.PopoverContent:focus {
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
    0 0 0 2px var(--violet7);
}
.PopoverContent[data-state='open'][data-side='top'] {
  animation-name: slideDownAndFade;
}
.PopoverContent[data-state='open'][data-side='right'] {
  animation-name: slideLeftAndFade;
}
.PopoverContent[data-state='open'][data-side='bottom'] {
  animation-name: slideUpAndFade;
}
.PopoverContent[data-state='open'][data-side='left'] {
  animation-name: slideRightAndFade;
}

.PopoverArrow {
  fill: white;
}

.PopoverClose {
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  position: absolute;
  top: 5px;
  right: 5px;
}
.PopoverClose:hover {
  background-color: var(--violet4);
}
.PopoverClose:focus {
  box-shadow: 0 0 0 2px var(--violet7);
}

.IconButtonPopover {
  font-family: inherit;
  border-radius: 100%;
  height: 22px;
  width: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  /* background-color: white; */
  box-shadow: 0 2px 10px var(--blackA7);
  margin-left: 8px;
  border: 2px solid #fff;
}
.IconButtonPopover:hover {
  background-color: #06D6A0;

  transition: all 0.35s ease;

  svg {
    path {
      fill: #fff;
    }
  }
}

.PopoverContentActionCard {
  border-radius: 10px;
  padding: 16px;
  /* width: 160px; */
  max-height: 60vh;
  overflow-y: auto;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.listActionsCardFluxo {
  display: flex;
  flex-direction: column;
  gap: 14px;

  li {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
      background: transparent;
      font-size: 14px;
      font-weight: 400;
      color: #444444;

      transition: all 0.35s ease;

      :hover {
      transition: all 0.35s ease;
      opacity: 0.9;

        svg {
          transform: scale(1.2);
        }
      }
    }
  }

  .listDeleteCardFluxo {
    border-top: 1px solid #e3e5ea;
    padding-top: 12px;

    .buttonDeleteCardFluxo {
      display: flex;
      align-items: center;
      justify-content: baseline;
      gap: 6px;
      background: transparent;

      font-size: 14px;
      font-weight: 400;
      color: #FF5019;
    }
  }
}

.PopoverArrow {
  fill: white;
}

.PopoverContentActionCard:focus {
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
    0 0 0 2px rgba(0, 0, 0, 0.15);
}
.PopoverContentActionCard[data-state='open'][data-side='top'] {
  animation-name: slideDownAndFade;
}
.PopoverContentActionCard[data-state='open'][data-side='right'] {
  animation-name: slideLeftAndFade;
}
.PopoverContentActionCard[data-state='open'][data-side='bottom'] {
  animation-name: slideUpAndFade;
}
.PopoverContentActionCard[data-state='open'][data-side='left'] {
  animation-name: slideRightAndFade;
}

.PopoverArrow {
  fill: white;
}

.PopoverCloseCardFluxo {
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  position: absolute;
  top: 5px;
  right: 5px;
}

.PopoverCloseCardFluxo:hover {
  /* background-color: var(--gray-600); */
  background: var(--gray-400);
  /* border: 1px solid var(--gray-600); */
  box-shadow: 0 0 0 2px ar(--gray-600);

}
.PopoverCloseCardFluxo:focus {
  background: transparent;
  box-shadow: 0 0 0 2px ar(--gray-600);
}

.PopoverClose {
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  position: absolute;
  top: 5px;
  right: 5px;
}
.PopoverClose:hover {
  background-color: var(--gray-600);
}
.PopoverClose:focus {
  box-shadow: 0 0 0 2px ar(--gray-600);
}

.IconButtonPopover {
  font-family: inherit;
  border-radius: 100%;
  height: 22px;
  width: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  /* background-color: white; */
  box-shadow: 0 2px 10px var(--blackA7);
  margin-left: 8px;
  border: 2px solid #fff;
}
.IconButtonPopover:hover {
  background-color: #06D6A0;

  transition: all 0.35s ease;

  svg {
    path {
      fill: #fff;
    }
  }
}
/* .IconButtonPopover:focus {
  box-shadow: 0 0 0 1px red;
} */

.listAllAvatars {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.avatar-al {
  display: flex;
  align-items: center;
  width: 2.37rem;
  height: 2.37rem;
  border-radius: 50%;
  border: 3px solid #fff;

  &.isOnline {
    border: 3px solid #93E088;
  }
  
  img {
    max-width: 100%;
    border-radius: 50%;
  }

  h2 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #343a40;
    margin-left: 10px;
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// SCROLLBAR

.ScrollAreaRoot {

  height: 100%;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  
}

.ScrollAreaViewport {
  width: 100%;
  height: 100%;
  border-radius: inherit;

  >div {
    height: 100%;
  }
}

.ScrollAreaScrollbar {
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding: 2px;
  background: #E2E2E2;
  transition: background 160ms ease-out;
}
.ScrollAreaScrollbar:hover {
  background: #C7C7C7;
}
.ScrollAreaScrollbar[data-orientation='vertical'] {
  width: var(--scrollbar-size);
}
.ScrollAreaScrollbar[data-orientation='horizontal'] {
  flex-direction: column;
  height: var(--scrollbar-size);
}

.ScrollAreaThumb {
  flex: 1;
  background: #86848D;
  border-radius: var(--scrollbar-size);
  position: relative;
}
/* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
.ScrollAreaThumb::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}

.ScrollAreaCorner {
  background: hsl(0 0% 85.8%);
}

.Text {
  color: var(--violet11);
  font-size: 15px;
  line-height: 18px;
  font-weight: 500;
}

.Tag {
  color: var(--mauve12);
  font-size: 13px;
  line-height: 18px;
  margin-top: 10px;
  border-top: 1px solid var(--mauve6);
  padding-top: 10px;
}

// PAGINATION

.item {
  align-items: center;
  color: #FFF;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 40px;
  justify-content: center;
  width: 40px;
}

.disabled-page {
  color: #808e9b;
}

.active {
  border: solid 1px #808e9b;
  border-radius: 40px;
  color: #808e9b;
}

.break-me {
}

.next {
  border-left: solid 1px #808e9b;
  font-size: 4px;
  height: 60px;
  position: absolute;
  right: 0;
  width: 150px;
}

.pagination {
  align-items: center;
  background-color: #0fbcf9;
  display: flex;
  flex-direction: row;
  height: 60px;
  justify-content: center;
  list-style-type: none;
  position: relative;
  width: 1000px;
}

.pagination-page {
  font-weight: 700;
}

.previous {
  border-right: solid 1px #808e9b;
  font-size: 4px;
  height: 60px;
  left: 0;
  position: absolute;
  width: 150px;
}

// ALERTDIALOG

.AlertDialogOverlay {
  background-color: rgba(0,0,0, 0.5);
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.AlertDialogContent {
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.AlertDialogContent:focus {
  outline: none;
}

.AlertDialogTitle {
  margin-bottom: 15px;
  color: var(--title-color);
  font-size: 17px;
  font-weight: 600;
}

.AlertDialogDescription {
  margin-bottom: 20px;
  color: rgb(111, 110, 119);
  font-size: 15px;
  line-height: 1.5;
}

.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
}
.Button.violet {
  background-color: white;
  color: var(--violet11);
  box-shadow: 0 2px 10px var(--blackA7);
}
.Button.violet:hover {
  background-color: var(--mauve3);
}
.Button.violet:focus {
  box-shadow: 0 0 0 2px black;
}
.Button.red {
  background-color: var(--red4);
  color: var(--red11);
}
.Button.red:hover {
  background-color: var(--red5);
}
.Button.red:focus {
  box-shadow: 0 0 0 2px var(--red7);
}
.Button.mauve {
  background-color: var(--mauve4);
  color: var(--mauve11);
}
.Button.mauve:hover {
  background-color: var(--mauve5);
}
.Button.mauve:focus {
  box-shadow: 0 0 0 2px var(--mauve7);
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

// COLLAPSI

/* .CollapsibleRoot {
  width: 300px;
} */

// MENTIONS

.mentions {
  display: flex;
  width: 100%;
  position: relative;

  border-color: #e2e8f0;
  word-wrap: break-word;
}

.mentions--singleLine .mentions__control {
  display: inline-block;
  width: 130px;
}
.mentions--singleLine .mentions__highlighter {
  padding: 1px;
  border: 2px inset transparent;
}
.mentions--singleLine .mentions__input {
  padding: 10px;
  border: 2px inset;
}

.mentions--multiLine .mentions__control {
  font-family: monospace;
  font-size: 14px;
  
}
.mentions--multiLine .mentions__highlighter {
  border: 1px solid transparent;
  min-height: 2.5rem;
  padding: 0 8px;
  
}
.mentions--multiLine .mentions__input {
  border: 1px solid silver;
  outline: 0;
  color: #6c757d;
  font-weight: 600;
  font-size: 14px;
  padding-inline-start: 1rem;
  padding-top: 11px;
  height: 2.5rem;
  border-radius: 0.375rem;

  transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-duration: 200ms;

}

.mentions__suggestions__list {
  background-color: #fff;
  border: 1px solid #cecece;
  font-size: 10pt;
  border-radius: 2px;
}

.mentions__suggestions__item {
  padding: 5px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 12px;
  font-weight: 700;
  color: #6c757d;
}

.mentions__suggestions__item--focused {
  background-color: #fff;
  border-radius: 2px;

  :hover {
    box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
    /* border: 1px solid #6c757d; */

  }

}

.mentions__mention {
  position: relative;
  z-index: 1;
  color: blue;
  text-shadow: 1px 1px 1px white, 1px -1px 1px white, -1px 1px 1px white,
    -1px -1px 1px white;
  text-decoration: underline;
  pointer-events: none;
}

.ProseMirror {
  min-height: 90px;
  background-color: white;
  > * + * {
    /* margin-top: 0.75em; */
  }

  p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  border: 1px solid #E3E5EA;
  border-radius: 2px 2px 5px 5px;
  padding: 10px 16px;

  &:focus-visible {
    outline: 2px solid rgb(49, 130, 206);
    box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
  }
  
  transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-duration: 200ms;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  ul ul {
    list-style: circle;
  }

  ul li {
    list-style: disc;
  }

  ol li {
    list-style: decimal;
  }

  p {
    s {
    text-decoration: line-through;
  }
  }
  a {
    color: #37C3FF;
    text-decoration: underline;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  mark {
    border-radius: 0.25em;
    box-decoration-break: clone;
    padding: 1px 2px;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 14px;
    border-left: 2px solid #616161;

    /* &:before {
      content open-quote;
      position: absolute;
      left: 12px;
      top: -5px;
      font-size: 2rem;
    } */
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  .mention {
    font-weight: 700;
    border: 1px solid #000;
    border-radius: 0.4rem;
    padding: 0.1rem 0.3rem;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
}
`;

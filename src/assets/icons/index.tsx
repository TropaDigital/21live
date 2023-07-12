import React from 'react';

interface IconProps {
  color?: string;
  subColor?: string;
  size?: string;
  stroke?: string;
  width?: string;
  height?: string;
}

export const IconMeeting: React.FC<IconProps> = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2.5"
      y="11.667"
      width="5.83333"
      height="5.83333"
      rx="1.34615"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33331 13.6135L10.0074 12.5815C10.1745 12.4785 10.3843 12.474 10.5557 12.5697C10.7271 12.6654 10.8333 12.8463 10.8333 13.0426V16.1243C10.8333 16.3206 10.7271 16.5016 10.5557 16.5973C10.3843 16.6929 10.1745 16.6884 10.0074 16.5854L8.33331 15.5535"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 15.8333H15.8333C16.7538 15.8333 17.5 15.0871 17.5 14.1667V6.61667C17.5 5.69619 16.7538 4.95 15.8333 4.95H10.441C10.1651 4.95 9.90714 4.8135 9.75197 4.58544L8.58113 2.86456C8.42596 2.63649 8.16797 2.49999 7.89212 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V9.16667"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconUpload: React.FC<IconProps> = ({
  color = '#F2F4F7',
  subColor = '#F9FAFB',
  stroke = '#475467'
}) => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="40" height="40" rx="20" fill={color} />
    <g clipPath="url(#clip0_2123_7204)">
      <path
        d="M26.3333 26.3332L23 22.9999M23 22.9999L19.6666 26.3332M23 22.9999V30.4999M29.9916 28.3249C30.8044 27.8818 31.4465 27.1806 31.8165 26.3321C32.1866 25.4835 32.2635 24.5359 32.0351 23.6388C31.8068 22.7417 31.2862 21.9462 30.5555 21.3778C29.8248 20.8094 28.9257 20.5005 28 20.4999H26.95C26.6977 19.5243 26.2276 18.6185 25.5749 17.8507C24.9222 17.0829 24.104 16.4731 23.1817 16.0671C22.2594 15.661 21.2571 15.4694 20.2501 15.5065C19.243 15.5436 18.2575 15.8085 17.3676 16.2813C16.4777 16.7541 15.7066 17.4225 15.1122 18.2362C14.5177 19.05 14.1155 19.9879 13.9358 20.9794C13.756 21.9709 13.8034 22.9903 14.0743 23.961C14.3452 24.9316 14.8327 25.8281 15.5 26.5832"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <rect x="3" y="3" width="40" height="40" rx="20" stroke={subColor} strokeWidth="6" />
    <defs>
      <clipPath id="clip0_2123_7204">
        <rect width="20" height="20" fill="white" transform="translate(13 13)" />
      </clipPath>
    </defs>
  </svg>
);

export const IconArquive: React.FC<IconProps> = ({
  color = '#BADFFF',
  subColor = '#E2F2FF',
  stroke = '#0046B5'
}) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="32" height="32" rx="16" fill={color} />
    <path
      d="M18.6667 11.3335H14.0001C13.6465 11.3335 13.3073 11.474 13.0573 11.724C12.8072 11.9741 12.6667 12.3132 12.6667 12.6668V23.3335C12.6667 23.6871 12.8072 24.0263 13.0573 24.2763C13.3073 24.5264 13.6465 24.6668 14.0001 24.6668H22.0001C22.3537 24.6668 22.6928 24.5264 22.9429 24.2763C23.1929 24.0263 23.3334 23.6871 23.3334 23.3335V16.0002M18.6667 11.3335L23.3334 16.0002M18.6667 11.3335V16.0002H23.3334"
      stroke={stroke}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="2" y="2" width="32" height="32" rx="16" stroke={subColor} strokeWidth="4" />
  </svg>
);

export const LogoIcon: React.FC = () => (
  <svg width="99" height="30" viewBox="0 0 99 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.402617 29.4758V27.1873L6.35711 19.9967C8.07353 17.9624 9.13305 16.9311 9.13305 15.7586C9.15424 14.7203 8.33488 13.8515 7.28949 13.8303C7.19766 13.8303 7.10584 13.8303 7.01401 13.8444C5.6437 13.8444 4.78196 14.7273 4.64069 16.1895H0C0.0847615 12.3257 2.52165 9.60632 6.9575 9.60632C11.3934 9.60632 14.1269 12.3187 14.1269 15.5396C14.1269 17.4891 12.8979 19.0713 10.1149 22.3841L7.4802 25.5344H14.2682V29.4617L0.402617 29.4758Z"
      fill="white"
    />
    <path
      d="M17.3902 29.4758V25.5485H22.264V15.0946L17.6798 16.3872V12.1986L24.0369 9.99482H26.9047V25.5485H31.4606V29.4758H17.3902Z"
      fill="white"
    />
    <path
      d="M35.5645 0.727536L35.2113 0.805234V29.4758H38.8419V0L38.291 0.120079L35.5645 0.727536Z"
      fill="white"
    />
    <path
      d="M45.6299 10.6658L45.2768 10.7435V29.4758H48.9074V9.93827L48.3564 10.0584L45.6299 10.6658Z"
      fill="white"
    />
    <path
      d="M48.9074 8.76579V4.67605H45.2768V9.56396L45.8277 9.44388L48.9074 8.76579Z"
      fill="white"
    />
    <path
      d="M69.8999 10.0513L69.7728 10.3126L63.0484 24.4819L56.324 10.3126L56.1968 10.0513H52.2696L52.5804 10.6941L61.3955 29.2144L61.5227 29.4758H64.6165L64.7366 29.2144L73.5588 10.6941L73.8696 10.0513H69.8999Z"
      fill="white"
    />
    <path
      d="M78.5244 21.2963H94.2406L94.2901 20.8937C94.3254 20.4911 94.3395 20.0885 94.3324 19.6859C94.2901 13.8232 90.3063 9.57099 84.8603 9.57099C79.4003 9.46504 74.8867 13.8091 74.7879 19.2691C74.7879 19.4386 74.7879 19.6082 74.7879 19.7777C74.7879 20.2933 74.8302 20.8019 74.9009 21.3105L78.5244 21.2963ZM84.7826 12.8202C87.9471 12.8202 90.1438 14.8827 90.61 18.2449H78.5315C79.0401 15.4902 81.1026 12.8414 84.7615 12.8414L84.7826 12.8202Z"
      fill="#00C899"
    />
    <path
      d="M89.9955 23.9522L89.9037 24.1358C89.1338 25.7604 87.2761 26.7281 84.9593 26.7281C82.8049 26.8058 80.7636 25.7533 79.5698 23.9522H75.6355C77.1895 27.6746 80.8483 30.0691 84.8816 29.9985C89.1196 29.9985 92.5807 27.83 93.725 24.4819L93.9087 23.9522H89.9955Z"
      fill="#00C899"
    />
    <path d="M98.182 26.4668H95.1518V29.497H98.182V26.4668Z" fill="#00C899" />
  </svg>
);

export const IconDash: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 20V13M12 20V10M4 20L4 16M13.4067 5.0275L18.5751 6.96567M10.7988 5.40092L5.20023 9.59983M21.0607 6.43934C21.6464 7.02513 21.6464 7.97487 21.0607 8.56066C20.4749 9.14645 19.5251 9.14645 18.9393 8.56066C18.3536 7.97487 18.3536 7.02513 18.9393 6.43934C19.5251 5.85355 20.4749 5.85355 21.0607 6.43934ZM5.06066 9.43934C5.64645 10.0251 5.64645 10.9749 5.06066 11.5607C4.47487 12.1464 3.52513 12.1464 2.93934 11.5607C2.35355 10.9749 2.35355 10.0251 2.93934 9.43934C3.52513 8.85355 4.47487 8.85355 5.06066 9.43934ZM13.0607 3.43934C13.6464 4.02513 13.6464 4.97487 13.0607 5.56066C12.4749 6.14645 11.5251 6.14645 10.9393 5.56066C10.3536 4.97487 10.3536 4.02513 10.9393 3.43934C11.5251 2.85355 12.4749 2.85355 13.0607 3.43934Z"
      stroke="#3A6EC1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconUsers: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 3.46776C17.4817 4.20411 18.5 5.73314 18.5 7.5C18.5 9.26686 17.4817 10.7959 16 11.5322M18 16.7664C19.5115 17.4503 20.8725 18.565 22 20M2 20C3.94649 17.5226 6.58918 16 9.5 16C12.4108 16 15.0535 17.5226 17 20M14 7.5C14 9.98528 11.9853 12 9.5 12C7.01472 12 5 9.98528 5 7.5C5 5.01472 7.01472 3 9.5 3C11.9853 3 14 5.01472 14 7.5Z"
      stroke="#3A6EC1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconKey: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 6.99994C15 6.48812 14.8047 5.9763 14.4142 5.58579C14.0237 5.19526 13.5118 5 13 5M13 13C16.3137 13 19 10.3137 19 7C19 3.68629 16.3137 1 13 1C9.68629 1 7 3.68629 7 7C7 7.27368 7.01832 7.54308 7.05381 7.80704C7.11218 8.24118 7.14136 8.45825 7.12172 8.59559C7.10125 8.73865 7.0752 8.81575 7.00469 8.9419C6.937 9.063 6.81771 9.18229 6.57913 9.42087L1.46863 14.5314C1.29568 14.7043 1.2092 14.7908 1.14736 14.8917C1.09253 14.9812 1.05213 15.0787 1.02763 15.1808C1 15.2959 1 15.4182 1 15.6627V17.4C1 17.9601 1 18.2401 1.10899 18.454C1.20487 18.6422 1.35785 18.7951 1.54601 18.891C1.75992 19 2.03995 19 2.6 19H5V17H7V15H9L10.5791 13.4209C10.8177 13.1823 10.937 13.063 11.0581 12.9953C11.1843 12.9248 11.2613 12.8987 11.4044 12.8783C11.5417 12.8586 11.7588 12.8878 12.193 12.9462C12.4569 12.9817 12.7263 13 13 13Z"
      stroke="#CCCCCC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconFolder: React.FC<IconProps> = ({ color = '#3A6EC1' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.8845 4.76892L10.99 5.21613L10.99 5.21613L11.8845 4.76892ZM12.1056 7.44721C12.3526 7.94119 12.9532 8.14142 13.4472 7.89443C13.9412 7.64744 14.1414 7.04676 13.8944 6.55279L12.1056 7.44721ZM10.4161 3.10931L10.7421 2.16396L10.7421 2.16396L10.4161 3.10931ZM11.1634 3.57116L11.8631 2.85675V2.85674L11.1634 3.57116ZM3.09202 3.21799L2.63803 2.32698L2.63803 2.32698L3.09202 3.21799ZM2.21799 4.09202L1.32698 3.63803L1.32698 3.63803L2.21799 4.09202ZM3.63803 20.673L3.18404 21.564L3.63803 20.673ZM2.32698 19.362L1.43597 19.816L2.32698 19.362ZM21.673 19.362L22.564 19.816L21.673 19.362ZM20.362 20.673L20.816 21.564L20.362 20.673ZM20.362 7.32698L20.816 6.43597L20.362 7.32698ZM21.673 8.63803L22.564 8.18404L21.673 8.63803ZM5.2 4H9.02229V2H5.2V4ZM10.99 5.21613L12.1056 7.44721L13.8944 6.55279L12.7789 4.3217L10.99 5.21613ZM3 7V6.2H1V7H3ZM9.02229 4C9.8127 4 9.96938 4.01305 10.09 4.05465L10.7421 2.16396C10.229 1.98695 9.66771 2 9.02229 2V4ZM12.7789 4.3217C12.4902 3.74443 12.2509 3.23659 11.8631 2.85675L10.4637 4.28558C10.5548 4.37487 10.6366 4.50918 10.99 5.21613L12.7789 4.3217ZM10.09 4.05465C10.2301 4.10299 10.3578 4.18187 10.4637 4.28558L11.8631 2.85674C11.5454 2.5456 11.1625 2.30896 10.7421 2.16396L10.09 4.05465ZM5.2 2C4.65645 2 4.18864 1.99922 3.80497 2.03057C3.40963 2.06287 3.01641 2.13419 2.63803 2.32698L3.54601 4.10899C3.59545 4.0838 3.69617 4.04612 3.96784 4.02393C4.25117 4.00078 4.62345 4 5.2 4V2ZM3 6.2C3 5.62345 3.00078 5.25117 3.02393 4.96784C3.04612 4.69617 3.0838 4.59545 3.10899 4.54601L1.32698 3.63803C1.13419 4.01641 1.06287 4.40963 1.03057 4.80497C0.999222 5.18864 1 5.65645 1 6.2H3ZM2.63803 2.32698C2.07354 2.6146 1.6146 3.07354 1.32698 3.63803L3.10899 4.54601C3.20487 4.35785 3.35785 4.20487 3.54601 4.10899L2.63803 2.32698ZM2 8H17.2V6H2V8ZM21 11.8V16.2H23V11.8H21ZM17.2 20H6.8V22H17.2V20ZM3 16.2V7H1V16.2H3ZM6.8 20C5.94342 20 5.36113 19.9992 4.91104 19.9624C4.47262 19.9266 4.24842 19.8617 4.09202 19.782L3.18404 21.564C3.66937 21.8113 4.18608 21.9099 4.74817 21.9558C5.2986 22.0008 5.97642 22 6.8 22V20ZM1 16.2C1 17.0236 0.999222 17.7014 1.04419 18.2518C1.09012 18.8139 1.18868 19.3306 1.43597 19.816L3.21799 18.908C3.1383 18.7516 3.07337 18.5274 3.03755 18.089C3.00078 17.6389 3 17.0566 3 16.2H1ZM4.09202 19.782C3.7157 19.5903 3.40973 19.2843 3.21799 18.908L1.43597 19.816C1.81947 20.5686 2.43139 21.1805 3.18404 21.564L4.09202 19.782ZM21 16.2C21 17.0566 20.9992 17.6389 20.9624 18.089C20.9266 18.5274 20.8617 18.7516 20.782 18.908L22.564 19.816C22.8113 19.3306 22.9099 18.8139 22.9558 18.2518C23.0008 17.7014 23 17.0236 23 16.2H21ZM17.2 22C18.0236 22 18.7014 22.0008 19.2518 21.9558C19.8139 21.9099 20.3306 21.8113 20.816 21.564L19.908 19.782C19.7516 19.8617 19.5274 19.9266 19.089 19.9624C18.6389 19.9992 18.0566 20 17.2 20V22ZM20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782L20.816 21.564C21.5686 21.1805 22.1805 20.5686 22.564 19.816L20.782 18.908ZM17.2 8C18.0566 8 18.6389 8.00078 19.089 8.03755C19.5274 8.07337 19.7516 8.1383 19.908 8.21799L20.816 6.43597C20.3306 6.18868 19.8139 6.09012 19.2518 6.04419C18.7014 5.99922 18.0236 6 17.2 6V8ZM23 11.8C23 10.9764 23.0008 10.2986 22.9558 9.74817C22.9099 9.18608 22.8113 8.66937 22.564 8.18404L20.782 9.09202C20.8617 9.24842 20.9266 9.47262 20.9624 9.91104C20.9992 10.3611 21 10.9434 21 11.8H23ZM19.908 8.21799C20.2843 8.40973 20.5903 8.7157 20.782 9.09202L22.564 8.18404C22.1805 7.43139 21.5686 6.81947 20.816 6.43597L19.908 8.21799Z"
      fill={color}
    />
  </svg>
);

export const IconProjects: React.FC<IconProps> = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6657 9.1665H3.33391C2.82838 9.1665 2.35017 9.39596 2.03385 9.79029C1.71752 10.1846 1.59727 10.7012 1.70694 11.1947L2.63286 15.3614C2.80232 16.1239 3.47868 16.6665 4.25984 16.6665H15.6314C16.3972 16.6665 17.0644 16.1446 17.2489 15.4014L18.2833 11.2347C18.4069 10.7371 18.2945 10.2103 17.9786 9.80639C17.6627 9.4025 17.1785 9.1665 16.6657 9.1665Z"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 9.39297V7.45016C17.5 6.52969 16.7538 5.7835 15.8333 5.7835H10.441C10.1651 5.7835 9.90714 5.647 9.75197 5.41894L8.58113 3.69805C8.42596 3.46998 8.16797 3.33348 7.89212 3.3335H4.16667C3.24619 3.3335 2.5 4.07969 2.5 5.00016V9.39297"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconFile: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 3.5V6.2C13 7.88016 13 8.72024 13.327 9.36197C13.6146 9.92646 14.0735 10.3854 14.638 10.673C15.2798 11 16.1198 11 17.8 11H20.5M21 12.9882V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H11.0118C11.7455 3 12.1124 3 12.4577 3.08289C12.7638 3.15638 13.0564 3.27759 13.3249 3.44208C13.6276 3.6276 13.887 3.88703 14.4059 4.40589L19.5941 9.59411C20.113 10.113 20.3724 10.3724 20.5579 10.6751C20.7224 10.9436 20.8436 11.2362 20.9171 11.5423C21 11.8876 21 12.2545 21 12.9882Z"
      stroke="#3A6EC1"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconClipboard: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.8978 6.22354L20.8637 5.96472V5.96472L19.8978 6.22354ZM16 3C15.4477 3 15 3.44772 15 4C15 4.55228 15.4477 5 16 5V3ZM17.7765 4.10222L17.5176 5.06815L17.5176 5.06815L17.7765 4.10222ZM18.362 21.673L18.816 22.564H18.816L18.362 21.673ZM19.673 20.362L18.782 19.908L18.782 19.908L19.673 20.362ZM4.32698 20.362L5.21799 19.908L5.21799 19.908L4.32698 20.362ZM5.63803 21.673L5.18404 22.564H5.18404L5.63803 21.673ZM8 5C8.55228 5 9 4.55228 9 4C9 3.44772 8.55228 3 8 3V5ZM6.22354 4.10222L6.48236 5.06815L6.22354 4.10222ZM4.10222 6.22354L5.06815 6.48236L4.10222 6.22354ZM8.54601 5.89101L9 5L8.54601 5.89101ZM8.10899 5.45399L9 5L8.10899 5.45399ZM15.891 5.45399L15 5L15.891 5.45399ZM15.454 5.89101L15 5L15.454 5.89101ZM15.454 2.10899L15 3L15.454 2.10899ZM15.891 2.54601L15 3L15.891 2.54601ZM8.54601 2.10899L9 3L8.54601 2.10899ZM8.10899 2.54601L9 3L8.10899 2.54601ZM5 17.2V8H3V17.2H5ZM15.2 21H8.8V23H15.2V21ZM19 8V17.2H21V8H19ZM21 8C21 7.13441 21.0086 6.50545 20.8637 5.96472L18.9319 6.48236C18.9914 6.70464 19 7.00565 19 8H21ZM16 5C16.9944 5 17.2954 5.00859 17.5176 5.06815L18.0353 3.1363C17.4946 2.99141 16.8656 3 16 3V5ZM20.8637 5.96472C20.4938 4.58436 19.4156 3.50617 18.0353 3.1363L17.5176 5.06815C18.2078 5.25308 18.7469 5.79218 18.9319 6.48236L20.8637 5.96472ZM15.2 23C16.0236 23 16.7014 23.0008 17.2518 22.9558C17.8139 22.9099 18.3306 22.8113 18.816 22.564L17.908 20.782C17.7516 20.8617 17.5274 20.9266 17.089 20.9624C16.6389 20.9992 16.0566 21 15.2 21V23ZM19 17.2C19 18.0566 18.9992 18.6389 18.9624 19.089C18.9266 19.5274 18.8617 19.7516 18.782 19.908L20.564 20.816C20.8113 20.3306 20.9099 19.8139 20.9558 19.2518C21.0008 18.7014 21 18.0236 21 17.2H19ZM18.816 22.564C19.5686 22.1805 20.1805 21.5686 20.564 20.816L18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782L18.816 22.564ZM3 17.2C3 18.0236 2.99922 18.7014 3.04419 19.2518C3.09012 19.8139 3.18868 20.3306 3.43597 20.816L5.21799 19.908C5.1383 19.7516 5.07337 19.5274 5.03755 19.089C5.00078 18.6389 5 18.0566 5 17.2H3ZM8.8 21C7.94342 21 7.36113 20.9992 6.91104 20.9624C6.47262 20.9266 6.24842 20.8617 6.09202 20.782L5.18404 22.564C5.66937 22.8113 6.18608 22.9099 6.74817 22.9558C7.2986 23.0008 7.97642 23 8.8 23V21ZM3.43597 20.816C3.81947 21.5686 4.43139 22.1805 5.18404 22.564L6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908L3.43597 20.816ZM8 3C7.13441 3 6.50545 2.99141 5.96472 3.1363L6.48236 5.06815C6.70464 5.00859 7.00565 5 8 5V3ZM5 8C5 7.00565 5.00859 6.70464 5.06815 6.48236L3.1363 5.96472C2.99141 6.50545 3 7.13441 3 8H5ZM5.96472 3.1363C4.58436 3.50617 3.50617 4.58436 3.1363 5.96472L5.06815 6.48236C5.25308 5.79218 5.79218 5.25308 6.48236 5.06815L5.96472 3.1363ZM9.6 3H14.4V1H9.6V3ZM15 3.6V4.4H17V3.6H15ZM14.4 5H9.6V7H14.4V5ZM9 4.4V3.6H7V4.4H9ZM9.6 5C9.30347 5 9.14122 4.99922 9.02463 4.9897C8.91972 4.98113 8.94249 4.9707 9 5L8.09202 6.78201C8.36344 6.92031 8.63318 6.96438 8.86177 6.98305C9.07869 7.00078 9.33647 7 9.6 7V5ZM7 4.4C7 4.66353 6.99922 4.92131 7.01695 5.13823C7.03562 5.36682 7.07969 5.63656 7.21799 5.90798L9 5C9.0293 5.05751 9.01887 5.08028 9.0103 4.97537C9.00078 4.85878 9 4.69653 9 4.4H7ZM9 5L7.21799 5.90798C7.40973 6.28431 7.71569 6.59027 8.09202 6.78201L9 5ZM15 4.4C15 4.69653 14.9992 4.85878 14.9897 4.97537C14.9811 5.08028 14.9707 5.05751 15 5L16.782 5.90798C16.9203 5.63656 16.9644 5.36682 16.9831 5.13823C17.0008 4.92131 17 4.66353 17 4.4H15ZM14.4 7C14.6635 7 14.9213 7.00078 15.1382 6.98305C15.3668 6.96438 15.6366 6.92031 15.908 6.78201L15 5C15.0575 4.9707 15.0803 4.98113 14.9754 4.9897C14.8588 4.99922 14.6965 5 14.4 5V7ZM15 5L15.908 6.78201C16.2843 6.59027 16.5903 6.2843 16.782 5.90798L15 5ZM14.4 3C14.6965 3 14.8588 3.00078 14.9754 3.0103C15.0803 3.01887 15.0575 3.0293 15 3L15.908 1.21799C15.6366 1.07969 15.3668 1.03562 15.1382 1.01695C14.9213 0.999222 14.6635 1 14.4 1V3ZM17 3.6C17 3.33647 17.0008 3.07869 16.9831 2.86177C16.9644 2.63318 16.9203 2.36344 16.782 2.09202L15 3C14.9707 2.94249 14.9811 2.91972 14.9897 3.02463C14.9992 3.14122 15 3.30347 15 3.6H17ZM15 3L16.782 2.09202C16.5903 1.7157 16.2843 1.40973 15.908 1.21799L15 3ZM9.6 1C9.33647 1 9.07869 0.999222 8.86177 1.01695C8.63318 1.03562 8.36344 1.07969 8.09202 1.21799L9 3C8.94249 3.0293 8.91972 3.01887 9.02463 3.0103C9.14122 3.00078 9.30347 3 9.6 3V1ZM9 3.6C9 3.30347 9.00078 3.14122 9.0103 3.02463C9.01887 2.91972 9.0293 2.94249 9 3L7.21799 2.09202C7.07969 2.36344 7.03562 2.63318 7.01695 2.86177C6.99922 3.07869 7 3.33647 7 3.6H9ZM8.09202 1.21799C7.71569 1.40973 7.40973 1.71569 7.21799 2.09202L9 3L8.09202 1.21799Z"
      fill="#3A6EC1"
    />
  </svg>
);

export const IconTeam: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.3334 16.6667V15.8333C13.3334 13.9924 11.841 12.5 10.0001 12.5H5.00008C3.15913 12.5 1.66675 13.9924 1.66675 15.8333V16.6667"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <ellipse
      cx="7.50008"
      cy="5.83333"
      rx="3.33333"
      ry="3.33333"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3333 16.6667V15.8333C18.3333 13.9924 16.8409 12.5 15 12.5V12.5"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 2.5C14.3409 2.5 15.8333 3.99238 15.8333 5.83333C15.8333 7.67428 14.3409 9.16667 12.5 9.16667"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconArrowFluxo: React.FC = () => (
  <svg width="69" height="25" viewBox="0 0 69 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M68.0607 14.0607C68.6465 13.4749 68.6465 12.5251 68.0607 11.9393L58.5147 2.3934C57.9289 1.80761 56.9792 1.80761 56.3934 2.3934C55.8076 2.97918 55.8076 3.92893 56.3934 4.51472L64.8787 13L56.3934 21.4853C55.8076 22.0711 55.8076 23.0208 56.3934 23.6066C56.9792 24.1924 57.9289 24.1924 58.5147 23.6066L68.0607 14.0607ZM7 14.5H67V11.5H7V14.5Z"
      fill="#CED4DA"
    />
    <circle cx="7" cy="13" r="7" fill="#CED4DA" />
  </svg>
);

export const IconBold: React.FC = () => (
  <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.6 6.79C9.57 6.12 10.25 5.02 10.25 4C10.25 1.74 8.5 0 6.25 0H0V14H7.04C9.13 14 10.75 12.3 10.75 10.21C10.75 8.69 9.89 7.39 8.6 6.79V6.79ZM3 2.5H6C6.83 2.5 7.5 3.17 7.5 4C7.5 4.83 6.83 5.5 6 5.5H3V2.5ZM6.5 11.5H3V8.5H6.5C7.33 8.5 8 9.17 8 10C8 10.83 7.33 11.5 6.5 11.5Z"
      fill="#667085"
    />
  </svg>
);

export const IconItalic: React.FC = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z" fill="#667085" />
  </svg>
);

export const IconTitle: React.FC = () => (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.7822 15H8.85254V8.90625H3.13965V15H0.209961V0.78125H3.13965V6.54297H8.85254V0.78125H11.7822V15Z"
      fill="#667085"
    />
  </svg>
);

export const IconSubTitle: React.FC = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.74805 12H7.02148V7.25H2.98242V12H0.240234V0.625H2.98242V5.14062H7.02148V0.625H9.74805V12Z"
      fill="#667085"
    />
  </svg>
);

export const IconBlockquote: React.FC = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 10H4L6 6V0H0V6H3L1 10ZM9 10H12L14 6V0H8V6H11L9 10Z" fill="#667085" />
  </svg>
);

export const IconBulletCircle: React.FC = () => (
  <svg width="19" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.25 6.5C1.42 6.5 0.75 7.17 0.75 8C0.75 8.83 1.42 9.5 2.25 9.5C3.08 9.5 3.75 8.83 3.75 8C3.75 7.17 3.08 6.5 2.25 6.5ZM2.25 0.5C1.42 0.5 0.75 1.17 0.75 2C0.75 2.83 1.42 3.5 2.25 3.5C3.08 3.5 3.75 2.83 3.75 2C3.75 1.17 3.08 0.5 2.25 0.5ZM2.25 12.5C1.42 12.5 0.75 13.18 0.75 14C0.75 14.82 1.43 15.5 2.25 15.5C3.07 15.5 3.75 14.82 3.75 14C3.75 13.18 3.08 12.5 2.25 12.5ZM5.25 15H19.25V13H5.25V15ZM5.25 9H19.25V7H5.25V9ZM5.25 1V3H19.25V1H5.25Z"
      fill="#667085"
    />
  </svg>
);

export const IconBulletList: React.FC = () => (
  <svg width="18" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 13H2V13.5H1V14.5H2V15H0V16H3V12H0V13ZM1 4H2V0H0V1H1V4ZM0 7H1.8L0 9.1V10H3V9H1.2L3 6.9V6H0V7ZM5 1V3H19V1H5ZM5 15H19V13H5V15ZM5 9H19V7H5V9Z"
      fill="#667085"
    />
  </svg>
);

export const IconLink: React.FC = () => (
  <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.9 5C1.9 3.29 3.29 1.9 5 1.9H9V0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H9V8.1H5C3.29 8.1 1.9 6.71 1.9 5ZM6 6H14V4H6V6ZM15 0H11V1.9H15C16.71 1.9 18.1 3.29 18.1 5C18.1 6.71 16.71 8.1 15 8.1H11V10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0Z"
      fill="#667085"
    />
  </svg>
);

export const IconStrike: React.FC = () => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"></path>
    </g>
  </svg>
);

export const IconArrowLeft: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 8L10 12L14 16"
      stroke="#344054"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconArrowDown: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 10L12 14L16 10"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconTrash: React.FC<IconProps> = ({ width = '16px', height = '16px' }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7588 13.9998H5.23879C4.54079 13.9998 3.96079 13.4612 3.90879 12.7645L3.31079 4.6665H12.6668L12.0888 12.7612C12.0388 13.4592 11.4581 13.9998 10.7588 13.9998V13.9998Z"
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00008 7.3335V11.3335"
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.66675 4.66683H13.3334"
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3334 4.66667L10.6581 2.86533C10.4627 2.34467 9.96541 2 9.40941 2H6.59075C6.03475 2 5.53741 2.34467 5.34208 2.86533L4.66675 4.66667"
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.2867 7.3335L10.0001 11.3335"
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.71344 7.3335L6.0001 11.3335"
      stroke="#F04438"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconPlus: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.99992 3.3335V12.6668M3.33325 8.00016H12.6666"
      stroke="#0045B5"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMinus: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.33325 8H12.6666"
      stroke="#D0D5DD"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMail: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 6.8V6.8C3 7.4 3.3 7.9 3.8 8.3L9.8 12.4C11.2 13.3 12.9 13.3 14.3 12.4L20.3 8.4C20.7 7.9 21 7.4 21 6.8V6.8C21 5.8 20.2 5 19.2 5H4.8C3.8 5 3 5.8 3 6.8Z"
      stroke="#0045B5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7"
      stroke="#0045B5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.58789 18.4119L9.68189 12.3179"
      stroke="#0045B5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.3604 12.3599L20.4124 18.4119"
      stroke="#0045B5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconChecked: React.FC = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF" />
    <path
      d="M38 27.0799V27.9999C37.9988 30.1563 37.3005 32.2545 36.0093 33.9817C34.7182 35.7088 32.9033 36.9723 30.8354 37.5838C28.7674 38.1952 26.5573 38.1218 24.5345 37.3744C22.5117 36.6271 20.7847 35.246 19.611 33.4369C18.4373 31.6279 17.8798 29.4879 18.0217 27.3362C18.1636 25.1844 18.9972 23.1362 20.3983 21.4969C21.7994 19.8577 23.6928 18.7152 25.7962 18.24C27.8996 17.7648 30.1003 17.9822 32.07 18.8599M38 19.9999L28 30.0099L25 27.0099"
      stroke="#039855"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" strokeWidth="8" />
  </svg>
);

export const IconCheckedBlue: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="#0046B5" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.0965 7.39016L9.9365 14.3002L8.0365 12.2702C7.6865 11.9402 7.1365 11.9202 6.7365 12.2002C6.3465 12.4902 6.2365 13.0002 6.4765 13.4102L8.7265 17.0702C8.9465 17.4102 9.3265 17.6202 9.7565 17.6202C10.1665 17.6202 10.5565 17.4102 10.7765 17.0702C11.1365 16.6002 18.0065 8.41016 18.0065 8.41016C18.9065 7.49016 17.8165 6.68016 17.0965 7.38016V7.39016Z"
      fill="white"
    />
  </svg>
);

export const IconFlux: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="5.41477"
      cy="4.58078"
      r="2.0842"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="5.41477"
      cy="15.4187"
      r="2.0842"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.41489 6.66504V13.3345"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="14.5852"
      cy="10.8332"
      r="2.0842"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.41479 6.66504V6.66504C5.41479 8.96718 7.28105 10.8334 9.5832 10.8334H12.5011"
      stroke="#0065D4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconProducts: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3975_40975)">
      <path
        d="M10.0001 2.49658V6.66498"
        stroke="#0065D4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83154 14.1683H7.4989"
        stroke="#0065D4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5031 8.3324C17.5031 7.41154 16.7566 6.66504 15.8357 6.66504H4.16419C3.24333 6.66504 2.49683 7.41154 2.49683 8.3324"
        stroke="#0065D4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8357 17.5028H4.37261C3.33664 17.5028 2.49683 16.663 2.49683 15.6271V7.08182C2.49656 6.63157 2.5879 6.18596 2.76527 5.77211L3.67732 3.63539C3.97224 2.94453 4.65103 2.49638 5.4022 2.49658H14.5969C15.348 2.49638 16.0268 2.94453 16.3218 3.63539L17.2388 5.77211C17.4146 6.1863 17.5045 6.63187 17.5031 7.08182V15.8355C17.5031 16.7563 16.7566 17.5028 15.8357 17.5028Z"
        stroke="#0065D4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3975_40975">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const IconClose: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 8L16 16"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 8L8 16"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCalendar: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.6668 1.33301V3.99967"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.33333 1.33301V3.99967"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M2 6.00033H14" stroke="#039855" strokeLinecap="round" strokeLinejoin="round" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6667 2.66699H3.33333C2.59667 2.66699 2 3.26366 2 4.00033V12.667C2 13.4037 2.59667 14.0003 3.33333 14.0003H12.6667C13.4033 14.0003 14 13.4037 14 12.667V4.00033C14 3.26366 13.4033 2.66699 12.6667 2.66699Z"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.67544 8.486C4.58344 8.486 4.50878 8.56067 4.50944 8.65267C4.50944 8.74467 4.58411 8.81934 4.67611 8.81934C4.76811 8.81934 4.84278 8.74467 4.84278 8.65267C4.84278 8.56067 4.76811 8.486 4.67544 8.486"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00845 8.486C7.91645 8.486 7.84178 8.56067 7.84245 8.65267C7.84245 8.74467 7.91712 8.81934 8.00912 8.81934C8.10112 8.81934 8.17578 8.74467 8.17578 8.65267C8.17578 8.56067 8.10112 8.486 8.00845 8.486"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3419 8.486C11.2499 8.486 11.1753 8.56067 11.1759 8.65267C11.1759 8.74467 11.2506 8.81934 11.3426 8.81934C11.4346 8.81934 11.5093 8.74467 11.5093 8.65267C11.5093 8.56067 11.4346 8.486 11.3419 8.486"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.67544 11.153C4.58344 11.153 4.50878 11.2277 4.50944 11.3197C4.50944 11.4117 4.58411 11.4863 4.67611 11.4863C4.76811 11.4863 4.84278 11.4117 4.84278 11.3197C4.84278 11.2277 4.76811 11.153 4.67544 11.153"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.00845 11.153C7.91645 11.153 7.84178 11.2277 7.84245 11.3197C7.84245 11.4117 7.91712 11.4863 8.00912 11.4863C8.10112 11.4863 8.17578 11.4117 8.17578 11.3197C8.17578 11.2277 8.10112 11.153 8.00845 11.153"
      stroke="#039855"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconText: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3.59782 6.66667H6.80823"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33334 11.6667H16.6667"
      stroke="#101828"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33334 15.8337H16.6667"
      stroke="#101828"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8333 3.33366H16.6667"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.8333 7.49967H16.6667"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.08334 7.49967L5.77797 3.47077C5.75541 3.39135 5.68407 3.33564 5.60155 3.33301H4.81512C4.7326 3.33564 4.66126 3.39135 4.6387 3.47077L3.33334 7.49967"
      stroke="black"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconPlay: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.925 11.121L9.586 7.15898C8.896 6.72798 8 7.22398 8 8.03798V15.961C8 16.775 8.896 17.272 9.586 16.84L15.924 12.878C16.575 12.473 16.575 11.527 15.925 11.121Z"
      fill="white"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconDefault: React.FC = () => <svg />;

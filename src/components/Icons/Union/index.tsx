import { FC, HTMLAttributes } from "react";

const Union: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => (
  <svg id="union" width="102" height="3" viewBox="0 0 102 3" fill="none" {...props}>
    <path
      opacity="0.1"
      d="M42.2464 1.14918C42.9616 0.610527 43.7722 0 45.3249 0C46.8789 0 47.6919 0.611069 48.4106 1.15296C49.1136 1.68332 49.7199 2.1399 51 2.1399C52.2779 2.1399 52.8842 1.68332 53.5827 1.15296L53.5877 1.14916C54.3029 0.61048 55.1135 2.73971e-07 56.6617 2.73971e-07C58.212 2.73971e-07 59.0226 0.610465 59.7378 1.14905L59.7429 1.15296C60.4437 1.68332 61.0478 2.1399 62.3256 2.1399C63.6058 2.1399 64.2098 1.68332 64.9105 1.15296C65.6247 0.613355 66.4376 2.73971e-07 67.9896 2.73971e-07C69.5399 2.73971e-07 70.3504 0.610465 71.0656 1.14905L71.0708 1.15296C71.7715 1.68332 72.3756 2.1399 73.6535 2.1399C74.9325 2.1399 75.5366 1.68415 76.2387 1.1544L76.2407 1.15296C76.9548 0.613355 77.7678 2.73971e-07 79.3219 2.73971e-07C80.8737 2.73971e-07 81.6867 0.613417 82.4009 1.15296C83.1016 1.68332 83.7079 2.1399 84.9858 2.1399C86.2659 2.1399 86.8723 1.68332 87.573 1.15296L87.578 1.14917C88.2932 0.610487 89.1037 2.73971e-07 90.6542 2.73971e-07C92.2068 2.73971e-07 93.0174 0.610462 93.7325 1.14905L93.7377 1.15296L93.7394 1.15425C94.4416 1.68406 95.0458 2.1399 96.3271 2.1399C97.6072 2.1399 98.2136 1.68332 98.9165 1.15296L98.9183 1.15159C99.5649 0.66455 100.291 0.117917 101.569 0.0166069C101.806 -0.00219042 101.999 0.19322 101.999 0.431165C101.998 0.668239 101.805 0.857257 101.569 0.878757C100.572 0.969527 100.028 1.37963 99.4083 1.84704L99.4065 1.84844C98.6905 2.3877 97.8776 3 96.3248 3C94.7722 3 93.9616 2.3895 93.2464 1.85086L93.2414 1.84704L93.2395 1.84567C92.5373 1.31589 91.9332 0.860099 90.652 0.860099C89.3718 0.860099 88.7678 1.31668 88.0671 1.84704L88.0621 1.85079C87.3469 2.38948 86.5363 3 84.9835 3C83.4331 3 82.6225 2.3895 81.9074 1.85086L81.9023 1.84704C81.2016 1.31668 80.5975 0.860099 79.3196 0.860099C78.0395 0.860099 77.4354 1.31668 76.7347 1.84704C76.0205 2.38665 75.2076 3 73.6535 3C72.1016 3 71.2886 2.38661 70.5745 1.84704C69.8737 1.31668 69.2674 0.860099 67.9895 0.860099C66.7117 0.860099 66.1054 1.31668 65.4069 1.84704L65.4018 1.85084C64.6866 2.38951 63.8761 3 62.3256 3C60.7738 3 59.9608 2.38661 59.2466 1.84704C58.5459 1.31668 57.9396 0.860099 56.6617 0.860099C55.3838 0.860099 54.7775 1.31668 54.079 1.84704L54.074 1.85084C53.3588 2.38952 52.5483 3 51 3C49.4473 3 48.6344 2.38773 47.9185 1.84852L47.9165 1.84704C47.2136 1.31665 46.6072 0.860099 45.3271 0.860099C44.0458 0.860099 43.4416 1.31593 42.7394 1.84574L42.7377 1.84704L42.7325 1.85094C42.0174 2.38953 41.2068 3 39.6542 3C38.1038 3 37.2932 2.38953 36.5781 1.85089L36.5729 1.84704C35.8722 1.31665 35.2659 0.860099 33.9858 0.860099C32.7079 0.860099 32.1016 1.31668 31.4009 1.84704C30.6867 2.38658 29.8737 3 28.3219 3C26.7678 3 25.9548 2.38661 25.2406 1.84704L25.2389 1.84577C24.5367 1.31592 23.9326 0.860099 22.6535 0.860099C21.3756 0.860099 20.7715 1.31668 20.0708 1.84704L20.0656 1.85095C19.3505 2.38954 18.5399 3 16.9896 3C15.4377 3 14.6247 2.38661 13.9105 1.84704C13.2098 1.31665 12.6057 0.860099 11.3256 0.860099C10.0477 0.860099 9.44366 1.31668 8.74295 1.84704L8.73776 1.85095C8.02261 2.38954 7.21203 3 5.6617 3C4.1135 3 3.30295 2.38953 2.58779 1.8509L2.58267 1.84704C1.96749 1.37989 1.42378 0.970017 0.42974 0.878921C0.193221 0.857246 0 0.667559 0 0.430049C0 0.19254 0.193027 -0.00220052 0.429794 0.0165683C1.70443 0.117611 2.42809 0.662672 3.07399 1.14916L3.07902 1.15296C3.77751 1.68332 4.38381 2.1399 5.6617 2.1399C6.93956 2.1399 7.54591 1.68332 8.2466 1.15296C8.96079 0.613386 9.77376 0 11.3256 0C12.8761 0 13.6867 0.61049 14.4018 1.14917L14.4069 1.15296C15.1054 1.68332 15.7116 2.1399 16.9895 2.1399C18.2674 2.1399 18.8738 1.68332 19.5744 1.15296C20.2886 0.613386 21.1016 0 22.6535 0C24.2076 0 25.0206 0.613354 25.7347 1.15296C26.4355 1.68332 27.0395 2.1399 28.3196 2.1399C29.5975 2.1399 30.2016 1.68332 30.9023 1.15296L30.9074 1.14914C31.6226 0.610501 32.4331 0 33.9836 0C35.5363 0 36.3468 0.610498 37.062 1.14918L37.067 1.15296C37.7678 1.68332 38.3718 2.1399 39.652 2.1399C40.9333 2.1399 41.5374 1.68406 42.2396 1.15425L42.2413 1.15296L42.2464 1.14918Z"
      fill="white"
    />
  </svg>
);

export default Union;

import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const background = keyframes`
  100% {
    background-size: 4000px 1000px;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 0.7s;
  form {
    margin: 28px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin-bottom: 20px;
    }
  }
  > a {
    color: #faae42;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#FAAE42')};
    }
    svg {
      margin-right: 8px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='780' height='840' preserveAspectRatio='none' viewBox='0 0 780 840'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1009%26quot%3b)' fill='none'%3e%3crect width='780' height='840' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M619.4003226023981 518.9686176044573L622.9100868288349 720.0428754700243 823.9843446944019 716.5331112435875 820.4745804679651 515.4588533780205z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M280.27450410120383 521.8217613837221L275.75293470915227 392.3409550366539 83.79250988457588 463.86371229826534z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M641.303%2c394.606C665.159%2c392.947%2c679.692%2c371.395%2c691.988%2c350.884C704.812%2c329.493%2c720.854%2c304.489%2c708.218%2c282.987C695.659%2c261.615%2c666.003%2c262.54%2c641.303%2c264.633C620.926%2c266.36%2c603.07%2c276.004%2c591.514%2c292.876C577.854%2c312.818%2c566.107%2c337.189%2c576.733%2c358.9C588.321%2c382.577%2c615.006%2c396.435%2c641.303%2c394.606' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M649.176%2c917.089C714.797%2c919.618%2c773.733%2c877.842%2c805.473%2c820.352C836.173%2c764.747%2c835.367%2c695.854%2c800.705%2c642.628C768.764%2c593.58%2c707.704%2c579.727%2c649.176%2c580.345C591.993%2c580.949%2c532.437%2c596.69%2c503.093%2c645.773C473.109%2c695.926%2c484.74%2c757.609%2c512.441%2c809.058C541.956%2c863.875%2c586.964%2c914.691%2c649.176%2c917.089' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M529.8537806757191 92.86794237680058L462.40563628114194 205.1205052153105 664.5085527361954 250.1664403879213z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M292.5556875660188 651.3981383793076L463.6546993954428 636.4289145037451 448.6854755198802 465.32990267432103 277.5864636904562 480.2991265498836z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M64.87546868875884 828.5592179653746L228.77355154134864 992.4573008179643 392.67163439393835 828.5592179653745 228.77355154134855 664.6611351127848z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M642.131227997254 300.7805122154571L809.7840333113996 243.05302190032046 752.056542996263 75.40021658617479 584.4037376821173 133.12770690131146z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M555.9623448138084 651.5406914343658L440.3696471012248 595.1623657596963 499.5840191391389 767.1333891469494z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1009'%3e%3crect width='780' height='840' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

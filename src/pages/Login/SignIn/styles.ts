import styled, { keyframes } from "styled-components";
import { shade } from "polished";

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

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromLeft} 0.7s;
  form {
    margin: 80px 0;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin-bottom: 24px;
    }
    a {
      color: #343a40;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, "#343a40")};
      }
    }
  }
  > a {
    color: #FAAE42;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, "#FAAE42")};
    }
    svg {
      margin-right: 8px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  /* background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='780' height='840' preserveAspectRatio='none' viewBox='0 0 780 840'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1024%26quot%3b)' fill='none'%3e%3crect width='780' height='840' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M859.7948310832671 692.6096290705973L859.7948310832671 497.95405258154835 665.1392545942181 497.95405258154835 665.1392545942182 692.6096290705973z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M660.59%2c122.313C682.381%2c121.479%2c704.523%2c114.095%2c715.223%2c95.093C725.76%2c76.381%2c720.701%2c53.639%2c709.618%2c35.245C698.94%2c17.522%2c681.223%2c5.959%2c660.59%2c4.416C636.56%2c2.619%2c610.184%2c6.668%2c596.971%2c26.819C582.717%2c48.558%2c583.783%2c77.94%2c598.196%2c99.574C611.351%2c119.319%2c636.881%2c123.221%2c660.59%2c122.313' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M550.4155154902834 126.25478148962439L566.417062533871 278.4993318937053 718.661612937952 262.4977848501176 702.6600658943643 110.25323444603674z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M460.63640459185126 508.25907146034035L549.4378590899196 341.2478258245751 382.4266134541544 252.44637132650672 293.625158956086 419.45761696227197z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M282.018%2c365.741C324.13%2c366.866%2c362.416%2c343.356%2c384.552%2c307.514C407.96%2c269.613%2c417.263%2c221.669%2c394.729%2c183.242C372.403%2c145.169%2c326.133%2c131.318%2c282.018%2c132.666C240.464%2c133.936%2c200.702%2c153.373%2c180.638%2c189.784C161.194%2c225.07%2c168.44%2c267.369%2c188.553%2c302.278C208.703%2c337.25%2c241.67%2c364.663%2c282.018%2c365.741' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M202.61864480778254 285.5946224132003L301.7364417545134 175.51315668186217 87.05534468414083 81.8771941274349z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M666.3110692586793 210.80917090801645L408.0180760926005 197.0257615068865 507.1381565735629 400.2520432946528z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M226.718%2c555.226C247.165%2c553.956%2c264.163%2c541.446%2c274.751%2c523.908C285.775%2c505.648%2c291.352%2c483.469%2c281.444%2c464.58C270.903%2c444.483%2c249.389%2c431.318%2c226.718%2c432.333C205.457%2c433.285%2c190.911%2c450.935%2c179.872%2c469.13C168.24%2c488.304%2c156.389%2c510.892%2c167.108%2c530.592C178.122%2c550.834%2c203.718%2c556.654%2c226.718%2c555.226' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M-64.38809503477658 491.490687101452L88.3632147144301 467.29725639798403 64.16978401096209 314.5459466487773-88.5815257382446 338.73937735224536z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M148.24074935970958 666.7999410586307L39.26960161541244 848.1583864176514 329.59919471873025 775.7710888029278z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M74.59137791886766 473.74201252678347L125.29650538264751 621.0003952610316 221.8497606531158 423.03688506300364z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M373.3295062943666-32.212264909608606L298.6512835140645 172.9644659042732 503.8280143279463 247.64268868457526 578.5062371082483 42.46595787069349z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M41.16403705537723 777.1990411186953L229.28094881193311 793.6571383149005 57.62213425158243 589.0821293621394z' fill='rgba(28%2c 142%2c 100%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1024'%3e%3crect width='780' height='840' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e"); */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='780' height='840' preserveAspectRatio='none' viewBox='0 0 780 840'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1009%26quot%3b)' fill='none'%3e%3crect width='780' height='840' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M619.4003226023981 518.9686176044573L622.9100868288349 720.0428754700243 823.9843446944019 716.5331112435875 820.4745804679651 515.4588533780205z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M280.27450410120383 521.8217613837221L275.75293470915227 392.3409550366539 83.79250988457588 463.86371229826534z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M641.303%2c394.606C665.159%2c392.947%2c679.692%2c371.395%2c691.988%2c350.884C704.812%2c329.493%2c720.854%2c304.489%2c708.218%2c282.987C695.659%2c261.615%2c666.003%2c262.54%2c641.303%2c264.633C620.926%2c266.36%2c603.07%2c276.004%2c591.514%2c292.876C577.854%2c312.818%2c566.107%2c337.189%2c576.733%2c358.9C588.321%2c382.577%2c615.006%2c396.435%2c641.303%2c394.606' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M649.176%2c917.089C714.797%2c919.618%2c773.733%2c877.842%2c805.473%2c820.352C836.173%2c764.747%2c835.367%2c695.854%2c800.705%2c642.628C768.764%2c593.58%2c707.704%2c579.727%2c649.176%2c580.345C591.993%2c580.949%2c532.437%2c596.69%2c503.093%2c645.773C473.109%2c695.926%2c484.74%2c757.609%2c512.441%2c809.058C541.956%2c863.875%2c586.964%2c914.691%2c649.176%2c917.089' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M529.8537806757191 92.86794237680058L462.40563628114194 205.1205052153105 664.5085527361954 250.1664403879213z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M292.5556875660188 651.3981383793076L463.6546993954428 636.4289145037451 448.6854755198802 465.32990267432103 277.5864636904562 480.2991265498836z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M64.87546868875884 828.5592179653746L228.77355154134864 992.4573008179643 392.67163439393835 828.5592179653745 228.77355154134855 664.6611351127848z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M642.131227997254 300.7805122154571L809.7840333113996 243.05302190032046 752.056542996263 75.40021658617479 584.4037376821173 133.12770690131146z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M555.9623448138084 651.5406914343658L440.3696471012248 595.1623657596963 499.5840191391389 767.1333891469494z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1009'%3e%3crect width='780' height='840' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;
import { Channel, ChannelBox } from 'planby';

interface ChannelItemProps {
  channel: Channel;
}

export const ChannelItem = ({ channel }: ChannelItemProps) => {
  const { position } = channel;
  console.log('log do channel', channel);
  return (
    <ChannelBox {...position}>
      {/* Overwrite styles by add eg. style={{ maxHeight: 52, maxWidth: 52,... }} */}
      {/* Or stay with default styles */}
      {/* <ChannelLogo src={logo} alt="Logo" style={{ maxHeight: 52, maxWidth: 52 }} /> */}
    </ChannelBox>
  );
};

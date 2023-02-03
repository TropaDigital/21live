import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ScrollAreas({ children }: Props) {
  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
}

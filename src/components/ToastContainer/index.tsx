import React from "react";
import { useTransition } from "@react-spring/web";

import { ToastMessage } from "../../hooks/toast";

import Toast from "./Toast";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    {
      from: { right: "-120%", opacity: 0 },
      enter: { right: "0%", opacity: 1 },
      leave: { right: "-120%", opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions(( styles ,item) => item && <Toast 
        key={item.id} 
        message={item} 
        style={styles}
      />)}
    </Container>
  );
};

export default ToastContainer;
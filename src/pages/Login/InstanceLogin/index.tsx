/* eslint-disable import-helpers/order-imports */
// React
import { useEffect } from 'react';

// Styles
import { useLocation } from 'react-router-dom';
import { InstanceWrapper } from './styles';

// Libraries
import { Triangle } from 'react-loader-spinner';

export default function InstanceLogin() {
  const location = useLocation();

  useEffect(() => {
    console.log('log do location no pré-login', location.pathname.replace('/signin/', ''));

    // https://app.21live.com.br/demo/
  }, [location]);

  return (
    <InstanceWrapper>
      <Triangle
        width="350"
        height="350"
        color="var(--light)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </InstanceWrapper>
  );
}

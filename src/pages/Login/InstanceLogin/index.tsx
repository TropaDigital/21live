/* eslint-disable import-helpers/order-imports */
// React
import { useEffect } from 'react';

// Styles
import { useLocation, useNavigate } from 'react-router-dom';
import { InstanceWrapper } from './styles';

// Libraries
import { Triangle } from 'react-loader-spinner';
import api from '../../../services/api';

export default function InstanceLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const slug: string | undefined = location.pathname.split('/')[2];

    async function checkIfHaveAccess() {
      try {
        const response = await api.get(`/have-acess?slug=${slug}`);

        if (response.data.result.length > 0) {
          sessionStorage.setItem('tenant_id', response.data.result[0].tenant_id);
          sessionStorage.setItem('bucket', response.data.result[0].bucket);
          navigate('/login');
        } else {
          window.location.replace('https://app.21live.com.br/');
        }
      } catch (error: any) {
        console.log('log do error check access', error);
      }
    }

    checkIfHaveAccess();
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

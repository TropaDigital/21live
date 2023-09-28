import React, { useEffect, useId, useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import { ContainerPaginate } from './styles';

interface Props {
  total: number;
  lastPage: number;
  perPage: number;
  currentPage: number;
  onClickPage: (key: number) => void;
}

const Pagination: React.FC<Props> = (props) => {
  const prefix1 = useId();
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    const min = props.currentPage < 5 ? 1 : props.currentPage - 5;
    const max = props.currentPage < 5 ? 10 : props.currentPage + 5;
    const pgs = [];
    for (let i = 1; i <= props.lastPage; i++) {
      if (i >= min && i <= max) pgs.push(i);
    }
    setPages([...pgs]);
  }, [props]);

  const onClickPage = (page: number) => {
    props.onClickPage(page);
  };

  return (
    <>
      {pages.length > 0 && (
        <ContainerPaginate>
          <button
            className="buttonPagination"
            onClick={() => onClickPage(1)}
            style={{ borderRadius: '4px 0 0 4px' }}
            disabled={props.currentPage === 1}
          >
            <BiLeftArrowAlt size={20} />
            Primeira
          </button>

          {pages.map((page) => (
            <button
              className={`currentButtonPAgination ${props.currentPage === page ? 'isActive' : ''}`}
              key={prefix1 + page}
              onClick={() => onClickPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="buttonPagination"
            onClick={() => onClickPage(props.lastPage)}
            style={{ borderRadius: '0 4px 4px 0' }}
            disabled={props.lastPage === 1}
          >
            Última
            <BiRightArrowAlt size={20} />
          </button>
        </ContainerPaginate>
      )}
    </>
  );
};

export default Pagination;

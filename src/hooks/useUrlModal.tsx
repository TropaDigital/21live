import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ModalConfig {
  id: string;
  isOpen: boolean;
}

interface UseUrlModalResult {
  modal: ModalConfig;
  toggleModal: () => void;
}

const useUrlModal = (initialModal: ModalConfig): UseUrlModalResult => {
  const [modal, setModal] = useState(initialModal);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const isOpenParam = searchParams.get(modal.id);
    const isOpen = isOpenParam === 'true';

    setModal((prevState) => ({ ...prevState, isOpen }));
  }, [modal.id, searchParams]);

  function toggleModal() {
    const isOpen = !modal.isOpen;
    setSearchParams({ [modal.id]: isOpen.toString() });
    setModal((prevState) => ({ ...prevState, isOpen }));
  }

  // Redirect to current URL with modal query param when modal is first opened
  useEffect(() => {
    if (modal.isOpen) {
      setSearchParams({ [modal.id]: 'true' });
    }
  }, [modal.id, modal.isOpen, setSearchParams]);

  // Ensure modal query param is removed when modal is closed
  useEffect(() => {
    if (!modal.isOpen && searchParams.has(modal.id)) {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        newSearchParams.delete(modal.id);
        return newSearchParams;
      });
    }
  }, [modal.id, modal.isOpen, searchParams, setSearchParams]);

  return {
    modal,
    toggleModal
  };
};

export default useUrlModal;

import { useContext, createContext, useState } from 'react';
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(null);
  return (
    <ModalContext.Provider value={{ show, openModal: (modalname) => setShow(modalname), closeModal: () => setShow(null) }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext);
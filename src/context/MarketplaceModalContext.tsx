import { createContext, useContext, useState, ReactNode } from 'react';
import AddEditListingModal from '../components/AddEditListingModal';

interface MarketplaceModalContextType {
  openAddListingModal: () => void;
  openEditListingModal: (initialData: any) => void;
  closeModal: () => void;
}

const MarketplaceModalContext = createContext<MarketplaceModalContextType | undefined>(undefined);

export const useMarketplaceModal = () => {
  const ctx = useContext(MarketplaceModalContext);
  if (!ctx) throw new Error('useMarketplaceModal must be used within MarketplaceModalProvider');
  return ctx;
};

export const MarketplaceModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  const openAddListingModal = () => {
    setEditMode(false);
    setInitialData(null);
    setModalOpen(true);
  };

  const openEditListingModal = (data: any) => {
    setEditMode(true);
    setInitialData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInitialData(null);
    setEditMode(false);
  };

  return (
    <MarketplaceModalContext.Provider value={{ openAddListingModal, openEditListingModal, closeModal }}>
      {children}
      <AddEditListingModal
        open={modalOpen}
        onClose={closeModal}
        initialData={editMode ? initialData : undefined}
        onSave={closeModal} // You can enhance this to refresh listings globally
      />
    </MarketplaceModalContext.Provider>
  );
}; 
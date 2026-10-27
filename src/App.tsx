import React, { useState } from 'react';
import { InteractivePoster } from './components/InteractivePoster';
import { DerivationModal } from './components/DerivationModal';

export default function App() {
  const [isDerivationOpen, setIsDerivationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ECE6DC] font-sans antialiased text-[#271428]">
      <InteractivePoster onOpenDerivation={() => setIsDerivationOpen(true)} />

      <DerivationModal
        isOpen={isDerivationOpen}
        onClose={() => setIsDerivationOpen(false)}
        activeDatasetKey="poster"
      />
    </div>
  );
}

import React from 'react';

import { MvpBlueprint, PitchDeck } from '../../types';

interface TabsProps {
  activeTab: 'council' | 'mvp' | 'deck';
  setActiveTab: (tab: 'council' | 'mvp' | 'deck') => void;
  mvpBlueprint: MvpBlueprint | null;
  pitchDeck: PitchDeck | null;
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
      isActive ? 'bg-accentBlue text-white' : 'text-slate-600 dark:text-secondaryText hover:bg-slate-200 dark:hover:bg-tertiaryBg'
    } disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

export function Tabs({ activeTab, setActiveTab, mvpBlueprint, pitchDeck }: TabsProps) {
  return (
    <div className="bg-slate-100 dark:bg-secondaryBg border border-slate-200 dark:border-borderColor rounded-full p-1 flex items-center gap-1 self-start">
      <TabButton isActive={activeTab === 'council'} onClick={() => setActiveTab('council')}>
        Council Logs
      </TabButton>
      <TabButton 
        isActive={activeTab === 'mvp'} 
        onClick={() => setActiveTab('mvp')}
        disabled={!mvpBlueprint}
      >
        MVP Preview
      </TabButton>
      <TabButton 
        isActive={activeTab === 'deck'} 
        onClick={() => setActiveTab('deck')}
        disabled={!pitchDeck}
      >
        Pitch Deck
      </TabButton>
    </div>
  );
}
import * as React from 'react';

import { PitchDeck } from '../types';

interface PitchDeckViewProps {
  deck: PitchDeck;
}

export function PitchDeckView({ deck }: PitchDeckViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-primaryText">Pitch Deck Slides</h3>
      <div className="space-y-4">
        {deck.slides.map((slide, index) =>
        <div key={index} className="rounded-lg bg-slate-50 dark:bg-tertiaryBg border border-slate-200 dark:border-borderColor p-4 transition-all duration-300 hover:border-accentBlue/50 hover:shadow-lg">
            <h4 className="font-semibold text-slate-800 dark:text-primaryText mb-2 text-accentBlue">{index + 1}. {slide.title}</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-secondaryText">
              {slide.bullets.map((bullet, i) =>
            <li key={i}>{bullet}</li>
            )}
            </ul>
            {slide.notes &&
          <p className="mt-3 text-xs italic text-slate-500 dark:text-secondaryText/70 bg-slate-100 dark:bg-secondaryBg p-2 rounded-md">
                <strong>Notes:</strong> {slide.notes}
              </p>
          }
          </div>
        )}
      </div>
    </div>);

}
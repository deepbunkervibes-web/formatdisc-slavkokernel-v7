import * as React from 'react';
import { X } from 'lucide-react';

import { useToast } from '../../hooks/use-toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  React.useEffect(() => {
    const timers = new Map<string, number>();

    toasts.forEach((toast) => {
      if (toast.open && !timers.has(toast.id)) {
        const timer = window.setTimeout(() => {
          dismiss(toast.id);
        }, 5000);
        timers.set(toast.id, timer);
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, dismiss]);

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2 w-full max-w-md">
      {toasts.map(({ id, title, description, variant, action, open }) =>
      open &&
      <div
        key={id}
        className={`
            w-full p-4 rounded-lg shadow-2xl flex items-start gap-3 transition-all animate-fade-in
            ${variant === 'destructive' ?
        'bg-red-500 dark:bg-accentRed/90 border border-red-600 dark:border-accentRed text-white dark:text-primaryText' :
        'bg-white dark:bg-secondaryBg border border-slate-200 dark:border-borderColor text-slate-900 dark:text-primaryText'}
          `}>

          <div className="flex-1">
            {title && <h4 className="font-semibold">{title}</h4>}
            {description && <p className={`text-sm mt-1 ${variant === 'destructive' ? 'text-red-100 dark:text-secondaryText' : 'text-slate-600 dark:text-secondaryText'}`}>{description}</p>}
            {action && <button onClick={action.onClick} className="mt-2 text-sm font-semibold text-accentBlue">{action.label}</button>}
          </div>
          <button onClick={() => dismiss(id)} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-tertiaryBg -mt-1 -mr-1">
            <X size={16} />
          </button>
        </div>
      )}
    </div>);

}
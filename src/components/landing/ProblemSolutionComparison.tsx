import * as React from 'react';

import { useLanguage } from '../../context/LanguageContext';

export const ProblemSolutionComparison = React.memo(() => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white tracking-tight">{t.problemSolution.problem.title}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{t.problemSolution.problem.desc}</p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-accent-cyan tracking-tight">{t.problemSolution.solution.title}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">{t.problemSolution.solution.desc}</p>
                    </div>
                </div>
            </div>
        </section>);

});

ProblemSolutionComparison.displayName = 'ProblemSolutionComparison';
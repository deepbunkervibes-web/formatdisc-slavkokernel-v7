import * as React from 'react';
import { useEffect } from 'react';

import { useObsStore } from '@/stores/observabilityStore';

export function useObservabilitySSE(url = '/api/observability/stream') {
    const addFindings = useObsStore((s) => s.addFindings);
    const [retryKey, setRetryKey] = React.useState(0);

    useEffect(() => {
        const es = new EventSource(url);

        es.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                if (data.type === 'new_findings') addFindings(data.payload);
            } catch (err) {
                console.warn('Failed to parse SSE data:', err);
            }
        };

        es.onerror = () => {
            console.warn('SSE disconnected – reconnecting in 3s...');
            es.close();
            setTimeout(() => setRetryKey(prev => prev + 1), 3000);
        };

        return () => es.close();
    }, [url, addFindings, retryKey]);
}

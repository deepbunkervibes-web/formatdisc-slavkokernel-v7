import { useEffect } from 'react';
import { useObsStore } from '@/stores/observabilityStore';

export function useObservabilitySSE(url = '/api/observability/stream') {
    const addFindings = useObsStore((s) => s.addFindings);

    useEffect(() => {
        const es = new EventSource(url);

        es.onmessage = (ev) => {
            try {
                const data = JSON.parse(ev.data);
                if (data.type === 'new_findings') addFindings(data.payload);
            } catch (_) { }
        };

        es.onerror = () => {
            console.warn('SSE disconnected – reconnecting in 3s...');
            es.close();
            setTimeout(() => useObservabilitySSE(url), 3000);
        };

        return () => es.close();
    }, [url, addFindings]);
}

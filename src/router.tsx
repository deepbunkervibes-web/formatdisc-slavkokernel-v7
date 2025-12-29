import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import OrchestrationHub from './routes/OrchestrationHub'
import ManualOrchestration from './routes/ManualOrchestration'
import AutomatedOrchestration from './routes/AutomatedOrchestration'
import { LandingPage } from './routes/LandingPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'orchestration',
                children: [
                    {
                        index: true,
                        element: <OrchestrationHub />
                    },
                    {
                        path: 'manual',
                        element: <ManualOrchestration />
                    },
                    {
                        path: 'automated',
                        element: <AutomatedOrchestration />
                    }
                ]
            }
        ]
    }
])

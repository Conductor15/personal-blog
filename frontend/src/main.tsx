import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthWrapper } from './contexts/AuthContext.tsx'
import { SiteWrapper } from './contexts/SiteContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthWrapper>
        <SiteWrapper>
            <App />
        </SiteWrapper>
    </AuthWrapper>
)

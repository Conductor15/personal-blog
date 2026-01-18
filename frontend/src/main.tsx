import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthWrapper } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthWrapper>
        <App />
    </AuthWrapper>
)

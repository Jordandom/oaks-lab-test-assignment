import 'index.css';

import App from 'app.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster richColors position="top-center" />
    <App />
  </React.StrictMode>
);

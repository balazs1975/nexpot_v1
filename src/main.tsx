import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PrivacyPolicy from './PrivacyPolicy.tsx';
import TermsConditions from './TermsConditions.tsx';
import BlenderPage from './integrations/BlenderPage.tsx';
import DaVinciPage from './integrations/DaVinciPage.tsx';
import './index.css';

const path = window.location.pathname;

let Page = App;
if (path === '/privacy') Page = PrivacyPolicy;
else if (path === '/terms') Page = TermsConditions;
else if (path === '/integrations/blender') Page = BlenderPage;
else if (path === '/integrations/davinci-resolve') Page = DaVinciPage;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>
);

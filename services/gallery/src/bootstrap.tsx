import { createRoot } from 'react-dom/client';

import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
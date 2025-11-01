import Dashboard from '@/pages/dashboard';
import TaskPage from '@/pages/task-page';
import NotFound from '@/pages/not-found';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/**
 * App
 * 应用路由入口：配置 Dashboard（/）、TaskPage（/task）与 404（*）。
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

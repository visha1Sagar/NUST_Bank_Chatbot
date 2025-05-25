// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import FilesPage from './pages/FilesPage';
import ChatPage from './pages/ChatPage';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<FilesPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<FilesPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
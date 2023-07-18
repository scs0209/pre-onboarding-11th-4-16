import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SearchBar from '@/pages/SearchBar';

import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<SearchBar />} />
      </Routes>
    </DataProvider>
  );
}

export default App;

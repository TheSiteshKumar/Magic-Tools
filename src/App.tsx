

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Support } from './pages/Support';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { SignIn } from './pages/SignIn';
import { Tools } from './pages/Tools';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/tools/*" element={<Tools />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
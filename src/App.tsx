import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import ArtistPage from "./pages/ArtistPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import { Language } from "./types/gallery";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation language={language} onLanguageChange={setLanguage} />
          <Routes>
            <Route path="/" element={<HomePage language={language} />} />
            <Route path="/gallery" element={<GalleryPage language={language} />} />
            <Route path="/artist/:artistId" element={<ArtistPage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

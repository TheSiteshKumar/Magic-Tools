import React from 'react';
import { Hero } from '../components/hero/Hero';
import { FeaturedTools } from '../components/featured/FeaturedTools';
import { ToolsCategories } from '../components/featured/ToolsCategories';
import { TextTools } from '../components/featured/TextTools';
import { SupportSection } from '../components/support/SupportSection';
import { ToolboxSection } from '../components/toolbox/ToolboxSection';

export const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedTools />
      <ToolsCategories />
      <TextTools />
      <ToolboxSection />
      <SupportSection />
    </>
  );
};
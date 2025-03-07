'use client';

import React from 'react';
import Header from '@/components/app/Header';
import Navigation from '@/components/app/Navigation';
import CrawlerTool from '@/components/sections/CrawlerTool';

export default function CrawlerPage() {
  return (
    <>
      <Header />
      <Navigation />
      <CrawlerTool />
    </>
  );
}
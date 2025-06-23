'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className='w-full'>
      <TabsList className='grid h-auto w-full grid-cols-4 rounded-none border-b bg-transparent p-0'>
        <TabsTrigger
          value='entity'
          className='rounded-none border-b-2 border-transparent pb-4 data-[state=active]:border-black data-[state=active]:bg-transparent'
        >
          Entity
        </TabsTrigger>
        <TabsTrigger
          value='industry'
          className='rounded-none border-b-2 border-transparent pb-4 data-[state=active]:border-black data-[state=active]:bg-transparent'
        >
          Industry
        </TabsTrigger>
        <TabsTrigger
          value='people'
          className='rounded-none border-b-2 border-transparent pb-4 data-[state=active]:border-black data-[state=active]:bg-transparent'
        >
          People
        </TabsTrigger>
        <TabsTrigger
          value='reserved'
          className='rounded-none border-b-2 border-transparent pb-4 data-[state=active]:border-black data-[state=active]:bg-transparent'
        >
          Reserved Names
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { SectionContainer } from './section-container';

const guides = [
  {
    id: 1,
    title: 'Useful resources',
    description:
      'Access detailed step-by-step guides, tips and solutions to help you complete your transactions accurately and efficiently.',
    icon: BookOpen,
    color:
      'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    iconColor: 'text-blue-600 dark:text-blue-400',
    href: '#',
    tags: ['Guides', 'Tips', 'Solutions']
  },
  {
    id: 2,
    title: 'File annual returns',
    description:
      "Find out when and how to file your company's annual returns with step-by-step instructions.",
    icon: FileText,
    color:
      'from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20',
    borderColor: 'border-amber-200 dark:border-amber-700',
    iconColor: 'text-amber-600 dark:text-amber-400',
    href: '#',
    tags: ['Annual Returns', 'Filing', 'Compliance']
  },
  {
    id: 3,
    title: 'Business registration guide',
    description:
      'Complete guide to registering your business entity with all required documentation and procedures.',
    icon: HelpCircle,
    color:
      'from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    iconColor: 'text-green-600 dark:text-green-400',
    href: '#',
    tags: ['Registration', 'Documentation', 'Setup']
  },
  {
    id: 4,
    title: 'Financial services licensing',
    description:
      'Learn about FSL requirements, application process, and ongoing compliance obligations.',
    icon: FileText,
    color:
      'from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    iconColor: 'text-purple-600 dark:text-purple-400',
    href: '#',
    tags: ['FSL', 'Licensing', 'Financial Services']
  }
];

export function InformationGuides() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <SectionContainer size='xl' padding='lg'>
      <Card className='hover:shadow-3xl border-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 dark:border-white/20 dark:bg-gray-800/95'>
        <CardHeader className='pb-6 text-center sm:pb-8'>
          <CardTitle className='mb-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white'>
            Information guides
          </CardTitle>
          <p className='mx-auto mb-6 max-w-3xl text-lg text-gray-600 dark:text-gray-300'>
            Access our guides on registering different business entities and
            complying with regulatory requirements.
          </p>
          <Button
            variant='outline'
            className='group border-2 border-gray-300 transition-all duration-200 hover:scale-105 hover:border-gray-500 hover:bg-gray-50 dark:border-white/30 dark:hover:border-white/60 dark:hover:bg-gray-700'
          >
            View all guides
            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Button>
        </CardHeader>

        <CardContent className='p-4 sm:p-6'>
          <div className='grid gap-6 sm:grid-cols-2 lg:gap-8'>
            {guides.map((guide) => (
              <Card
                key={guide.id}
                className={`group cursor-pointer border-2 transition-all duration-300 ${guide.borderColor} overflow-hidden bg-white hover:scale-[1.02] hover:shadow-xl dark:bg-gray-800`}
                onMouseEnter={() => setHoveredCard(guide.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Icon Header */}
                <div
                  className={`h-32 bg-gradient-to-br sm:h-40 ${guide.color} relative flex items-center justify-center overflow-hidden`}
                >
                  <guide.icon
                    className={`h-12 w-12 sm:h-16 sm:w-16 ${guide.iconColor} transition-all duration-300 ${hoveredCard === guide.id ? 'scale-110' : ''}`}
                  />

                  {/* Animated background elements */}
                  <div
                    className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/20 transition-all duration-500 dark:bg-gray-800/20 ${hoveredCard === guide.id ? 'scale-150 opacity-30' : 'opacity-10'}`}
                  />
                  <div
                    className={`absolute bottom-3 left-3 h-6 w-6 rounded-full bg-white/30 transition-all duration-700 dark:bg-gray-800/30 ${hoveredCard === guide.id ? 'scale-125 opacity-40' : 'opacity-20'}`}
                  />
                </div>

                <CardContent className='p-4 sm:p-6'>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-gray-700 sm:text-xl dark:text-white dark:group-hover:text-gray-200'>
                        {guide.title}
                      </h3>

                      {/* Tags */}
                      <div className='mb-3 flex flex-wrap gap-1'>
                        {guide.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='rounded-full border border-gray-200 bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className='text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300'>
                        {guide.description}
                      </p>
                    </div>

                    <div className='flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700'>
                      <Button
                        variant='ghost'
                        className='group/btn h-auto p-0 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                        asChild
                      >
                        <a
                          href={guide.href}
                          className='flex items-center gap-2'
                        >
                          View details
                          <ArrowRight className='h-4 w-4 transition-transform group-hover/btn:translate-x-1' />
                        </a>
                      </Button>

                      <Button
                        variant='ghost'
                        size='sm'
                        className='opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Hover indicator */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${guide.color.replace('100', '500').replace('900/20', '500')} transition-all duration-300 ${hoveredCard === guide.id ? 'w-full' : 'w-0'}`}
                />
              </Card>
            ))}
          </div>

          {/* Additional Resources Section */}
          <div className='mt-8 border-t border-gray-200 pt-6 dark:border-gray-700'>
            <div className='space-y-4 text-center'>
              <h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Need more help?
              </h4>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Can&apos;t find what you&apos;re looking for? Our support team
                is here to help.
              </p>
              <div className='flex flex-col justify-center gap-3 sm:flex-row'>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-2 border-gray-300 transition-all duration-200 hover:border-gray-500 hover:bg-gray-50 dark:border-white/30 dark:hover:border-white/60 dark:hover:bg-gray-700'
                >
                  Contact Support
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-2 border-gray-300 transition-all duration-200 hover:border-gray-500 hover:bg-gray-50 dark:border-white/30 dark:hover:border-white/60 dark:hover:bg-gray-700'
                >
                  FAQ
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-2 border-gray-300 transition-all duration-200 hover:border-gray-500 hover:bg-gray-50 dark:border-white/30 dark:hover:border-white/60 dark:hover:bg-gray-700'
                >
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionContainer>
  );
}

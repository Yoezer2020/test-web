'use client';

import { Button } from '@/components/ui/button';
import {
  Info,
  Newspaper,
  BookOpen,
  MessageSquare,
  Phone,
  ExternalLink
} from 'lucide-react';

const footerLinks = {
  main: [
    {
      title: 'About Us',
      icon: Info,
      href: '/about'
    },
    {
      title: 'News Room',
      icon: Newspaper,
      href: '/news'
    },
    {
      title: 'Guides',
      icon: BookOpen,
      href: '/guides'
    },
    {
      title: 'Feedback',
      icon: MessageSquare,
      href: '/feedback'
    },
    {
      title: 'Contact Us',
      icon: Phone,
      href: '/contact'
    }
  ],
  legal: [
    {
      title: 'Report vulnerability',
      href: '/report-vulnerability'
    },
    {
      title: 'Privacy statement',
      href: '/privacy'
    },
    {
      title: 'Terms of use',
      href: '/terms'
    },
    {
      title: 'Sitemap',
      href: '/sitemap'
    }
  ]
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <footer className='w-full'>
      {/* Orange accent bar */}
      <div className='h-1 border-t border-gray-300 dark:border-white/20' />

      {/* Main footer content */}
      <div className='border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'>
        <div className='container mx-auto px-4 py-8 lg:py-12'>
          <div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-12'>
            {/* Logo and branding */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                {/* <ThemeAwareLogo
                  lightSrc='/images/logo-light.png'
                  darkSrc='/images/logo-dark.png'
                  alt='GCRO Logo'
                  width={80}
                  height={80}
                  className='transition-transform duration-200 hover:scale-105'
                /> */}
                <div className='space-y-1'>
                  <h3 className='text-xl font-bold text-gray-900 lg:text-2xl dark:text-white'>
                    GCRO
                  </h3>
                  <p className='max-w-xs text-sm leading-tight text-gray-600 lg:text-base dark:text-gray-300'>
                    GELEPHU COMPANY
                    <br />
                    REGISTRATION AND OPERATION
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
              {footerLinks.main.map((link, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  className='group h-auto justify-start p-3 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-800'
                  asChild
                >
                  <a href={link.href} className='flex items-center space-x-3'>
                    <link.icon className='h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300' />
                    <span className='font-medium text-gray-700 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white'>
                      {link.title}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className='bg-gray-800 text-gray-300 dark:bg-gray-950 dark:text-gray-400'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
            {/* Legal links */}
            <div className='flex flex-wrap gap-4 lg:gap-6'>
              {footerLinks.legal.map((link, index) => (
                <Button
                  key={index}
                  variant='link'
                  className='h-auto p-0 text-sm text-gray-300 transition-colors hover:text-white dark:text-gray-400 dark:hover:text-gray-200'
                  asChild
                >
                  <a href={link.href} className='flex items-center space-x-1'>
                    <span>{link.title}</span>
                    <ExternalLink className='h-3 w-3 opacity-50' />
                  </a>
                </Button>
              ))}
            </div>

            {/* Copyright and last updated */}
            <div className='space-y-1 text-right'>
              <p className='text-sm text-gray-300 dark:text-gray-400'>
                © {currentYear} Government of Bhutan
              </p>
              <p className='text-xs text-gray-400 dark:text-gray-500'>
                Last updated on {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

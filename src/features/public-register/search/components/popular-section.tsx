import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building2,
  FileText,
  Users,
  RefreshCw,
  UserCheck,
  Calendar,
  CreditCard,
  Download,
  Shield,
  Database,
  Search,
  FileCheck
} from 'lucide-react';
import { SectionContainer } from './section-container';

const popularServices = {
  register: [
    { icon: FileText, title: 'Apply for new business entity name', href: '#' },
    { icon: Building2, title: 'Register new business entity', href: '#' },
    { icon: Shield, title: 'Register as corporate service provider', href: '#' }
  ],
  manage: [
    { icon: RefreshCw, title: 'Update entity information', href: '#' },
    { icon: UserCheck, title: 'Renew business registration', href: '#' },
    { icon: Users, title: 'Appoint/Withdraw position holder', href: '#' }
  ],
  filing: [
    { icon: Calendar, title: 'File annual returns', href: '#' },
    {
      icon: FileCheck,
      title: 'Apply for exemption from financial statement requirements',
      href: '#'
    },
    { icon: Database, title: 'BizFinx', href: '#' }
  ],
  information: [
    { icon: Building2, title: 'Business Profile', href: '#' },
    { icon: FileText, title: 'Extracts', href: '#' },
    { icon: Users, title: 'People Profile', href: '#' }
  ],
  apis: [
    { icon: Search, title: 'Entity Information Query', href: '#' },
    { icon: CreditCard, title: 'Financial Information Query', href: '#' },
    { icon: Shield, title: 'trustBar Information Query', href: '#' }
  ],
  download: [
    {
      icon: Download,
      title: 'Download business information product',
      href: '#'
    },
    { icon: Shield, title: 'trustBar authentication', href: '#' },
    { icon: FileCheck, title: 'PDF product authentication', href: '#' }
  ]
};

export function PopularSection() {
  return (
    <SectionContainer size='xl' padding='lg'>
      <Card className='hover:shadow-3xl border-2 border-gray-200 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-300 dark:border-white/20 dark:bg-gray-800/95'>
        <CardHeader className='pb-6 text-center sm:pb-8'>
          <CardTitle className='text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white'>
            Popular
          </CardTitle>
        </CardHeader>
        <CardContent className='p-4 sm:p-6'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
            {/* Register Column */}
            <div className='space-y-4 sm:space-y-6'>
              <h3 className='flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white'>
                <Building2 className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6 dark:text-gray-300' />
                Register
              </h3>
              <div className='space-y-2 sm:space-y-3'>
                {popularServices.register.map((service, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='flex h-auto w-full items-center justify-start overflow-hidden border border-transparent p-3 text-left transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 sm:p-4 dark:hover:border-white/20 dark:hover:bg-gray-700'
                  >
                    <service.icon className='mr-2 h-4 w-4 flex-shrink-0 text-gray-600 sm:mr-3 sm:h-5 sm:w-5 dark:text-gray-400' />
                    <span className='truncate text-sm text-gray-700 transition-colors hover:text-gray-900 sm:text-base dark:text-gray-300 dark:hover:text-white'>
                      {service.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Manage Column */}
            <div className='space-y-4 sm:space-y-6'>
              <h3 className='flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white'>
                <Users className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6 dark:text-gray-300' />
                Manage
              </h3>
              <div className='space-y-2 sm:space-y-3'>
                {popularServices.manage.map((service, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='flex h-auto w-full items-center justify-start overflow-hidden border border-transparent p-3 text-left transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 sm:p-4 dark:hover:border-white/20 dark:hover:bg-gray-700'
                  >
                    <service.icon className='mr-2 h-4 w-4 flex-shrink-0 text-gray-600 sm:mr-3 sm:h-5 sm:w-5 dark:text-gray-400' />
                    <span className='truncate text-sm text-gray-700 transition-colors hover:text-gray-900 sm:text-base dark:text-gray-300 dark:hover:text-white'>
                      {service.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Annual Filing Column */}
            <div className='space-y-4 sm:col-span-2 sm:space-y-6 lg:col-span-1'>
              <h3 className='flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white'>
                <Calendar className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6 dark:text-gray-300' />
                Annual filing
              </h3>
              <div className='space-y-2 sm:space-y-3'>
                {popularServices.filing.map((service, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='flex h-auto w-full items-center justify-start overflow-hidden border border-transparent p-3 text-left transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 sm:p-4 dark:hover:border-white/20 dark:hover:bg-gray-700'
                  >
                    <service.icon className='mr-2 h-4 w-4 flex-shrink-0 text-gray-600 sm:mr-3 sm:h-5 sm:w-5 dark:text-gray-400' />
                    <span className='truncate text-sm text-gray-700 transition-colors hover:text-gray-900 sm:text-base dark:text-gray-300 dark:hover:text-white'>
                      {service.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Services Row */}
          <div className='mt-8 grid gap-6 border-t border-gray-200 pt-6 sm:mt-12 sm:grid-cols-2 sm:pt-8 lg:grid-cols-3 lg:gap-8 dark:border-white/20'>
            <div className='space-y-3 sm:space-y-4'>
              <h4 className='text-sm font-semibold text-gray-900 sm:text-base dark:text-white'>
                Buy information
              </h4>
              <div className='space-y-1 sm:space-y-2'>
                {popularServices.information.map((service, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    size='sm'
                    className='flex h-auto w-full items-center justify-start overflow-hidden border border-transparent p-2 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 sm:p-3 dark:hover:border-white/20 dark:hover:bg-gray-700'
                  >
                    <service.icon className='mr-2 h-3 w-3 flex-shrink-0 text-gray-500 sm:h-4 sm:w-4 dark:text-gray-400' />
                    <span className='truncate text-xs text-gray-600 transition-colors hover:text-gray-900 sm:text-sm dark:text-gray-400 dark:hover:text-white'>
                      {service.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className='space-y-3 sm:space-y-4'>
              <h4 className='text-sm font-semibold text-gray-900 sm:text-base dark:text-white'>
                Subscribe APIs
              </h4>
              <div className='space-y-1 sm:space-y-2'>
                {popularServices.apis.map((service, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    size='sm'
                    className='flex h-auto w-full items-center justify-start overflow-hidden border border-transparent p-2 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 sm:p-3 dark:hover:border-white/20 dark:hover:bg-gray-700'
                  >
                    <service.icon className='mr-2 h-3 w-3 flex-shrink-0 text-gray-500 sm:h-4 sm:w-4 dark:text-gray-400' />
                    <span className='truncate text-xs text-gray-600 transition-colors hover:text-gray-900 sm:text-sm dark:text-gray-400 dark:hover:text-white'>
                      {service.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className='space-y-3 sm:col-span-2 sm:space-y-4 lg:col-span-1'>
              <h4 className='text-sm font-semibold text-gray-900 sm:text-base dark:text-white'>
                Download and authenticate
              </h4>
              <div className='space-y-1 sm:space-y-2'>
                {popularServices.download.map((service, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    size='sm'
                    className='flex h-auto w-full items-center justify-start overflow-hidden border border-transparent p-2 transition-all duration-200 hover:scale-105 hover:border-gray-300 hover:bg-gray-100 sm:p-3 dark:hover:border-white/20 dark:hover:bg-gray-700'
                  >
                    <service.icon className='mr-2 h-3 w-3 flex-shrink-0 text-gray-500 sm:h-4 sm:w-4 dark:text-gray-400' />
                    <span className='truncate text-xs text-gray-600 transition-colors hover:text-gray-900 sm:text-sm dark:text-gray-400 dark:hover:text-white'>
                      {service.title}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionContainer>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function BackgroundImageSection() {
  return (
    <section className='relative overflow-hidden px-4 py-16'>
      {/* Background Image Container - Replace the URL with your image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('/placeholder.svg?height=600&width=1200')`
        }}
      >
        {/* Overlay for better text readability */}
        <div className='absolute inset-0 bg-black/60 dark:bg-black/80'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto max-w-6xl'>
        <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-6 text-center lg:text-left'>
            <h2 className='text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl'>
              Streamline Your Business Operations
            </h2>
            <p className='text-lg leading-relaxed text-gray-200 sm:text-xl'>
              Join thousands of businesses that trust our platform for their
              registration, compliance, and information needs.
            </p>

            <div className='space-y-3'>
              {[
                'Fast and secure registration process',
                '24/7 customer support',
                'Comprehensive business information database',
                'Real-time compliance updates'
              ].map((feature, index) => (
                <div key={index} className='flex items-center gap-3 text-white'>
                  <CheckCircle className='h-5 w-5 flex-shrink-0 text-green-400' />
                  <span className='text-sm sm:text-base'>{feature}</span>
                </div>
              ))}
            </div>

            <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
              <Button
                size='lg'
                className='group bg-white text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
              >
                Get Started Today
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 dark:text-white' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-2 border-gray-900 text-gray-900 transition-all duration-200 hover:scale-105 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900'
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className='relative mx-auto max-w-lg lg:max-w-none'>
            <Card className='hover:shadow-3xl border-2 border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 dark:border-white/30 dark:bg-white/5'>
              <CardContent className='p-6 sm:p-8'>
                <div className='space-y-6'>
                  <div className='text-center'>
                    <h3 className='mb-2 text-xl font-bold text-white'>
                      Quick Stats
                    </h3>
                    <p className='text-sm text-gray-200'>
                      Our platform performance
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div className='rounded-lg border border-white/20 bg-white/10 p-4 text-center transition-colors hover:bg-white/20'>
                      <div className='text-2xl font-bold text-white'>50K+</div>
                      <div className='text-xs text-gray-200'>
                        Registered Entities
                      </div>
                    </div>
                    <div className='rounded-lg border border-white/20 bg-white/10 p-4 text-center transition-colors hover:bg-white/20'>
                      <div className='text-2xl font-bold text-white'>99.9%</div>
                      <div className='text-xs text-gray-200'>Uptime</div>
                    </div>
                    <div className='rounded-lg border border-white/20 bg-white/10 p-4 text-center transition-colors hover:bg-white/20'>
                      <div className='text-2xl font-bold text-white'>24/7</div>
                      <div className='text-xs text-gray-200'>Support</div>
                    </div>
                    <div className='rounded-lg border border-white/20 bg-white/10 p-4 text-center transition-colors hover:bg-white/20'>
                      <div className='text-2xl font-bold text-white'>5★</div>
                      <div className='text-xs text-gray-200'>Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

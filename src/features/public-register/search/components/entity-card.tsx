import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface EntityData {
  name: string;
  uen: string;
  status: string;
  industry: string;
  address: string;
  price: number;
}

interface EntityCardProps {
  entity: EntityData;
}

export function EntityCard({ entity }: EntityCardProps) {
  return (
    <Card className='w-full'>
      <CardHeader className='pb-4'>
        <h3 className='text-xl font-semibold'>{entity.name}</h3>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div>
            <div className='space-y-3'>
              <div>
                <span className='text-sm font-medium text-gray-600'>UEN</span>
                <p className='text-sm'>{entity.uen}</p>
              </div>
              <div>
                <span className='text-sm font-medium text-gray-600'>
                  Entity Status
                </span>
                <div className='mt-1'>
                  <Badge
                    variant='outline'
                    className='border-green-600 text-green-600'
                  >
                    {entity.status}
                  </Badge>
                </div>
              </div>
              <div>
                <span className='text-sm font-medium text-gray-600'>
                  Industry (SSIC)
                </span>
                <p className='text-sm'>{entity.industry}</p>
              </div>
              <div>
                <span className='text-sm font-medium text-gray-600'>
                  Address
                </span>
                <p className='text-sm'>{entity.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t pt-4'>
          <button className='text-sm text-gray-500 hover:text-gray-700'>
            MORE INFORMATION &gt;
          </button>
        </div>

        <div className='border-t pt-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='font-medium'>Business Profile</h4>
              <p className='text-2xl font-bold'>${entity.price.toFixed(2)}</p>
            </div>
            <div className='flex gap-2'>
              <Button variant='outline'>More Products</Button>
              <Button className='bg-black text-white hover:bg-gray-800'>
                <ShoppingCart className='mr-2 h-4 w-4' />
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

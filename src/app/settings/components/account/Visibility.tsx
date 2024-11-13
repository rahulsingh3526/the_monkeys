'use client';

import React from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Visibility = () => {
  return (
    <div className='p-1 space-y-2'>
      <p className='font-jost text-sm opacity-75'>
        If your make yourself anonymous, your profile information will remain
        hidden from others during any activity.
      </p>

      <div className='mt-4 flex items-center space-x-2'>
        <Switch id='anonymous' disabled />
        <Label htmlFor='anonymous'>Make yourself Anonymous</Label>
      </div>
    </div>
  );
};

export default Visibility;

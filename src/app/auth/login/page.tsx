'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Icon from '@/components/icon';
import { LoginFormSkeleton } from '@/components/skeletons/formSkeleton';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/auth/useAuth';

import {
  FormHeader,
  FormHeading,
  FormSubheading,
} from '../components/formHeading';
import LoginForm from '../components/forms/LoginForm';

export default function LoginPage() {
  const { isSuccess, isLoading, isFetching } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) router.replace('/');
  }, [isSuccess]);

  return (
    <>
      <FormHeader className='mt-8'>
        <FormHeading heading='Welcome Back' />
        <FormSubheading subheading='Log in to continue your journey' />
      </FormHeader>

      <div className='flex flex-col gap-4'>
        {isLoading || isFetching ? (
          <LoginFormSkeleton />
        ) : (
          <>
            <LoginForm />

            <Button
              variant='secondary'
              className='w-full flex items-center gap-2 cursor-not-allowed'
            >
              <Icon name='RiGoogle' type='Fill' />
              <p>Google Login (Coming Soon)</p>
            </Button>

            <div className='mt-4 text-center'>
              <span className='font-dm_sans'>New to Monkeys? </span>
              <Link
                href='/auth/register'
                className='font-dm_sans hover:underline text-brand-orange'
              >
                Join Monkeys
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

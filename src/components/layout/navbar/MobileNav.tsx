'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { CreateButton } from '@/components/buttons/createButton';
import Logo from '@/components/logo';
import ThemeSwitch from '@/components/themeSwitch';
import { FEED_ROUTE } from '@/constants/routeConstants';
import { IUser } from '@/services/models/user';
import { twMerge } from 'tailwind-merge';

import Container from '../Container';
// Use as fallback if WebSocket is not working.
// import NotificationDropdown from './NotificationDropdown';
import WSNotificationDropdown from './WSNotificationDropdown';
import ProfileDropdown from './profileDropdown';

const MobileNav = ({
  session,
  isAuthLoading,
}: {
  session?: IUser;
  isAuthLoading: boolean;
}) => {
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        setTop(0);
      } else {
        setTop(-50);
      }
      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos]);

  return (
    <>
      <header
        className={twMerge(
          'block md:hidden sticky left-0 border-foreground-light dark:border-foreground-dark bg-background-light/80  dark:bg-background-dark/80 backdrop-blur-sm z-30',
          `top-${top}`,
          top === 0 && prevScrollpos === 0 ? 'border-none' : 'border-b-1'
        )}
      >
        <Container className='w-full px-4 py-[14px] flex items-center justify-between'>
          <Link href={FEED_ROUTE}>
            <Logo />
          </Link>

          <div className='flex items-center gap-3'>
            <ThemeSwitch />

            {/* Use <NotificationDropdown /> as a fallback if WebSocket is not working.
            Uncomment only when necessary. */}

            {isAuthLoading && (
              <div className='size-4 rounded-full bg-foreground-light dark:bg-foreground-dark'></div>
            )}
            {!isAuthLoading && session && <WSNotificationDropdown />}

            <ProfileDropdown session={session} />
          </div>
        </Container>
      </header>

      <div className='md:hidden fixed bottom-0 left-0 flex w-full px-4 py-2 items-center justify-evenly border-t-1 border-foreground-light dark:border-foreground-dark bg-background-light dark:bg-background-dark z-50'>
        <CreateButton />
      </div>
    </>
  );
};

export default MobileNav;

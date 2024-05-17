'use client';

import { useRouter } from 'next/navigation';

import HomeBanner from '@/components/branding/HomeBanner';
import BentoGrid from '@/components/branding/grid';
import Icon from '@/components/icon/Icon';

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col'>
      <HomeBanner>
        <p className='font-playfair_Display font-semibold text-5xl sm:text-7xl md:text-8xl text-primary-monkeyBlack dark:text-primary-monkeyWhite'>
          Create. Collaborate.
        </p>

        <p className='mt-4 sm:mt-8 md:w-4/5 font-josefin_Sans text-base sm:text-lg md:text-xl text-center text-secondary-darkGrey dark:text-secondary-white'>
          A platform for writing and creative collaboration, empowering
          individuals to expand their influence and showcase talents.
        </p>

        <button
          className='mt-4 group px-5 py-2 flex items-center bg-primary-monkeyOrange text-primary-monkeyWhite rounded-full'
          onClick={() => {
            router.push('api/auth/signin');
          }}
        >
          <p className='mx-1 font-josefin_Sans'>Join Monkeys</p>

          <Icon
            name='RiArrowRightSLine'
            className='mx-1 transition-all group-hover:ml-2 group-hover:mr-0'
          />
        </button>
      </HomeBanner>

      {/* <h2 className='px-5 font-playfair_Display font-semibold text-2xl sm:text-3xl md:text-5xl italic opacity-25'>
        Why Choose Monkeys?!
      </h2> */}

      <h2 className='px-5 font-playfair_Display font-semibold text-2xl sm:text-3xl md:text-5xl italic opacity-25'>
        Features We Offer
      </h2>

      <BentoGrid />
    </div>
  );
};

export default LandingPage;

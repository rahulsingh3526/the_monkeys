import { useState } from 'react';

import Icon from '@/components/icon';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useIsFollowingUser } from '@/hooks/user/useUserConnections';
import axiosInstance from '@/services/api/axiosInstance';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';

export const FollowButton = ({ username }: { username?: string }) => {
  const { data, status } = useSession();
  const { followStatus, isLoading, isError } = useIsFollowingUser(username);

  const [loading, setLoading] = useState<boolean>(false);

  if (status === 'unauthenticated' || data?.user?.username === username)
    return null;

  if (isLoading) return <Loader className='my-1' />;

  if (isError) return null;

  const onUserFollow = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/user/follow/${username}`);

      if (response.status === 200) {
        mutate(`/user/is-followed/${username}`);
        mutate(`/user/connection-count/${username}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to follow user.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onUserUnfollow = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/user/unfollow/${username}`);

      if (response.status === 200) {
        mutate(`/user/is-followed/${username}`);
        mutate(`/user/connection-count/${username}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to unfollow user.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {followStatus?.isFollowing ? (
        <Button
          className='rounded-full'
          disabled={loading}
          onClick={onUserUnfollow}
        >
          {loading && <Loader />}
          Unfollow
        </Button>
      ) : (
        <Button
          variant='brand'
          className='rounded-full'
          disabled={loading}
          onClick={onUserFollow}
        >
          {loading && <Loader />}
          Follow
        </Button>
      )}
    </>
  );
};

export const FollowButtonSecondary = ({ username }: { username?: string }) => {
  const { data, status } = useSession();
  const { followStatus, isLoading, isError } = useIsFollowingUser(username);

  const [loading, setLoading] = useState<boolean>(false);

  if (status === 'unauthenticated' || data?.user?.username === username)
    return null;

  if (isLoading) return <Loader />;

  if (isError) return null;

  const onUserFollow = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/user/follow/${username}`);

      if (response.status === 200) {
        mutate(`/user/is-followed/${username}`);
        mutate(`/user/connection-count/${username}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to follow user.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onUserUnfollow = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/user/unfollow/${username}`);

      if (response.status === 200) {
        mutate(`/user/is-followed/${username}`);
        mutate(`/user/connection-count/${username}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          variant: 'error',
          title: 'Error',
          description: err.message || 'Failed to unfollow user.',
        });
      } else {
        toast({
          variant: 'error',
          title: 'Error',
          description: 'An unknown error occured.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {followStatus?.isFollowing ? (
        <Button disabled={loading} onClick={onUserUnfollow}>
          {loading && <Loader />}
          Unfollow
        </Button>
      ) : (
        <Button variant='brand' disabled={loading} onClick={onUserFollow}>
          {loading && <Loader />}
          Follow
        </Button>
      )}
    </>
  );
};

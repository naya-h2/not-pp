import { useEffect, useState } from 'react';
import { MemberType } from '../type/member';
import { authInstance } from '../axios/instance';

export const useGetProfile = () => {
  const [profile, setProfile] = useState<MemberType | null>(null);
  const getMyProfile = async () => {
    const { data, status } = await authInstance.get('/student/my-profile');
    if (status === 200) {
      setProfile(data);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return profile;
};

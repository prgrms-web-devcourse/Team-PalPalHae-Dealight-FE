'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { axiosInstance } from '../_services/apiClient';
import { useAuth } from './AuthProvider';
import LocalStorage from '../_utils/localstorage';

type DefaultContextType = {
  nickname: string | null;
  role: 'store' | 'member' | null;
} | null;

const UserInfoContext = createContext<DefaultContextType>(null);

async function getUser(): Promise<DefaultContextType> {
  await axiosInstance.get('https://jsonplaceholder.typicode.com/todos/1');

  /**
   * @description role에 고객 or 업체가 들어온다. 이 값을 통해 라우팅 처리가 이루어지게 된다.
   */
  return { nickname: '업체 닉네임', role: 'member' };
}

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { logout } = useAuth();

  /**
   * @todo 유저 정보를 불러오는 api 함수 작성 예정
   */

  const { data: userInfo, isError } = useQuery({
    queryKey: ['user-info'],
    queryFn: getUser,
    initialData: { nickname: null, role: null },
    enabled:
      !!LocalStorage.getItem('dealight-accessToken') ||
      !!LocalStorage.getItem('dealight-refreshToken'),
  });

  if (isError) {
    logout();
  }

  return (
    <UserInfoContext.Provider value={userInfo}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const state = useContext(UserInfoContext);

  if (!state) {
    throw new Error('useUserInfo must be used within a UserInfo');
  }

  return state;
};
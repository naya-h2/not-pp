import { useEffect, useState } from 'react';
import { authInstance } from '../../axios/instance';
import { MemberType } from '../../type/member';
import { useGetProfile } from '../../hooks/useGetProfile';

const GUIDE_MSG = {
  senior: '프로필 공개 여부를 설정하고,\n 후배의 연락을 기다리세요',
  junior: '선배의 프로필 리스트를 확인하고,\n 편하게 연락하세요',
};

const MENU = [
  {
    name: '내 프로필',
    link: '/my-profile',
  },
  {
    name: '프로필 공개',
    link: '/my-profile/release',
  },
  {
    name: '선배 찾기',
    link: '/list',
  },
];

function HomePage() {
  const profile = useGetProfile();

  const logout = () => {
    localStorage.removeItem('npp-access');
    localStorage.removeItem('npp-refresh');

    window.location.href = '/';
  };

  return (
    <>
      {profile && (
        <>
          <div className="flex justify-between items-end">
            <div className="text-20 mt-9">
              <span className="font-bold">{profile?.name}</span> 님은
              <br />
              <span className="font-bold text-coral-main">
                {profile?.senior ? '선배' : '후배'}{' '}
              </span>
              입니다.
            </div>

            <img src="/npp_logo.svg" alt="npp logo" width={64} height={64} />
          </div>

          <p className="text-grey-500 whitespace-pre-line mt-3 mb-11">
            {GUIDE_MSG[profile?.senior ? 'senior' : 'junior']}
          </p>

          <div className="grid grid-cols-3 gap-3">
            {MENU.map(({ name, link }) => (
              <a key={name} href={link}>
                <button
                  className="bg-coral-bg rounded-2xl h-[20dvh] w-full hover:bg-coral-hover disabled:!cursor-not-allowed disabled:bg-grey-200 disabled:text-white"
                  disabled={name === '선배 찾기' && profile?.senior}
                >
                  {name}
                </button>
              </a>
            ))}
          </div>
        </>
      )}

      <button
        onClick={logout}
        className="text-grey-500 text-center w-[calc(100vw-40px)] absolute bottom-12"
      >
        로그아웃
      </button>
    </>
  );
}

export default HomePage;

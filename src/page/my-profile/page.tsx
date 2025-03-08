import { useGetProfile } from '../../hooks/useGetProfile';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import BackButton from '../../components/BackButton';
import kakaoIcon from '../../assets/sns_kakao.svg';
import { ReactElement } from 'react';
import DefaultProfile from '../../components/DefaultProfile';

const INFO_LIST: {
  type: 'insta_id' | 'kakao_id' | 'email';
  icon: ReactElement;
}[] = [
  {
    type: 'insta_id',
    icon: <InstagramIcon />,
  },
  {
    type: 'kakao_id',
    icon: <img src={kakaoIcon} />,
  },
  {
    type: 'email',
    icon: <EmailIcon />,
  },
];

function MyProfilePage() {
  const profile = useGetProfile();

  return (
    <>
      <BackButton link="/" />
      {profile ? (
        <div className="pb-24">
          <DefaultProfile
            name={profile.name}
            display={profile.display}
            gender={profile.gender}
            major={profile.major}
            student_id={profile.student_id}
          />

          <div className="flex flex-col gap-2 my-4">
            {INFO_LIST.map(({ type, icon }) => (
              <div
                key={type}
                className={`flex gap-2 items-center ${
                  profile[type] ?? 'opacity-30'
                }`}
              >
                {icon}
                {profile[type] ?? '-'}
              </div>
            ))}
          </div>

          <p className="rounded-2xl bg-coral-bg min-h-10 w-full px-3 py-4 text-grey-700 break-words">
            {profile.message ?? '작성한 메세지가 없습니다.'}
          </p>

          <button
            onClick={() => (window.location.href = '/my-profile/edit')}
            className="absolute bottom-11 w-[calc(100vw-40px)] bg-white border border-coral-main py-4 font-bold text-coral-main rounded-3xl
          "
          >
            프로필 수정
          </button>
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}

export default MyProfilePage;

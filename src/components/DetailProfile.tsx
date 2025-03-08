import { ReactNode } from 'react';
import { MemberType } from '../type/member';
import DefaultProfile from './DefaultProfile';
import InstagramIcon from '@mui/icons-material/Instagram';
import kakaoIcon from '../assets/sns_kakao.svg';
import EmailIcon from '@mui/icons-material/Email';

const INFO_LIST: {
  type: 'insta_id' | 'kakao_id' | 'email';
  icon: ReactNode;
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

/**
 * 멤버 세부 프로필
 */
function DetailProfile(member: MemberType) {
  return (
    <>
      <DefaultProfile
        name={member.name}
        display={member.display}
        gender={member.gender}
        major={member.major}
        student_id={member.student_id}
      />

      <div className="flex flex-col gap-2 my-4">
        {INFO_LIST.map(({ type, icon }) => (
          <div
            key={type}
            className={`flex gap-2 items-center ${
              member[type] ?? 'opacity-30'
            }`}
          >
            {icon}
            {member[type] ?? '-'}
          </div>
        ))}
      </div>

      <p className="rounded-2xl bg-coral-bg min-h-10 w-full px-3 py-4 text-grey-700 break-words">
        {member.message ?? '작성한 메세지가 없습니다.'}
      </p>
    </>
  );
}

export default DetailProfile;

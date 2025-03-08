import { MEMBER } from '../const/member';

interface Props {
  name: string;
  display?: boolean;
  student_id: string;
  major: number;
  gender: number;
}

/**
 * 수정 불가능한 프로필 정보
 */
function DefaultProfile({ name, display, student_id, major, gender }: Props) {
  return (
    <>
      <div className="text-20 mb-1 mt-6">
        <b>{name}</b>{' '}
        {display !== undefined && `(${display ? '공개' : '비공개'})`}
      </div>
      <p className="text-grey-500 text-12">
        {student_id} · {MEMBER.major[major]} · {MEMBER.gender[gender]}
      </p>
    </>
  );
}

export default DefaultProfile;

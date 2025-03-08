import { useQuery } from '@tanstack/react-query';
import BackButton from '../../components/BackButton';
import ProfileButton from '../../components/ProfileButton';
import { MEMBER } from '../../const/member';
import { useGetProfile } from '../../hooks/useGetProfile';
import { authInstance } from '../../axios/instance';
import { MemberType } from '../../type/member';

function ListPage() {
  const profile = useGetProfile();
  const {
    data: profileList,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['profile_list'],
    queryFn: async () => {
      const { data } = await authInstance.get('/student/');
      return data;
    },
  });

  return (
    <>
      <BackButton link="/" />
      <h1 className="mt-5 mb-2">
        {profile ? profile.name : ''} 님과 같은
        <br />
        <span className="text-coral-main">
          {profile ? MEMBER.major[profile.major] : ''}
        </span>{' '}
        선배들을 찾아왔어요!
      </h1>
      <p className="text-grey-500">
        프로필을 클릭하면 상세 프로필을 볼 수 있어요
      </p>
      <div className="flex flex-col gap-4 pt-11">
        {isSuccess &&
          profileList.map((data: MemberType) => (
            <ProfileButton
              key={data.student_id}
              name={data.name}
              studentId={data.student_id}
              gender={MEMBER.gender[data.gender]}
            />
          ))}
      </div>
    </>
  );
}

export default ListPage;

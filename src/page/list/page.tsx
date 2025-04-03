import { useInfiniteQuery } from '@tanstack/react-query';
import BackButton from '../../components/BackButton';
import ProfileButton from '../../components/ProfileButton';
import { MEMBER } from '../../const/member';
import { useGetProfile } from '../../hooks/useGetProfile';
import { authInstance } from '../../axios/instance';
import { MemberType } from '../../type/member';
import Loading from '../../components/Loading';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

function ListPage() {
  const profile = useGetProfile();
  const [ref, inView] = useInView();
  const [students, setStudents] = useState<MemberType[]>([]);

  const getStudentList = async ({ pageParam }: any) => {
    const { data } = await authInstance.get(`/student/?page=${pageParam}`);
    setStudents((prev) => [...prev, ...data.results]);
    return data;
  };

  const { fetchNextPage, hasNextPage, isLoading, isSuccess } = useInfiniteQuery(
    {
      queryKey: ['profile_list'],
      queryFn: getStudentList,
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return undefined;

        const url = new URL(lastPage.next);
        const page = url.searchParams.get('page');
        return page;
      },
      initialPageParam: '1',
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <title>선배 찾기 | 두근두근 선배 찾기</title>
      <meta
        name="description"
        content="같은 학과 선배들의 프로필 리스트를 확인하는 페이지입니다."
      />

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
          (students.length > 0 ? (
            <>
              <>
                {students.map((data: MemberType) => (
                  <ProfileButton
                    key={data.student_id}
                    name={data.name}
                    studentId={data.student_id}
                    gender={MEMBER.gender[data.gender]}
                  />
                ))}
              </>
              <div ref={ref}></div>
            </>
          ) : (
            '아직 등록된 선배가 없어요.'
          ))}
        {isLoading && <Loading />}
      </div>
    </>
  );
}

export default ListPage;

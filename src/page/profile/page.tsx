import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { authInstance } from '../../axios/instance';
import Loading from '../../components/Loading';
import DetailProfile from '../../components/DetailProfile';
import BackButton from '../../components/BackButton';

function ProfilePage() {
  const params = useParams();
  const {
    data: profile,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['student', params.student_id],
    queryFn: async () => {
      const { data, status } = await authInstance.get(
        `/student/${params.student_id}`
      );
      if (status === 400) window.location.href = '/404';
      return data;
    },
  });

  return (
    <>
      <title>선배 보기 | 두근두근 선배 찾기</title>
      <meta name="description" content="선배 세부 프로필 확인 페이지입니다." />

      <BackButton link="/list" />
      {isLoading && <Loading />}
      {isSuccess && <DetailProfile {...profile} />}
    </>
  );
}

export default ProfilePage;

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
      const { data } = await authInstance.get(`/student/${params.student_id}`);
      return data;
    },
  });

  return (
    <>
      <title>선배 보기 - {params.student_id} | not-PP</title>
      <meta name="description" content="선배 세부 프로필 확인 페이지입니다." />

      <BackButton link="/list" />
      {isLoading && <Loading />}
      {isSuccess && <DetailProfile {...profile} />}
    </>
  );
}

export default ProfilePage;

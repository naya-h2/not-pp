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
      <BackButton link="/list" />
      {isLoading && <Loading />}
      {isSuccess && <DetailProfile {...profile} />}
    </>
  );
}

export default ProfilePage;

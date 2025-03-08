import { useGetProfile } from '../../hooks/useGetProfile';
import BackButton from '../../components/BackButton';
import DetailProfile from '../../components/DetailProfile';
import Loading from '../../components/Loading';

function MyProfilePage() {
  const profile = useGetProfile();

  return (
    <>
      <BackButton link="/" />
      {profile ? (
        <div className="pb-24">
          <DetailProfile {...profile} />{' '}
          <button
            onClick={() => (window.location.href = '/my-profile/edit')}
            className="absolute bottom-11 w-[calc(100vw-40px)] bg-white border border-coral-main py-4 font-bold text-coral-main rounded-3xl
    "
          >
            프로필 수정
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default MyProfilePage;

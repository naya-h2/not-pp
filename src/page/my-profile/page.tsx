import { useGetProfile } from '../../hooks/useGetProfile';
import BackButton from '../../components/BackButton';
import DetailProfile from '../../components/DetailProfile';
import Loading from '../../components/Loading';

function MyProfilePage() {
  const profile = useGetProfile();

  return (
    <>
      <title>내 프로필 수정 | not-PP</title>
      <meta
        name="description"
        content="내 프로필 정보를 수정할 수 있는 페이지입니다."
      />

      <BackButton link="/" />
      {profile ? (
        <div className="pb-24">
          <DetailProfile {...profile} />{' '}
          <button
            onClick={() => (window.location.href = '/my-profile/edit')}
            className="absolute bottom-11 w-[calc(100vw-40px)] max-w-[440px] bg-white border border-coral-main py-4 font-bold text-coral-main rounded-3xl
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

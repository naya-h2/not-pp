interface Props {
  name: string;
  studentId: string;
  gender: string;
}

/**
 * 선배 리스트에서 보이는 프로필
 */
function ProfileButton({ name, studentId, gender }: Props) {
  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => (window.location.href = `/profile/${studentId}`)}
    >
      <img
        src={'/profile_img.svg'}
        alt="프로필 이미지"
        width={52}
        height={52}
      />
      <div className="flex flex-col gap-1 items-start">
        <p className="font-bold">{name}</p>
        <div className="text-grey-500">
          {studentId} · {gender}
        </div>
      </div>
    </button>
  );
}

export default ProfileButton;

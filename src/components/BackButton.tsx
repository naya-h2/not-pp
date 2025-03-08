import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Props {
  link: string;
  onClickFunc?: () => void;
}

/**
 * 페이지 뒤로가기 버튼
 */
function BackButton({ link, onClickFunc }: Props) {
  return (
    <button
      type="button"
      onClick={onClickFunc ?? (() => (window.location.href = link))}
    >
      <ArrowBackIosIcon className="absolute top-5 left-5" />
    </button>
  );
}

export default BackButton;

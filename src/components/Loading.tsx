import { CircularProgress } from '@mui/material';
function Loading() {
  return (
    <div className="flex justify-center h-full">
      <CircularProgress size="3rem" />
    </div>
  );
}

export default Loading;

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const PostError = (props) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error" variant="filled">
        <AlertTitle>Error</AlertTitle>
        {props.children}
      </Alert>
    </Stack>
  );
};

export default PostError;

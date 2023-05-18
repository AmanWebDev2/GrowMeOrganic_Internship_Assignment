import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
  message: string,
  handleClose:()=>void
}

const FormAlerter = ({message,handleClose}:Props) => {
  return (
    <Stack sx={{ width: '100%',margin:'12px 0' }} spacing={2}>
        <Alert onClose={()=>{handleClose()}} severity="warning">{message}</Alert>
    </Stack>
  )
}

export default FormAlerter
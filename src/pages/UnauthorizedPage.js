import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Stack textAlign={'center'}>
      <Typography variant="h2" gutterBottom>
        Não autorizado!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Para acessar está pagina é necessário fazer <Link style={{color: 'blue'}} to="/">login.</Link>
      </Typography>
      </Stack>
    </div>
  );
}

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface PropsType {
  name: string;
  redirectionURL: string;
}

const RedirectButton = (props: PropsType) => {
  const { name, redirectionURL } = props;
  return (
    <>
      <Link to={redirectionURL}>
        <Button variant="outlined" size="medium">
          {name}
        </Button>
      </Link>
    </>
  );
};

export default RedirectButton;

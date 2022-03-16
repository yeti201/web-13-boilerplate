import { useParams } from "react-router-dom";


export const SingleMovieDetails = () => {
const {id} = useParams("id");

    // make a request to get the details
  return <>
    Single Movie {id}
  </>;
};

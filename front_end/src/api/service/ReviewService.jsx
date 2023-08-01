import { instance } from "../Axios";
import Cookie from "universal-cookie";

export const POST_CREATTE_NEW_REVIEW = async (createReviewForm) => {
  let response = await instance(new Cookie().get("token")).post(
    "/api/v1/review",
    createReviewForm
  );
  return response;
};

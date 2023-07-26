import { POST_CREATTE_NEW_REVIEW } from "../api/service/ReviewService";

export const post_create_new_review = (payload) => {
  return async function post_create_new_review_thunk(dispatch, getState) {
    const { user } = getState();
    let createReviewForm = {
      userId: user.id,
      ...payload,
    };

    let response = await POST_CREATTE_NEW_REVIEW(createReviewForm);
    if (response.status === 200) {
      return true;
    } else {
      console.log(response);
      return false;
    }
  };
};

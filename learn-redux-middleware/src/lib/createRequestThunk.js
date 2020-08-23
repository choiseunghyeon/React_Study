import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestThunk(type, request) {
  // 성공 및 실패 액션 타입을 정의
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (params) => async (dispatch) => {
    dispatch(startLoading(type));
    try {
      const res = await request(params);
      dispatch({ type: SUCCESS, payload: res.data });
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({ type: FAILURE, payload: e, error: true });
      dispatch(finishLoading(type));
      throw e;
    }
  };
}

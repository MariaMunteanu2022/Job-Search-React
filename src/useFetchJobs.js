import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
};

const BASE_URL = "https://remotive.com/api/remote-jobs";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage };
    default:
      return state;
  }
}

export default function useFetchJobs(params) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, { params })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_DATA,
          payload: { jobs: res.data.jobs, totalJobs: res.data["job-count"] },
        });
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [params]);

  return { ...state };
}

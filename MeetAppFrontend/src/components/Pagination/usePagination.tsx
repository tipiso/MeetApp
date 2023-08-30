import { useReducer } from 'react';

const initialSetup = {
  pageSize: 10,
  totalPage: 0,
  totalSize: 0,
  currentPage: 1,
};

enum PaginationActions {
  PREVIOUS_PAGE = 'PREVIOUS_PAGE',
  NEXT_PAGE = 'NEXT_PAGE',
  GO_TO_PAGE = 'GO_TO_PAGE',
}

type Action =
  | { type: PaginationActions.NEXT_PAGE }
  | { type: PaginationActions.PREVIOUS_PAGE }
  | { type: PaginationActions.GO_TO_PAGE; payload: number };

function reducer(state: typeof initialSetup, action: Action): typeof initialSetup {
  switch (action.type) {
    case PaginationActions.GO_TO_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case PaginationActions.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case PaginationActions.PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    default:
      return { ...state };
  }
}
export default function usePagination() {
  const [state, dispatch] = useReducer(reducer, initialSetup);

  const goToPreviousPage = () => dispatch({ type: PaginationActions.PREVIOUS_PAGE });
  const goToNextPage = () => dispatch({ type: PaginationActions.NEXT_PAGE });
  const goToPage = (page: number) => dispatch({ type: PaginationActions.GO_TO_PAGE, payload: page });

  return { ...state, goToPreviousPage, goToNextPage, goToPage };
}
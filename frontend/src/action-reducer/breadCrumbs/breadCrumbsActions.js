import breadCrumbsConstants from "./breadCrumbsConstants";

export function setBreadCrumbList(breadCrumbList) {
  return async function (dispatch) {
    dispatch({
      type: breadCrumbsConstants.UPDATE,
      breadcrumbLinks: breadCrumbList,
    });
  };
}

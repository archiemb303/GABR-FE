import {
    postLoginApiHandler,
    preLoginApiHandler
} from "app/utils/apiHandler";

export const CREATE_FORM = "CREATE_FORM";
export const FETCH_MY_BRAND ="FETCH_MY_BRAND";
export const GENERATE_UNDERSTANDING = "GENERATE_UNDERSTANDING"
export const CREATE_BRAND = "CREATE_BRAND"
// export const FETCH_MY_BRANDS = "FETCH_MY_BRANDS";

export const fetchBusinessNature = (apiParams) => (dispatch) => {
    postLoginApiHandler(
        dispatch,
        CREATE_FORM,
        "POST",
        "/post_login/brand_specific/post_login/brand_specific/get_nature_of_biz/",
        apiParams
    )
}
export const fetchMyBrandAction = (apiParams) => (dispatch) =>{
  postLoginApiHandler(
    dispatch,
    FETCH_MY_BRAND,
    "POST",
    "/post_login/brand_specific/post_login/brand_specific/fetch_my_brands/",
    apiParams
  );
}
export const generateUnderstanding = (apiParams) => (dispatch)=>
{
  postLoginApiHandler(
    dispatch,
    GENERATE_UNDERSTANDING,
    "POST",
    "/post_login/brand_specific/post_login/brand_specific/gen_biz_understanding/",
    apiParams
  )
}
export const createBrandAction = (apiParams) => (dispatch) => {
  postLoginApiHandler(
      dispatch,
      CREATE_BRAND,
      "POST",
      "/post_login/brand_specific/post_login/brand_specific/create_new_brand/",
      apiParams
  )
}
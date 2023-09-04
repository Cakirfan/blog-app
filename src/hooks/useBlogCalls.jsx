import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useBlogCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken, axiosWithPublic } = useAxios();
  const { currentUserId } = useSelector((state) => state.auth);

  //! istek atarken ortak olan base_url  ve token gibi değerleri her seferinde yazmak yerine axios instance kullanarak bunları orada tanımlıyoruz. Ve sonrasında sadece istek atmak istediğimiz end pointi yazmamız yeterli oluyor.

  const getBlogData = async (url, id = "") => {
    dispatch(fetchStart());
    try {
      let requestUrl = `api/${url}`;
      if (id) {
        requestUrl += `/${id}/`;
      }
      const { data } = await axiosWithToken.get(requestUrl);
      console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const getBlogDataDraft = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `api/blogs/?author=${currentUserId}`
      );
      console.log(data);
      dispatch(getSuccess({ data, url: "blogs" }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getBlogDataId = async (id) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.get(`api/blogs/${id}/`);
      console.log(response.data);
      dispatch(getSuccess({ data: response.data }));
      return response.data;
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getBlogDataPublic = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithPublic.get(`api/${url}/`);
      console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const deleteBlogData = async (url, id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`api/${url}/${id}/`);
      getBlogData(url);
      toastSuccessNotify(`Blog successfuly deleted!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`Blog not successfuly deleted!`);
    }
  };

  const postBlogData = async (url, info, id = "") => {
    dispatch(fetchStart());
    try {
      let requestUrl = `api/${url}/`;
      if (id) {
        requestUrl += `${id}/`;
      }
      const { data } = await axiosWithToken.post(requestUrl, info);
      console.log(data);
      getBlogData(url);
      toastSuccessNotify(`successfuly performed!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`not successfuly performed!`);
    }
  };

  const postBlogDataLike = async (url, id = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(`api/${url}/${id}/`);
      console.log(data);
      getBlogData("blogs");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const putBlogData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`api/${url}/${info.id}/`, info);
      getBlogData(url);
      toastSuccessNotify(`${url} successfuly updated!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly updated!`);
    }
  };

  return {
    getBlogData,
    getBlogDataId,
    getBlogDataPublic,
    deleteBlogData,
    postBlogData,
    putBlogData,
    getBlogDataDraft,
    postBlogDataLike,
  };
};

export default useBlogCalls;

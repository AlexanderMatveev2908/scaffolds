import { ReqApiT, TagAPI, UnwrappedResApiT } from "@/common/types/api";
import { apiSlice } from "@/core/store/api";

const BASE_URL = "/wake-up";

export const wakeUpSliceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    wakeServer: builder.query<UnwrappedResApiT<void>, ReqApiT<void>>({
      query: ({ _ }) => ({
        url: `${BASE_URL}?${(_ ?? "") + ""}`,
        method: "GET",
      }),
      providesTags: [TagAPI.WAKE_UP],
    }),
  }),
});

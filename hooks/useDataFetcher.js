import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const useDataFetcher = (key, fetcher, config = {}) => {
  return useSWR(key, fetcher, config)
}

// export const useUser = (id) => {
//     const {data, error, isLoading} = useDataFetcher(`/api/user/${id}`, fetcher)
//
//     return {
//         user: data,
//         isLoading,
//         isError: error
//     }
// }

// TODO: Add endpoints

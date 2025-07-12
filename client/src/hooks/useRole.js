import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    // fetch user info using logged email
    const { data: role = '', isLoading,  } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,           //excecute tanstack query only when loading false and has email in user
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data?.role;
        }
    })


    return [role, isLoading]
};

export default useRole;
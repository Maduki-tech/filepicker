import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { api } from '~/utils/api';

export default function index() {
    // const { data } = api.googleAPI.getAuthUrl.useQuery();
    // const {push} = useRouter();
    //
    // useEffect(() => {
    //     if (data) {
    //         push(data.url);
    //     }
    // }, [data]);
    //
    const data = async () => {
        fetch('api/getUser')
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <>
            <div>index</div>

            <button onClick={data}>click</button>
        </>
    );
}

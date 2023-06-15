import { useRouter } from 'next/router';
import React from 'react'

type googleState = {
    ids: string[];
    action: string;
    userId: string;
    resourceKeys: string[];
};
export const index = (props : {}) => {
    const router = useRouter();
    const { state } = router.query;
    const stateJson: googleState = state
        ? JSON.parse(state as string)
        : undefined;
    return (
        <div>
            <span>state: {state}</span>
            
        </div>
    )
}

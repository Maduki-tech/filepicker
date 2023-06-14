import { useUser } from '@clerk/nextjs';
import React from 'react';
import Form from '~/Components/Anlagen/Form';

export default function index() {
    const {user} = useUser();


    const createUser = async () => {
    };
    return <>

<button></button>

    <Form />


    </>;
}

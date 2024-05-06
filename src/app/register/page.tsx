import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../../lib/authOptions';
import { redirect } from 'next/navigation';
import RegisterForm from './Form';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }


  return (
    <section className='container h-screen flex items-center justify-center'>
        <div className='w-[800px]'>
            <RegisterForm/>
        </div>
    </section>
  )
}

export default page
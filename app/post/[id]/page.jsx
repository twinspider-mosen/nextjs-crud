
'use client';  

import { useRouter } from 'next/compat/router';

export default  function Page() {
  const router =  useRouter();
  
  // Destructure the query object to get the id
  console.log(router);

  return (
    <div>
      <h1>Viewing Post {router} </h1>
      {/* <p>Post ID: {id}</p> */}
    </div>
  );
}

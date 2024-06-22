'use client'

import { useEffect, useState } from "react";


export default function Test() {
  const [message, setMessage] = useState('initial message component');

  useEffect(() => {
    setMessage('123456')
  }, [])



  return (
    <div>
      <p>{ message }</p>
    </div>
  );
}

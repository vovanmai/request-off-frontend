import Test from '@/components/Test';
// import { get } from './actions'
import {Metadata} from "next";
// import { useEffect, useState } from "react";

import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import Link from "next/link";


const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '5',
    label: 'Address',
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Remark',
    children: 'empty',
  },
];

const handle = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json()

  return data
}


export const metadata: Metadata = {
  title: "Show detail product",
  description: "Show detail",
};


export default async function Home() {
  // const [message, setMessage] = useState('initial message');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     return await get()
  //   }
  //   fetchData().then((r) => {
  //     setMessage(r)
  //   })
  // }, [])

  const data = await handle()



  return (
    <div>
      This is dashboard page
    </div>
  );
}

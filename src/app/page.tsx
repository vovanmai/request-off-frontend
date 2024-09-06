'use client'
import type { DescriptionsProps } from 'antd';
import Link from "next/link";
import {useEffect} from "react";


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

export default function Home() {
  useEffect(() => {
    // const registerFirebaseWorker = async () => {
    //   if ('serviceWorker' in navigator) {
    //     const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    //     await navigator.serviceWorker.ready;
    //   }
    // }
    // registerFirebaseWorker()
  }, [])



  return (
    <div>
      <Link href="/about">Go to About page</Link><br />
      <Link href="/login">Go to Login page</Link><br />
      <Link href="/dashboard">Go to Dashboard</Link><br />
    </div>
  );
}

"use client"
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Content from './components/Content';
import Banner from './components/Banner';
import BannerTable from './components/BannerTable';
import FaqManager from './components/FAQ';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Content',
    children: <Content></Content>,
  },
  {
    key: '2',
    label: 'Banner',
    children: <BannerTable></BannerTable>,
  },
  {
    key: '3',
    label: 'FAQ',
    children: <FaqManager></FaqManager>,
  },
];

const App: React.FC = () => <Tabs className="bg-white p-6" size='middle' defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;

"use client"
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Content from './components/Content';
import Banner from './components/Banner';

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
    children: <Banner></Banner>,
  },
  {
    key: '3',
    label: 'FAQ',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => <Tabs className="bg-white p-6" size='middle' defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;

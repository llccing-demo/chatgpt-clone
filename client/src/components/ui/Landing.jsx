import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useDocumentTitle from '~/hooks/useDocumentTitle';
import Templates from '../ui/Templates';
import SunIcon from '../svg/SunIcon';
import LightningIcon from '../svg/LightningIcon';
import CautionIcon from '../svg/CautionIcon';
import ChatIcon from '../svg/ChatIcon';

import store from '~/store';

export default function Landing() {
  const [showingTemplates, setShowingTemplates] = useState(false);
  const setText = useSetRecoilState(store.text);
  const conversation = useRecoilValue(store.conversation);
  const { title = 'New Chat' } = conversation || {};

  useDocumentTitle(title);

  const clickHandler = e => {
    e.preventDefault();
    const { innerText } = e.target;
    const quote = innerText.split('"')[1].trim();
    setText(quote);
  };

  const showTemplates = e => {
    e.preventDefault();
    setShowingTemplates(!showingTemplates);
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      <div className="w-full px-6 text-gray-800 dark:text-gray-100 md:flex md:max-w-2xl md:flex-col lg:max-w-3xl">
        <h1 id="landing-title" className="mt-6 ml-auto mr-auto mb-10 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]">
          ChatGPT
        </h1>
        <div className="items-start gap-3.5 text-center md:flex">
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <SunIcon />
              Examples
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;简单解释一下什么是量子计算&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;设计一个十岁小朋友的生日派对&apos;s birthday?&quot; →
              </button>
              <button
                onClick={clickHandler}
                className="w-full rounded-md bg-gray-50 p-3 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-gray-900"
              >
                &quot;用Python写出梯度下降的代码示例&quot; →
              </button>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <LightningIcon />
              Capabilities
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
              可以为用户提供连续对话
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
              允许用户提供后续更正
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
              主动拒绝不适宜对话
              </li>
            </ul>
          </div>
          <div className="mb-8 flex flex-1 flex-col gap-3.5 md:mb-auto">
            <h2 className="m-auto flex items-center gap-3 text-lg font-normal md:flex-col md:gap-2">
              <CautionIcon />
              Limitations
            </h2>
            <ul className="m-auto flex w-full flex-col gap-3.5 sm:max-w-md">
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
              可能偶尔会产生不正确的信息
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
              可能偶尔会产生有偏见的内容
              </li>
              <li className="w-full rounded-md bg-gray-50 p-3 dark:bg-white/5">
              可能对最新的互联网内容不熟悉
              </li>
            </ul>
          </div>
        </div>
        {/* {!showingTemplates && (
          <div className="mt-8 mb-4 flex flex-col items-center gap-3.5 md:mt-16">
            <button
              onClick={showTemplates}
              className="btn btn-neutral justify-center gap-2 border-0 md:border"
            >
              <ChatIcon />
              Show Prompt Templates
            </button>
          </div>
        )}
        {!!showingTemplates && <Templates showTemplates={showTemplates}/>} */}
        <div className="group h-32 w-full flex-shrink-0 dark:border-gray-900/50 dark:bg-gray-800 md:h-48" />
      </div>
    </div>
  );
}

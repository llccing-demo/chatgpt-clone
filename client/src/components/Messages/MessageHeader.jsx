import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import EndpointOptionsDialog from '../Endpoints/EndpointOptionsDialog';
import { cn } from '~/utils/';
import { Button } from '../ui/Button.tsx';

import store from '~/store';

const clipPromptPrefix = str => {
  if (typeof str !== 'string') {
    return null;
  } else if (str.length > 10) {
    return str.slice(0, 10) + '...';
  } else {
    return str;
  }
};

const MessageHeader = ({ isSearchView = false }) => {
  const [saveAsDialogShow, setSaveAsDialogShow] = useState(false);
  const conversation = useRecoilValue(store.conversation);
  const searchQuery = useRecoilValue(store.searchQuery);
  const { endpoint } = conversation;

  const getConversationTitle = () => {
    if (isSearchView) return `Search: ${searchQuery}`;
    else {
      let _title = `正在使用: ${conversation.title}`;
      return _title;
    }
  };

  return (
    <>
      <div
        className={cn(
          'dark:text-gray-450 w-full gap-1 border-b border-black/10 bg-gray-50 text-sm text-gray-500 transition-all hover:bg-gray-100 hover:bg-opacity-30 dark:border-gray-900/50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:bg-opacity-100',
          endpoint === 'chatGPTBrowser' ? '' : 'cursor-pointer '
        )}
        onClick={() => (endpoint === 'chatGPTBrowser' ? null : setSaveAsDialogShow(true))}
      >
        <div className="d-block flex w-full items-center justify-center p-3">{getConversationTitle()}</div>
      </div>

      <EndpointOptionsDialog
        open={saveAsDialogShow}
        onOpenChange={setSaveAsDialogShow}
        preset={conversation}
      />
    </>
  );
};

export default MessageHeader;

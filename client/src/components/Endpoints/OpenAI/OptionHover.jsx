import React from 'react';
import { HoverCardPortal, HoverCardContent } from '~/components/ui/HoverCard.tsx';

const types = {
  temp: '该值越大,回答的内容越具有生成性和随机性.',
  max: "The max tokens to generate. The total length of input tokens and generated tokens is limited by the model's context length.",
  topp: '该值越大,回答的内容越具有准确性(不建议和随机度一起使用)',
  freq: "根据已回答文本中单词的出现频率,惩罚模型.(正值会减少重复，负值会增加重复,0无影响)",
  pres: "根据新生成的单词是否已经在已生成的文本中出现过,惩罚模型.(正值会增加新内容生成概率，负值减少新内容生成概率,0无影响)"
};

function OptionHover({ type, side }) {
  // const options = {};
  // if (type === 'pres') {
  //   options.sideOffset = 45;
  // }

  return (
    <HoverCardPortal>
      <HoverCardContent
        side={side}
        className="w-80 "
        // {...options}
      >
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">{types[type]}</p>
        </div>
      </HoverCardContent>
    </HoverCardPortal>
  );
}

export default OptionHover;

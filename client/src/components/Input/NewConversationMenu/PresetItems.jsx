import React from 'react';
import PresetItem from './PresetItem.jsx';

export default function PresetItems({ presets, onSelect, onChangePreset, onDeletePreset }) {
  console.log('55', presets)
  return (
    <>
      {presets.map(preset => (
        <PresetItem
          key={preset.presetId}
          value={preset.promptPrefix}
          onSelect={onSelect}
          onChangePreset={onChangePreset}
          onDeletePreset={onDeletePreset}
          preset={preset}
        />
      ))}
    </>
  );
}

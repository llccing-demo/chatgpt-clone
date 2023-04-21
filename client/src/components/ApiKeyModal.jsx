import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
import { useState } from 'https://esm.sh/preact/hooks'
import { signal } from 'https://esm.sh/@preact/signals'
import { setApiKeyHeader } from '~/data-provider';



// Initialize htm with Preact
const html = htm.bind(h);
const KEY_PATTERN = /^sk-[a-zA-Z0-9]{48}$/
const lang = /^zh\b/.test(navigator.language) ? 'zh' : 'en'
const strings = {
  en: {
    'modalTitle': 'Our API key is running out...',
    'source': `This is an open-source project. If you're willing, you can deploy it privately, `,
    'sourceLink': 'view source code',
    'key': 'Alternatively, you can enter your own API key to continue using it. Your key will be saved locally and only used by you.',
    'placeholder': 'Click here to input your key',
    'save': 'Save',
    'cancel': 'Cancel',
  },
  zh: {
    'modalTitle': '欢迎使用ChatGPT！',
    'source': '我们共享了API KEY！这将供所有人免费体验。但因为使用人数过多，会受到一定的频率、次数与速度限制',
    'sourceLink': '👉🏻Open AI官网注册获取API KEY',
    'key': '想不受限制？尝试拥有自己的API KEY！在下方输入你自己的 API KEY',
    'lock':'您的API KEY仅保存在当前设备，我们不会以任何形式获取',
    'placeholder': '点击这里输入你的 API KEY',
    'save': '保存',
    'cancel': '我想先试试',
    'suggestion':"",
    'findme':"联系站长"
  }
}

function t(key) {
  return strings[lang][key]
}

function ApiKeyModal({ visible, setVisible }) {
  const [apiKey, setApiKey] = useState('')
  const isValid = KEY_PATTERN.test(apiKey)
  

  const handleInput = (e) => {
    setApiKey(e.target.value)
  }

  const close = () => {
    const myModal = document.getElementById('modals');

    myModal.style.display = 'none';
    // setVisible(false)
  }

  const save = () => {
    if (KEY_PATTERN.test(apiKey)) {
      const myModal = document.getElementById('modals');

      localStorage.setItem('apiKey', apiKey)
      setApiKeyHeader(apiKey)
      myModal.style.display = 'none';
      // setVisible(false)
    }
  }


  return html`
    <div id="modalsc" class="relative z-50">
    <div class="fixed inset-0 bg-gray-500/90 transition-opacity dark:bg-gray-800/90 opacity-100" />
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 sm:max-w-lg opacity-100 translate-y-0 sm:scale-100">
          <div class="prose dark:prose-invert">
            <div class="mb-5">
              <h2 class="!mt-4 font-normal !mb-2">ChatGPT Chinese</h2>
            </div>
            <div class="w-full h-[1px] bg-gray-300 opacity-20"></div>
            <h4 class="mb-4">${t('modalTitle')}</h4>
            <div class="flex gap-4 flex-col text-sm">
              <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                <div class="w-10 text-2xl text-center">💜</div>
                <div class="flex-1 leading-5">${t('source')}</div>
              </div>
              <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                <div class="w-10 text-2xl text-center">🔑</div>
                <div class="flex-1 leading-5">${t('key')}
                <a href="https://openai.com/" target="_blank">${t('sourceLink')}</a>
                </div>
              </div>
              <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                <div class="w-10 text-2xl text-center">🔐</div>
                <div class="flex-1 leading-5">${t('lock')}
                </div>
              </div>
              <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                <div class="w-10 text-2xl text-center">👦🏻</div>
                <div class="flex-1 leading-5">${t('suggestion')}<a href="https://space.bilibili.com/504821026" target="_blank">${t('findme')}</a></div>
                
              </div>
              
            <div
                class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <input type="text"
                  class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
                  placeholder=${t('placeholder')} value=${apiKey} onInput=${handleInput} />
            </div>
            </div>
            <div class="flex gap-4 mt-6">
              <button class="btn relative btn-neutral" onClick=${close}>
                <div class="flex w-full items-center justify-center gap-2">${t('cancel')}</div>
              </button>
              <button class="btn relative btn-primary ml-auto" disabled=${!isValid} onClick=${save}>
                <div class="flex w-full items-center justify-center gap-2">${t('save')}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  `
}

const apiKeyModalVisible = signal(false)
function setApiModalVisible(visible) {
  apiKeyModalVisible.value = visible
}

window.showApiKeyModal = () => {
  setApiModalVisible(true)
}

const renderApiKeyModal = () => {
  const modals = document.createElement('div')
  modals.id = 'modals'
  document.body.appendChild(modals)

  render(html`<${ApiKeyModal} visible=${apiKeyModalVisible} setVisible=${setApiModalVisible} />`, modals)
}



function main() {
  renderApiKeyModal()
  
  const apiKey = localStorage.getItem('apiKey')
  if (!apiKey) {
    window.showApiKeyModal();
    const myModal = document.getElementById('modals');
    myModal.style.display = 'show';
  }else{
    const myModal = document.getElementById('modals');
    myModal.style.display = 'none';
  }

}


window.onload = function() {
      main()
}

export default ApiKeyModal;

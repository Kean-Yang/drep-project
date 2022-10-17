export const langList = {
  'en-US': { v: 'en_US', vb: 'en', t: 'English' },
  'zh-CN': { v: 'zh_CN', vb: 'zh_CN', t: '中文' },
  'ko-KR': { v: 'ko_KR', vb: 'kr', t: '한국어' },
  'vi-VN': { v: 'vi_VN', vb: 'vi', t: 'Tiếng Việt' },
};

export const getLang = () => {
  let lang = window.localStorage.getItem('LANGUAGE') || 'en-US';
  return lang;
};

export const switchLang = (lang) => {
  window.localStorage.setItem('LANGUAGE', lang);
  window.location.reload();
};

export const getBackLang = () => {
  let lang = getLang();
  return langList[lang].vb;
};

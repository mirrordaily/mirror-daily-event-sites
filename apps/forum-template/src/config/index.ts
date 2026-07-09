// 這裡管理的是在 Build 階段就會寫死數值的環境變數。
// .env.local 中的變數，僅能在 sever-side 階段取用。但以 `NEXT_PUBLIC_` 開頭命名者，可在 client-side 階段取用。
const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)

// JSON 設定
const JSON_URL: string =
  process.env.NEXT_PUBLIC_DATA_JSON ||
  'https://v3-statics.mirrormedia.mg/json/2026_Resilient-Taiwan.json'

// OpenGraph 設定
const OG_TITLE: string = process.env.NEXT_PUBLIC_OG_TITLE || '2026韌性台灣論壇'
const OG_DESC: string =
  process.env.NEXT_PUBLIC_OG_DESC ||
  '全球地緣政治洗牌與科技秩序重組的浪潮正加速襲來。站在這場變局的風口浪尖，臺灣的戰略思維必須從過去追求的「高成長率」，全面轉向厚植「高耐受度」。本論壇以「韌性臺灣」為核心，不再止步於單一產業的技術堆疊，而是從更深層的國家安全與供應鏈博弈出發，解構臺灣在動盪時代下的生存與反制之道。'
const OG_IMAGE_URL: string =
  process.env.NEXT_PUBLIC_OG_IMAGE_URL ||
  'https://v3-statics.mirrormedia.mg/images/85b38e94-b95f-43e4-90bf-e81c60e6e927.jpg'

// Color 設定
const primaryColor: string = process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#ECF7FF'
const secondaryColor: string =
  process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#ffffff'
const backgroundColor: string = process.env.NEXT_PUBLIC_BG_COLOR || '#CFE1EE'
const titleColor: string = process.env.NEXT_PUBLIC_TITLE_COLOR || '#192B81'
const textColor: string = process.env.NEXT_PUBLIC_TEXT_COLOR || '#5A5A61'
const borderColor: string = process.env.NEXT_PUBLIC_BORDER_COLOR || '#5A5A61'
const sideBarBgColor: string =
  process.env.NEXT_PUBLIC_SIDEBAR_BG_COLOR || '#192B81'
const sideBarTextColor: string =
  process.env.NEXT_PUBLIC_SIDEBAR_TEXT_COLOR || '#FFF'
const sideBarHoverColor: string =
  process.env.NEXT_PUBLIC_SIDEBAR_HOVER_COLOR || '#2D9BD7'
const headerBgColor = process.env.NEXT_PUBLIC_HEADER_BG_COLOR || '#192944'
const navListItemBgColor =
  process.env.NEXT_PUBLIC_NAV_LIST_ITEM_BG_COLOR || '#CEEBFC'

// Background Image 專題背景底圖設定
const bgImageURL: string = process.env.NEXT_PUBLIC_BG_IMAGE_URL || ''

let protocol = 'http'
let host = 'localhost'
let staticFileDestination: string
let imagePrefix: string
let GTM_ID = ''
let SITE_URL = ''

switch (env) {
  case 'dev':
    protocol = 'https'
    host = 'dev.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-PBNLSMX'
    SITE_URL = 'dev-next.mirrormedia.mg'

    break
  case 'staging':
    protocol = 'https'
    host = 'staging.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-KVDZ27K'
    SITE_URL = 'staging-next.mirrormedia.mg'

    break

  case 'prod': {
    protocol = 'https'
    host = 'www.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-NCH86SP'
    SITE_URL = 'www.mirrormedia.mg'

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:3000`
    imagePrefix = ''
    GTM_ID = 'GTM-PBNLSMX'

    break
  }
}

export {
  staticFileDestination,
  imagePrefix,
  GTM_ID,
  SITE_URL,
  JSON_URL,
  headerBgColor,
  navListItemBgColor,
  primaryColor,
  secondaryColor,
  backgroundColor,
  titleColor,
  textColor,
  borderColor,
  sideBarBgColor,
  sideBarTextColor,
  sideBarHoverColor,
  OG_TITLE,
  OG_DESC,
  OG_IMAGE_URL,
  bgImageURL,
}

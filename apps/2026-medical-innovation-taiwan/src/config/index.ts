// 這裡管理的是在 Build 階段就會寫死數值的環境變數。
// .env.local 中的變數，僅能在 sever-side 階段取用。但以 `NEXT_PUBLIC_` 開頭命名者，可在 client-side 階段取用。
const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)

// JSON 設定
const JSON_URL: string =
  process.env.NEXT_PUBLIC_DATA_JSON ||
  'https://statics-prod.mirrordaily.news/json/2026_medical-innovation-taiwan.json'

// OpenGraph 設定
const OG_TITLE: string =
  process.env.NEXT_PUBLIC_OG_TITLE || '2026 醫療創新健康臺灣高峰論壇'

const OG_DESC: string =
  process.env.NEXT_PUBLIC_OG_DESC ||
  '2026年，再生醫療雙法正式上路，象徵臺灣再生醫療發展邁入全新階段。面對全球生醫科技快速發展，以及智慧醫療、AI應用與精準健康持續推進，如何掌握制度革新的契機，串聯政策、臨床醫療、科研創新與產業資源，加速創新技術落地，提升醫療品質與產業競爭力，已成為臺灣邁向「健康臺灣」的重要課題。'

const OG_IMAGE_URL: string = process.env.NEXT_PUBLIC_OG_IMAGE_URL || ''

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
    host = 'dev.mirrordaily.news'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-MG9V2TJC'
    SITE_URL = 'dev.mirrordaily.news'

    break
  case 'staging':
    protocol = 'https'
    host = 'staging.mirrordaily.news'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-P7XPJ6P4'
    SITE_URL = 'staging.mirrordaily.news'

    break

  case 'prod': {
    protocol = 'https'
    host = 'www.mirrordaily.news'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-MPWSXJ4X'
    SITE_URL = 'www.mirrordaily.news'

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:3000`
    imagePrefix = ''
    GTM_ID = 'GTM-MG9V2TJC'

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

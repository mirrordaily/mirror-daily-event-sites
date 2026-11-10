# 論壇（通用模版）

- 此專案為「論壇」類專題通用模版，設計上可透過環境變數改變樣式與資料來源，來 build 出不同主題的論壇專題。
- 此專案使用 Next15 搭配 styled-component。
- 此專案 pnpm v11 作為 package manager。
- 歷屆論壇專題：
  - [2023 風力發電論壇](https://events.mirrormedia.mg/events/windpowerforum2023/index.html)
  - 活動影音如需使用輪播圖套件可以參考 yc 大大的([packages/forum-2024](https://github.com/tyc67/Sandalphon/tree/forum-2024/packages/forum-2024))
  - [2026 韌性台灣論壇](https://www.mirrormedia.mg/projects/2026_resilient-taiwan/index.html)

## 使用教學

### 開發與測試

1. 建立 `.env.local` 檔案，並參考下方 [環境變數](#environment-variables-環境變數) 資訊進行設定，設定方式參考 [文件](https://nextjs.org/docs/basic-features/environment-variables)
2. 從根目錄開啟 IDE，使用 `pnpm install` 安裝環境依賴。
3. 接著，使用 `pnpm --filter [apps name] run dev` 啟動服務，進行開發測試。
4. 開發完畢後，使用 `pnpm --filter [apps name] run build` 來建構正式環境程式（已設定 `output: 'export'`，build 會直接生成 `out` 靜態專題資料夾），並將資料夾內的檔案們放上 GCS。

註：安裝依賴時，`@readr-media/react-image` 與 `@readr-media/share-button` 會因 peer dependency 尚未支援 React 19 而出現 warning，實際運作不受影響，詳見[根目錄 README](../../README.md)。

## Project Directory Explanation (專案目錄結構說明)

```
/src
  /app                  - 頁面檔
  /components           - React 元件
    /layout             - 頁面布局元件（header/footer）
    /shared             - 跨區塊共用的元件
    /*                  - 其他元件
  /config               - 環境變數相關的參數設定
  /styles               - Global-Style、Shared-Style 與 Theme 檔案
  /types                - TypeScript 使用的型別定義
  /utils                - 工具類 function
/public               - 公開資源
  /icon               - SVG icon
  /images             - JPG/PNG 圖片(含講師頭貼、og.jpg)
```

---

## Environment Variables (環境變數)

| 變數名稱                           | 資料型態 | 初始值                                                  | 變數說明                              |
| ---------------------------------- | -------- | ------------------------------------------------------- | ------------------------------------- |
| NEXT_PUBLIC_ENV                    | 字串     | 'localhost'                                             | 環境設定                              |
| NEXT_PUBLIC_PROJECT_NAME           | 字串     | ''                                                      | 專案名稱                              |
| NEXT_PUBLIC_DATA_JSON              | 字串     | 'https://v3-statics.mirrormedia.mg/json/forum2023.json' | 專題 JSON 資料來源                    |
| NEXT_PUBLIC_OG_TITLE               | 字串     | ''                                                      | OG 標題                               |
| NEXT_PUBLIC_OG_DESC                | 字串     | ''                                                      | OG 描述                               |
| NEXT_PUBLIC_PRIMARY_COLOR          | 字串     | '#E2FBFE'                                               | 專題主色                              |
| NEXT_PUBLIC_SECONDARY_COLOR        | 字串     | '#ffffff'                                               | 專題次要色                            |
| NEXT_PUBLIC_TITLE_COLOR            | 字串     | '#000000'                                               | 專題大標題顏色                        |
| NEXT_PUBLIC_BG_COLOR               | 字串     | '#BBD4DA'                                               | 專題背景底色                          |
| NEXT_PUBLIC_TEXT_COLOR             | 字串     | '#000000'                                               | 專題內文文字顏色                      |
| NEXT_PUBLIC_BORDER_COLOR           | 字串     | '#000000'                                               | 論壇議程長條區塊外框顏色              |
| NEXT_PUBLIC_SIDEBAR_TEXT_COLOR     | 字串     | 'rgba(182, 242, 255, 1)'                                | 手機版展開式側欄小標文字顏色          |
| NEXT_PUBLIC_SIDEBAR_BG_COLOR       | 字串     | 'rgba(11, 25, 48, 0.8)'                                 | 手機版展開式側欄底圖顏色              |
| NEXT_PUBLIC_BG_IMAGE_URL           | 字串     | ''                                                      | 專題背景底圖（單張呈現不重複）        |
| NEXT_PUBLIC_SIDEBAR_HOVER_COLOR    | 字串     | '#2D9BD7'                                               | 手機版展開式側欄小標文字 hover 效果色 |
| NEXT_PUBLIC_HEADER_BG_COLOR        | 字串     | '#192944'                                               | 專題 header 背景色                    |
| NEXT_PUBLIC_NAV_LIST_ITEM_BG_COLOR | 字串     | '#CEEBFC'                                               | 專題導覽列項目按鈕背景色              |

註：OG 圖片設定方式：目前設計上不透過環境變數指定，要請需求方提供： (1) 尺寸：1200x630 (2) 檔案格式：jpg / jpeg 的圖片，並上傳到 GCS 上該次論壇專題的資料夾內的 images 資料夾內。（ code 寫法設定統一吃 /images/og.jpg 檔案當作 OG Image）

<img width="816" alt="截圖 2023-09-26 下午8 05 14" src="https://github.com/ChangRongXuan/Sandalphon/assets/104489150/e23339cf-dffa-4bc8-8d6a-f18387d0fce1">
<img width="535" alt="截圖 2023-09-26 下午8 10 08" src="https://github.com/ChangRongXuan/Sandalphon/assets/104489150/a85fae7b-c229-450a-838b-cfb166cd1b17">

---

## 部屬

論壇專題需透過執行 `pnpm --filter [apps name] run build` 指令後，生成 `out` 資料夾（next.config.ts 已設定 `output: 'export'`）。
在指定的 [Google Cloud Storage(GCS)](https://console.cloud.google.com/storage/browser/v3-statics.mirrormedia.mg/events;tab=objects?authuser=1&prefix=&forceOnObjectsSortingFiltering=false) 上創立該次論壇 slug 名稱的的資料夾後，將 `out` 內的所有檔案放入 GCS 資料夾內。

注意：放論壇專題的 GCS 與一般週刊靜態專題路徑不相同，因為需求方指定希望網址呈現為 `https://events.mirrormedia.mg/events/[forumName]` 格式，因此做出此項調整。

另外，由於 GCS 並無區分 dev、staging、prod 版本，僅透過創立資料夾的名稱來區分是否為 dev/prod 版本。因此要特別注意：在 build 時， `NEXT_PUBLIC_ENV` 都需要設定為 'prod' 才對（可以理解成因為 GCS 沒有區分 dev/prod 版本，因此目前的 GCS 統一視為 prod 環境。）

---

## 部屬環境資訊

### Prod

- [Google Cloud Storage (GCS) | events](https://console.cloud.google.com/storage/browser/v3-statics.mirrormedia.mg/events;tab=objects?authuser=1&prefix=&forceOnObjectsSortingFiltering=false)

---

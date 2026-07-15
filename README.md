# Mirror Daily Event Site

鏡報靜態活動專題網站的 monorepo，使用 pnpm workspace 管理。

## 環境需求

- Node.js >= 22
- pnpm v11（root `package.json` 已透過 `devEngines` 設定，版本不符時會自動下載對應版本）

## 目錄結構

```
/apps                   - 各活動專題（Next.js 專案），說明見各自的 README
  /forum-template       - 「論壇」類專題通用模版
/packages               - 跨專題共用的套件（目前為空，未來可以補上論壇專用的 component，從 /forum-template 中抽出）
/patches                - pnpm patch 檔，修補第三方套件的問題（見下方說明）
/.husky                 - git hooks（pre-commit 會跑 lint-staged，見下方說明）
```

## 常用指令

於根目錄執行：

```bash
pnpm install                              # 安裝所有 workspace 依賴
pnpm --filter [apps name] run dev         # 啟動指定 app 的開發服務
pnpm --filter [apps name] run build       # 建構指定 app 的正式環境程式
```

## Commit 前的自動檢查（husky + lint-staged）

本專案在 commit 前會自動對 staged 檔案跑 lint 與格式化，相關工具（`husky`、`lint-staged`、`prettier`）都只裝在 root，各 app 不需重複安裝。

運作流程：`pnpm install` 時會執行 root 的 `prepare` script（`husky`）安裝 git hook → commit 時 `.husky/pre-commit` 執行 `pnpm exec lint-staged` → lint-staged 依設定處理 staged 檔案。

### 設定檔位置

lint-staged 支援在不同目錄放多份設定檔，每個 staged 檔案會**套用離它最近的那一份**：

- root `package.json` 的 `lint-staged` 欄位：`*.{json,md}` → `prettier --write`
- 各 app 的 `.lintstagedrc.json`：以 `apps/forum-template/.lintstagedrc.json` 為例，`*.{js,ts,jsx,tsx}` → `eslint --cache --fix` → `prettier --write`

lint-staged 預設會以**設定檔所在的目錄**作為指令的工作目錄，因此 app 內的 `eslint --cache --fix` 會自動吃到該 app 的 `eslint.config.mjs`，cache 也會寫在該 app 底下的 `.eslintcache`。Prettier 則會往上找到 root 的 `.prettierrc`，全 workspace 共用同一套格式規則。

reference: [lint-staged 針對 monorepo 的設定說明](https://github.com/lint-staged/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo)

### 新增靜態網頁專案時

在該 app 根目錄放一份 `.lintstagedrc.json` 即可（可直接複製 `apps/forum-template/.lintstagedrc.json`）。

### 注意事項

- **lint-staged 不會合併設定檔**：只要 app 內有 `.lintstagedrc.json`，root 的設定就完全不會套用到該 app 底下的檔案。例如 `apps/forum-template/.lintstagedrc.json` 目前只匹配 `*.{js,ts,jsx,tsx}`，所以 commit `apps/forum-template/README.md` 時**不會**跑到 root 設定的 prettier。如果希望 app 內的 `.json` / `.md` 也被格式化，要自行在該 app 的設定檔補上對應的 glob。
- 每份設定檔請視為彼此獨立，不要預期 root 的規則會被繼承。

## Patched Dependencies

本專案使用 [pnpm patch](https://pnpm.io/cli/patch) 機制修補`@readr-media/react-image` 的相容性問題：patch 檔放在 `/patches`，並註冊於 `pnpm-workspace.yaml` 的 `patchedDependencies`，`pnpm install` 時會自動套用到 `node_modules`，對整個 workspace 生效。

### 現有 patch

- `@readr-media/react-image@2.1.3`：該套件的 `exports` 欄位缺少 `types` 條件。[在 TypeScript 的 `moduleResolution: bundler` 模式下（Next.js 15 預設），只要套件有 `exports` 欄位，TS 會 follow Node.js 的 package.json "exports" spec 機制](https://www.typescriptlang.org/docs/handbook/modules/reference.html#packagejson-exports)，只看 `exports` 內部、忽略頂層的 `types` 宣告，導致 import 時找不到型別定義。此 patch 在 `exports` 補上 `"types": "./lib/types/index.d.ts"`。

### 注意事項

- patch 綁定特定版本號，升級被 patch 的套件時 pnpm 會報錯提醒 patch 不再適用。屆時請先確認上游是否已修復：已修復就移除 patch（刪除 patch 檔與 `pnpm-workspace.yaml` 中的對應設定），尚未修復則用 `pnpm patch [pkg]` 重新產生對應新版本的 patch。
- 新增 patch 流程：`pnpm patch [pkg]` → 在暫存資料夾中修改 → `pnpm patch-commit [資料夾路徑]`，pnpm 會自動產生 patch 檔並更新 `pnpm-workspace.yaml`。

reference: [pnpm patch](https://pnpm.io/cli/patch)

## 已知的安裝 Warning

`pnpm install` 時，`@readr-media/react-image` 與 `@readr-media/share-button` 會因 peer dependency 尚未支援 React 19 而出現 warning。經確認這兩個套件內部沒有使用到 React 19 不支援的 feature，實際運作不受影響，warning 可以忽略。

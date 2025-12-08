# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクトの目的

このプロジェクトは、Google Driveと同期するObsidianプラグインの開発を目的としています。


## アーキテクチャ

この目的を達成するために2つのアプリケーションを開発します。

* Next.jsアプリケーション
* Obsidianプラグイン
 
### Next.jsアプリケーション

Next.jsアプリケーションは本プロジェクトにおいて以下の役割を果たします。

* ユーザーはブラウザ上でこのアプリケーションを通じてOAuthログインを行う
* OAuthログイン後、ブラウザにリフレッシュトークンを表示する。

### Obsidianプラグイン

* ユーザーはNext.jsアプリケーションから取得したリフレッシュトークンをObsidianプラグインに登録する
* 登録したリフレッシュトークンを使用してGoogle Drive APIにアクセスし、ObsidianのVaultをGoogle Driveと同期する

## ディレクトリ構成

```
/
├─ CLAUDE.md             # Claude Code設定
├─ package.json
├─ pnpm-workspace.yaml   # pnpmワークスペース設定
├─ packages/
│  └─ - api-schema       # APIスキーマ
└─ apps/
   ├─ - web              # Next.js製アプリケーション
   └─ - obsidian-plugin  # Obsidianプラグイン
```

## コードスタイル

### Lint

Next.jsアプリケーション（`/apps/web`）、Obsidianプラグイン（`/apps/obsidian-plugin`）におけるLintルールは、それぞれのディレクトリにある`biome.jsonc`に従います。

### Format

Next.jsアプリケーション（`/apps/web`）、Obsidianプラグイン（`/apps/obsidian-plugin`）におけるFormatルールは、それぞれのディレクトリにある`biome.jsonc`に従います。

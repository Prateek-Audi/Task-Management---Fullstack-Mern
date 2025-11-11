// Ambient env typings to enable import.meta.env usage in the frontend safely
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_MAX_FILE_SIZE?: string;
  readonly VITE_ENABLE_MOCK_DATA?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
  readonly VITE_GITHUB_CLIENT_ID?: string;
  readonly VITE_OAUTH_CALLBACK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}



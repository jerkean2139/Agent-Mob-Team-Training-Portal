declare const gapi: {
  load: (api: string, callback: () => void) => void;
  client: {
    init: (config: {
      apiKey: string;
      clientId: string;
      scope: string;
      discoveryDocs: string[];
    }) => Promise<void>;
    drive: {
      files: {
        create: (params: any) => Promise<any>;
      };
    };
  };
  auth2: {
    getAuthInstance: () => {
      signIn: () => Promise<{
        getAuthResponse: (includeAuthResponse?: boolean) => {
          access_token: string;
          refresh_token?: string;
          expires_at: number;
        };
      }>;
    };
  };
};
namespace app {

  type protocol = 'ws' | 'wss' | 'http' | 'https';

  const WS_PROTOCOL:protocol = "ws";
  const WSS_PROTOCOL:protocol = "ws";
  const HTTP_PROTOCOL:protocol = "http";
  const HTTPS_PROTOCOL:protocol = "https";

  const PROTOCOLS = {
    WS_PROTOCOL: WS_PROTOCOL,
    WSS_PROTOCOL: WSS_PROTOCOL,
    HTTP_PROTOCOL: HTTP_PROTOCOL,
    HTTPS_PROTOCOL: HTTPS_PROTOCOL
  };

  interface IRavenConfig {
    public_dsn:string;
  }

  interface IBaseConfig {
    version:string;
    system_instance:string;
    api_version:string;
    raven:IRavenConfig;
  }

  const app_config:IBaseConfig = (<any>window).app_config;

  export class ConfigConstant {

    protocols:any;
    api:any;
    raven:IRavenConfig;
    app_version:string;

    static get Default():ConfigConstant {

      let serverInstance = app_config.system_instance;
      let apiVersion = app_config.api_version;
      let api = {
        protocol: HTTP_PROTOCOL,
        server_instance: serverInstance,
        version: apiVersion,
        imageResource: HTTP_PROTOCOL + "://" + serverInstance + apiVersion + "object/image/",
      };

      let configObj = {
        app_version: app_config.version,
        protocols: PROTOCOLS,
        api: api,
        raven: {
          public_dsn: app_config.raven.public_dsn,
        }
      };

      return configObj;

    }
  }
  
}

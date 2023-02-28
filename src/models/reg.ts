export interface SerialRes {
  serial: string;
}

export interface TosForm {
  accept_tos: boolean;
  serial: string;
}

export interface TosRes {
  url: string;
}

export interface EmailForm {
  email: string;
  code: string;
  serial: string;
}

export interface EmailRes {
  url: string;
}

export interface AccountForm {
  username: string;
  nickname: string;
  password: string;
  password_confirm: string;
  serial: string;
}

export interface AccountReq {
  username: string;
  nickname: string;
  password: string;
  serial: string;
}

export interface AccountRes {
  url: string;
}

export interface MsLinkRes {
  link_start: string;
  link_remake: string;
}

export interface MsOauthForm {
  serial: string;
  ms_state: string;
  ms_token: string;
}
export interface MsQueryRes {
  serial: string;
  ms_state: string;
  ms_token: string;
}

export interface SerialForm {
  serial: string;
}

export interface MsQueryRes {
  minecraft: {
    minecraft_id: string;
    minecraft_name: string;
    minecraft_skins: Array<{
      id: string;
      state: string;
      url: string;
      variant: string;
      alias: string;
    }>;
    minecraft_capes: Array<{
      id: string;
      state: string;
      url: string;
      alias: string;
    }>;
    minecraft_entitlements: {
      items: Array<{
        name: string;
        signature: string;
      }>;
      signature: string;
      keyId: string;
    };
  };
  ms_end: number;
  ms_step: number;
  ms_tip: {
    info: string;
    error: string;
    trace: {
      DNSLookup: number;
      ConnTime: number;
      TCPConnTime: number;
      TLSHandshake: number;
      ServerTime: number;
      ResponseTime: number;
      TotalTime: number;
      IsConnReused: boolean;
      IsConnWasIdle: boolean;
      ConnIdleTime: number;
      RequestAttempt: number;
      RemoteAddr: {
        IP: string;
        Port: number;
        Zone: string;
      };
    };
  };
}

export interface MsRes {
  url: string;
}

export interface QqRes {
  url: string;
}

export interface OptionRes {
  url: string;
}

export interface FinishRes {
  token: string;
}

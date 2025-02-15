import ConnectWallet, {
  type ProtonWebLink,
  type LinkSession,
  type Link,
} from "@proton/web-sdk";
import {action, thunk, type Action, type Thunk} from "easy-peasy";
import {ApiClass} from "@proton/api";

export interface ProtonProfile {
  avatar?: string;
  userName?: string;
}

export interface ConnectPayload {
  silent?: boolean;
  callback?: (xprSession?: LinkSession | null | undefined) => void;
}

//TODO following will be replaced by prisma user

export interface AuthModel {
  data: {
    link: ProtonWebLink | Link | null | undefined;
    session: LinkSession | null | undefined;
    protonProfile: ProtonProfile | null;
  };
  setLink: Action<AuthModel, ProtonWebLink | Link | undefined>;
  setSession: Action<AuthModel, LinkSession | undefined>;
  setProtonProfile: Action<AuthModel, ProtonProfile>;

  connect: Thunk<AuthModel, ConnectPayload | void>;
  disconnect: Thunk<
    AuthModel,
    {
      link: ProtonWebLink | Link | null | undefined;
      session: LinkSession | null | undefined;
    }
  >;
  authorize: Thunk<AuthModel, string>;
  fetchProtonProfile: Thunk<AuthModel, string>;
  updateAuth: Thunk<AuthModel, LinkSession>;
}

export interface AuthModelConfiguration {
  protonEndpoints: string[];
  appName: string;
  requestedAccount: string;
}

/**
 * Function that allow an external config injection, because we need to pass data located in the .env.
 * @param config
 * @returns the store itself
 */
export function configureAuthModel(config: AuthModelConfiguration): AuthModel {
  const authModel: AuthModel = {
    data: {
      link: null,
      session: null,
      protonProfile: null,
    },
    setLink: action((state, protonWebLink) => {
      state.data.link = protonWebLink;
    }),
    setSession: action((state, linkSession) => {
      state.data.session = linkSession;
    }),

    setProtonProfile: action((state, protonProfile) => {
      state.data.protonProfile = protonProfile;
    }),
    connect: thunk(async (actions, payload: ConnectPayload) => {
      actions;
      const {session, link} = await ConnectWallet({
        linkOptions: {
          endpoints: config.protonEndpoints,
          restoreSession: payload && payload.silent,
        },
        selectorOptions: {
          appName: config.appName,
        },
        transportOptions: {
          requestAccount: config.requestedAccount,
        },
      });
      actions.setLink(link);
      actions.setSession(session);
      if (session && payload.callback) {
        payload.callback(session);
      }
      if (session) actions.fetchProtonProfile(session.auth.actor.toString());
    }),
    
    disconnect: thunk(async (actions, account) => {
      if (!account.link || !account.session) return;
      account.link.removeSession(
        process.env.NEXT_PUBLIC_PROTON_REQUEST_ACCOUNT!,
        account.session.auth,
        account.session?.chainId
      );
      actions.setLink(undefined);
      actions.setSession(undefined);
    }),
    
 
    authorize: thunk(actions => {
      actions;
    }),
    fetchProtonProfile: thunk(async (actions, actorName) => {
      const api = new ApiClass("proton-test");
      const protonAvatar = await api.getProtonAvatar(actorName);
      if (protonAvatar) {
        actions.setProtonProfile({
          avatar: protonAvatar.avatar,
          userName: protonAvatar.name,
        });
        actions;
      }
    }),
    //TODO: Mark as async when implement
    updateAuth: thunk(actions => {
      actions;
    }),
  };

  return authModel;
}

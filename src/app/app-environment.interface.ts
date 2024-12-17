export interface IAppEnvironment {
  service: IAppEnvironmentService;
}

export interface IAppEnvironmentService {
  book: IAppEnvironmentServiceInfo;
}

export interface IAppEnvironmentServiceInfo {
  baseUrl: string;
}

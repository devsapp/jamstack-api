declare namespace ServerlessDevsReport {
  interface IObject {
    [key: string]: any;
  }
  export interface JamstackApi {
    region: string;
    service: IObject;
    function: IObject;
    triggers: IObject[];
    customDomains: IObject[];
  }
  export interface ReportData {
    access?: string;
    name: string;
    content: JamstackApi[];
  }
}

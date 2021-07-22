export default class BaseComponent {
    protected inputs: any;
    protected client: any;
    name: string;
    private basePath;
    constructor(inputs: any);
    __getBasePath(): string;
    private getEntityByName;
    private getEntityHelpInfoByName;
    protected help(name: any): void;
    protected __report(reportData: ServerlessDevsReport.ReportData): ServerlessDevsReport.JamstackApi[];
}
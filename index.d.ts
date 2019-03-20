declare module "cz-customizable" {
  export interface Option {
    name: string;
    value?: string;
  }

  // noinspection JSUnusedGlobalSymbols
  export interface Options {
    types: Option[];
    scopes?: Option[];
    scopeOverrides?: { [type: string]: Option[] };
    messages?: {
      type?: string,
      scope?: string,
      customScope?: string,
      subject?: string,
      body?: string,
      breaking?: string,
      footer?: string,
      confirmCommit?: string,
    };
    allowCustomScopes?: boolean;
    allowBreakingChanges?: string[];
    skipQuestions?: string[];
    appendBranchNameToCommitMessage?: boolean;
    breakingPrefix?: string;
    footerPrefix?: string;
    subjectLimit?: number;
    ticketNumberPrefix?: string;
    ticketNumberRegExp?: string;
    ticketNumberPattern?: string;
    addHashtagDuplicateIssues?: boolean;
  }
}

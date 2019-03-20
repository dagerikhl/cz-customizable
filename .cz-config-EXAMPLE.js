module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     A new feature',
    },
    {
      value: 'fix',
      name: 'fix:      A bug fix',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    {
      value: 'refactor',
      name: 'refactor: A code change that neither fixes a bug nor adds a feature (e.g. move code, formatting)',
    },
    {
      value: 'build',
      name: 'build:    Changes that affect the build system or external dependencies (e.g. gulp, broccoli, npm)',
    },
    {
      value: 'ci',
      name: 'ci:       Changes to our CI configuration files and scripts (e.g. GitLab, Travis, Drone)',
    },
    {
      value: 'test',
      name: 'test:     Adding missing tests',
    },
    {
      value: 'docs',
      name: 'docs:     Documentation only changes (e.g. README.md, CHANGELOG.md)',
    },
    {
      value: 'chore',
      name: 'chore:    Changes to the build process or auxiliary tools and libraries (e.g. releases)',
    },
    {
      value: 'revert',
      name: 'revert:   Revert to a commit',
    },
    {
      value: 'WIP',
      name: 'WIP:      Work in progress',
    },
  ],

  // override the messages, defaults are as follows
  messages: {
    type: "Select the TYPE of change that you're committing:",
    scope: 'Choose the SCOPE of this change:',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a short, imperative tense DESCRIPTION of the change (max 72 characters):\n',
    body: 'Provide a LONGER DESCRIPTION of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES COMPLETED by this change. E.g.: resolve TICKET-42, close TICKET-69:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  scopes: [{ name: 'builders' }, { name: 'index' }, { name: 'questions' }, { name: 'config' }, { name: 'npm' }],
  allowCustomScopes: true,
  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    fix: [{ name: 'merge' }, { name: 'style' }, { name: 'e2eTest' }, { name: 'unitTest' }],
  },

  // limit subject length
  subjectLimit: 100,

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  ticketNumberPattern: 'Enter the ticket number following this pattern (\\d{1,5})\n',

  allowBreakingChanges: ['feat', 'fix', 'perf'],

  breakingPrefix: undefined,
  footerPrefix: 'ISSUES:',

  // skip any questions you want
  skipQuestions: ['body', 'footer'],
};

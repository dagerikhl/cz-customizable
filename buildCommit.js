const wrap = require('word-wrap');

const maxLineWidth = 100;

const wrapOptions = {
  trim: true,
  newline: '\n',
  indent: '',
  width: maxLineWidth,
};

const addScope = scope => {
  // it could be type === WIP. So there is no scope
  if (!scope) {
    return ': ';
  }

  return `(${scope.trim()}): `;
};

const addTicketNumber = (ticketNumber, config) => {
  if (!ticketNumber) {
    return '';
  }
  if (config.ticketNumberPrefix) {
    return `${config.ticketNumberPrefix + ticketNumber.trim()} `;
  }

  return `${ticketNumber.trim()} `;
};

const addSubject = subject => subject.trim();

const escapeSpecialChars = result => {
  // eslint-disable-next-line no-useless-escape
  const specialChars = ['`'];

  let newResult = result;
  // eslint-disable-next-line array-callback-return
  specialChars.forEach(item => {
    // If user types "feat: `string`", the commit preview should show "feat: `\string\`".
    // Don't worry. The git log will be "feat: `string`"
    newResult = result.replace(new RegExp(item, 'g'), '\\`');
  });

  return newResult;
};

const buildHead = (answers, config, subject = undefined) => {
  return (
    answers.type +
    addScope(answers.scope) +
    addTicketNumber(answers.ticketNumber, config) +
    addSubject(subject || answers.subject)
  );
};

const buildCommit = (answers, config) => {
  // Hard limit this line
  const head = buildHead(answers, config).slice(0, maxLineWidth);

  // Wrap these lines at 100 characters
  let body = wrap(answers.body, wrapOptions) || '';
  body = body.split('|').join('\n');
  const breaking = wrap(answers.breaking, wrapOptions);
  const footer = wrap(answers.footer, wrapOptions);

  let result = head;
  if (body) {
    result += `\n\n${body}`;
  }
  if (breaking) {
    const breakingPrefix = config && config.breakingPrefix ? config.breakingPrefix : 'BREAKING CHANGE:';
    result += `\n\n${breakingPrefix} ${breaking}`;
  }
  if (footer) {
    const footerPrefix = config && config.footerPrefix ? config.footerPrefix : 'ISSUES:';

    let footerContent = footer;
    if (config.addHashtagDuplicateIssues) {
      const keywordRegEx = /(\w+) +(\w+-\d+), (\w+-\d+)/;
      // Prevent the while loop from getting stuck if it cannot parse the issues correctly
      let retries = 0;
      while (keywordRegEx.test(footerContent) && retries < 100) {
        footerContent = footerContent.replace(keywordRegEx, '$1 $2, $1 $3');

        retries += 1;
      }

      const duplicateRegEx = /(\w+) +(\w+-\d+)(, [^#]|$)/;
      retries = 0;
      while (duplicateRegEx.test(footerContent) && retries < 100) {
        footerContent = footerContent.replace(duplicateRegEx, '$1 $2, #$2$3');

        retries += 1;
      }
    }

    result += `\n\n${footerPrefix} ${footerContent}`;
  }

  return escapeSpecialChars(result);
};

module.exports = {
  buildHead,
  buildCommit,
};

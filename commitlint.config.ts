const matchOptionalTicketNumberWithSpaceAfter = /^YH-\d+: .+$/;

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp('^' + matchOptionalTicketNumberWithSpaceAfter.source + '$'),
      headerCorrespondence: ['header'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { header } = parsed;

          if (!matchOptionalTicketNumberWithSpaceAfter.test(header)) {
            return [false, 'Коммит должен начинаться с YH-XXX: '];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'header-match-team-pattern': [2, 'always'],
  },
};

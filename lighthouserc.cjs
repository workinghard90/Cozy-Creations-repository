module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      isSinglePageApplication: true,
      url: [
        'http://localhost/',
        'http://localhost/books/storybooks',
        'http://localhost/books/coloring-books',
        'http://localhost/books/logbooks-journals/vehicle-maintenance-logbook',
      ],
      numberOfRuns: 1,
    },
    assert: { assertions: { 'http-status-code': 'error', 'document-title': 'error' } },
    upload: { target: 'filesystem', outputDir: './.lighthouseci/reports' },
  },
};

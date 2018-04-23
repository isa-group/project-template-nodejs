exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      // Get rid of --ignore-certificate yellow warning
      args: ['--no-sandbox', '--test-type=browser'],
      // Set download path and avoid prompting for download even though
      // this is already the default on Chrome but for completeness
      prefs: {
        'download': {
          'prompt_for_download': false,
          'default_directory': 'C:/tmp'
        }
      }
    }
  }
};

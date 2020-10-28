module.exports = on => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      // Disable extensions to prevent the OneLogin extension from borking our tests.
      launchOptions.args.push('--disable-extensions')

      return launchOptions
    }
  })
} 
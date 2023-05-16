const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const hostOS = process.env.HOST_OS || '';

console.log('Setup reports node environment as', process.env.NODE_ENV, hostOS, process.arch);

if (process.env.NODE_ENV === 'development' && hostOS.toLowerCase().includes('win')) {
  const configPath = path.resolve('./node_modules/react-scripts/config/webpack.config.js');
  const config = readFileSync(configPath, 'utf8');

  console.log('config text exists', config.length);

  if (!config.includes('watchOptions')) {
    if (config.includes('performance: false,')) {
      const newConfig = config.replace(
        'performance: false,',
        `performance: false,

/* INJECTED BY CUSTOM SETUP SCRIPT */
watchOptions: { aggregateTimeout: 200, poll: 1000, ignored: '**/node_modules', },
        `
      );
      writeFileSync(configPath, newConfig, 'utf8');
      console.log('content written to', configPath);
    } else {
      throw new Error(`Failed to inject watchOptions`);
    }
  } else {
    console.log('already contains watch options.');
  }
} else {
  console.log('Ignoring setup because not development on Windows');
}

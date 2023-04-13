const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(__dirname, 'build'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/walidoow/placeholder-soen341project2023.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
);

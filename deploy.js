const ghpages = require('gh-pages');
const path = require('path');

const repo = 'https://github.com/walidoow/placeholder-soen341project2023.git';
const branch = 'gh-pages';

ghpages.publish(
  path.join(__dirname, 'client', 'build'),
  {
    branch: branch,
    repo: repo,
  },
  (err) => {
    if (err) {
      console.error('Deploy Failed!', err);
    } else {
      const link = `https://${repo.split('/')[3]}.github.io/${repo.split('/')[4].split('.')[0]}/`;
      console.log(`Deploy Complete! View your app at: ${link}`);
    }
  }
);

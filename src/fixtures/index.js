const base = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    
    if (testInfo.status !== testInfo.expectedStatus) {
      const queuePath = path.join(process.cwd(), 'test-results', 'healing-queue.json');
      const queueDir = path.dirname(queuePath);
      
      if (!fs.existsSync(queueDir)) {
        fs.mkdirSync(queueDir, { recursive: true });
      }
      
      let queue = [];
      if (fs.existsSync(queuePath)) {
        try {
          queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
        } catch (e) {
          queue = [];
        }
      }
      
      queue.push({
        title: testInfo.title,
        file: testInfo.file,
        error: testInfo.error?.message || 'Unknown error',
        timestamp: new Date().toISOString()
      });
      
      fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
    }
  }
});

const expect = base.expect;

module.exports = { test, expect };
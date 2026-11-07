import { expect, test } from '@playwright/test';

test('a normal app window starts in Chinese without a saved preference', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'webdriver', { configurable: true, get: () => false });
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('.new-task-button')).toHaveAccessibleName(/新建任务/);
});

test('dynamic update and resize labels are localized', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    const host = document.createElement('section');
    host.id = 'i18n-dynamic-check';
    host.innerHTML = `
      <span>View all agents</span>
      <button type="button" aria-label="Claude Code update details">Guide</button>
      <button type="button" aria-label="Update Claude Code">Update</button>
      <div title="Resize sidebar · Double-click to reset"></div>
      <p>This installation is not managed by a supported updater. Follow the official installation guide to update it.</p>
    `;
    document.body.append(host);
  });

  const host = page.locator('#i18n-dynamic-check');
  await expect(host).toContainText('查看所有智能体');
  await expect(host.getByRole('button', { name: 'Claude Code 更新详情', exact: true })).toContainText('指南');
  await expect(host.getByRole('button', { name: '更新 Claude Code', exact: true })).toContainText('更新');
  await expect(host.locator('[title]')).toHaveAttribute('title', '调整侧边栏大小 · 双击重置');
  await expect(host).toContainText('此安装不受支持的更新器管理。请按照官方安装指南进行更新。');
});

test('Chinese UI covers the workspace and settings, and can switch back to English', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('.new-task-button')).toHaveAccessibleName(/新建任务/);
  await expect(page.locator('button[data-action="settings"]')).toHaveAccessibleName(/设置/);
  await expect(page.locator('#sidebar-filter')).toHaveAttribute('placeholder', '筛选任务');

  await page.locator('button[data-action="settings"]').click();
  const settings = page.getByRole('region', { name: '设置', exact: true });
  await expect(settings).toBeVisible();
  await expect(settings.getByRole('tab', { name: '推荐', exact: true })).toBeVisible();
  await settings.getByRole('tab', { name: '通用', exact: true }).click();

  const language = settings.getByLabel('语言', { exact: true });
  await expect(language).toHaveValue('zh-CN');
  await language.selectOption('en');

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('region', { name: 'Settings', exact: true })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'General', exact: true })).toBeVisible();
});

test('Chinese translation never rewrites user or agent content', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.new-task-button')).toHaveAccessibleName(/新建任务/);

  const content = page.locator('#transcript');
  await expect(content.locator('.message-content').first()).toBeVisible();
  await content.evaluate(host => {
    const message = host.querySelector<HTMLElement>('.message-content');
    if (!message) throw new Error('The preview needs at least one message.');
    message.dataset.i18nTestContent = 'true';
    message.textContent = 'Settings and Search stay exactly as written.';
  });

  await expect(content.locator('[data-i18n-test-content="true"]')).toHaveText('Settings and Search stay exactly as written.');
});

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
      <span>Replied</span><span>took</span>
      <p>This installation is not managed by a supported updater. Follow the official installation guide to update it.</p>
    `;
    document.body.append(host);
  });

  const host = page.locator('#i18n-dynamic-check');
  await expect(host).toContainText('查看所有智能体');
  await expect(host.getByRole('button', { name: 'Claude Code 更新详情', exact: true })).toContainText('指南');
  await expect(host.getByRole('button', { name: '更新 Claude Code', exact: true })).toContainText('更新');
  await expect(host.locator('[title]')).toHaveAttribute('title', '调整侧边栏大小 · 双击重置');
  await expect(host).toContainText('已回复');
  await expect(host).toContainText('耗时');
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

test('protected task, file, code, and reply content stays verbatim', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.evaluate(() => {
    const host = document.createElement('section');
    host.id = 'i18n-protected-content';
    host.innerHTML = `
      <span class="task-title">Explore the project</span>
      <span class="file-preview-title">Token saver</span>
      <div class="message-content">Settings and Search stay exactly as written.</div>
      <pre><code>Settings = Search</code></pre>
    `;
    document.body.append(host);
  });

  const host = page.locator('#i18n-protected-content');
  await expect(host.locator('.task-title')).toHaveText('Explore the project');
  await expect(host.locator('.file-preview-title')).toHaveText('Token saver');
  await expect(host.locator('.message-content')).toHaveText('Settings and Search stay exactly as written.');
  await expect(host.locator('code')).toHaveText('Settings = Search');
});

test('model picker and token saver metadata are localized', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.locator('#model-picker-trigger').click();
  const models = page.getByRole('dialog', { name: '智能体框架与模型', exact: true });
  await expect(models).toBeVisible();
  await expect(models.locator('[title*="上下文"]').first()).toHaveAttribute('title', /上下文 · .+模型示例元数据。/);

  await page.keyboard.press('Escape');
  await page.locator('.composer-saver-button').click();
  const saver = page.getByRole('dialog', { name: 'Token 节省', exact: true });
  await expect(saver).toBeVisible();
  await expect(saver).toContainText('可节省');
  await expect(saver).toContainText('尚未安装：启用后将执行安装');
});

test('workflow editor labels and preview are localized', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.locator('button[data-action="settings"]').click();
  const settings = page.getByRole('region', { name: '设置', exact: true });
  await settings.getByRole('tab', { name: '计划', exact: true }).click();
  await expect(settings.getByLabel('关于计划', { exact: true })).toBeVisible();

  await settings.locator('.schedules-new-workflow').click();
  const workflow = settings.locator('.schedules-workflow');
  await expect(workflow).toBeVisible();
  await expect(workflow).toHaveAttribute('aria-label', '工作流');
  await expect(workflow.locator('.workflow-steps')).toHaveAttribute('aria-label', '步骤');
  await expect(workflow.getByRole('button', { name: '添加步骤', exact: true })).toBeVisible();
  await expect(workflow.locator('[data-remove-step="0"]')).toHaveAttribute('aria-label', '移除第 1 步');
  await expect(workflow.locator('.workflow-preview')).toContainText('每一步都在上一步成功时执行');
});

test('command palette localizes commands without rewriting task titles', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('.task-title').filter({ hasText: 'Explore the project' })).toBeVisible();
  await page.locator('button[data-action="search"]').click();
  const palette = page.getByRole('dialog', { name: '前往任意位置', exact: true });
  await expect(palette).toBeVisible();
  await expect(palette.getByRole('textbox', { name: '搜索任务和命令', exact: true })).toBeVisible();
  await expect(palette.getByRole('button', { name: /新建任务/ })).toBeVisible();
  await expect(palette.locator('#command-results')).toContainText('Explore the project');
});

test('bot presets display and fill Chinese values', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('pandacode.locale', 'zh-CN'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.locator('button[data-action="toggle-bots-view"]').click();
  await page.locator('[data-action="new-bot-menu"]').first().click();
  await page.locator('[data-action="new-bot"]').first().click();

  const dialog = page.getByRole('dialog', { name: '新建机器人', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: '推荐模板', exact: true })).toBeVisible();
  await dialog.locator('[data-suggestion="research"]').click();
  await expect(dialog.locator('input[name="name"]')).toHaveValue('研究员');
  await expect(dialog.locator('textarea[name="purpose"]')).toHaveValue(/使用网络和此电脑上的文件研究我提出的问题/);
  await expect(dialog.getByRole('button', { name: '创建机器人', exact: true })).toBeVisible();
});

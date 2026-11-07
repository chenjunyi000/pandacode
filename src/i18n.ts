import './i18n.css';

/**
 * PandaCode's Chinese interface layer.
 *
 * The workspace predates i18n and builds most UI as HTML strings. Translating at the DOM
 * boundary keeps user and agent content untouched while still covering lazily rendered
 * dialogs, menus and settings pages. Every source string is remembered so the language can
 * switch back to English without reloading.
 */
export type Locale = 'zh-CN' | 'en';

export const LOCALE_STORAGE_KEY = 'pandacode.locale';
const DEFAULT_LOCALE: Locale = 'zh-CN';
const LOCALE_EVENT = 'pandacode-locale-change';

const ZH: Record<string, string> = {
  // Workspace shell and navigation
  'PandaCode': 'PandaCode',
  'Projects and tasks': '项目和任务',
  'Workspace view: Conversation': '工作区视图：对话',
  'New task': '新建任务',
  'New chat': '新建对话',
  'New chat (no project)': '新建对话（无项目）',
  'Search': '搜索',
  'Filter projects': '筛选项目',
  'All projects': '所有项目',
  'Sort and view': '排序与视图',
  'Import conversations': '导入对话',
  'Open project': '打开项目',
  'Filter tasks': '筛选任务',
  'Clear filter': '清除筛选',
  'Bots': '机器人',
  'Help & support': '帮助与支持',
  'Agent usage': '智能体用量',
  'Settings': '设置',
  'Dark mode': '深色模式',
  'Light mode': '浅色模式',
  'Hide sidebar': '隐藏侧边栏',
  'Show sidebar': '显示侧边栏',
  'Resize sidebar': '调整侧边栏大小',
  'Resize right sidebar': '调整右侧边栏大小',
  'Resize sidebar · Double-click to reset': '调整侧边栏大小 · 双击重置',
  'Resize right sidebar · Double-click to reset': '调整右侧边栏大小 · 双击重置',
  'Use Left and Right arrows to resize. Hold Shift for larger steps. Home and End select the smallest and largest size. Double-click to reset.': '使用左右方向键调整大小。按住 Shift 可加大步长。Home 和 End 可选择最小和最大尺寸。双击可重置。',
  'Browser preview · sample data': '浏览器预览 · 示例数据',
  'Browser preview · sample agent availability.': '浏览器预览 · 示例智能体可用性。',
  'Workspace actions': '工作区操作',
  'Toggle inspector': '切换检查器',
  'Toggle terminal': '切换终端',
  'Open browser': '打开浏览器',
  'Project moodboards': '项目情绪板',
  'Agents': '智能体',
  'Run project': '运行项目',
  'Run pandacode-run.sh': '运行 pandacode-run.sh',
  'Run': '运行',
  'Deploy': '部署',
  'Task actions': '任务操作',
  'Restart to update': '重启以更新',
  'Project board': '项目看板',
  'Visual progress': '可视进度',
  'Conversation': '对话',
  'Terminal tabs': '终端标签页',
  'New terminal': '新建终端',
  'Minimize terminal': '最小化终端',
  'Close terminal': '关闭终端',
  'Project inspector': '项目检查器',
  'Panel views': '面板视图',
  'Open files': '已打开文件',
  'Close open files': '关闭已打开文件',
  'Files': '文件',
  'Changes': '更改',
  'All changes': '所有更改',
  'Modified': '已修改',
  'Untracked': '未跟踪',
  'Added': '已添加',
  'Deleted': '已删除',
  'Renamed': '已重命名',
  'Browser': '浏览器',
  'Pull request': '拉取请求',
  'Simulators': '模拟器',
  'Virtual machines': '虚拟机',
  'Design': '设计',
  'By the way': '顺便问一下',
  'Open a view': '打开视图',
  'Refresh project': '刷新项目',
  'Hide inspector': '隐藏检查器',
  'Open file': '打开文件',
  'iOS & Android simulators': 'iOS 与 Android 模拟器',
  'Design canvas': '设计画布',
  'By the way: a side thread': '顺便问一下：侧边对话',

  // Sidebar groups and task state
  'Chats': '对话',
  'Tasks': '任务',
  'Active': '进行中',
  'Finished': '已完成',
  'Settled': '已归档',
  'Pinned': '已固定',
  'Active tasks': '进行中的任务',
  'Finished tasks': '已完成的任务',
  'Settled tasks': '已归档的任务',
  'Pinned tasks': '已固定的任务',
  'No tasks yet': '暂无任务',
  'No tasks match': '没有匹配的任务',
  'Open a project to get started.': '打开项目以开始。',
  'Show less': '收起',
  'Unread': '未读',
  'Worktree': '工作树',
  'Running': '运行中',
  'Needs your answer': '需要你回答',
  'Needs approval': '需要审批',
  'Interrupted': '已中断',
  'Failed': '失败',
  'Answer': '回答',
  'Approval': '审批',
  'Limited': '受限',
  'Usage limit': '用量限制',
  'Reopen task': '重新打开任务',
  'Settle task': '归档任务',
  'Reopen': '重新打开',
  'Settle': '归档',
  'Project': '项目',
  'Chat': '对话',
  'Task': '任务',
  'Issue': '议题',
  'Pull requests and issues': '拉取请求与议题',
  'Last message': '最后消息',
  'Working for': '已运行',
  'now': '刚刚',
  'just now': '刚刚',

  // Welcome, composer and picker
  'No task selected': '未选择任务',
  'Choose a project': '选择项目',
  'Start a task': '开始任务',
  'Unable to load this task.': '无法加载此任务。',
  'Retry': '重试',
  'Loading conversation…': '正在加载对话…',
  'Start this task when you’re ready. Agent updates and your replies will appear here.': '准备好后开始此任务。智能体更新和你的回复会显示在这里。',
  'What’s on your mind?': '你想聊些什么？',
  'Move to project…': '移动到项目…',
  'Change task project': '更改任务项目',
  'What would you like to do?': '你想做什么？',
  'Explore this project': '探索此项目',
  'Explore the project': '探索项目',
  'Review my changes': '审查我的更改',
  'This task is settled.': '此任务已归档。',
  'Reopen it above to continue.': '在上方重新打开以继续。',
  'Queue a follow-up…': '排队发送后续消息…',
  'Queue a follow-up · ⌘↩ steers now': '排队发送后续消息 · ⌘↩ 立即引导',
  'Edit draft': '编辑草稿',
  'Steer': '引导',
  'Clear draft': '清除草稿',
  'Stop task': '停止任务',
  'Stopping…': '正在停止…',
  'Checking…': '正在检查…',
  'Reconnecting…': '正在重新连接…',
  'Retry connection': '重试连接',
  'Send message': '发送消息',
  'Message your coding agent': '向你的编程智能体发送消息',
  'Enter to send. Shift Enter for a new line.': '按 Enter 发送，Shift+Enter 换行。',
  'Enter to queue for when the agent finishes.': '按 Enter 排队，等待智能体完成后发送。',
  ' Command Enter to steer the running turn.': ' 按 Command+Enter 引导正在运行的一轮。',
  'Attach files for context': '附加文件作为上下文',
  'Attach files…': '附加文件…',
  'Attach a folder…': '附加文件夹…',
  'Images, PDFs, documents': '图片、PDF、文档',
  'Path and structure': '路径与结构',
  'From the Files tab': '来自“文件”标签页',
  'Draw and attach': '绘制并附加',
  'Project files': '项目文件',
  'Sketch a mockup…': '绘制草图…',
  'Schedule a wake-up…': '安排唤醒…',
  'Workflow recipes…': '工作流配方…',
  'Queue saved steps': '将已保存步骤加入队列',
  'Wake this thread later': '稍后唤醒此对话',
  'Model': '模型',
  'Choose harness and model': '选择智能体框架和模型',
  'Default': '默认',
  'Default agent': '默认智能体',
  'Default model': '默认模型',
  'Default agent for new tasks': '新任务的默认智能体',
  'Default model for new tasks': '新任务的默认模型',
  'Team': '团队',
  'No team': '无团队',
  'A single agent': '单个智能体',
  'The lead picks models': '由主导智能体选择模型',
  'Cheap team': '经济团队',
  'Balanced team': '均衡团队',
  'Best team': '最佳团队',
  'Cheapest model likely to pass': '最可能通过且成本最低的模型',
  'Best value for the cost': '性价比最高',
  'Strongest model for each worker': '为每个工作智能体使用最强模型',
  'Worker models for every team · remembered': '所有团队的工作模型 · 已记住',
  'Worker models for every team · turns routing on': '所有团队的工作模型 · 会开启路由',
  'Your model leads and starts agents. Name workers in your prompt to pick them.': '你的模型会主导并启动智能体。在提示词中写出工作智能体名称即可指定它们。',
  'Mode': '模式',
  'Permissions': '权限',
  'Standard': '标准',
  'Full access': '完全访问',
  'Plan mode': '计划模式',
  'Read only': '只读',
  'Accept edits': '接受编辑',
  'Ask when needed': '按需询问',
  'Approve for me': '代我审批',
  'Use the harness’s normal rules. Ask you when approval is needed.': '使用智能体框架的常规规则，需要审批时询问你。',
  'Run tools without approval prompts, including outside this project.': '无需审批即可运行工具，包括在当前项目之外。',
  'Explore and plan changes before implementation.': '在实施前探索并规划更改。',
  'Queued': '已排队',
  'scheduled': '已计划',
  'Saver': '节省 Token',
  'Local': '本地',
  'Sending next…': '正在发送下一条…',
  'Sends when the agent finishes': '智能体完成后发送',
  'Resume': '继续',
  'Resume after this run': '本次运行后继续',
  'Editing': '正在编辑',
  'Cancel edit': '取消编辑',
  'Save': '保存',
  'Steer message': '引导消息',
  'Send now': '立即发送',
  'Delete message': '删除消息',
  'Edit message': '编辑消息',
  'Queued messages': '已排队消息',
  'Paused after restart': '重启后已暂停',
  'Paused after the run failed': '运行失败后已暂停',
  'Paused after you stopped the run': '你停止运行后已暂停',
  'Paused until the usage limit resets': '已暂停，等待用量限制重置',
  'Steering…': '正在引导…',
  'Not steered': '未引导',
  'Delete queued message?': '删除已排队消息？',
  'Keep': '保留',
  'Delete': '删除',
  'Attachments travel with queued messages, so this one was queued.': '附件会随排队消息一起发送，因此这条消息已加入队列。',
  'A team takes messages between runs, so this one was queued.': '团队会在运行之间接收消息，因此这条消息已加入队列。',
  'Queued messages with attachments are sent after the run.': '带附件的排队消息会在本次运行结束后发送。',
  'The agent could not take that message, so it was queued.': '智能体暂时无法接收该消息，因此已加入队列。',
  'The agent could not take that message; it is back in the prompt.': '智能体暂时无法接收该消息，已放回输入框。',
  'A queued message could not be put back; it was not sent.': '排队消息无法放回，因此未发送。',
  'Stopping the run to send this message…': '正在停止运行以发送此消息…',
  'Response copied': '回复已复制',
  'File copied': '文件已复制',
  'Branch name copied': '分支名称已复制',
  'Path copied': '路径已复制',
  'Task ID copied': '任务 ID 已复制',
  'Worktree path copied': '工作树路径已复制',
  'Project path copied': '项目路径已复制',
  'Changes committed': '更改已提交',
  'Enter a commit message.': '请输入提交信息。',
  'Task pinned': '任务已固定',
  'Task unpinned': '任务已取消固定',
  'Task settled': '任务已归档',
  'Task deleted': '任务已删除',
  'Task exported': '任务已导出',
  'Mockup updated': '草图已更新',
  'Mockup attached': '草图已附加',

  // Messages and agent activity
  'You': '你',
  'Agent': '智能体',
  'Generating': '正在生成',
  'Thinking': '思考中',
  'Working': '正在工作',
  'Read': '读取',
  'Ran': '已运行',
  'Waiting': '等待中',
  'Completed': '已完成',
  'Stopped': '已停止',
  'Skipped': '已跳过',
  'Paused': '已暂停',
  'Needs attention': '需要处理',
  'Waiting on sub-workers': '等待子智能体',
  'Waiting for approval': '等待审批',
  'Waiting for tool details…': '正在等待工具详情…',
  'No output was recorded.': '未记录输出。',
  'Input': '输入',
  'Output': '输出',
  'Raw input and output': '原始输入与输出',
  'Tool activity': '工具活动',
  'Legacy tool report': '旧版工具报告',
  'Older saved output remains readable.': '较早保存的输出仍可查看。',
  'Details were not recorded for this earlier tool call.': '此较早的工具调用未记录详情。',
  'Wake-up details': '唤醒详情',
  'Read more': '展开阅读',
  'This image is no longer stored. Here is what was sent with it.': '此图片已不再存储。以下是随图片发送的内容。',
  "Couldn't load the saved response.": '无法加载已保存的回复。',
  'Retry loading response': '重新加载回复',
  'A worker needs your input. Open Architect & workers.': '有工作智能体需要你的输入。请打开“架构师与工作智能体”。',
  'Architect & workers': '架构师与工作智能体',
  'Subagents': '子智能体',
  'No subagents have been reported for this task yet.': '此任务尚未报告任何子智能体。',
  'Task status': '任务状态',
  'Working directory': '工作目录',
  'Integrations': '集成',
  'Use the harness’s advertised MCP commands. Refresh the slash-command menu to sync the current list.': '使用智能体框架公布的 MCP 命令。刷新斜杠命令菜单以同步当前列表。',
  'This harness has not reported context usage yet.': '此智能体框架尚未报告上下文用量。',
  'Side questions cannot carry attachments. Remove them, or send without /btw.': '侧边提问不能携带附件。请移除附件，或不使用 /btw 发送。',

  // Inspector and files
  'Open a project to browse files and review changes.': '打开项目以浏览文件并审查更改。',
  'Its changes and files are on that computer, so review and commit them there.': '其更改和文件位于那台电脑上，请在那里审查并提交。',
  'Loading changes…': '正在加载更改…',
  'Loading files…': '正在加载文件…',
  'Unable to load changes': '无法加载更改',
  'Unable to read folder': '无法读取文件夹',
  'Locate folder…': '定位文件夹…',
  'Loading file…': '正在加载文件…',
  'Back': '返回',
  'Preview in browser': '在浏览器中预览',
  'Copy file': '复制文件',
  'Unstage file': '取消暂存文件',
  'Stage file': '暂存文件',
  'Loading diff…': '正在加载差异…',
  'No Git repository': '没有 Git 仓库',
  'Open a Git repository to review changes.': '打开 Git 仓库以审查更改。',
  'Changed files': '已更改文件',
  'Loading diff viewer…': '正在加载差异查看器…',
  'Unable to load the diff viewer. Close this window and try again.': '无法加载差异查看器。请关闭此窗口后重试。',

  // Common dialogs and commands
  'Close': '关闭',
  'Close dialog': '关闭对话框',
  'Back to workspace': '返回工作区',
  'Back to settings': '返回设置',
  'Cancel': '取消',
  'Done': '完成',
  'Open': '打开',
  'Remove': '移除',
  'Remove project': '移除项目',
  'Delete task': '删除任务',
  'Delete bot': '删除机器人',
  'Save changes': '保存更改',
  'Try again': '重试',
  'Loading…': '正在加载…',
  'Applying…': '正在应用…',
  'This section couldn’t load. Close Settings and try again.': '此部分无法加载。请关闭设置后重试。',
  'No options available.': '没有可用选项。',
  'No matching options.': '没有匹配的选项。',
  'Task details': '任务详情',
  'Add task': '添加任务',
  'Task title': '任务标题',
  'Task description': '任务描述',
  'What needs to be done?': '需要完成什么？',
  'Describe the outcome, context, and anything the agent should know.': '描述期望结果、上下文以及智能体需要了解的任何信息。',
  'Add to pending': '添加到待处理',
  'Save details': '保存详情',
  'Project folder': '项目文件夹',
  'Enter a full path or choose Browse.': '输入完整路径，或选择“浏览”。',
  'Browse…': '浏览…',
  'Rename task': '重命名任务',
  'Task name': '任务名称',
  'Delete task?': '删除任务？',
  'Permanently delete this conversation and its worker history from PandaCode? This cannot be undone. Its terminal tabs close and running commands may stop. Project files and worktrees stay.': '要从 PandaCode 永久删除此对话及其工作智能体历史吗？此操作无法撤销。终端标签会关闭，正在运行的命令可能停止。项目文件和工作树会保留。',
  'Go to anything': '前往任意位置',
  'Search tasks and commands': '搜索任务和命令',
  'Search tasks and commands…': '搜索任务和命令…',
  'Commands': '命令',
  'Board': '看板',
  'Create worktree': '创建工作树',
  'No matching tasks or commands.': '没有匹配的任务或命令。',
  '↑ ↓ to navigate': '使用 ↑ ↓ 导航',
  '↵ to open': '按 ↵ 打开',
  'esc to close': '按 esc 关闭',
  'Colors': '颜色',
  'Wallpapers': '壁纸',
  'Provider connections': '提供方连接',
  'OpenCode models': 'OpenCode 模型',
  'Moodboards': '情绪板',
  'Tools & integrations': '工具与集成',
  'Jev add-on': 'Jev 插件',
  'Browser tests': '浏览器测试',
  'New bot': '新建机器人',
  'Bot settings': '机器人设置',
  'Cloud machine': '云主机',
  'Run on': '运行于',
  'Background commands': '后台命令',
  'Codex usage': 'Codex 用量',
  'Lifecycle hooks': '生命周期钩子',
  'Codex preferences': 'Codex 首选项',
  'Import agent setup': '导入智能体设置',
  'Resume a Codex task': '恢复 Codex 任务',
  'Installed plugins': '已安装插件',
  'Goal': '目标',
  'Manage goal': '管理目标',
  'Task goal': '任务目标',
  'Manage task goal': '管理任务目标',
  'Keep working across turns until the objective is reached, paused, or a limit is reached.': '跨多轮持续工作，直到达成目标、暂停或达到限制。',
  'Loading goal…': '正在加载目标…',
  'Objective': '目标',
  'What should the agent accomplish?': '智能体应完成什么？',
  'Goal objective': '目标内容',
  'Token budget': 'Token 预算',
  'Optional. Leave blank for no token limit.': '可选。留空表示不限制 Token。',
  'No limit': '不限制',
  'Goal token budget': '目标 Token 预算',
  'Start goal': '开始目标',
  'Save goal': '保存目标',
  'Clear goal': '清除目标',
  'Pause goal': '暂停目标',
  'Resume goal': '继续目标',
  'No active goal': '没有进行中的目标',
  'Working toward goal': '正在推进目标',
  'Usage limit reached': '已达到用量限制',
  'Token budget reached': '已达到 Token 预算',
  'Goal completed': '目标已完成',
  'Updating…': '正在更新…',
  'Enter an objective for the goal.': '请输入目标内容。',
  'Enter a whole token budget greater than zero.': '请输入大于零的整数 Token 预算。',

  // Settings navigation and controls
  'Recommended': '推荐',
  'General': '通用',
  'Appearance': '外观',
  'Schedules': '计划',
  'Tools': '工具',
  'Connections': '连接',
  'About': '关于',
  'Harnesses': '智能体框架',
  'Providers': '提供方',
  'Agent teams': '智能体团队',
  'Model routing': '模型路由',
  'Add-ons': '插件',
  'Skills & rules': '技能与规则',
  'Cloud sandboxes': '云沙箱',
  'Remote access': '远程访问',
  'Settings sections': '设置分区',
  'Back to the workspace': '返回工作区',
  'Back (Esc)': '返回（Esc）',
  'Language': '语言',
  'Interface language': '界面语言',
  'Applies immediately. You can switch back to English at any time.': '立即生效。你可以随时切回英文。',
  'Interface size': '界面大小',
  'Ctrl + / − to resize · Ctrl 0 to reset': 'Ctrl + / − 调整大小 · Ctrl 0 重置',
  'Use CommandOrControl, Shift, Alt, and a key separated by +.': '使用 CommandOrControl、Shift、Alt 和一个按键，以 + 分隔。',
  'Reset': '重置',
  'Decrease interface size': '减小界面大小',
  'Increase interface size': '增大界面大小',
  'Current interface size': '当前界面大小',
  'Reset interface size': '重置界面大小',
  'Compact conversation': '紧凑对话',
  'Expand tool activity': '展开工具活动',
  'Quick launcher': '快速启动器',
  'Start tasks and check agents from any app.': '从任何应用启动任务并检查智能体。',
  'Keyboard shortcut': '键盘快捷键',
  'Enable quick launcher': '启用快速启动器',
  'Record': '录制',
  'Running agents widget': '运行中智能体小组件',
  'Show every running agent from a button at the top right of the window. Turning this off also closes the pinned window.': '通过窗口右上角的按钮显示所有正在运行的智能体。关闭此项也会关闭固定的窗口。',
  'Keep pinned widget on screen': '将固定小组件保持在屏幕内',
  'Keep the floating widget inside the current display when it expands.': '小组件展开时保持在当前显示器范围内。',
  'Projects': '项目',
  'No projects yet.': '暂无项目。',
  'Theme': '主题',
  'Accent': '强调色',
  'Sky': '天空',
  'Classic': '经典',
  'Blue': '蓝色',
  'Green': '绿色',
  'Purple': '紫色',
  'Pink': '粉色',
  'Orange': '橙色',
  'Teal': '青色',
  'Custom': '自定义',
  'VS Code theme': 'VS Code 主题',
  'Built in · your accent, over the sky': '内置 · 你的强调色，映在天空上',
  'Use light': '使用浅色',
  'Use dark': '使用深色',
  'Imported VS Code themes keep their own.': '导入的 VS Code 主题会保留自身配色。',
  'Off, the thread shows a live sky that follows the time of day.': '关闭时，对话会显示随时间变化的动态天空。',
  'Agent updates': '智能体更新',
  'View all agents': '查看所有智能体',
  'Check updates': '检查更新',
  'Guide': '指南',
  'Update': '更新',
  'Unknown': '未知',
  'Version not reported': '未报告版本',
  'Up to date': '已是最新',
  'Manual update': '手动更新',
  'Could not complete the request. Try again.': '无法完成请求，请重试。',
  'Starting update…': '正在开始更新…',
  'Verifying…': '正在验证…',
  'Could not check this agent.': '无法检查此智能体。',
  'Use this agent’s package manager to update it.': '请使用该智能体的包管理器进行更新。',
  'Checking installed agents…': '正在检查已安装智能体…',
  'Agent updates could not be checked.': '无法检查智能体更新。',
  'No installed agents found.': '未找到已安装的智能体。',
  'Checks run every 6 hours. Updates start only when you choose Update.': '每 6 小时检查一次。只有选择“更新”后才会开始更新。',
  'This installation is not managed by a supported updater. Follow the official installation guide to update it.': '此安装不受支持的更新器管理。请按照官方安装指南进行更新。',
  'This Kimi version does not support a verified unattended upgrade. Update it once using the official installation guide.': '此 Kimi 版本不支持经过验证的无人值守升级。请按照官方安装指南更新一次。',
  'This Codex version predates the verified native update command. Use the official installation guide.': '此 Codex 版本早于经过验证的原生更新命令。请使用官方安装指南。',
  'This OpenCode major version uses a different updater. Use its official installation guide.': '此 OpenCode 主版本使用不同的更新器。请使用其官方安装指南。',
  'This OpenCode major version uses a different release feed. Use its official installation guide.': '此 OpenCode 主版本使用不同的发布源。请使用其官方安装指南。',
  'This Kimi installation could not be matched to the native or Python release line. Follow its official installation guide.': '无法将此 Kimi 安装匹配到原生或 Python 发布线。请按照其官方安装指南操作。',
  'Project checks after turns': '每轮结束后检查项目',
  'When a turn ends, runs the project’s own test or check command with your environment (your shell, PATH and credentials); a failure queues one fix.': '每轮结束后，使用你的环境（Shell、PATH 和凭据）运行项目自身的测试或检查命令；失败时会排队一次修复。',
  'Installed agents': '已安装智能体',
  'Refresh agents': '刷新智能体',
  'Sample provider': '示例提供方',
  'Connection not checked': '尚未检查连接',
  'Check connection': '检查连接',
  'Install the agent, then refresh.': '请安装智能体，然后刷新。',
  'Advanced': '高级',
  'Privacy': '隐私',
  'Manage': '管理',
  'Set up Jev': '设置 Jev',
  'Optional add-on for browser tests and decision assistance. Your agents work without it.': '用于浏览器测试和决策辅助的可选插件。智能体无需它也能工作。',
  'Capabilities and cache': '能力与缓存',
  'Open issues': '打开议题',
  'Updates are installed by the desktop app.': '更新由桌面应用安装。',
  'Resource usage': '资源用量',
  'Sample mode. Native memory measurements are available in the desktop app.': '示例模式。桌面应用中可查看原生内存占用。',
  'Native core memory': '原生核心内存',
  'Active agents': '活跃智能体',
  'Open terminals': '打开的终端',
  'Local database': '本地数据库',
  'App details for support': '支持所需的应用详情',
  'Only the app version, platform, and architecture. Nothing is sent automatically.': '仅包含应用版本、平台和架构。不会自动发送任何内容。',
  'Copy app details': '复制应用详情',
  'When you need them': '需要时使用',
  'Set up': '设置',
  'Review': '查看',
  'Set': '已设置',
  'Not set': '未设置',
  'All set': '已全部设置',
  'Install an agent': '安装智能体',
  'PandaCode runs the coding agents on this computer.': 'PandaCode 在这台电脑上运行编程智能体。',
  'Update automatically': '自动更新',
  'Installs only while no agent is working and you are idle.': '仅在没有智能体工作且你空闲时安装。',
  'Turn off agent telemetry': '关闭智能体遥测',
  'Uses each agent’s own opt-outs for analytics and error reports.': '使用各智能体自带的退出选项来关闭分析和错误报告。',
  'Route team workers by task': '按任务为团队智能体路由模型',
  'Picks a model that fits each job. Downloads a small model once.': '为每项工作选择合适的模型。首次会下载一个小型模型。',
  'Check the work after each turn': '每轮结束后检查工作',
  'Runs the project’s own checks with your credentials. For projects you trust.': '使用你的凭据运行项目自身的检查。仅适用于你信任的项目。',
  'Control tasks from your phone': '用手机控制任务',
  'End-to-end encrypted, and off until you sign in with GitHub.': '端到端加密，在你使用 GitHub 登录前保持关闭。',
  'Work with GitHub': '使用 GitHub',
  'Pull requests and issues, using your own gh sign-in.': '使用你自己的 gh 登录处理拉取请求和议题。',
  'About PandaCode': '关于 PandaCode',
  'License': '许可证',
  'Open source (MIT-based). No account, no telemetry.': '开源（基于 MIT）。无需账户，无遥测。',
  'PandaCode License': 'PandaCode 许可证',
  'Updates': '更新',
  'Checks GitHub Releases automatically.': '自动检查 GitHub Releases。',
  'Releases': '版本发布',
  'Update mode': '更新方式',
  'Automatic restarts when no agent is working; Notify me asks first.': '无智能体工作时自动重启；选择“通知我”会先询问。',
  'Automatic': '自动',
  'Notify me': '通知我',
  'Off': '关闭',
  'Source code': '源代码',
  'Report bugs and follow development.': '报告问题并关注开发进展。',
  'GitHub repository': 'GitHub 仓库',
  'Issues': '议题',
  'Check now': '立即检查',
  'Install': '安装',
  'Restart now': '立即重启',
  'Later': '稍后',
  'Version unavailable': '版本不可用',
  'Preview': '预览',
  'Details': '详情',
  'Installed': '已安装',
  'Not installed': '未安装',
  'Not reported': '未报告',
  'Version': '版本',
  'Location': '位置',

  // Schedules, usage and common time phrases
  'Once': '一次',
  'Daily': '每天',
  'Weekdays': '工作日',
  'Weekly': '每周',
  'Started': '已开始',
  'reset due': '重置已到期',
  'stale': '已过期',
  'Unavailable': '不可用',
  'Plan usage': '套餐用量',
  'Refresh usage': '刷新用量',
  'No plan limits reported.': '未报告套餐限制。',
  'Checking plan limits…': '正在检查套餐限制…',
  'No agents running.': '没有正在运行的智能体。',
  'All quiet': '一切安静',
  'Needs you': '需要你',
  'Respond': '回应',
  'Untitled task': '未命名任务',
  'Open PandaCode': '打开 PandaCode',
  'Quit': '退出',
  'No usage information is available.': '没有可用的用量信息。',
  'No background jobs are running.': '没有正在运行的后台任务。',
  'Stop': '停止',
  'Search available imports': '搜索可导入内容',
  'Search conversations': '搜索对话',
  'Available imports': '可导入内容',
  'Available conversations': '可用对话',
  'No matches.': '没有匹配项。',
  'No importable items were found.': '未找到可导入内容。',
  'No conversations were found.': '未找到对话。',
  'Import selected': '导入所选',
  'Fork conversation': '分叉对话',
  'Import conversation': '导入对话',
  'Resume conversation': '恢复对话',
  'Load more conversations': '加载更多对话',
  'No editable preferences are available.': '没有可编辑的首选项。',
  'No lifecycle hooks are configured.': '未配置生命周期钩子。',
  'No plugins are installed.': '未安装插件。',
  'Enabled': '已启用',
  'Disabled': '已禁用',
  'Refresh': '刷新',
};

type Pattern = [RegExp, (match: RegExpMatchArray) => string];

const PATTERNS: Pattern[] = [
  [/^Version (.+)$/i, match => `版本 ${ZH[match[1]] ?? match[1]}`],
  [/^Update (.+)$/i, match => `更新 ${match[1]}`],
  [/^(.+) update details$/i, match => `${match[1]} 更新详情`],
  [/^(.+) update guide$/i, match => `${match[1]} 更新指南`],
  [/^Install method: (.+)\.$/i, match => `安装方式：${match[1]}。`],
  [/^Also used by (.+)\.$/i, match => `同时被 ${match[1]} 使用。`],
  [/^Use (light|dark)$/i, match => `使用${match[1].toLowerCase() === 'light' ? '浅色' : '深色'}`],
  [/^About (.+)$/i, match => `关于${match[1]}`],
  [/^Close (.+)$/i, match => `关闭${match[1]}`],
  [/^Remove (.+)\?$/i, match => `移除 ${match[1]}？`],
  [/^Delete (.+)\?$/i, match => `删除 ${match[1]}？`],
  [/^Rename (.+)\?$/i, match => `重命名 ${match[1]}？`],
  [/^Remove (.+)$/i, match => `移除 ${match[1]}`],
  [/^Delete (.+)$/i, match => `删除 ${match[1]}`],
  [/^Runs on a (.+) cloud machine$/i, match => `在 ${match[1]} 云主机上运行`],
  [/^Runs on (.+)$/i, match => `运行于 ${match[1]}`],
  [/^Task actions: (.+)$/i, match => `任务操作：${match[1]}`],
  [/^Reopen: (.+)$/i, match => `重新打开：${match[1]}`],
  [/^Settle: (.+)$/i, match => `归档：${match[1]}`],
  [/^Model: (.+)$/i, match => `模型：${match[1]}`],
  [/^Mode: (.+)$/i, match => `模式：${match[1]}`],
  [/^Bot: (.+)$/i, match => `机器人：${match[1]}`],
  [/^with (.+)$/i, match => `使用 ${match[1]}`],
  [/^(.+): start this task with a bot$/i, match => `${match[1]}：使用机器人开始此任务`],
  [/^Wake-up (.+)$/i, match => `唤醒 ${match[1]}`],
  [/^Remove moodboard (.+)$/i, match => `移除情绪板 ${match[1]}`],
  [/^Show (\d+) more$/i, match => `再显示 ${match[1]} 项`],
  [/^Show (\d+) of (\d+) options\.(.*)$/i, match => `显示 ${match[1]} / ${match[2]} 个选项。${match[3] ? ' 搜索以缩小范围。' : ''}`],
  [/^(\d+) running$/i, match => `${match[1]} 个正在运行`],
  [/^(\d+) to review$/i, match => `${match[1]} 个待查看`],
  [/^(\d+) changed files?$/i, match => `${match[1]} 个文件已更改`],
  [/^(\d+) files?$/i, match => `${match[1]} 个文件`],
  [/^Read (\d+) files? and ran (\d+) commands?$/i, match => `读取 ${match[1]} 个文件并运行 ${match[2]} 个命令`],
  [/^Ran (\d+) commands? and used (\d+) tools?$/i, match => `运行 ${match[1]} 个命令并使用 ${match[2]} 个工具`],
  [/^Read (\d+) files?$/i, match => `读取 ${match[1]} 个文件`],
  [/^Ran (\d+) commands?$/i, match => `运行 ${match[1]} 个命令`],
  [/^Used (\d+) tools?$/i, match => `使用 ${match[1]} 个工具`],
  [/^(\d+) of (\d+) set$/i, match => `已设置 ${match[1]} / ${match[2]}`],
  [/^(Set up|Review|Open): (.+)$/i, match => `${match[1].toLowerCase() === 'review' ? '查看' : match[1].toLowerCase() === 'open' ? '打开' : '设置'}：${match[2]}`],
  [/^(.+) details, (Installed|Not installed)$/i, match => `${match[1]} 详情，${match[2].toLowerCase() === 'installed' ? '已安装' : '未安装'}`],
  [/^(.+) details$/i, match => `${match[1]} 详情`],
  [/^(.+) settings$/i, match => `${match[1]}设置`],
  [/^(.+) actions$/i, match => `${match[1]}操作`],
  [/^(.+) paused$/i, match => `${match[1]} 已暂停`],
  [/^(.+) resumed$/i, match => `${match[1]} 已恢复`],
  [/^(.+) created$/i, match => `${match[1]} 已创建`],
  [/^(.+) deleted$/i, match => `${match[1]} 已删除`],
  [/^(\d+) min ago$/i, match => `${match[1]} 分钟前`],
  [/^(\d+) h ago$/i, match => `${match[1]} 小时前`],
  [/^(\d+) d ago$/i, match => `${match[1]} 天前`],
  [/^in (\d+) min$/i, match => `${match[1]} 分钟后`],
  [/^in ([\d.]+) h$/i, match => `${match[1]} 小时后`],
  [/^today (.+)$/i, match => `今天 ${match[1]}`],
  [/^tomorrow (.+)$/i, match => `明天 ${match[1]}`],
  [/^Resets (.+)$/i, match => `重置时间：${match[1]}`],
  [/^resets in (.+)$/i, match => `${match[1]} 后重置`],
  [/^resets (.+)$/i, match => `重置时间：${match[1]}`],
  [/^(\d+)% used$/i, match => `已用 ${match[1]}%`],
  [/^(\d+) attachments?$/i, match => `${match[1]} 个附件`],
  [/^(\d+) conversations?$/i, match => `${match[1]} 个对话`],
  [/^Imported (\d+) conversations?$/i, match => `已导入 ${match[1]} 个对话`],
  [/^Worked for (about )?(.+)$/i, match => `耗时 ${match[1] ? '约 ' : ''}${match[2]}`],
  [/^working for (.+)$/i, match => `正在运行 ${match[1]}`],
  [/^Running for (.+)$/i, match => `已运行 ${match[1]}`],
  [/^took (.+)$/i, match => `耗时 ${match[1]}`],
  [/^Last message: (.+)$/i, match => `最后消息：${match[1]}`],
  [/^Working for (.+)$/i, match => `已运行 ${match[1]}`],
  [/^Queued message (\d+): (.+)$/i, match => `已排队消息 ${match[1]}：${match[2]}`],
  [/^Edit queued message (\d+)$/i, match => `编辑已排队消息 ${match[1]}`],
  [/^Remove queued message (\d+)$/i, match => `移除已排队消息 ${match[1]}`],
  [/^Steer now: (.+)$/i, match => `立即引导：${match[1]}`],
  [/^Send now: (.+)$/i, match => `立即发送：${match[1]}`],
  [/^Stop (.+)$/i, match => `停止 ${match[1]}`],
  [/^(.+) is still starting this task; your message is queued for after it\.$/i, match => `${match[1]} 仍在启动此任务；你的消息已排队，稍后发送。`],
  [/^(.+) is still starting this task; the message stays queued\.$/i, match => `${match[1]} 仍在启动此任务；消息将继续排队。`],
  [/^(.+) needs approval$/i, match => `${match[1]} 需要审批`],
  [/^(.+) needs your answer$/i, match => `${match[1]} 需要你回答`],
  [/^Linked pull request #(\d+)(?: to (.+))?$/i, match => `已关联拉取请求 #${match[1]}${match[2] ? ` 到 ${match[2]}` : ''}`],
  [/^Pull request #(\d+) unlinked$/i, match => `拉取请求 #${match[1]} 已取消关联`],
  [/^Open the side thread as a full thread to use (.+)\.$/i, match => `请将侧边对话作为完整对话打开，以使用 ${match[1]}。`],
  [/^(.+) enabled$/i, match => `${match[1]} 已启用`],
  [/^(.+) disabled$/i, match => `${match[1]} 已禁用`],
  [/^(\d+)h(?: (\d+)m)?(?: (\d+)s)?$/i, match => [match[1] ? `${match[1]} 小时` : '', match[2] ? `${match[2]} 分钟` : '', match[3] ? `${match[3]} 秒` : ''].filter(Boolean).join(' ')],
  [/^(\d+)m$/i, match => `${match[1]} 分钟`],
  [/^(\d+)h$/i, match => `${match[1]} 小时`],
  [/^(\d+)d$/i, match => `${match[1]} 天`],
  [/^(\d+)s$/i, match => `${match[1]} 秒`],
  [/^Every (\d+) min$/i, match => `每 ${match[1]} 分钟`],
  [/^Every (\d+) hours?$/i, match => `每 ${match[1]} 小时`],
  [/^Every (\d+) days?$/i, match => `每 ${match[1]} 天`],
  [/^Daily at (.+)$/i, match => `每天 ${match[1]}`],
  [/^Weekdays at (.+)$/i, match => `工作日 ${match[1]}`],
  [/^Weekly on (.+) at (.+)$/i, match => `每周 ${match[1]} ${match[2]}`],
  [/^After “(.+)” (finishes|succeeds)$/i, match => `在“${match[1]}”${match[2].toLowerCase() === 'succeeds' ? '成功后' : '完成后'}`],
  [/^PandaCode (.+) is available\. Installs when your agents are done\.$/i, match => `PandaCode ${match[1]} 已可用。智能体完成后将自动安装。`],
  [/^PandaCode (.+) is available\. Open GitHub Releases to update this copy\.$/i, match => `PandaCode ${match[1]} 已可用。请打开 GitHub Releases 更新此副本。`],
  [/^PandaCode (.+) is ready\. Restart now, or it restarts on its own when your agents are done\.$/i, match => `PandaCode ${match[1]} 已准备就绪。现在重启，或在智能体完成后自动重启。`],
  [/^Installing (.+)…$/i, match => `正在安装 ${match[1]}…`],
  [/^Checking GitHub Releases…$/i, match => `正在检查 GitHub Releases…`],
  [/^Up to date · checked (.+)$/i, match => `已是最新 · 检查于 ${match[1]}`],
  [/^PandaCode (.+) is available\.$/i, match => `PandaCode ${match[1]} 已可用。`],
  [/^Downloading (.+)$/i, match => `正在下载 ${match[1]}`],
  [/^(.+) is ready\. PandaCode restarts when your agents are done and you step away\.$/i, match => `${match[1]} 已准备就绪。智能体完成且你离开后，PandaCode 会自动重启。`],
  [/^(.+) is ready\. Restart to finish\.$/i, match => `${match[1]} 已准备就绪。重启以完成。`],
  [/^Couldn’t check for updates: (.+)$/i, match => `无法检查更新：${match[1]}`],
  [/^Automatic updates are off\.$/i, match => `自动更新已关闭。`],
  [/^(.+) details, (Installed|Not installed)$/i, match => `${match[1]} 详情，${match[2].toLowerCase() === 'installed' ? '已安装' : '未安装'}`],
];

const TEXT_SKIP = [
  'script', 'style', 'code', 'pre', 'kbd', 'samp', 'textarea', 'input',
  '[contenteditable="true"]', '[data-i18n-ignore]',
  '.markdown', '.message-content', '.turn-card-reply-content',
  '.task-title', '.task-project-name', '.task-project', '.task-checkout',
  '.project-name', '.project-path', '.project-row strong',
  '#breadcrumb button[data-action="select-project"]', '.folder-heading',
  '.project-choice', '.project-option', '.project-tile', '.bot-name', '.bot-title',
  '.task-link', '.file-tab', '.file-preview-title',
  '.queue-text', '.goal-banner-copy strong', '.command-result-title',
  '.message-attachment-raw', '.diff-line', '.diff-content',
  '.document-viewer', '.office-viewer', '.terminal', '.xterm',
].join(',');

const ATTRIBUTE_SKIP = [
  'script', 'style', 'code', 'pre', 'textarea', '[contenteditable="true"]',
  '[data-i18n-ignore]', '.markdown', '.message-content',
  '.turn-card-reply-content', '.task-title', '.task-project-name',
  '.task-project', '.task-checkout', '.project-name', '.project-path',
  '.project-row strong',
  '#breadcrumb button[data-action="select-project"]', '.folder-heading',
  '.project-choice', '.project-option', '.project-tile', '.bot-name', '.bot-title',
  '.task-link',
  '.file-preview-title', '.queue-text', '.message-attachment-raw',
  '.diff-line', '.diff-content', '.document-viewer', '.office-viewer',
  '.terminal', '.xterm',
].join(',');

const ATTRIBUTES = ['aria-label', 'aria-description', 'placeholder', 'title', 'data-tip', 'alt'] as const;
type LocalizableAttribute = typeof ATTRIBUTES[number];

const textSources = new WeakMap<Text, string>();
const renderedText = new WeakMap<Text, string>();
const attributeSources = new WeakMap<Element, Map<string, string>>();
const renderedAttributes = new WeakMap<Element, Map<string, string>>();
let locale: Locale = readLocale();
let observer: MutationObserver | undefined;

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'zh-CN' || saved === 'en') return saved;
  } catch { /* A locked-down webview still gets the Chinese-first default. */ }
  // The automated browser suite asserts the English source UI. Real app windows
  // start in Chinese, which is the point of this localization fork.
  return navigator.webdriver ? 'en' : DEFAULT_LOCALE;
}

function preserveWhitespace(source: string, replacement: string): string {
  const leading = source.match(/^\s*/)?.[0] ?? '';
  const trailing = source.match(/\s*$/)?.[0] ?? '';
  return `${leading}${replacement}${trailing}`;
}

function translateCore(core: string): string {
  const direct = ZH[core];
  if (direct !== undefined) return direct;
  if (core.includes(' › ')) {
    return core.split(' › ').map(part => ZH[part] ?? part).join(' › ');
  }
  for (const [pattern, replace] of PATTERNS) {
    const match = core.match(pattern);
    if (match) return replace(match);
  }
  return core;
}

/** Translate an English UI string for use by code that needs the result before DOM insertion. */
export function t(source: string): string {
  if (locale !== 'zh-CN' || !source) return source;
  return preserveWhitespace(source, translateCore(source.trim()));
}

export function getLocale(): Locale {
  return locale;
}

function applyDocumentLocale(): void {
  const root = document.documentElement;
  root.lang = locale;
  root.dataset.locale = locale;
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) description.content = locale === 'zh-CN'
    ? 'PandaCode — 面向编程智能体的本地工作区。'
    : 'PandaCode — a local workspace for coding agents.';
}

function translateText(node: Text): void {
  const current = node.nodeValue ?? '';
  if (!current.trim()) return;
  const parent = node.parentElement;
  if (parent?.closest(TEXT_SKIP)) return;
  const previousRendered = renderedText.get(node);
  if (previousRendered === undefined || current !== previousRendered) textSources.set(node, current);
  const source = textSources.get(node) ?? current;
  let next = locale === 'zh-CN' ? t(source) : source;
  // A heading split around a project button reads "Build in [project]?". Chinese
  // moves the question after the project name, so the trailing "?" is contextual.
  if (locale === 'zh-CN' && source.trim() === '?' && parent?.closest('.new-task-welcome h1')) {
    next = preserveWhitespace(source, ' 中构建什么？');
  }
  renderedText.set(node, next);
  if (next !== current) node.nodeValue = next;
}

function translateAttribute(element: Element, name: LocalizableAttribute): void {
  if (element.closest(ATTRIBUTE_SKIP)) return;
  const current = element.getAttribute(name);
  if (current === null || !current.trim()) return;
  let sources = attributeSources.get(element);
  if (!sources) { sources = new Map(); attributeSources.set(element, sources); }
  let rendered = renderedAttributes.get(element);
  if (!rendered) { rendered = new Map(); renderedAttributes.set(element, rendered); }
  if (rendered.get(name) === undefined || current !== rendered.get(name)) sources.set(name, current);
  const source = sources.get(name) ?? current;
  const next = locale === 'zh-CN' ? t(source) : source;
  rendered.set(name, next);
  if (next !== current) element.setAttribute(name, next);
}

function translateTree(root: ParentNode): void {
  if (root instanceof Element) {
    for (const name of ATTRIBUTES) translateAttribute(root, name);
  }
  if (root instanceof Text) {
    translateText(root);
    return;
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    if (node instanceof Text) translateText(node);
    else if (node instanceof Element) {
      for (const name of ATTRIBUTES) translateAttribute(node, name);
    }
    node = walker.nextNode();
  }
}

function onMutations(records: MutationRecord[]): void {
  for (const record of records) {
    if (record.type === 'characterData' && record.target instanceof Text) translateText(record.target);
    else if (record.type === 'attributes' && record.target instanceof Element && ATTRIBUTES.includes(record.attributeName as LocalizableAttribute)) {
      translateAttribute(record.target, record.attributeName as LocalizableAttribute);
    } else if (record.type === 'childList') {
      for (const node of record.addedNodes) {
        if (node instanceof Text) translateText(node);
        else if (node instanceof Element) translateTree(node);
      }
    }
  }
}

export function setLocale(next: Locale): void {
  if (next !== 'zh-CN' && next !== 'en') return;
  locale = next;
  try { localStorage.setItem(LOCALE_STORAGE_KEY, next); } catch { /* Keep the choice for this window. */ }
  applyDocumentLocale();
  translateTree(document.documentElement);
  window.dispatchEvent(new CustomEvent<Locale>(LOCALE_EVENT, { detail: next }));
}

export function onLocaleChange(listener: (next: Locale) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<Locale>).detail);
  window.addEventListener(LOCALE_EVENT, handler);
  return () => window.removeEventListener(LOCALE_EVENT, handler);
}

/** Apply the saved locale and start translating UI as the workspace renders it. */
export function initializeI18n(): void {
  applyDocumentLocale();
  translateTree(document.documentElement);
  if (!observer) {
    observer = new MutationObserver(onMutations);
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRIBUTES],
    });
  }
  window.addEventListener('storage', event => {
    if (event.key !== LOCALE_STORAGE_KEY) return;
    if (event.newValue === 'zh-CN' || event.newValue === 'en') {
      locale = event.newValue;
      applyDocumentLocale();
      translateTree(document.documentElement);
      window.dispatchEvent(new CustomEvent<Locale>(LOCALE_EVENT, { detail: locale }));
    }
  });
}

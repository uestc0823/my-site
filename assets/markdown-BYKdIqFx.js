const f=`---
title: "AI生成个人网页操作指南"
date: "2026-06-09"
tag: "工具实践"
excerpt: "使用DeepSeek、Claude Code及uiuxpromax Skill，通过让AI模仿而非设计的方式，生成高质量个人网页的实操方法与避坑指南。"
cover: ""
readTime: "8分钟"
---
记录使用AI工具生成个人网页的方法，记录学习工作心得，丰富简历，提高竞争力。

# 一.概要

随着AI时代到来，各种AI工具降低了代码门槛，制作出彩的个人网页已经不是难事了。在即将踏入职场之际，为了更好地规划职业生涯，提升未来的就业竞争力，特此记录用AI制作个人网页的方法和成果，以便未来查阅。所需工具：

1. 内容产出AI：确定网页的内容，让网页更饱满，此次选用**DeepSeek网页版**。
2. 编程任务AI：构建网页框架、代码等技术性问题，此次选用**Claude Code**搭载**mimo-v2.5-pro**。
3. 网页风格、审美等辅助任务：使用与**Claude Code**相搭配的**Skill**，确保网页质量上乘。使用的Skill包括**ui-ux-pro-max
> 注：此教程默认您已经安装了Claude Code及一系列工具，如Node.js、git，以及可用的 API 密钥（API key），若您没有这些工具，可以搜索相关教程，此处不再赘述如何配置环境。

# 二.工具介绍

## 2.1 **ui-ux-pro-max介绍**

一个面向 AI 助手的「设计知识库 + 设计决策引擎」，以“Skill”的形式嵌入到 Claude Code、Cursor、Windsurf、GitHub Copilot、Kiro 等工具中，从而让这些助手具备更专业的 UI/UX 能力。

它内部主要包含几类数据与规则：

**UI 风格库：**

内置 57 种 UI 风格，如 Glassmorphism、Claymorphism、Minimalism、Brutalism、Neumorphism、Bento Grid、Dark Mode 等。

**行业配色与字体**：

95 套按行业划分的配色方案（SaaS、电商、金融、医疗、美妆等），以及 56 组字体搭配（含标题与正文字体组合）。

**图表与信息可视化：**

24 种图表类型的应用建议，用于不同数据场景（趋势、对比、占比、分布等）。

**UX 指南与反模式：**

98 条 UX 规则，包括最佳实践、反模式以及可访问性相关建议（如表单设计、反馈机制、对比度等）。

## 2.2 **ui-ux-pro-max相关指令**

**Uipro-cli：**uipro-cli 是 UI-UX Pro Max 技能包的命令行管理工具，主要用来帮开发者在 AI 编程助手（如 Claude Code、Cursor）里快速配置专业 UI 设计规范，让 AI 生成的界面更好看、更专业。相当于该工具的“指挥中心”。**相关命令行：**确保电脑已安装**Node.js**环境，在终端运行一行命令即可完成安装，之后在任何目录下都能使用。

\`\`\`
npm install -g uipro-cli
\`\`\`

这个命令最直接，会明确告诉你 \`uipro-cli\` 这个包有没有安装，以及它的版本号。

\`\`\`
npm list -g uipro-cli
\`\`\`

安装好后，需要进入你的前端项目目录，运行初始化命令将技能包绑定到你正在用的 AI 编程助手上 。（此处以Claude Code为例，实际操作以个人需求为准）

\`\`\`
uipro init --ai claude
\`\`\`

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-1.png)

为提升工作区域UI可读性和工作便利性，剩下的工作将在**VS Code**中完成。**VS Code**可以很便利地切换网页和Agent指令栏，同时UI设计也符合现代审美。

# 三.搭建网页

## 3.1 项目文件管理

拥有良好的文件规划管理习惯是非常重要的，在文件夹建立初期就要注意不同内容的分类，以免后期工程量太大，重新整理归类会浪费许多时间。

**一个推荐的文件夹格式是：**

\`\`\`
your-project-root/
├── skills/               # 你已决定：存放 AI skill 配置/脚本
│   └── ui-ux-pro-max/    # 具体某个 skill（可被 git 忽略或保留）
├── assets/               # 你已决定：原始素材（图片、视频、设计稿等）
│   ├── images/
│   ├── fonts/
│   └── videos/
├── src/                  # 源代码（推荐增加）
│   ├── components/       # 如果用了组件化框架（React/Vue）
│   ├── styles/           # CSS/SCSS 源文件
│   ├── scripts/          # JS/TS 源文件
│   └── index.html        # 入口文件
├── public/               # 静态资源（构建后直接复制到输出目录）
│   ├── favicon.ico
│   └── robots.txt
├── dist/                 # 构建输出目录（通常不提交 git）
├── .gitignore
├── package.json          # 如果是 Node 项目
├── README.md
└── config/               # 可选：配置文件（如主题变量、API 密钥模板）
\`\`\`

**当然，如果是一个简单的网页，格式可以是:**

\`\`\`
your-project-root/
├── index.html
├── skills/          # AI skill 相关（可忽略提交）
├── assets/          # 图片、字体等
├── css/
├── js/
└── .gitignore
\`\`\`

在心里有了大致框架后，就可以开始网页的搭建了。

## 3.2 搭建网站计划

有一句话叫：如果你也不知道你想要什么，AI自然也是设计不出来的。在让AI正式开始写代码之前，一定要跟它讨论清楚你需要什么，这样才能让它尽可能地生成你需要的网站。这里给一个示例做参考：

### 演示: My Personal Website

#### 项目概述

这是一个个人品牌/作品集网站，使用原生 HTML/CSS/JS（或根据实际技术栈修改）。目标是展示个人作品、技能和 AI 工具配置，设计水平应向 Awwwards 获奖网站标准看齐。

#### 项目结构

- \`/skills\` – 存放 AI skill 配置（如 ui-ux-pro-max），**不要手动修改此目录**。
- \`/assets\` – 原始素材（图片、字体、视频），构建时需优化。
- \`/src\` – 源代码（如有构建流程，如组件、样式、脚本入口）。
- \`/public\` – 静态资源，直接复制到输出目录（如 favicon.ico, robots.txt）。
- \`/dist\` – 构建输出目录，**禁止手动编辑**。
- 根目录的 \`index.html\` – 网站入口。

#### 行为准则（Claude 必须遵守）

1. **修改前先说明**：在改动代码前，解释要改哪里、为什么改。
2. **UI/UX 任务必须调用 skill**：当用户要求“设计/修改/美化”界面时，**必须先调用 \`/ui-ux-pro-max\` skill**，并严格遵循该 skill 返回的设计规范。不要凭空猜测审美。
3. **技术约束**：

   - 保持轻量，不依赖外部 UI 库（除非用户明确要求）。
   - 代码需通过 W3C 验证，符合无障碍基础要求（WCAG 2.1 A 级）。
   - 使用现代语义 HTML5，图片使用 WebP 格式（并保留原图备份在 assets），响应式适配 320px\\~1920px 宽度。
4. **禁止行为**：

   - 直接修改 \`/skills\` 目录内的任何文件。
   - 使用内联样式（除动态计算值外）。
   - 硬编码 API 密钥或敏感信息。
   - 生成 \`<!-- TODO -->\` 注释而不提供具体解决方案。
5. **Skill 更新**：如果用户明确说“更新 ui-ux-pro-max”或“重新初始化 skill”，执行 \`uipro init --ai claude --force\`。

#### 审美要求

**核心设计目标**：打造兼具专业质感与个人风格的个人网站，设计水平应向**Awwwards**的获奖网站标准看齐。

**实现方式**：

- **不要使用内置规则**。所有具体审美标准（颜色、圆角、字体、间距、响应式断点、微交互等）必须通过以下方式获取：

  1. **调用 UI-UX-Pro-Max Skill**：执行 \`/ui-ux-pro-max\`，该 skill 会提供完整的设计令牌（design tokens）和代码示例。
  2. **参考行业标杆**：以 Awwwards 获奖作品的设计理念、前沿技术和创新性为标准，对 skill 给出的方案进行筛选和优化。重点关注：
  
     - 创意与独特性（避免模板化）
     - 沉浸式体验与微交互
     - 精致的排版与色彩运用
- **如果该 skill 未安装或未响应**，询问用户：“是否先安装/初始化 ui-ux-pro-max skill？”

####  常用命令（供 Claude 参考）

- 本地预览：\`npx serve .\` 或 \`python3 -m http.server\`
- 重新生成 skill 配置（在项目根目录）：\`uipro init --ai claude --force\`
- 测试响应式：使用浏览器开发者工具的设备模拟

####  额外说明

- Claude 在执行任何设计任务前，应优先确认 \`ui-ux-pro-max\` skill 可用。如果不可用，引导用户安装。
- 生成代码时，添加适当注释，尤其对复杂布局或动画。

### 本节小结

本节提供了一个可供参考的实战Claude.md，用于规范AI的项目风格，具体内容还需与其讨论，是偏向商务严肃（纯个人品牌网页，如律师、金融等行业）、还是活泼前卫（包含较多动画和大胆的设计元素元素，适用于创意工作者，如游戏制作、短视频制作、电商等）、亦或是兼而有之。AI是一个强大的助手，前提是你得是个能说清楚要求的老板。

## 3.3 AI实战效果

### 网站“AI味”原因分析

即使按照上面说的内容去做，AI生成的网站仍然是一股AI味，效果离B站那些视频博主所呈现的效果差十万八千里，以下两张图就说明，如果只做以上的步骤，生成的效果依然是半成品的感觉。

**抛开内容，只说UI，主要原因有如下几点：**-**苍白虚无的背景与整体氛围脱节**第一张图的背景布满了细小的浅灰色点状网格。网格背景通常传递的是“极客、精准、硬核科技”或“工程画布”的调性。然而，网站的文字、渐变色圆晕和圆角按钮却在走“现代大厂、清新温柔”的风格。
- **文字排版的间距失控字重与层级单一：**第一页的“你的名字”四个字极其粗大，但下方的两行介绍字号却断崖式下跌，且字重（粗细）没有拉开合理的梯度。**字距与行高僵硬：**“用代码创造价值”这一行，字与字之间黏在一起，没有呼吸空间。第二页的右侧正文大段文字堆砌，缺乏段落间的错落感。
- **组件粗糙：无意义的“卡片”与塑料感按钮按钮质感低级：**首页的“查看作品”和“下载简历”两个按钮，蓝色饱和度过高，阴影要么没有，要么过于生硬。**卡片堆砌感强：**第二页右下角的四个核心特质卡片（学习驱动、注重细节等），边框极其平淡，甚至右下角那块蓝色的激活态卡片，其蓝色边缘像是系统自带的默认高亮，缺乏定制感。

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-2.png)

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-3.png)

由此可见，使用AI生成漂亮的个人网页并不是一件那么简单的事情。归根结底是AI的审美仍然是机械的，基于人类的自然语言描述的Skill.md起到的约束作用不明显，想要达成良好甚至更好的效果必须加上别的约束。

鉴于笔者水平有限，也许有其他的办法能让AI只通过自然语言描述就能做出漂亮的网页，但是笔者在这里卡了很久，终究没有调出满意的效果。

经过笔者不断尝试，终于摸索了一套适合所有人的AI生成网页的打法，不需要特别费劲就能做出80分左右的网站，如果你愿意花时间去仔细打磨，网站UI质量还会更高。现在把这一套思路分享给大家。

### 避免“AI”味的解决方案

#### **核心思路：不要让AI设计，让AI模仿**

AI并不是一个好的设计师，但一定是一个好的模仿者，特别是当你为AI提供源码和网页样式图片时，AI能几乎完全一比一地为你复刻出你想要的网站效果。但如果你想让AI在没有任何参考，只有skill约束的前提下就做出与人类设计师媲美的作品，笔者认为是一件很困难的事情。

#### 网站资源推荐

首先要找到素材，这里推荐几个网站：  
https://styles.refero.design/

可以根据你提供的网站URL或是现成的网站提供拆解分析思路，提供网站使用的颜色、字体、显示效果等设计元素，可下载供agent使用的Design.md。实战效果如下图所示，能较好地还原苹果的网站风格，再将自己的页面实际落地即可。

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-4.png)

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-5.png)

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-6.png)

https://www.awwwards.com/

被誉为网页设计领域的奥斯卡，有评分机制，能帮助新手快速建立对于网页的审美认知。

https://godly.website/

相当于一个优秀设计的导航站，不提供源代码或是供agent参考的skill方案。

https://www.siteofsites.co/

好处是可以分类筛选，选择自己想要的参考网站类型并挑选。

https://github.com/

特别是这几个模块

**personal website, portfolio template, awesome-personal website, resume template html, github-profile-readme**这些都是针对不同场景的方案，好处是直接提供源码供agent参考，比如我想做用于提升个人工作竞争力的网站，就查询**portfolio template**和**personal website**就行。

选择Stars数高的项目，然后预览一下效果是否是你需要的，若喜欢下载即可。

#### 改良效果展示

笔者选择的是https://github.com/codewithsadee/vcard-personal-portfolio

并参考其他网站做了一些修改，效果图如下：

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-7.png)

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-8.png)

将图片和内容插入后已经是一个较为成熟的个人网站雏形，在这个基础上去改良，已经算是较为成功的个人网站作品了。

#### 进阶技巧分享

上述的网站仍然有改进空间，使用现成的UI插件配合合适的风格就可以做出非常惊艳的网页效果，

如果喜欢更多的动效和更明艳的视觉效果，可以选用其他的模板，甚至还有动森UI组件。

https://github.com/guokaigdg/animal-island-ui

**工作流程：拷贝现成的UI项目到本地工作目录➡在https://styles.refero.design/上找合适的搭配风格➡与AI讨论你的网站细节，确定需要搭建的内容➡敲定计划，开工**

这一套下来解决了两个核心痛点：  
1.AI的设计问题，有从**styles.refero.design**上提取下来的参考规范，AI不用自己去想如何设计布局

2.AI的素材问题，有**现成的UI套件**，AI只需要参考调用即可。

彻底解决了本节开头所说的三个问题，

**苍白虚无的背景与整体氛围脱节、文字排版的间距失控：**详细的design.md会约束AI的审美逻辑。**无意义的“卡片”与塑料感按钮：**高Star的UI项目给AI提供现成的武器库，避免AI自己造子弹。

这样的网站 UI 很难不好看。

#### 网站Demo展示

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-9.png)

![](./assets/blog/ai生成个人网页操作指南/ai生成个人网页操作指南-10.png)

只需要填入内容，再仔细修改调整一下，一个动森温暖风格的个人网页就出现啦！

# 四.总结

本文记录了一次完整的“AI 辅助生成高质量个人网页”的实践之旅，核心价值在于跳出“让 AI 凭空设计”的陷阱，转向“让 AI 精准复刻”。

作者以 DeepSeek（内容）、Claude Code + ui-ux-pro-max skill（代码与设计约束）为核心工具，从项目文件管理、行为规范（Claude.md）到实战效果逐一展开。尤其可贵的是，文章没有掩饰 AI 生成网页常见的“AI味”——苍白背景、混乱排版、塑料感按钮，而是直击痛点，给出了经过验证的解决方案：

**1. 放弃让 AI 原创设计 → 改为让 AI 模仿优秀案例。**
2. 引入 \`styles.refero.design\` → 为 AI 提供结构化设计规范（DESIGN.md），约束审美逻辑。
**3. 利用 GitHub 高 Star 模板 → 为 AI 提供现成的 UI 组件库，避免它“自己造轮子”。**
**4. 组合工作流：拷贝优秀 UI 项目 → 搭配 refero 风格规范 → 与 AI 讨论需求 → 生成最终网页。**

最终改良效果（基于 \`vcard-personal-portfolio\` 模板）已展现出成熟、可落地的个人网站雏形。文章还提供了 Awwwards、Godly、Site of Sites 等审美资源导航，以及进阶的动森 UI 组件等趣味扩展方向，让读者能自己搭配出符合自己风格的个性化趣味网站。`,C=Object.freeze(Object.defineProperty({__proto__:null,default:f},Symbol.toStringTag,{value:"Module"})),h=`---
title: "Designing Analog Chips阅读笔记1：器件专题"
date: "2026-07-04"
tag: "技术笔记"
excerpt: "阅读《Designing Analog Chips》第一章，梳理半导体器件发展史、平面工艺、BJT结构与非理想效应，结合实际生产视角总结关键知识点。"
cover: ""
readTime: "10分钟"
---
# 前言：从校园到产业

之前刷知乎的时候，看到一位大佬推荐了这本Designing Analog Chips，与其他正统教科书（如三大圣经）不同的是，这本书的作者**Hans R. Camenzind**是一位业界大佬，著名的“555计时器”就是他的作品，他一生发明了超过140件标准或定制IC电路。因此，这本书更关注实际生产中所遇到的问题，比如第十七章专门花费了一整章的篇幅介绍布局（Layout），17-11介绍了开尔文连接（Kelvin Connections），这是其他教材所没有的。

在开篇有一段文字：

> Hence this book. It should give you an overview of the world of analog IC design, so that you can decide what kind of analog function can and cannot, should and should not be integrated. What should be on the same chip with digital and what should be separate. And, equally important, this book should enable you to ask the right questions of the foundry, so that your design works. The first time.

哪些功能应该用分立器件实现，哪些功能应该用IC实现，哪些功能要和数字模块耦合在一块芯片上。也应该了解关于集成电路制造的知识，不至于在晶圆厂那边闹笑话。

> You will find that almost all analog ICs contain a number of recognizable **circuit elements**, functional blocks with just a few transistors. These elements have proven useful and thus re-appear in design after  design. Thus it makes sense to first look at such things as current mirrors, compound transistors, differential stages, cascodes, active loads, Darlington connections or current sources in some detail and then examine how they are best put together to form whole functions.

模拟电路都是由一个一个“简单”的模块拼接成的，如电流镜、复合管、差分对、cascodes等，设计者应将它们合理地结合在一起，以达到最好的效果。

这两段就能看出这本书的基调，相比于模型、模拟仿真和基础分析，这里更关注生产实际和电路器件本身的性质，而这正是模拟ic的从业者所需要的，特别是有关分立器件和布局的知识，是每一位模拟ic公司的AE所必备的技能。因此让我们一起来研读这本Designing Analog Chips，进入充满魅力的模拟ic世界吧！

# 第一章：器件（Device）

## 1.1 半导体的发展史

Ferdinand Braun, 1874. 发现了一些违背欧姆定律的材料，如亚硫酸铅。通过该材料的电流会随着施加电压极性的变化而变化，当时人们无法解释这一现象。

Edwin Hall, 1879. 发现了霍尔效应：当你让磁场穿过一块金属时，它会使流过金属的电流偏转。

1904，随着无线电的发展，信号需要被调制放大，之前的发现重新进入了人们的视野，这些材料能够帮助调理信号，但人们发现一块晶体上只有部分位置才能发挥作用，人们用真空管取代了这种原始的“半导体二极管”。

1927，为了给汽车充电，人们发明了大面积整流器，主要材料是过氧化铜（后来是硒），但此时人们仍然不知道它的工作原理是什么。

1931, A.H. Wilson提出了完整的能带模型，尽管该理论已经十分完善，但人们在十五年后才发现这套理论和二极管原理之间的关系。

二战的爆发催生了雷达的应用，然而在高频率下真空管太慢了，之前被取代的原始“半导体二极管”又重新回到了大众视野。该材料成为了重点研究对象，由于其性质反复无常，研究人员很快意识到是杂质和纯度造成的影响，因此必须取得纯净的单晶材料。研究时发现，有些杂质是产生二极管效应所必须的。硅和镓由于最外层是4电子，自然成为了重点研究对象。之后就是教科书里面讲的那样，掺杂磷，n型；或硼，p型。

## 1.2 二极管（Diode）

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-1.png)

P区和N区中间形成了耗尽层，交界面附近的电子和空穴复合了。如果N接负极，P接正极，耗尽层会扩大，反之会缩小。（这部分内容省略，任何一本教科书上都有很详细的讲解）

## 1.3 三极管（Bipolar Junction Transistor, BJT）

1958, Jack Kilby, 设想将一块硅由几个模块所共用。Noyce则想出了一种更精妙的方案。

- 两位发明人、两条路线：1958年，TI的基尔比率先提出在单块半导体上制作所有元件，但他的方案靠刻穿硅片+手工金线连接，虽能工作但根本无法量产。几乎同时，仙童的诺伊斯基于平面工艺，提出用表面的铝层来连接所有元件，成本低且适合大规模制造，是现代IC的真正雏形。
- 旷日持久的专利战：两家公司为专利权对簿公堂。TI因基尔比在专利中模糊提了一句“可用金薄膜”而先胜诉，仙童上诉。期间双方因无法收专利费而和解，宣布两人为共同发明人。但不久后上诉法院改判，裁定诺伊斯为IC的唯一发明人。
- 真正的幕后功臣：特别指出，对IC贡献最大但最被忽视的，其实是发明平面工艺的让·赫尔尼（Jean Hoerni），该工艺堪称20世纪最伟大的发明之一。
- 结局：诺伊斯于1990年去世（62岁），基尔比则于2000年独享诺贝尔物理学奖。

### 1.3.1 **平面工艺（Planar process）**

掩模版（Mask）：一片平整的玻璃，上面带有不透光的图案。这些图案通常通过光学方式生成，或者更常见的是用电子束直写生成。

光刻胶（Photoresist）：分为正胶和负胶，正胶是曝光区域变得可溶，即图案与掩模板相同，反之则是负胶。

首先对硅晶圆进行氧化处理，即在表面生长一层薄薄的二氧化硅（SiO₂），例如将晶圆置于充满水蒸气的炉管中。除了氧化层，有时也会使用氮化硅或氧化层与氮化硅的组合。在氧化层之上，会旋涂一层薄薄的光刻胶——一种感光乳剂，类似于照相胶片上的感光层。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-2.png)

接着，光线穿过掩模版投射到晶圆上。光的频率越高，能实现的图形细节就越精细，因此通常使用紫外光，甚至X射线。

随后对光刻胶进行显影，未被曝光的区域会被冲洗掉（注：光刻胶有正胶和负胶之分，你可以选择去除曝光或未曝光区域的胶）。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-3.png)

接下来，将整片晶圆浸入酸液中，以腐蚀掉那些未被光刻胶保护的氧化层区域。在更现代的工艺中会使用等离子体刻蚀；因为酸液不仅会向下刻蚀，还会轻微地向侧向刻蚀光刻胶下方的氧化层（各向同性），而等离子体刻蚀基本只向下进行（各向异性）。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-4.png)

之后，将晶圆放入扩散炉（即加热至1000°C以上的石英管）中。携带所需掺杂剂（此处为硼、砷或锑）的气体在晶圆周围流动，并缓慢扩散到硅表面。

这里需要注意两个重要事实：

1. 掺杂剂在硅表面附近浓度最高。随着时间的推移，它们会向硅内部扩散得更深，但表面附近的掺杂剂浓度始终更高。因此，任何扩散区域都存在显著的浓度梯度。
2. 掺杂剂不仅向下扩散，也会横向扩散（由于边缘的原料供应有限，横向扩散距离大约只有纵向扩散距离的一半）。这使得PN结（即N型与P型浓度相等处）位于氧化层下方，从而永远不会暴露于（不洁的）外界环境中。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-5.png)

扩散完成后，裸露的硅表面会再次被氧化层覆盖，以便晶圆进行下一步掩模工序——这可能是另一次扩散，或者是刻蚀接触孔。

这里有一个重要特征不容忽视：SiO₂是玻璃，对光透明。光线在氧化层底部的硅界面被反射，形成干涉条纹，即直射光和反射光叠加后抵消掉某些频率的光。因此，氧化层的颜色取决于其厚度。这不仅拍起照片来很美，更重要的是，它使得后续的掩模版能够与之前的光刻层精确对准。

以上就是利用平面工艺制作的一种NPN晶体管形式。衬底（起始晶圆）在硅生长时被掺杂为P型。整个流程依次进行三次扩散，其中第一次扩散较深。扩散完成后，刻出接触孔（使用同样的基础光刻胶工艺），然后在整片晶圆上沉积铝，进行图形化（又一步光刻工序），并蚀刻掉不需要的铝区域。

然而，这种晶体管有一个相当显著的缺点：集电极串联电阻较高。电流必须流过基区和衬底之间的区域，即集电极扩散区的远端——那里掺杂剂原子最少，因此电阻最高。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-6.png)

**外延（Epitaxy）**

如果将硅晶圆表面的氧化层剥离，然后放入充满气体的炉管中——这种气体不仅含有掺杂剂，还含有硅——你就可以生长出一层掺杂的单晶硅层。当气体携带的原子沉积在晶圆表面时，它们会根据底下的现有晶体结构排列整齐。

你也可以先在原始晶圆中扩散出一些区域，再进行外延生长，这样在外延层下方就会存在高浓度区域。尽管这些区域被埋在了底下（即埋层），后续的扩散工序依然能够与之对准。当扩散区域被重新氧化时，会有少量硅被消耗（生成SiO₂），从而在表面形成一个微小的凹陷。这些凹陷的边缘在外延层的顶面是可见的，不过图像往往会有些模糊，并且在大多数工艺中，会沿着晶轴方向发生偏移（大约45°）。

**离子注入（Ion Implantation）**

你也可以通过给掺杂原子充电（使其电离），然后用高压（几十万伏特）加速，直接将掺杂原子“射”进硅中。这种处理方式有些粗暴，新注入的原子不会规整地排列在晶格结构中，因此需要一个退火热循环，让原子重新排列成完整的晶体结构。

离子注入引入的掺杂原子数量通常比扩散法更精确。此外，你可以针对某个特定深度（但不会太深）进行注入。在随后的热循环（以及后续的扩散工序）中，掺杂原子会继续扩散，从而使掺杂层变宽。不过，此时的最大浓度不在表面，而是在你所选定的深度。

现在，我们来看一看双极（或BiCMOS）工艺中制造的现代NPN晶体管。

在生长外延层之前，先在P型衬底中扩散（或离子注入）一个重掺杂的（即N⁺型）埋层。在外延生长过程中，该埋层会向两边（衬底和新生长的外延层）都扩散一些。

下一步是隔离扩散。这是一道深P型（隔离）扩散（因此也比较宽）；它必须与P型衬底连接起来，这样整个N型集电区就被P型区完全包围。

接着，进行第二次N型扩散，即下沉区（Sinker），用来与埋层连接起来（而在其上方，只需要顺便利用发射极N⁺扩散即可，因为发射极本就要做这一步，不增加额外成本）。至此，集电极电流拥有了一条（相当）低电阻的路径。

### 1.3.2 非理想效应

#### **Early effect**

理想的集电极电流应该是基极电流乘上一个常数（β或hFE），由于一个pn结有两个耗尽层，对于集电极-基极形成的pn结，耗尽层同时向两侧扩展，基区的掺杂大于集电区，因此向基区延申的耗尽层会更浅。但因为基区的宽度很薄，耗尽层增加一点就已经是基区的很大一部分了。随着集电极电压上升，其耗尽层也越宽，但这一现象对基区的影响大得多。三极管的增益跟基区宽度关系很大，随着等效基区宽度减小，其增益也越高。

#### **Gain versus Current**

任何三极管的电流增益在电流很大或是很小时都会下降。

**1. 增益（β）的“驼峰”与“塌陷”：**

- 低电流端：BE结漏电流占比大，导致β下降；若极低电流下β虚高，那是CB结漏电造成的测量假象。
- 高电流端：大注入效应使器件失效 + 基极电阻压降导致电流集边效应（电流仅挤在发射极靠近基极接触的边缘），β急剧下降。

**2. 大电流能力由“周长”决定，而非“面积”：**

- 有效发射极长度（周长） 是决定最大驱动电流的关键。经验值约为1.5mA/μm（β跌至50%时）。
- 提升电流能力的技巧：发射极两端都放基极接触，并拉长发射极条，让电流分布更均匀。

**3. 版图绘制的实用技巧：**

- 隔离层反相：画图时画矩形（代表器件区域），但制版时自动反相，实际注入的是矩形之外的区域，避免设计师重复思考逻辑。
- 接触孔统一化：若工艺限制所有接触孔同尺寸，则需用多个相同的小方块拼成大接触区。

**4. 模拟电路的匹配精髓（极其重要！）：**

- 不同尺寸的管子不匹配（大管子β天然高于小管子，因为边缘俘获效率不同）。
- 高精度电流镜等场景，必须只用一种发射极尺寸，且基极接触方式完全一致，把它们放在同一个公共基区里。集电极面积只影响电阻/饱和压降，不影响增益匹配。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-7.png)

#### **Substrate Current**

**1. 饱和引发寄生导通（关键物理图像）：**

- 正常放大时，NPN的集电结（Collector-Base）反偏，C-Sub结（集电极N区 vs 衬底P区）也反偏，仅有微小漏电。
- 当NPN饱和时（Vc被拉到接近Ve），集电结变为正偏。此时，NPN的基区（P） 会向集电区（N）注入空穴，这些空穴被下方的P型衬底收集——于是形成了一个寄生PNP（P基区 → N集电区 → P衬底）。基极电流部分流向了衬底，形成衬底电流。

**2. 危险的“雪崩”连锁反应（闩锁前兆）：**

- 衬底并非超导体，存在电阻（Rsub）。
- 当大量电流注入衬底时，会在Rsub上产生电压降。如果压降足够大（>0.6V\\~0.7V），就会把附近其他NPN管的集电极-衬底结（或其他阱-衬底结）正向偏置。
- 这就相当于在电路中意外开启了一个原本不该导通的“通道”，可能会触发寄生晶闸管（SCR） 结构，导致闩锁效应（Latch-up）——即电源与地之间形成低阻大电流通路，轻则功能失效，重则烧毁芯片。

![](./assets/blog/designing-analog-chips阅读笔记1器件专题/designing-analog-chips阅读笔记1器件专题-8.png)

#### **Maximum Voltage**

**1. 核心物理矛盾（为什么高压意味着大面积）**

- 耐压需求 → 低掺杂（高电阻率）→ 耗尽区宽度增大。
- 在NPN管中，为了防止穿通效应（Punch-through）（基极耗尽区提前穿透外延层碰到衬底），外延层必须做厚，隔离扩散必须做深。
- 深扩散必然带来更大的横向扩散，且耗尽区本身也要占横向空间。版图上从隔离环到基极之间，要挤下5个物理分量（隔离侧扩 + 隔离耗尽层 + 对准余量 + CB耗尽层 + 基区侧扩），导致单个管子面积巨大。

**2. 结构上的“破局”手段（上下对向扩散）**

- 传统做法：隔离扩散从表面向下推，深度要贯穿整个厚外延层，导致扩散时间极长、横向扩得很宽。
- 改进做法：在外延生长之前，先在衬底上做一次P⁺预扩散。生长外延层后，再从上往下做常规隔离扩散。两层P⁺像“双向掘进隧道”一样相向扩散并在中间汇合。这样每一边只需要扩散原厚度的一半，深度减半，横向宽度也大幅缩短，显著节省面积。

**3. 系统级策略（混合电压平台）**

- 不必让所有器件都承受最高耐压。
- 通过增加额外的掩模和注入步骤，在同一个芯片上同时实现高压管（耐压高，间距大）和低压管（耐压低，间距小，密度高）。
- 设计时，只在需要连接高压节点的地方使用高压管并拉开间距，其余数字/低压模拟部分用密集的低压管填充，从而在整体上“中和”面积损失。

#### **The Miller Capacitance**

**4. 密勒效应的“灾难性”负面影响（带宽杀手）**
- **机理**：BJT的集电结（C-B结）存在寄生电容 $C_{CB}$。由于共射极放大器的电压增益 $A_v$ 很大（如几百倍），从输入端（基极）看进去，这个电容被等效放大了 $(1 + A_v)$ 倍，即 $C_{in} \\approx C_{CB} \\times A_v$。
- **后果**：原本零点几pF的电容变成了几十甚至上百pF。如果驱动基极的信号源内阻较大，这个巨大的等效电容会与内阻形成低通滤波器，导致高频信号严重衰减。
- **残酷的现实**：实际电路的带宽远远达不到晶体管本身的特征频率 $f_t$，通常只能做到 $f_t$ 的**1/20**左右（例如 $f_t=500MHz$ 的管子，实际放大电路可能只能稳定工作在 25MHz 以下）。
- **补救措施**：采用**Cascode（共射-共基）结构**。通过在共射管上方叠加一个共基管，将共射管的集电极电压钳位住，使其电压增益 $A_v$ 接近1，从而几乎完全消除了该管子的密勒倍增效应，大幅拓展带宽。**2. 密勒效应的“精妙”正面利用（集成补偿利器）**-**痛点**：在运放等负反馈电路中，为了保证稳定性，需要在主极点处放置一个较大的补偿电容（如 1nF）。但在芯片上做 1nF 的真电容会占用巨大的硅片面积（成本极高）。
- **妙招**：工程师利用密勒效应，在芯片上只做一个小小的**5pF**电容，将它跨接在运放的高增益级（输入和输出之间）。由于该级的电压增益很大（如200倍），从输入端看，这个 5pF 的物理小电容被等效放大为 $5pF \\times 200 = 1000pF$（即 1nF）——不花一分多余面积，用“电学杠杆”白嫖了一个大电容。

## 1.4 **CMOS 晶体管（CMOS Transistors)**
MOS场效应管的物理构想其实**早于**双极型晶体管——肖克利等人最初设想的器件原理非常直接：在硅表面附近放置一块极板，施加电压，通过静电力控制内部的载流子，从而形成导电沟道。

然而，理想很丰满，现实却很骨感。核心难题出在**硅表面**：表面的硅原子无法像体内那样通过共享外层电子形成完美的共价键，它们面对的是非晶态的二氧化硅（SiO₂），界面处存在大量悬挂键和陷阱电荷。1964年，通用微电子公司推出了第一款数字MOS集成电路，结果堪称一场产品灾难——大部分芯片在几天内就永久失效。罪魁祸首是二氧化硅层中携带电荷的**可移动钠离子（Na⁺）**，它们在电场作用下漂移，导致晶体管的阈值电压（$V_T$）每天都在变化。

经过数年对硅表面物理学的深入研究及超净工艺的突破，如今MOS晶体管的表面特性已被完全征服，甚至可以在氧化层中**故意注入电荷**并保持数百年不丢失。时至今日，MOS已成为绝对主导的集成器件，其尺寸远小于双极型晶体管，全球每年生产的MOS晶体管数量早已超过地球上蚂蚁的总数（约为全球每人每年5亿个）。

### 1.4.1 核心工艺结构

现代CMOS工艺通常采用N阱（N-Well）结构。其基本构造如下：在栅极区域，将绝缘层（SiO₂或氮化物）减薄，并在其上生长**多晶硅**作为栅电极材料（由于下方绝缘层是非晶态的，生长的硅为多晶结构）。

该工艺具备三大革命性优势：

1. **自对准（Self-aligning）**：源极和漏极区域通过离子注入形成，注入时栅极本身充当天然的遮挡掩模。这使得源/漏的边缘与栅极实现**完美自动对齐**，极大地减少了寄生重叠电容，这是MOS管能做得极快的关键原因之一。
2. **自隔离（Self-insulating）**：只要源极和漏极的电位等于或高于衬底电位（通常为地），它们与衬底之间的PN结就是反偏的，天然实现了器件间的电学隔离。**无需**像双极型工艺那样制作庞大、深扩散的隔离环，这为大幅节省芯片面积奠定了基础。
3. **源漏互换性**：MOS管的源极和漏极在物理结构上**完全对称**，可以任意指定。在电路版图中，串联的两个管子可以共用中间的有源区，一个区域兼任前一管的漏极和后一管的源极，布线极其紧凑。

由于载流子迁移率的天然差异，N沟道和P沟道器件性能悬殊：

- **NMOS（N沟道）**：利用**电子**导电，电子迁移率约是空穴的2\\~3倍，因此相同尺寸下**速度更快、跨导（增益）更高**。NMOS直接做在P型衬底上。
- **PMOS（P沟道）**：利用**空穴**导电，空穴迁移率较低，因此**速度稍慢、增益较低**。PMOS做在N阱中。

> **术语补充**：MOS管被称为单极型器件，因为其工作只涉及一种载流子（电子或空穴），这与双极型晶体管（电子和空穴同时参与工作）形成鲜明对比。

**器件类型**：通常使用**增强型（Enhancement-mode）**，即栅压为零时无沟道，需施加电压吸引载流子形成导电沟道。也有**耗尽型（Depletion-mode）**，出厂时已预置沟道，需加反向电压将其夹断。**工作区定义（以NMOS为例）**：

- **线性区（三极管区）**：漏极电压（$V_{ds}$）很小，沟道完整连续，此时器件呈现类似电阻的特性，电流随 $V_{ds}$ 线性上升。
- **饱和区（Saturation）**：当 $V_{ds}$ 增大到一定程度，漏端的沟道被耗尽层**夹断（Pinch-off）**，电流趋于饱和，不再随 $V_{ds}$ 显著增加（实际因沟道长度调制效应会有微小上翘）。**MOS的“饱和区”与BJT的“饱和区”含义完全相反！**在双极型晶体管中，“饱和”是指集电结正偏、$V_{ce}$ 很小（导通压降很低）的状态；而在MOS管中，“饱和”是指 $V_{ds}$**很大**导致沟道夹断的状态。两者概念截然相反，在交流讨论或阅读混合工艺文档时务必先确认语境，极易造成误解！

### 1.4.2 核心数学模型

在饱和区，MOS管的漏极电流遵循**平方律**关系：

$$I_d = k \\cdot \\frac{W}{L} \\cdot (V_{gs} - V_T)^2$$

**参数解读**：

| 符号 | 名称 | 设计影响 |
|-|-|-|
| **$I_d$**| 漏极饱和电流 | 器件的驱动能力 |
| **$k$**| 工艺跨导系数 | 由载流子迁移率和栅氧电容决定，工艺厂给定（NMOS的k明显大于PMOS） |
| **$W$**| 沟道宽度 | W越大 → 电流越大、跨导越大，但寄生电容也增大，版图面积增加 |
| **$L$**| 沟道长度 | L越小 → 速度越快、电流密度越大，但短沟道效应加剧（如DIBL） |
| **$V_{gs}$**| 栅源电压 | 输入控制信号 |
| **$V_T$**| 阈值电压 | 沟道开启的临界电压，受衬偏效应影响 |
| **$V_{gs} - V_T$**|**过驱动电压（Overdrive）**| 有效控制量。平方律决定了：**过驱动电压翻倍 → 漏极电流变为4倍**|**跨导（增益度量）**：

$$g_m = \\frac{\\partial I_d}{\\partial V_{gs}} = 2k \\cdot \\frac{W}{L} \\cdot (V_{gs} - V_T)$$

由于 $g_m$ 随偏置点 $V_{gs}$ 变化，MOS管本质上是**非线性器件**（双极型为指数律，MOS为平方律），这是模拟电路设计中失真产生的根源。

### 1.4.3 衬底偏置效应

沟道下方的区域构成**背栅（Back-Gate）**。如果背栅与源极之间存在电位差（即 $V_{SB} \\neq 0$），阈值电压 $V_T$ 会发生变化（增大），从而影响沟道导通程度和跨导，这就是**衬底偏置效应（Body Effect）**。

**对于 NMOS**：

背栅是P型衬底，全芯片所有NMOS共用，**无选择余地**，必须将衬底接到最负的电源（VSS / GND）。

**对于 PMOS（存在关键的设计策略选择）**：

| 策略 | 做法 | 面积成本 | 电学影响 | 适用场景 |
|-|-|-|-|-|
| **共用N阱**| 所有PMOS放同一个大N阱，固定接VDD |**最小**（成本最低） |**存在背栅效应**：若源极电位低于VDD（例如共源放大器的输出端），背栅（N阱）电位相对变高，会额外夹断沟道，**增益下降约30%**| 源极始终接VDD的PMOS（如数字逻辑门、电流镜负载管） |
| **独立N阱**| 每个PMOS单独做在自己的N阱中，N阱**接该管自身的源极**|**较大**（需画隔离间距） |**消除背栅效应**（$V_{SB}=0$），阈值电压恒定，增益不衰减 | 模拟关键路径（差分对、共源放大器、电平转换）中源极随信号摆动的PMOS |**设计黄金法则**：面对成本敏感的消费类芯片，选共用N阱牺牲部分性能换取面积；面对精密模拟核心模块，必须采用独立N阱以确保增益和线性度稳定。

## 1.5 补充内容

### 1.5.1 主要工艺变体及特点

| 工艺类型 | 核心特点 | 主要用途 |
|-|-|-|
| **Mixed Mode CMOS（混合模式CMOS）**| 在标准CMOS基础上增加**更高工作电压**的器件，并增加额外的多晶硅层和金属层 | 数模混合芯片，需要中高压接口的SoC |
| **BiCMOS**| 在CMOS工艺上**全功能集成双极型晶体管（BJT）**| 同时需要CMOS的高密度数字逻辑和BJT的高驱动/高精度模拟前端（如运放、带隙基准、驱动电路） |
| **Bipolar工艺 + 垂直PNP**| 在双极型工艺中增加**垂直结构**的PNP晶体管（速度远高于普通横向PNP） | 高速双极模拟电路（如高频放大器、电压比较器） |
| **高压CMOS（500V）**| 在标准CMOS平台上集成**耐压高达500V**的高压器件 | 电源管理IC、汽车电子、LED驱动、电机驱动等高压应用 |

**1. 掩模数 = 成本**

每增加一道掩模，就意味着额外的光刻、刻蚀、沉积、清洗等步骤，单片晶圆的加工时间延长，良率风险增加，成本显著上升。因此在工艺选型时，必须权衡“性能需求”和“成本预算”。

**2. 器件多样性 = 设计便利性**尤其是**BiCMOS**，它能将CMOS的低功耗、高密度数字逻辑与BJT的高跨导、大驱动能力、良好匹配性结合在同一芯片上，让模拟设计师有更丰富的“器件库”来优化电路架构。但这并不是免费的——BiCMOS的掩模数和工艺复杂度明显高于纯CMOS。

**3. 适用场景指导**

- **纯数字或简单模拟**→ 标准CMOS（成本最低，8层掩模即可）
- **数模混合，中等精度，消费电子**→ Mixed Mode CMOS（稍贵，但够用）
- **高性能模拟前端 + 数字控制逻辑**→ BiCMOS（成本较高，性能最优）
- **高精度/高速纯模拟**→ 先进Bipolar工艺（含垂直PNP）
- **高压功率/接口应用**→ 高压CMOS或BCD工艺（Bipolar + CMOS + DMOS）

**一句话总结：**

> **“更多的掩模层数意味着更高的成本，但也意味着更大的设计自由度和更优的性能。”**—— 工艺选型本质上是在**性能、功能和成本**之间做权衡。

### 1.5.2 CMOS vs. 双极型

关于CMOS和双极型晶体管究竟谁更适合模拟电路设计，这场争论几乎和这两种器件本身一样古老。以下逐一审视双方的主要论点。

**五维度对比分析**

**1. 输入电流（输入阻抗）**

|  | 双极型（BJT） | CMOS |
|-|-|-|
| **直流（DC）**|**需要**基极输入电流（有限输入阻抗） |**不需要**栅极电流（理论上为无穷大阻抗） |
| **高频（AC）**| （仍有结电容） | 存在输入电容，高频下同样会形成交流电流路径 |

> **结论**：CMOS在直流输入阻抗上完胜，但高频下两者都有电容性电流。此外，部分模拟设计技巧（如第8章所述）可将BJT的基极电流压到极低水平。

**2. 失调电压（Offset Voltage）**

|  | 双极型（BJT） | CMOS |
|-|-|-|
| 通常BJT的失调电压**更低**。但关键在于——**失调电压取决于器件尺寸**。 | 天生匹配性更好 | 可**加大晶体管尺寸**或采用修调（Trimming）技术，使CMOS达到与BJT同样低的失调电压 |

> **结论**：BJT占先天优势，但CMOS可以通过面积和修调来追赶，代价是成本增加。

**3. 噪声性能**

|  | 双极型（BJT） | CMOS |
|-|-|-|
| 总体上BJT的噪声**更低**，尤其是在**低频1/f噪声**区域（见第6章）。 | 优势方 | 劣势方 |

> **唯一的例外**：采用自动归零（Auto-Zero）**或**斩波稳零（Chopper-Stabilized Input）技术的CMOS电路（见第8章），可以有效消除1/f噪声，从而打破BJT的优势。

> **结论**：BJT在噪声方面通常胜出，但CMOS可通过电路技巧弥补。

**4. 器件尺寸（面积）**

|  | 双极型（BJT） | CMOS |
|-|-|-|
| 常规认知中CMOS器件尺寸更小（数字电路的确如此），但**在模拟设计中这个说法一般不成立**。 | 为了达到模拟设计所需的**匹配度、增益、低噪声**性能，CMOS晶体管必须做得**远大于**工艺允许的最小尺寸（即不能像数字逻辑那样用最小沟道长度）。 | 在供电电压≥3V 的合理范围内，CMOS和BJT器件最终**面积相当**。 |

> **结论**：模拟CMOS器件无法享受数字CMOS的小尺寸红利，两者在实用尺寸上基本打平。

**5. 低电压工作能力**

|  | 双极型（BJT） | CMOS |
|-|-|-|
| **BJT更适合低电压设计。**| 跨导（$g_m$）随**栅压超过阈值电压的平方**（即 $(V_{gs}-V_T)^2$）增长。若栅压仅能高于阈值0.5V，则需要**大得惊人的栅宽**才能获得足够的漏极电流。 | 集电极电流随基极电压的变化呈**指数关系**——室温下，基极电压仅需增加**60mV**，集电极电流就能**增大10倍**。 |

> **极具讽刺意味的现实**：CMOS技术正在向越来越低的供电电压迈进，而**恰恰在低压领域，CMOS处于严重的劣势**。BJT在低压下反而更容易获得高跨导和大电流驱动能力。

**最终总结**

| 对比维度 | 赢家 | 备注 |
|-|-|-|
| 输入阻抗（DC） | **CMOS**| 高频下差距缩小 |
| 失调电压 | **BJT**| CMOS可通过大尺寸/修调追赶 |
| 低频噪声 | **BJT**| CMOS可用斩波/自动归零技巧克服 |
| 模拟器件面积 | **平局**| ≥3V供电下两者相当 |
| 低电压工作（<3V） | **BJT**| 指数律 vs 平方律，BJT优势显著 |**一句话概括**：BJT在**精度、噪声和低电压驱动**上天然占优；CMOS在**直流输入阻抗**上胜出，但在**低电压**这个当今主流趋势下，反而暴露了它的根本性软肋。这也是为何许多先进模拟工艺（如BiCMOS）选择将两者结合，取长补短。

## 1.6 总结

本章重点介绍了器件相关的内容，这让我想起了四年前学习陈老《微电子器件》的日子。由于我是非科班出身，在理解这一部分知识的时候总是一知半解，索性当文科学习突击，虽然在研究生入学考试取得了相当好的成绩，但后面没有从事与器件相关的工作，很多知识也慢慢荒废了。读这本书第一章的时候，有一种熟悉又陌生的感觉，尽管AE工程师离底层器件已经很远了，但是这部分内容仍然是重中之重。学习器件底层的工作原理，能加深对电路设计方法的理解，也能知道有些刻意设计的目的是什么。

下一章将介绍spice仿真模型，一起来看看每个电子工程师都离不开的仿真有什么被经常忽略的地方吧！`,b=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"})),y=`---
title: "个人网页博客搭建指南"
date: "2026-06-10"
tag: "技术笔记"
excerpt: "基于 React 18 + TypeScript + Vite，结合 animalislandui 组件库，搭建个人博客系统，并利用飞书云文档与机器人实现自动化写作、转换与部署的工作流。"
cover: ""
readTime: "10分钟"
---
更新完善个人网页，完全实现博客功能

# 一.前言

上一篇文章讲述了如何搭建具有高级审美的个人网站，但一个好看的主页只是起点，经过思考后的高质量博客文章才是为个人增光添彩的关键。本文将详细介绍如何为主页添加博客系统，在飞书云文档中可视化写作排版，再编写脚本，通过飞书机器人应用实现飞书写稿 → 自动转换 → 一键部署，最终可以直接同步到个人网页的高效工作流，为个人网页的博客撰写简化大量操作。

**本文聚焦：博客系统的搭建 + 飞书文档自动化工作流**

**目标读者：想用 AI 搭建个人博客的开发者/求职者**

下面是使用的技术栈速览：

1. 页面与逻辑：**React 18 + TypeScript
构建博客的页面结构和交互逻辑（如文章列表、详情页、导航栏）。

1. 构建与预览：**Vite 7
把 React 组件、Markdown 文件等转换成浏览器能识别的文件，并提供本地开发服务器（实时预览）。

1. UI 组件库：**animal-island-ui
提供一套现成的、风格统一的界面组件，如卡片（Card）、标题（Title）、按钮（Button）、代码块（CodeBlock）等，风格为《动物森友会》式的温暖可爱。

1. 文章渲染：**react-markdown + remark-gfm
把你写的 Markdown 文本（如 \`# 标题\`、\`- 列表\`）渲染成真实的 HTML 标签（如 \`<h1>\`、\`<ul>\`）。remark-gfm 额外支持表格、任务列表等 GitHub 风格语法。

1. 部署与托管： **GitHub Pages
免费把博客的静态文件（HTML/CSS/JS）托管到互联网上，生成一个公网地址（如 \`用户名.github.io/仓库名\`）。

# 二.构建方法

## 2.1 数据层搭建

文件地址：src/utils/markdown.ts 

核心思路：用 Vite 的 import.meta.glob 在构建时批量加载所有 .md 文件，解析 frontmatter 后提供给页面使用。

### 类型定义

\`\`\`TypeScript
export interface BlogFrontmatter {
  title: string
  date: string
  tag: string
  excerpt: string
  cover: string
  readTime: string
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string
}
\`\`\`

类型定义了文章标题、发布日期、文章类型、简介、封面、预计阅读时间和文章标号。

### 加载函数与辅助函数

\`\`\`TypeScript
function loadModules(): Record<string, { default: string }> {
  try {
    return import.meta.glob('/src/content/blog/*.md', {
      query: '?raw',
      eager: true,
    }) as Record<string, { default: string }>
  } catch {
    console.warn('Failed to load markdown modules')
    return {}
  }
}

const modules = loadModules()
\`\`\`

**加载函数：\`loadModules（）\`**

\`import.meta.glob\` 是 Vite 特有的功能，它可以在构建时扫描匹配的文件路径，并动态导入它们，路径是保存博客文章的路径地址。

参数 \`query: '?raw'\` 表示把文件内容作为原始字符串导入（而不是作为组件）。

\`eager: true\` 表示立即加载所有模块（而不是懒加载），这样构建后所有文章内容都会打包进 JS 中（适合静态博客）。

返回值是一个对象，键是文件路径（如 \`/src/content/blog/hello.md\`），值是 \`{ default: "文件内容字符串" }\`。

最终 \`modules\` 对象就包含了所有 Markdown 文件的内容。

\`\`\`TypeScript
function getRawContent(mod: unknown): string {
  if (typeof mod === 'string') return mod
  if (mod && typeof mod === 'object' && 'default' in mod) {
    return String((mod as { default: unknown }).default)
  }
  return String(mod)
}
\`\`\`

**辅助函数：\`getRawContent(mod: unknown)\`**

处理不同导入格式下的内容提取。由于某些环境可能返回字符串或对象，这个函数确保返回文件原文。

### 解析函数

\`\`\`TypeScript
function parseFrontmatter(raw: string): { frontmatter: BlogFrontmatter; body: string } {
  // ... 详细代码
}
\`\`\`

**解析函数：\`parseFrontmatter(raw: string)\`**

功能：把 Markdown 字符串拆分成 frontmatter 对象 和 正文。

因为md文件里面是包含上述所七个类型，用于博客封面展示，因此解析函数要能将用于封面的部分分离出来。

具体功能：

- 检查文件是否以 \`---\` 开头（frontmatter 的标准标记）。
- 找到第二个 \`---\` 的位置，截取中间的 YAML 块。
- 逐行解析 \`key: value\`，支持去除引号（值可能被双引号或单引号包裹）。
- 如果解析失败或没有 frontmatter，返回空的 frontmatter 和完整原文作为 body。
- 返回 \`{ frontmatter, body }\`。

因此创建的md博客都要遵守这个格式规矩。

这个解析器是极简版的，不处理嵌套结构、数组或复杂 YAML，但只包含图片和md排版格式的博客完全够用了。

### 文件名提取函数

**文件名提取函数：\`extractSlug(path: string): string\`**

\`\`\`TypeScript
function extractSlug(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\\.md$/, '')
}
\`\`\`

功能：提取博客名，并用于生成博客

- 例如路径 \`/src/content/blog/hello-world.md\` → 得到文件名 \`hello-world.md\` → 去掉 \`.md\` → \`hello-world\`。
- \`slug\` 将用作 URL 的一部分，如 \`/blog/hello-world\`

### 生成全部文章列表（按日期排序）

\`\`\`TypeScript
const allPosts: BlogPostMeta[] = (() => {
  try {
    return Object.entries(modules)
      .map(([path, mod]) => {
        const { frontmatter } = parseFrontmatter(getRawContent(mod))
        return { ...frontmatter, slug: extractSlug(path) }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  } catch {
    console.warn('Failed to parse blog posts')
    return []
  }
})()
\`\`\`

- 遍历 \`modules\` 中的每一个文件。
- 解析其 frontmatter，合并 slug。
- 按 \`date\` 字段降序排序（最新的文章在前）。
- 结果存放在 \`allPosts\` 数组中，供博客首页或列表页使用。

### 导出函数

\`\`\`TypeScript
export function getAllPosts(): BlogPostMeta[]
\`\`\`

返回排序后的文章元数据数组（不含正文），用于展示文章列表。

\`\`\`TypeScript
export function getPostBySlug(slug: string): { frontmatter: BlogFrontmatter; body: string } | null
\`\`\`

- 根据 slug 找到对应的 Markdown 文件。
- 如果未找到返回 \`null\`。
- 如果找到，解析出完整的 frontmatter 和正文，并存入缓存后返回。
- 这个函数通常用于文章详情页，既需要元数据也需要渲染内容。

### 示例

假设 \`src/content/blog/my-first-post.md\` 内容为：

\`\`\`Markdown
---
title: "我的第一篇博客"
date: "2026-06-09"
tag: "技术笔记"
excerpt: "这是我的第一篇博客，记录学习 Vite + React 的过程。"
cover: ""
readTime: "3分钟"
---

正文内容...
\`\`\`

- 通过 \`loadModules\` 加载后，\`parseFrontmatter\` 会提取出上述 frontmatter。
- \`extractSlug\` 得到 \`"my-first-post"\`。
- \`allPosts\` 会包含一篇元数据为 \`{ title: "我的第一篇博客", date: "2026-06-09", ..., slug: "my-first-post" }\` 的对象。
- 访问 \`/blog/my-first-post\` 时，\`getPostBySlug("my-first-post")\` 返回完整的 frontmatter + 正文，就可以渲染出完整文章。

## 2.2 博客列表页搭建

搭建博客页，主要包含博客列表展示和问题回答

### 组件展示

\`\`\`TypeScript
import React from 'react'
import { Card, Divider, Collapse } from 'animal-island-ui'
import Title from '../components/Title/Title'
import { getAllPosts } from '../utils/markdown'
\`\`\`

- React：核心库。
- animal-island-ui：动森风格组件库，这里用了 \`Card\`（卡片）、\`Divider\`（分割线）、\`Collapse\`（折叠面板）。
- Title：自定义的标题组件。
- getAllPosts：来自 \`markdown.ts\` 的函数，返回所有文章的元数据数组（按日期排序）。

### 布局与样式

\`\`\`TypeScript
<div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
  <Title size="large" color="app-yellow">博客</Title>
  <div style={{ marginTop: 24, marginBottom: 28, color: '#7c5734', ... }}>
    技术笔记、工具实践与跨界探索 —— 记录成长的每一步
  </div>
\`\`\`

- 页面居中，最大宽度 800px。
- 使用了内联样式（简单场景下可行），动画 \`fadeInUp\` 由全局 CSS 定义的。
- 标题组件和描述文字。

### 文章网格

\`\`\`TypeScript
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
  {posts.map((post) => (
    <Card
      key={post.slug}
      color={TAG_COLOR_MAP[post.tag] ?? 'app-blue'}
      style={{ cursor: 'pointer' }}
      onClick={() => onNavigate(\`/blog/\${post.slug}\`)}
    >
      {/* 卡片内容：标签、标题、摘要、日期与阅读时间 */}
    </Card>
  ))}
</div>
\`\`\`

- \`posts = getAllPosts()\` 从所有 Markdown 文件中获取文章元数据。
- 使用 CSS Grid 实现响应式卡片布局（每行最少 240px，自动填充）。
- 每篇文章渲染成一个 \`Card\` 组件（来自动森 UI），根据 \`tag\` 映射不同的卡片颜色（\`TAG_COLOR_MAP\`）。
- 点击卡片时调用 \`onNavigate\` 函数，跳转到 \`/blog/{slug}\`（文章详情页）。这种路由方式是自定义的（非 React Router），由父组件处理页面切换。

卡片内部结构：

**1. \`#{post.tag}\`：标签，小字加粗半透明。**
**2. \`post.title\`：标题，大字。**
**3. \`post.excerpt\`：摘要（由 AI 生成或手动填写）。**
**4. 底部：\`日期 · 阅读时间\` + “阅读 →” 箭头。**

### 问答区域

\`\`\`TypeScript
<Divider type="line-teal" />

<div style={{ marginTop: 32 }}>
  <Title size="middle" color="app-teal">关于博客</Title>
  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Collapse question="博客的更新频率？" answer="随缘更新..." />
    <Collapse question="文章可以转载吗？" answer="非商用请注明出处..." />
    <Collapse question="用了什么技术栈？" answer="博客基于 React + Vite + animal-island-ui..." />
  </div>
</div>
\`\`\`

- \`Divider\`：动森风格的分割线。
- \`Collapse\`：手风琴折叠面板，点击问题展开答案。用来展示常见问题，提升页面丰富度。

### 总结

  布局：CSS Grid 自适应网格，minmax(260px, 1fr)，卡片组件来自 animal-island-ui 的 Card。

  每张卡片展示：

- 标签（带颜色映射：工具实践→绿，技术笔记→蓝，项目日志→粉，跨界探索→橙，随笔杂谈→紫）
- 标题、摘要、日期、阅读时间
- 点击跳转 #/blog/{slug}底部：用 Collapse 组件做了一个 FAQ 区域（更新频率、转载声明、技术栈）。

## 2.3 文章详情页搭建

这是博客文章详情页组件（\`BlogPost.tsx\`），它接收一个 \`slug\`（文章标识符），从之前解析好的 \`markdown.ts\` 中获取对应文章的完整 frontmatter 和正文，然后渲染成一篇完整的博客文章页面。

### 组件接收的参数

\`\`\`TypeScript
interface BlogPostProps {
  slug: string           // 文章的标识符，比如 "my-first-post"
  onNavigate: (path: string) => void   // 用于内部跳转（返回列表、还有目录等）
}
\`\`\`

- \`slug\` 由路由层传入（例如从 \`/blog/my-first-post\` 解析得到）。
- \`onNavigate\` 是父组件（比如 \`App.tsx\`）传递下来的路由切换函数，用于在不刷新页面的情况下跳转。

### 依赖的模块与数据

\`\`\`TypeScript
import { getPostBySlug } from '../utils/markdown'
\`\`\`

- \`getPostBySlug(slug)\` 会从之前缓存/解析的 \`modules\` 中找到匹配的文件，返回 \`{ frontmatter, body }\`（frontmatter 包含标题、日期、标签、摘要、封面、阅读时间；body 是 Markdown 正文）。
- 如果文章不存在，函数返回 \`null\`，组件会显示“文章未找到”。

\`\`\`TypeScript
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Divider, CodeBlock } from 'animal-island-ui'
\`\`\`

- \`ReactMarkdown\` + \`remarkGfm\`：把 Markdown 正文转成 HTML，并支持 GitHub 风格的表格、任务列表等。
- \`Divider\` 和 \`CodeBlock\`：动森 UI 库提供的分割线和代码块组件。

\`\`\`TypeScript
import styles from '../styles/blogPost.module.less'
\`\`\`

- 引入一个 CSS Module（Less 文件），专门用于文章正文的自定义样式（比如标题、段落、图片等的样式）。它负责让 Markdown 渲染后的 HTML 更美观。

### 辅助数据定义

**标签与颜色映射**

\`\`\`TypeScript
const TAG_COLOR_MAP: Record<string, string> = {
  '工具实践': 'app-green',
  '技术笔记': 'app-blue',
  ...
}
\`\`\`

- 用于给 \`<Title>\` 组件传递颜色（标题底色），与之前 \`Blog.tsx\` 中的卡片颜色保持一致。

\`\`\`TypeScript
const TAG_PILL_COLORS: Record<string, string> = {
  '工具实践': '#5AC28C',
  ...
}
\`\`\`

- 用于给元数据区域的“标签小药丸”设置背景色（圆形色块）。

**内联样式对象**

- 定义了页面布局的一些样式（容器、元数据栏、标签小药丸、封面图、返回链接、404 样式）。
- 统一管理，避免散落在 JSX 中难以维护。

###  组件主要逻辑

**1.获取文章数据**

\`\`\`TypeScript
const post = getPostBySlug(slug)
\`\`\`

- 调用之前实现的 \`getPostBySlug\`，拿到文章的元数据和正文。

**2.页面滚动到顶部**

\`\`\`TypeScript
useEffectBlogPost(() => {
  const main = document.querySelector('main')
  if (main) main.scrollTo({ top: 0 })
}, [slug])
\`\`\`

- 当 \`slug\` 改变（即切换到另一篇文章）时，将页面的主容器滚动到顶部。
- 这里假设页面布局中有一个 \`<main>\` 元素作为滚动容器（常见于单页应用）。如果没有，可能需要改为 \`window.scrollTo\`。

**3.处理文章不存在的情况**

\`\`\`TypeScript
if (!post) { return ( 404 UI ) }
\`\`\`

- 显示友好的“文章未找到”提示，并提供返回博客列表的链接。

**4.渲染正常文章**

\`\`\`TypeScript
const { frontmatter, body } = post
const tagColor = TAG_COLOR_MAP[frontmatter.tag] ?? 'app-blue'
const pillColor = TAG_PILL_COLORS[frontmatter.tag] ?? '#5B8DEF'
\`\`\`

**① 标题**

\`\`\`TypeScript
<Title size="large" color={tagColor as any}>{frontmatter.title}</Title>
\`\`\`

- 使用自定义的 \`<Title>\` 组件。

**② 元数据栏**

\`\`\`TypeScript
<div style={S.metaBar}>
  <span style={{ ...S.tagPill, background: pillColor }}>#{frontmatter.tag}</span>
  <span>{frontmatter.date}</span>
  <span>·</span>
  <span>{frontmatter.readTime}</span>
</div>
\`\`\`

- 显示标签（彩色药丸）、日期、阅读时间。

**③ 封面图（可选）**

\`\`\`TypeScript
{frontmatter.cover && (
  <img src={frontmatter.cover} alt={frontmatter.title} style={S.coverImage} />
)}
\`\`\`

- 如果 frontmatter 中有 \`cover\` 字段（图片 URL），则显示封面图。

**④ 分割线**

\`\`\`TypeScript
<Divider type="line-teal" />
\`\`\`

**⑤ Markdown 正文渲染（核心）**

\`\`\`TypeScript
<div className={styles.content}>
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      pre: ({ children, ...props }) => { ... },   // 处理代码块
      h1: ({ children, ...props }) => { ... },    // 为标题添加 id（用于锚点）
      h2: ...,
      h3: ...,
    }}
  >
    {body}
  </ReactMarkdown>
</div>
\`\`\`

- \`remarkPlugins\`：启用 GFM 扩展。
- \`components\` 自定义渲染器：

  - **\`pre\`**：检测 \`<pre><code>...</code></pre>\` 结构，取出代码内容，用 \`animal-island-ui\` 的 \`<CodeBlock>\` 组件替换（动森风格的代码块）。
  - **\`h1\`/\`h2\`/\`h3\`**：从标题文本中生成一个 \`id\`（去除 markdown 加粗标记 \`**\`，替换特殊字符为 \`-\`），以便支持页面内锚点链接（例如目录跳转）。生成的标题会带上 \`id\` 属性，可以通过 \`#标题slug\` 直接定位。**⑥ 底部分割线与返回链接**

\`\`\`TypeScript
<Divider type="line-brown" />
<div style={S.backLink} onClick={() => onNavigate('/blog')}>
  ← 返回博客列表
</div>
\`\`\`

### 总结

\`BlogPost.tsx\` 是博客中**最核心的页面组件**之一：

- 负责**取数据**（通过 \`getPostBySlug\`）
- 负责**渲染**（标题、元数据、封面、正文、返回链接）
- 负责**增强 Markdown**（代码块、标题锚点）

## 2.4 文章导航栏

\`App.tsx\` 里**实现了文章导航栏**——也就是我们常说的**侧边目录（Table of Contents, TOC）** 。

### 提取标题

\`\`\`TypeScript
function extractHeadings(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const lines = markdown.replace(/\\r\\n/g, '\\n').split('\\n')
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\\s+(.+)$/)
    if (match) {
      const text = match[2].replace(/\\*\\*/g, '').trim()
      items.push({
        id: slugifyHeading(text),      // 生成锚点 id
        text,                           // 标题文字
        level: match[1].length,        // 1,2,3 级标题
      })
    }
  }
  return items
}
\`\`\`

- 正则匹配 Markdown 中的 \`# \`、\`## \`、\`### \` 开头的行。
- 提取标题文本和级别，并用 \`slugifyHeading\` 生成一个唯一的 \`id\`（与 \`BlogPost.tsx\` 里为标题生成的 \`id\` 保持一致的算法）。
- 返回目录项数组。

### 渲染侧边栏

\`\`\`TypeScript
const TocSidebar: React.FC<{ items: TocItem[]; title: string }> = ({ items, title }) => {
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div style={{ padding: '24px 20px', ... }}>
      <div>{title}</div>
      <div>目录</div>
      <div>
        {items.map((item) => (
          <a href={\`#\${item.id}\`} onClick={handleClick(item.id)} style={{ paddingLeft: 12 + (item.level-1)*14, ... }}>
            {item.text}
          </a>
        ))}
      </div>
    </div>
  )
}
\`\`\`

- 每个目录项是一个可点击的 \`<a>\` 标签。
- 点击时通过 \`scrollIntoView({ behavior: 'smooth' })\` 平滑滚动到对应的标题元素（\`BlogPost.tsx\` 里生成的标题 \`id\` 正是用来做这个锚点的）。
- 支持多级缩进：\`h1\` 缩进最少，\`h3\` 缩进最多。

### 组装目录

\`\`\`TypeScript
const tocData = useMemo(() => {
  if (!isBlogPost || !blogSlug) return null
  const post = getPostBySlug(blogSlug)
  if (!post) return null
  return extractHeadings(post.body)
}, [isBlogPost, blogSlug])

const sidebarContent = useMemo(() => {
  if (!tocData || tocData.length === 0) return undefined
  const post = getPostBySlug(blogSlug)
  return <TocSidebar items={tocData} title={post?.frontmatter.title ?? ''} />
}, [tocData, blogSlug])
\`\`\`

- 当当前路由是博客详情页（\`isBlogPost && blogSlug\`）时，调用 \`getPostBySlug\` 获取文章正文，然后提取目录。
- 如果有目录项，就生成 \`<TocSidebar>\` 组件，赋值给 \`sidebarContent\`。

最后：

\`\`\`TypeScript
<Layout activeKey={activeKey} onNavigate={navigate} isMobile={isMobile} sidebarContent={sidebarContent}>
  {renderPage(activeKey, blogSlug, navigate)}
</Layout>
\`\`\`

- \`sidebarContent\` 被传递给 \`Layout\` 组件，由 \`Layout\` 决定在右侧（或左侧）渲染这个目录面板。
- 当不是博客文章页面时，\`sidebarContent\` 为 \`undefined\`，侧边栏就不会显示目录。

### 总结

- 这段代码实现了一个**动态文章目录导航栏**（侧边栏）。
- 它只会在**博客详情页**出现，自动提取文章中的 \`h1/h2/h3\` 标题作为目录。
- 点击目录项会平滑滚动到页面中的对应标题（因为 \`BlogPost\` 组件已经为每个标题生成了相同的 \`id\`）。

这个设计让长文章阅读体验更好，方便读者快速定位到感兴趣的章节。

# 三.飞书脚本搭建

## 3.1 为什么要写这个脚本？

在日常写作中，我习惯用飞书文档完成草稿——因为它支持富文本、图片、表格，协作方便，且内容云端存储。但飞书的导出格式无法直接用于博客（需要手动整理 Markdown、下载图片、生成 frontmatter）。为此，我编写了一个自动化脚本 \`feishu-to-md.ts\`，它能：

- 通过飞书 CLI 获取文档的 Markdown 内容
- 调用 DeepSeek AI 自动生成摘要、阅读时间、分类标签
- 下载文档中的图片到本地，并自动替换图片链接
- 生成符合博客规范的 \`.md\` 文件（含 frontmatter）

最终，一篇飞书文档可以一键变成博客文章，整个过程不超过 10 秒。

## 3.2  前置条件

使用脚本前，请确保以下环境已准备好：

| 依赖 | 说明 |
|-|-|
| **Node.js**| 版本 ≥ 18，用于运行脚本 |
| **飞书 CLI**| \`@larksuite/cli\` 命令行工具，用于获取文档内容 |
| **飞书登录**| 执行 \`lark-cli auth login --recommend\` 完成 OAuth 登录 |
| **DeepSeek API Key**（可选） | 用于 AI 生成元数据，如不配置则使用默认值 |

安装飞书 CLI：

\`\`\`Bash
npm install -g @larksuite/cli
# 或者项目内安装
npm install -D @larksuite/cli
\`\`\`

登录飞书：

\`\`\`Bash
npx lark-cli auth login --recommend
\`\`\`

## 3.3  脚本文件结构

将脚本放在项目根目录下的 \`scripts/feishu-to-md.ts\`，并确保有执行权限。

\`\`\`
项目根目录/
├── scripts/
│   └── feishu-to-md.ts         # 转换脚本
├── src/
│   └── content/blog/           # 生成的 Markdown 文章存放目录
├── public/
│   └── assets/blog/            # 下载的图片存放目录
└── .env                        # 存放 DEEPSEEK_API_KEY
\`\`\`

配置 \`.env\` 文件（可选）：

\`\`\`Bash
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxx
\`\`\`

## 3.4 使用方法

### 基本命令

\`\`\`Bash
npx tsx scripts/feishu-to-md.ts <飞书文档URL>
\`\`\`

在根目录下运行该命令。

### 示例

\`\`\`Bash
npx tsx scripts/feishu-to-md.ts https://xxxx.feishu.cn/docx/AbCdEf123456
\`\`\`

执行后，脚本会：

**1. 从 URL 中提取文档 token**
**2. 获取文档 Markdown 内容**
**3. 调用 AI 生成元数据（tag、excerpt、readTime）**
**4. 下载所有图片到 \`public/assets/blog/{slug}/\`**
**5. 在 \`src/content/blog/\` 下生成 \`{slug}.md\`**

### 输出示例

\`\`\`
正在获取文档: AbCdEf123456 ...
正在调用 AI 生成摘要...
  tag:     技术笔记
  excerpt: 基于 animal-island-ui 组件库，用 React + TypeScript 构建动森风格个人网站的开发过程与设计思考。
  readTime: 6分钟
正在处理图片...
  [1/3] ✓ my-post-1.png
  [2/3] ✓ my-post-2.jpg
  [3/3] ✓ my-post-3.png

✓ 已生成: src/content/blog/using-react-to-build-blog.md
  title:   使用 React + 动森 UI 搭建个人博客
  date:    2026-06-09
  tag:     技术笔记
  excerpt: 基于 animal-island-ui ...
  readTime: 6分钟
  图片:    3/3 张已下载到 public/assets/blog/using-react-to-build-blog/

请检查内容，必要时手动调整 tag 和 cover。
\`\`\`

## 3.5  工作流程详解

| 步骤 | 实现方式 |
|-|-|
| **获取文档**| 调用 \`lark-cli docs +fetch\`，以 Markdown 格式获取文档内容 |
| **提取标题**| 优先取 \`<title>\` 标签，否则取第一个 Markdown 一级标题 |
| **清理内容**| 删除飞书导出产生的多余标记（如 \`Plain Text\`、修复加粗空格） |
| **AI 生成元数据**| 取文章前 5000 字符，调用 DeepSeek API 返回 \`{tag, excerpt, readTime}\` |
| **获取创建时间**| 调用 \`lark-cli raw-api\` 获取文档元数据的 \`create_time\` |
| **下载图片**| 提取飞书图片链接（域名含 \`feishu.cn\` / \`lark\` / \`byteimg\`），下载到本地并替换链接 |
| **生成 frontmatter**| 组装 YAML 格式的 frontmatter，与清理后的 Markdown 拼接，写入文件 |

## 3.6 注意事项

- **文件覆盖策略**：如果 \`src/content/blog/{slug}.md\` 已存在，脚本会报错退出，**不会自动覆盖**。如需重新生成，请先手动删除旧文件。
- **图片下载**：优先使用 \`lark-cli drive +download\`，失败时回退到 \`fetch\` 下载。下载后的图片路径为 \`./assets/blog/{slug}/{filename}\`，相对路径可直接被 Markdown 引用。
- **AI 准确性**：DeepSeek 只分析文章前 5000 字符，生成的摘要可能因文章结构而偏差。建议生成后人工微调 \`excerpt\` 字段。
- **飞书权限**：确保你的飞书账号有该文档的“可阅读”权限，否则 CLI 无法获取内容。
- **网络要求**：需要能够访问飞书 API 和 DeepSeek API（国内通常正常）。

## 3.7 进阶配置

### 修改 AI 模型或参数

编辑脚本中的 \`fetch\` 请求体，可以更换模型（如 \`gpt-3.5-turbo\`）、调整 \`temperature\`、\`max_tokens\` 等。

### 添加自定义分类

修改脚本顶部的 \`CATEGORIES\` 数组，增加或调整博客分类标签。

### 自动生成封面图

目前 \`cover\` 字段留空，可以扩展脚本：取文档中的第一张图片作为封面，或调用图像生成 API 自动绘制。

## 3.8 结语

通过这个脚本，我将“写博客”这件事拆解为两个独立的步骤：

- **创作**：在飞书文档中自由写作，享受富文本和云同步。
- **发布**：运行一条命令，自动完成格式转换、图片下载、元数据生成。

这套流程既保留了飞书的便捷，又无缝接入了静态博客的构建体系。如果你也希望在自己的博客中引入类似的工作流，可以直接复制并修改这个脚本，让它适应你的目录结构和审美偏好。

# 四.总结

本文完整记录了一个**具备完整博客功能的个人网页**从零到一的搭建过程，并重点实现了**飞书文档自动化写作与发布工作流**。整个方案围绕“少维护、高可读、易写作”三个目标展开，最终形成了一套可长期使用的个人内容创作体系。

## 技术成果回顾

| 模块 | 实现内容 |
|-|-|
| **数据层**| 基于 Vite 的 \`import.meta.glob\` 在构建时批量加载 Markdown，解析 frontmatter 并提供 \`getAllPosts\` / \`getPostBySlug\` API，零数据库、零 CMS。 |
| **博客列表页**| 响应式卡片网格（动物岛 UI），按标签配色展示文章摘要、阅读时间，支持点击跳转。 |
| **文章详情页**| Markdown 正文渲染（react-markdown + remark-gfm），代码高亮（CodeBlock），标题锚点生成，自动滚动复位。 |
| **文章导航栏（TOC）**| 自动提取 \`h1\`\\~\`h3\` 生成侧边目录，点击平滑滚动到对应标题，提升长文阅读体验。 |
| **移动端适配**| 通过 \`Layout\` 组件区分桌面/移动端布局，移动端采用顶部栏 + 抽屉菜单，保留完整导航功能。 |
| **飞书自动化脚本**| \`feishu-to-md.ts\` 一键将飞书文档转为博客 Markdown，自动下载图片、调用 DeepSeek 生成摘要/标签/阅读时间，支持分类映射。 |

##  核心亮点

1. **零外部依赖**：所有内容以 Markdown 文件形式存在于代码仓库中，无需数据库、无需后台服务，可随时迁移或离线浏览。
2. **AI 辅助写作**：DeepSeek 自动分析文章前 5000 字符，生成符合博客风格的摘要、阅读时间和分类标签，大幅减少人工整理成本。
3. **飞书无缝集成**：利用飞书官方 CLI 获取文档内容，保留富文本、图片、表格等复杂格式，写作体验远优于本地编辑器。
4. **动森风格 UI**：基于 \`animal-island-ui\` 组件库和自定义 \`Title\` 组件，统一视觉语言，营造温暖、治愈的品牌调性。
5. **完整的静态博客能力**：支持按日期排序、标签分类、响应式布局、代码高亮、锚点目录、自动生成文章列表等现代博客必备功能。

## 对求职与个人品牌的帮助

- **技术展示**：文章详细记录了 React + TypeScript + Vite + GitHub Pages 的实战应用，可作为前端项目经历写入简历。
- **内容沉淀**：飞书 + 自动化脚本让写作变得极其轻量，无需关心格式转换和图片处理，可以专注于内容本身。
- **长期维护** ：静态博客托管在 GitHub Pages（或 Gitee Pages），无需服务器费用，文章更新只需 \`git push\`，一年后依然稳定运行。

## 后续可扩展方向

- 添加评论功能（基于 GitHub Issues 或 Giscus）
- 支持全文搜索（使用 \`fuse.js\` 或 Pagefind）
- 为首页增加“精选文章”或“热门标签”模块
- 实现暗色模式切换`,M=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));function k(){try{return Object.assign({"/src/content/blog/ai生成个人网页操作指南.md":C,"/src/content/blog/designing-analog-chips阅读笔记1器件专题.md":b,"/src/content/blog/个人网页博客搭建指南.md":M})}catch{return console.warn("Failed to load markdown modules"),{}}}const p=k();function u(n){return typeof n=="string"?n:n&&typeof n=="object"&&"default"in n?String(n.default):String(n)}function m(n){const t={title:"",date:"",tag:"",excerpt:"",cover:"",readTime:""};try{const e=n.trim();if(!e.startsWith("---"))return{frontmatter:t,body:e};const s=e.indexOf("---",3);if(s===-1)return{frontmatter:t,body:e};const c=e.slice(3,s).trim(),g=e.slice(s+3).trim(),i={};for(const a of c.split(`
`)){const r=a.indexOf(":");if(r===-1)continue;const l=a.slice(0,r).trim();let o=a.slice(r+1).trim();(o.startsWith('"')&&o.endsWith('"')||o.startsWith("'")&&o.endsWith("'"))&&(o=o.slice(1,-1)),i[l]=o}return{frontmatter:{title:i.title??"",date:i.date??"",tag:i.tag??"",excerpt:i.excerpt??"",cover:i.cover??"",readTime:i.readTime??""},body:g}}catch{return{frontmatter:t,body:n}}}function S(n){return(n.split("/").pop()??"").replace(/\.md$/,"")}const I=(()=>{try{return Object.entries(p).map(([n,t])=>{const{frontmatter:e}=m(u(t));return{...e,slug:S(n)}}).sort((n,t)=>t.date.localeCompare(n.date))}catch{return console.warn("Failed to parse blog posts"),[]}})(),d={};function A(){return I}function P(n){if(n in d)return d[n];try{const t=Object.entries(p).find(([s])=>S(s)===n);if(!t)return d[n]=null,null;const e=m(u(t[1]));return d[n]=e,e}catch{return d[n]=null,null}}const x={工具实践:"app-green",技术笔记:"app-blue",项目日志:"warm-peach-pink",跨界探索:"app-orange",随笔杂谈:"purple"};function T(n){return n.toLowerCase().replace(/[^\w一-鿿\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"")}function w(n){const t=[],e=new Map,s=n.replace(/\r\n/g,`
`).split(`
`);let c=!1;return s.forEach((g,i)=>{if(g.trimStart().startsWith("```")){c=!c;return}if(c)return;const a=g.match(/^(#{1,4})\s+(.+)$/);if(!a)return;const r=a[2].replace(/\*\*/g,"").trim(),l=T(r)||"section",o=e.get(l)??0;e.set(l,o+1),t.push({id:o===0?l:`${l}-${o}`,text:r,level:a[1].length,line:i+1})}),t}export{x as TAG_COLOR_MAP,w as extractHeadings,A as getAllPosts,P as getPostBySlug};

import React from 'react'
import { Tabs, Card, Divider, Collapse } from 'animal-island-ui'
import type { TabItem } from 'animal-island-ui'
import Title from '../components/Title/Title'

const SkillCard: React.FC<{ name: string; sub: string; color: string }> = ({ name, sub, color }) => (
  <Card
    color={color as any}
    style={{
      textAlign: 'center',
      padding: '20px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
    }}
  >
    <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
    <div style={{ fontSize: 15, opacity: 0.85 }}>{sub}</div>
  </Card>
)

const CircuitSkills = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
    <SkillCard name="电路仿真" sub="Cadence / Multisim / SIMetrix" color="app-blue" />
    <SkillCard name="PCB 设计" sub="Allegro / Altium Designer" color="app-teal" />
    <SkillCard name="硬件测试" sub="示波器 / 电源 / 万用表" color="app-orange" />
  </div>
)

const SystemSkills = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
    <SkillCard name="系统建模" sub="MATLAB / Simulink / PLECS" color="app-green" />
    <SkillCard name="数据分析" sub="Python / 数据处理与可视化" color="app-yellow" />
    <SkillCard name="嵌入式开发" sub="ARM Cortex-M / Verilog" color="purple" />
  </div>
)

const AiSkills = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
    <SkillCard name="AI 工具" sub="ChatGPT / Claude / Copilot" color="app-pink" />
    <SkillCard name="办公软件" sub="Office / Markdown / LaTeX" color="brown" />
    <SkillCard name="英语能力" sub="CET-6 519 分" color="warm-peach-pink" />
  </div>
)

const TAB_ITEMS: TabItem[] = [
  { key: 'circuit', label: '电路与硬件', children: <CircuitSkills /> },
  { key: 'system', label: '系统与建模', children: <SystemSkills /> },
  { key: 'ai', label: 'AI 与工具', children: <AiSkills /> },
]

const Skills: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="app-teal">专业技能</Title>

      <div style={{ marginTop: 24, marginBottom: 16, color: '#7c5734', fontSize: 17, fontWeight: 500 }}>
        电路设计、系统建模、AI 工程应用 —— 跨领域技术栈
      </div>

      <div style={{ marginTop: 24 }}>
        <Tabs items={TAB_ITEMS} defaultActiveKey="circuit" />
      </div>

      <Divider type="line-teal" />

      {/* 技能详情 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-green">技能详情</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Collapse
            question="电路设计与仿真"
            answer="精通 Multisim、Cadence Virtuoso、SIMetrix-Simplis 等 EDA 工具，独立完成电路建模、仿真优化及稳定性分析。"
          />
          <Collapse
            question="PCB 设计与硬件测试"
            answer="熟练运用 Cadence Allegro、Altium Designer 进行 PCB 布局布线，精通示波器、电源、万用表等仪器使用。"
          />
          <Collapse
            question="系统建模与数据分析"
            answer="精通 MATLAB/Simulink、PLECS 构建电力电子系统级模型，利用 Python 进行数据清洗、特征提取及可视化。"
          />
          <Collapse
            question="嵌入式开发"
            answer="基于 ARM Cortex-M 系列 MCU 实现硬件控制逻辑，具备基础 Verilog 硬件描述能力。"
          />
          <Collapse
            question="AI 工具应用"
            answer="熟练使用 ChatGPT、Claude、GitHub Copilot 等 AI 工具辅助代码编写、文档生成与工程问题分析，提升开发效率。"
          />
          <Collapse
            question="办公与文档"
            answer="熟练使用 Office 全家桶、Markdown 技术文档编写、LaTeX 学术论文排版。"
          />
          <Collapse
            question="英语能力"
            answer="CET-6 519 分，能够流畅阅读英文学术文献与芯片数据手册，具备基本的英文技术写作与交流能力。"
          />
        </div>
      </div>

      <Divider type="line-yellow" />

      <div style={{ marginTop: 32 }}>
        <Card type="title">持续学习中...</Card>
        <div style={{ marginTop: 12, color: '#8a7b66', fontSize: 15, lineHeight: 1.7 }}>
          技术世界日新月异，我始终保持好奇心和学习热情。
          在专注半导体硬件的同时，积极探索 AI 技术在工程领域的应用。
        </div>
      </div>
    </div>
  )
}

Skills.displayName = 'Skills'
export default Skills

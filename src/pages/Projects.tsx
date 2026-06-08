import React, { useState } from 'react'
import { Card, Modal, Tooltip, Divider, Button, Collapse } from 'animal-island-ui'
import Title from '../components/Title/Title'

interface Project {
  id: string
  name: string
  desc: string
  detail: string
  color: string
  tech: string[]
  code?: string
}

const PROJECTS: Project[] = [
  {
    id: '1',
    name: '高可靠性 BLDC 驱动电路建模',
    desc: '针对 GaN 器件在 BLDC 驱动系统中的非线性开关特性，独立构建混合状态机模型',
    detail: '针对第三代宽禁带半导体 GaN 器件在 BLDC 驱动系统中的非线性开关特性，独立构建混合状态机模型。通过精确表征离散模态切换与连续状态轨迹的耦合关系，成功攻克高可靠性数学建模难题，并以此模型为核心，有效指导了底层功率硬件电路的深度设计与优化。',
    color: 'app-blue',
    tech: ['MATLAB', 'PLECS', 'GaN'],
  },
  {
    id: '2',
    name: '变频模块测试与工程数据清洗流',
    desc: '独立编写自动化脚本，打通硬件调测到数据清洗的完整链条',
    detail: '在功率硬件开发与全流程可靠性试验期间，面对实验室仪器产生的海量高频波形数据，独立编写自动化脚本。打通"硬件调测-波形采集-数据清洗-特征提取"的完整链条，将繁琐的硬件故障排查与参数对比过程转变为数字化的高效工作流。',
    color: 'app-green',
    tech: ['Python', '示波器', 'MATLAB'],
  },
  {
    id: '3',
    name: '利用AI实现软件开发与设计实践',
    desc: '深度利用生成式 AI 与自动化工具，提升代码编写效能',
    detail: '在专注半导体硬件之余，积极探索前沿跨界软件工程实践。在项目全周期开发中，深度利用生成式 AI 与自动化工具，大幅提升了复杂业务逻辑的代码编写效能与重构效率；同时将极简主义大厂规范无缝融入系统交互，进一步践行工程效率与数字化 UI 审美的完美落地。',
    color: 'purple',
    tech: ['React', 'TypeScript', 'AI'],
  },
]

const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="purple">项目展示</Title>

      <div style={{ marginTop: 24, marginBottom: 16, color: '#7c5734', fontSize: 17, fontWeight: 500 }}>
        电路建模、硬件测试、AI 工程实践 —— 跨领域项目经验
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginTop: 24,
        }}
      >
        {PROJECTS.map((project) => (
          <Card
            key={project.id}
            color={project.color as any}
            style={{ cursor: 'pointer', padding: '24px 18px' }}
            onClick={() => setSelected(project)}
          >
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
              {project.name}
            </div>
            <div style={{ fontSize: 16, opacity: 0.9, marginBottom: 14, lineHeight: 1.6 }}>
              {project.desc}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {project.tech.map((t) => (
                <Tooltip key={t} title={t} variant="island">
                  <span
                    style={{
                      fontSize: 14,
                      padding: '4px 12px',
                      borderRadius: 50,
                      background: 'rgba(255,255,255,0.3)',
                      fontWeight: 600,
                    }}
                  >
                    {t}
                  </span>
                </Tooltip>
              ))}
            </div>
            <Button type="primary" size="small">
              查看详情
            </Button>
          </Card>
        ))}
      </div>

      <Divider type="wave-yellow" />

      {/* 项目详情 Collapse */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-teal">项目详情</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PROJECTS.map((project) => (
            <Collapse
              key={project.id}
              question={project.name}
              answer={project.detail}
            />
          ))}
        </div>
      </div>

      <Modal
        open={!!selected}
        title={selected?.name}
        onClose={() => setSelected(null)}
        onOk={() => setSelected(null)}
        typewriter={false}
      >
        <p style={{ fontSize: 17, fontWeight: 500, color: '#725d42', marginBottom: 16, lineHeight: 1.7 }}>
          {selected?.detail}
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {selected?.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 15,
                padding: '4px 14px',
                borderRadius: 50,
                background: '#e6f9f6',
                color: '#19c8b9',
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Modal>
    </div>
  )
}

Projects.displayName = 'Projects'
export default Projects

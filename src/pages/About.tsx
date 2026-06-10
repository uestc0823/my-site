import React from 'react'
import { Card, Divider } from 'animal-island-ui'
import Title from '../components/Title/Title'
import CycleTypewriter from '../components/CycleTypewriter'

const About: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="app-blue">关于我</Title>

      {/* 打招呼 */}
      <div style={{ marginTop: 16, marginBottom: 32 }}>
        <span style={{ fontSize: 15, color: '#8c857b', fontWeight: 600, letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>Hey there!</span>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#4a4238', margin: 0, letterSpacing: '-0.01em' }}>
          我是 JimmyLiu，
          <CycleTypewriter
            texts={[
              '欢迎来到我的个人网页！',
              '一名半导体行业从业者！',
              '热爱探索新技术的工程师！',
              '很高兴认识你！',
            ]}
            typeSpeed={100}
            deleteSpeed={50}
            pauseTime={2500}
            style={{ fontSize: 32, fontWeight: 800, color: '#4a4238' }}
          />
        </h1>
      </div>

      {/* 核心愿景 */}
      <div style={{ marginBottom: 36, borderLeft: '4px solid #bce19d', paddingLeft: 16 }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4a4238', fontWeight: 500, margin: 0 }}>
          作为一名热爱探索新技术的半导体从业者，我的职业方向聚焦于<strong style={{ fontWeight: 700 }}>高性能模拟与混合信号 IC 的设计与应用</strong>。我致力于将先进芯片技术与新能源、智能家电等终端需求深度融合，为绿色低碳能源体系提供高效可靠的半导体解决方案。
        </p>
      </div>

      {/* 工程思维 */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#6e6557', marginBottom: 16 }}>
          在实际工作中，我习惯从底层建模和电路仿真出发，结合具体的终端应用场景（如高能效、高可靠性要求）来优化半导体方案。这让我能在复杂的工业环境中独立完成电路仿真、模型构建与方案迭代。
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.9, color: '#6e6557', fontStyle: 'italic', margin: 0 }}>
          这个网站记录了我的技术栈、思考与跨界审美实践——欢迎交流。
        </p>
      </div>

      <Divider type="line-teal" />

      {/* 交叉优势与方案优化 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="warm-peach-pink">交叉优势与方案优化</Title>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 17, color: '#725d42', lineHeight: 1.7, fontWeight: 500, marginBottom: 20 }}>
            我的核心竞争力在于"交叉优势"——既具备扎实的数学建模与电路设计功底，又能从系统端理解高能效与高可靠性的真实工业需求。
            在实际项目中，我能够独立完成从理论建模到电路仿真的完整闭环，将学术研究与工程实践紧密结合。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <Card color="app-blue" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>🔧</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>交叉优势</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>兼顾数学建模与电路设计，跨学科解决复杂工程问题</div>
            </Card>
            <Card color="app-teal" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>🎯</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>场景理解</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>从系统端切入能效与可靠性，理解真实工业需求</div>
            </Card>
            <Card color="app-orange" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>⚡</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>方案优化</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>独立完成电路建模与仿真，推动方案迭代优化</div>
            </Card>
          </div>
        </div>
      </div>

      <Divider type="line-yellow" />

      {/* 核心方向与研究成果 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-green">核心方向与研究成果</Title>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 17, color: '#725d42', lineHeight: 1.7, fontWeight: 500, marginBottom: 20 }}>
            核心方向为信号链与混合信号IC，以及电力电子技术。我相信优秀的芯片能带来更低损耗与更智慧的电气化未来。
            学术成果发表于 TPE Letters（JCR Q1），在校期间曾获全国大学生数学竞赛决赛二等奖、集成电路创芯大赛全国二等奖。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <Card color="app-green" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>📡</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>核心方向</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>信号链 IC 与电力电子技术</div>
            </Card>
            <Card color="purple" style={{ textAlign: 'center', padding: '20px 14px', cursor: 'pointer' }} onClick={() => window.open('https://ieeexplore.ieee.org/document/11269677', '_blank')}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>📄</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>学术成果</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>发表 JCR Q1 顶级期刊论文</div>
            </Card>
            <Card color="app-yellow" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>🏆</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>奖项背书</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>获国家级集成电路与数学竞赛奖</div>
            </Card>
          </div>
        </div>
      </div>

      <Divider type="line-brown" />

      {/* AI技术应用与工程软实力 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-orange">AI技术应用与工程软实力</Title>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 17, color: '#725d42', lineHeight: 1.7, fontWeight: 500, marginBottom: 20 }}>
            在专注硬件的同时，我积极将前沿 AI 技术与自动化工具引入工程开发，并在项目实践中初见成效。
            此外，我十分注重跨部门协作与团队沟通，期望凭借开阔的技术视野与良好的协作能力快速融入团队，精准交付价值。
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            <Card color="app-pink" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>🤖</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>前沿关注</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>积极探索 AI 技术工程落地</div>
            </Card>
            <Card color="app-blue" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>⚙️</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>工程实践</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>利用自动化工具辅助开发实践</div>
            </Card>
            <Card color="app-teal" style={{ textAlign: 'center', padding: '20px 14px' }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>🤝</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>团队协作</div>
              <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.5 }}>具备良好的沟通与跨部门协作</div>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}

About.displayName = 'About'
export default About

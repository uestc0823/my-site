import React from 'react'
import { Card, Divider } from 'animal-island-ui'
import Title from '../components/Title/Title'

const Resume: React.FC = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="app-orange">简历</Title>

      {/* 教育背景 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-blue">🎓 教育背景</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ padding: '20px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}>
            <img
              src="./assets/img/logo-uestc.png"
              alt="电子科技大学"
              style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'contain', flexShrink: 0, background: '#fff', padding: 4 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#794f27', marginBottom: 4 }}>
                    电子科技大学 — 集成电路工程 / 硕士研究生
                  </div>
                  <div style={{ fontSize: 15, color: '#8a7b66' }}>2023.09 — 2026.06</div>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 16, color: '#725d42', lineHeight: 1.6 }}>
                学业表现：学业二等奖学金、优秀研究生。
              </div>
            </div>
          </Card>

          <Card style={{ padding: '20px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}>
            <img
              src="./assets/img/logo-dlut.png"
              alt="大连理工大学"
              style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'contain', flexShrink: 0, background: '#fff', padding: 4 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#794f27', marginBottom: 4 }}>
                    大连理工大学 — 过程装备与控制工程 / 本科
                  </div>
                  <div style={{ fontSize: 15, color: '#8a7b66' }}>2019.09 — 2023.06</div>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 16, color: '#725d42', lineHeight: 1.6 }}>
                学业表现：核心课程均分90+，专业排名前30%。
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Divider type="line-teal" />

      {/* 工作经历 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-green">💼 工作经历</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ padding: '20px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}>
            <img
              src="./assets/img/logo-novosense.png"
              alt="纳芯微电子"
              style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'contain', flexShrink: 0, background: '#fff', padding: 4 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                纳芯微电子(NOVOSENSE) — 传感器部门 · ASIC应用工程师
              </div>
              <div style={{ fontSize: 15, opacity: 0.85, marginBottom: 8 }}>2026.07 — 至今</div>
              <div style={{ fontSize: 16, lineHeight: 1.6 }}>
                负责芯片应用技术支持与方案设计。
              </div>
            </div>
          </Card>

          <Card style={{ padding: '20px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}>
            <img
              src="./assets/img/logo-midea.png"
              alt="美的集团"
              style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'contain', flexShrink: 0, background: '#fff', padding: 4 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>
                美的集团(Midea) — "美少年计划" 厨房与热水事业部 · 电机控制硬件实习生
              </div>
              <div style={{ fontSize: 15, opacity: 0.85, marginBottom: 8 }}>2025.06 — 2025.08</div>
              <div style={{ fontSize: 16, lineHeight: 1.6 }}>
                参与基于 GaN 器件的电机控制硬件研发测试，执行 EMC 安规测试、电源模块测试、电路功能测试等全流程硬件测试任务。
                专项负责变频模块测试，运用 MATLAB 完成开关器件损耗建模分析，报告为 GaN 功率器件选型提供关键数据支持。
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Divider type="line-yellow" />

      {/* 获得荣誉 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-yellow">🏆 获得荣誉</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { year: '2025.10', text: '电子科技大学 · 优秀研究生、二等学业奖学金' },
            { year: '2025.08', text: '第九届集创赛芯海杯 · 全国总决赛二等奖' },
            { year: '2024.07', text: '研究生创芯大赛 华为赛题 · 优秀奖' },
            { year: '2023.05', text: '第十三届全国大学生数学竞赛决赛二等奖' },
            { year: '2020.09', text: '大连理工大学精神文明奖学金' },
          ].map((h, i) => (
            <Card
              key={i}
              style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: '#8a7b66', minWidth: 70 }}>{h.year}</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#725d42' }}>{h.text}</span>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}

Resume.displayName = 'Resume'
export default Resume

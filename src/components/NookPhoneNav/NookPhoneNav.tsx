import React, { useState, useEffect } from 'react'
import styles from './nookPhoneNav.module.less'

export interface NookPhoneApp {
  id: string
  label: string
  color: string
  iconClass: string
  route: string
  iconUrl?: string
  hasNotification?: boolean
}

interface NookPhoneNavProps {
  apps: NookPhoneApp[]
  onNavigate: (route: string) => void
  welcomeText?: string
  className?: string
}

const NookPhoneNav: React.FC<NookPhoneNavProps> = ({
  apps,
  onNavigate,
  welcomeText = 'Welcome!',
  className,
}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12

  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const month = time.getMonth() + 1
  const day = time.getDate()
  const weekday = weekdays[time.getDay()]
  const dateStr = `${month}月${day}日 ${weekday}`

  return (
    <div className={`${styles.phoneWrapper} ${className || ''}`}>
      <div className={styles.phone}>
        <div className={styles.homeScreen}>
          {/* Time Display */}
          <div className={styles.dateDisplay}>
            <div className={styles.dateDisplayHeader}>
              <span className={styles.iconWifi} />
              <span>
                {displayHours}
                <span className={styles.blink}>:</span>
                {minutes} {ampm}
              </span>
              <span className={styles.iconLocation} />
            </div>
            <div className={styles.dayText}>{dateStr}</div>
          </div>

          {/* Apps Grid */}
          <div className={styles.appsGrid}>
            {apps.map((app) => (
              <div
                key={app.id}
                className={styles.appItem}
                onClick={() => onNavigate(app.route)}
              >
                <div
                  className={styles.appTile}
                  style={{ backgroundColor: app.color }}
                >
                  {app.iconUrl ? (
                    <img src={app.iconUrl} alt={app.label} className={styles.appIconImg} />
                  ) : (
                    <div className={`${styles.appIcon} ${styles[app.iconClass as keyof typeof styles] || ''}`} />
                  )}
                  {app.hasNotification && <div className={styles.badge} />}
                </div>
                <span className={styles.appLabel}>{app.label}</span>
              </div>
            ))}
          </div>

          {/* Page Indicator */}
          <div className={styles.pageIndicator}>
            <span className={styles.iconPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

NookPhoneNav.displayName = 'NookPhoneNav'
export default NookPhoneNav

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
  const displayTime = `${displayHours}:${minutes} ${ampm}`

  const weekdaysShort = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  const month = time.getMonth() + 1
  const day = time.getDate()
  const weekdayShort = weekdaysShort[time.getDay()]
  const dateStr = `${month}.${day} ${weekdayShort}`

  return (
    <div className={`${styles.phoneWrapper} ${className || ''}`}>
      <div className={styles.phone}>
        <div className={styles.homeScreen}>
          {/* Date & Time Display */}
          <div className={styles.dateDisplay}>
            <div className={styles.dateDisplayHeader}>
              <span className={styles.dateLeft}>
                <span className={styles.iconWifi} />
              </span>
              <span className={styles.dateTimeSpan}>
                {dateStr} {displayTime}
              </span>
              <span className={styles.dateRight}>
                <span className={styles.iconLocation} />
              </span>
            </div>
            <div className={styles.dayText}>{welcomeText}</div>
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

type Props = {
  activity: string[]
}

export default function ActivityFeed({ activity }: Props) {
  return (
    <div className="activity-feed">
      {activity.map((item, index) => <p key={`${index}-${item}`}>{item}</p>)}
    </div>
  )
}

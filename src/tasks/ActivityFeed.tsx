export default function ActivityFeed({ activity }: { activity: string[] }) {
  return (
    <div className="activity-feed">
      {activity.map((item, index) => <p key={`${index}-${item}`}>{item}</p>)}
    </div>
  )
}

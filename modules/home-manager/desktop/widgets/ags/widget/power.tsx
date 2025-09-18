import Battery from "gi://AstalBattery"
import { createBinding, createComputed, With } from "gnim"

export default function Power() {
  const battery = Battery.get_default()

  const percentage = createBinding(battery, "percentage")
  const isCharging = createBinding(battery, "charging")

  const batteryIcon = createComputed(
    [percentage, isCharging],
    (percentage, isCharging) => {
      if (isCharging) {
        return ""
      }

      const level = [
        { percentage: 0.8, icon: "" },
        { percentage: 0.6, icon: "" },
        { percentage: 0.4, icon: "" },
        { percentage: 0.2, icon: "" },
        { percentage: 0, icon: "" },
      ].find((level) => percentage >= level.percentage)

      if (!level) {
        return ""
      }

      return level.icon
    }
  )

  return (
    <box class="power">
      <With value={batteryIcon}>
        {(prettifiedPercentage) => (
          <menubutton>
            <label label={prettifiedPercentage} />
            <popover>
              <label label="hello world" />
            </popover>
          </menubutton>
        )}
      </With>
    </box>
  )
}

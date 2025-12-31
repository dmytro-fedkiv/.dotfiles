import { createPoll } from "ags/time"
import { With } from "gnim"

export default function Clock() {
  const time = createPoll(new Date(), 1000, () => new Date())

  return (
    <box class="clock">
      <With value={time}>
        {(time) => (
          <menubutton>
            <label
              label={time
                .toLocaleTimeString("en-US", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(/,/g, "")}
            />
          </menubutton>
        )}
      </With>
    </box>
  )
}

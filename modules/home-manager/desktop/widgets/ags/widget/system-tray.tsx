import AstalTray from "gi://AstalTray?version=0.1"
import { createBinding, For } from "gnim"

export default function SystemTray() {
  const tray = AstalTray.get_default()

  console.log(tray.items)

  const items = createBinding(tray, "items")

  const isVisible = items.as((item) => item.length > 0)

  return (
    <box class="system-tray">
      <For each={items}>
        {(item) => (
          <box class="item">
            <label label="b" />
            <image gicon={item.gicon} />
          </box>
        )}
      </For>
    </box>
  )
}

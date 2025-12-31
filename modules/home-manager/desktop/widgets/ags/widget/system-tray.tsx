import { execAsync } from "ags/process"
import { createPoll } from "ags/time"
import Gio from "gi://Gio?version=2.0"
import { With } from "gnim"

const TRAY_ITEMS_LIMIT = 4

const TRAY_ITEMS = [
  { executable: ".vicinae-wrappe", desktopId: "vicinae.desktop" },
]

export default function SystemTray() {
  const items = createPoll([], 1000, async () => {
    const isActive = await Promise.all(
      TRAY_ITEMS.map(async (item) => {
        return await execAsync(["pgrep", "-x", item.executable])
          .then((output) => output.trim() !== "")
          .catch(() => false)
      })
    )

    return TRAY_ITEMS.filter((_, index) => isActive[index])
  })

  return (
    <box class="system-tray">
      <With value={items}>
        {(items) => {
          return (
            <box>
              {(items.length > TRAY_ITEMS_LIMIT
                ? items.slice(0, TRAY_ITEMS_LIMIT - 1)
                : items
              ).map((item) => (
                <button>
                  <image
                    gicon={
                      Gio.DesktopAppInfo.new(item.desktopId)?.get_icon() ??
                      Gio.ThemedIcon.new("application-x-executable-symbolic")
                    }
                  />
                </button>
              ))}

              {items.length > TRAY_ITEMS_LIMIT && (
                <button>
                  <label label="" />
                </button>
              )}
            </box>
          )
        }}
      </With>
    </box>
  )
}

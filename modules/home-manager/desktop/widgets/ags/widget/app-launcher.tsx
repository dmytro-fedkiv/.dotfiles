import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import AstalApps from "gi://AstalApps"
import AstalHyprland from "gi://AstalHyprland?version=0.1"
import { createComputed, createState, For } from "gnim"

export default function AppLauncher() {
  const apps = new AstalApps.Apps()

  const [input, setInput] = createState("")

  const applications = createComputed([input], (input) =>
    apps.fuzzy_query(input)
  )

  return (
    <window
      application={app}
      name="app-launcher"
      class="app-launcher"
      visible={false}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      $={(window) => {
        const controller = new Gtk.EventControllerKey()

        controller.connect("key-pressed", (_, key) => {
          if (key === Gdk.KEY_Escape) {
            window.set_visible(false)
          }
        })

        window.add_controller(controller)
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box>
          <entry
            placeholderText="Search for apps or commands..."
            text=""
            onNotifyText={({ text }) => setInput(text.trim())}
          />
        </box>

        <box orientation={Gtk.Orientation.VERTICAL}>
          <scrolledwindow maxContentHeight={5000}>
            <For each={applications}>
              {(application) => (
                <button
                  class="application"
                  onClicked={() => {
                    app.get_window("app-launcher")?.set_visible(false)
                    application.launch()
                  }}
                >
                  <box>
                    <image iconName={application.iconName} />
                    <label label={application.name} />
                  </box>
                </button>
              )}
            </For>
          </scrolledwindow>
        </box>
      </box>
    </window>
  )
}

import { Astal, Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import AstalApps from "gi://AstalApps"
import Gio from "gi://Gio?version=2.0"
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
        <entry
          placeholderText="Search for apps or commands..."
          text=""
          onNotifyText={({ text }) => setInput(text.trim())}
        />

        <scrolledwindow heightRequest={300} widthRequest={500}>
          <box class="results" orientation={Gtk.Orientation.VERTICAL}>
            <box class="commands" orientation={Gtk.Orientation.VERTICAL}>
              <label class="title" halign={Gtk.Align.START} label="Commands" />
              <button class="command">
                <box>
                  <label label="💿 Search files" />
                </box>
              </button>
              <button class="command">
                <box>
                  <label label="📋 Clipboard History" />
                </box>
              </button>
            </box>
            <box class="applications" orientation={Gtk.Orientation.VERTICAL}>
              <label
                class="title"
                halign={Gtk.Align.START}
                label="Applications"
              />
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
            </box>
          </box>
        </scrolledwindow>
      </box>
    </window>
  )
}

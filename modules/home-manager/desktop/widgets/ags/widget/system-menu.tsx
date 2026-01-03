import { Gtk } from "ags/gtk4"

export default function SystemMenu() {
  return (
    <box class="system-menu">
      <menubutton
        direction={Gtk.ArrowType.DOWN}
        onNotifyActive={(self) =>
          self.active
            ? self.set_css_classes(["focused"])
            : self.set_css_classes(["unfocused"])
        }
      >
        <label label="󰌽" />
        <popover hasArrow={false} widthRequest={180} halign={Gtk.Align.START}>
          <box orientation={Gtk.Orientation.VERTICAL}>
            <button class="item">
              <box>
                <label class="icon" label="󰋽" />
                <label class="title" label="About This System" />
              </box>
            </button>

            <Gtk.Separator class="separator" />

            <button class="item">
              <box>
                <label class="icon" label="" />
                <label class="title" label="Sleep" />
              </box>
            </button>

            <button class="item">
              <box>
                <label class="icon" label="" />
                <label class="title" label="Restart" />
              </box>
            </button>

            <button class="item">
              <box>
                <label class="icon" label="" />
                <label class="title" label="Shut Down" />
              </box>
            </button>

            <Gtk.Separator class="separator" />

            <button class="item">
              <box>
                <label class="icon" label="" />
                <label class="title" label="Lock Screen" />
              </box>
            </button>
          </box>
        </popover>
      </menubutton>
    </box>
  )
}

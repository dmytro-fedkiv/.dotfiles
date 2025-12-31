import { Astal, Gtk } from "ags/gtk4"
import Workspaces from "./workspaces"
import Clock from "./clock"
import SystemMenu from "./system-menu"
import ControlCenter from "./control-center"
import SystemTray from "./system-tray"

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

export default function Bar() {
  return (
    <window visible anchor={TOP | LEFT | RIGHT}>
      <box class="bar" widthRequest={820} hexpand halign={Gtk.Align.CENTER}>
        <centerbox
          orientation={Gtk.Orientation.HORIZONTAL}
          hexpand
          halign={Gtk.Align.FILL}
        >
          <box class="container" $type="start">
            <SystemMenu />
            <SystemTray />
          </box>

          <box class="container" $type="center">
            <Workspaces />
          </box>

          <box class="container" $type="end">
            <ControlCenter />
            <Clock />
          </box>
        </centerbox>
      </box>
    </window>
  )
}

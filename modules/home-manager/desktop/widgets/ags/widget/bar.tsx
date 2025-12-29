import { Astal, Gtk } from "ags/gtk4"
import Workspaces from "./workspaces"
import Clock from "./clock"
import SystemMenu from "./system-menu"
import ControlCenter from "./control-center"

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

export default function Bar() {
  return (
    <window visible class="bar" anchor={TOP | LEFT | RIGHT}>
      <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
        <box class="container" $type="start">
          <SystemMenu />
          <Workspaces />
        </box>
        <box class="container" $type="center" />
        <box class="container" $type="end">
          <ControlCenter />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}

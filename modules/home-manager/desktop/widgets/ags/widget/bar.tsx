import { Astal, Gtk } from "ags/gtk4"
import Workspaces from "./workspaces"
import Clock from "./clock"
import SystemMenu from "./system-menu"
import ControlCenter from "./control-center"
import Power from "./power"
import Applications from "./applications"

const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

export default function Bar() {
  return (
    <window visible class="bar" anchor={TOP | LEFT | RIGHT}>
      <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
        <box class="container" $type="start">
          <SystemMenu />
          {/* <Applications /> */}
          <Workspaces />
        </box>
        <box class="container" $type="center" />
        <box class="container" $type="end">
          <Power />
          <ControlCenter />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}

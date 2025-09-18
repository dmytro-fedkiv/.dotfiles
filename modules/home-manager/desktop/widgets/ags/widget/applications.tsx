import { exec } from "ags/process"

export default function Applications() {
  return (
    <box class="applications">
      <button onClicked={() => exec("ags toggle app-launcher")}>
        <label label="󱗼" />
      </button>
    </box>
  )
}

import { exec, execAsync } from "ags/process"

export default function Applications() {
  return (
    <box class="applications">
      <button
        onClicked={() =>
          execAsync("ags toggle --instance astal app-launcher").catch((error) =>
            console.log(`Unable to open applauncher due: ${error}`)
          )
        }
      >
        <label label="󱗼" />
      </button>
    </box>
  )
}

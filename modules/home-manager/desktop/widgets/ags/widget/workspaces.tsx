import { For, createBinding, With, createComputed } from "gnim"
import AstalHyprland from "gi://AstalHyprland"
import Gio from "gi://Gio?version=2.0"

export default function Workspaces() {
  const hyprland = AstalHyprland.get_default()

  const workspaces = createComputed(
    [
      createBinding(hyprland, "focusedWorkspace"),
      createBinding(hyprland, "workspaces").as((workspaces) =>
        workspaces
          .filter((workspace) => !workspace?.name?.includes("special:"))
          .sort((a, b) => a.id - b.id)
      ),
    ],
    (focusedWorkspace, workspaces) =>
      Array.from(
        { length: workspaces[workspaces.length - 1].id },
        (_, workspaceId) => {
          const workspace = hyprland.get_workspace(workspaceId + 1)

          return workspace
            ? {
                workspace,
                isFocused: workspace.id === focusedWorkspace.id,
              }
            : { isFocused: false }
        }
      )
  )

  return (
    <box class="workspaces">
      <For each={workspaces}>
        {({ workspace, isFocused }) => (
          <button class={isFocused ? "focused" : "unfocused"}>
            {workspace ? (
              <Clients workspace={workspace} />
            ) : (
              <label label="" />
            )}
          </button>
        )}
      </For>
    </box>
  )
}

function Clients({ workspace }: { workspace: AstalHyprland.Workspace }) {
  const clients = createBinding(workspace, "clients")

  return (
    <With value={clients}>
      {(clients) => {
        if (clients.length === 0) {
          return <label label="" />
        }

        return (
          <box>
            {clients.map((client) => {
              const application = Gio.DesktopAppInfo.new(
                `${client.class.toLowerCase()}.desktop`
              )

              const applicationIcon =
                application?.get_icon() ?? Gio.icon_new_for_string("󰘔")

              return <image gicon={applicationIcon} />
            })}
          </box>
        )
      }}
    </With>
  )
}

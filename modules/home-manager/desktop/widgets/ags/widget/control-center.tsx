import { Gtk } from "ags/gtk4"
import AstalBluetooth from "gi://AstalBluetooth?version=0.1"
import AstalNetwork from "gi://AstalNetwork?version=0.1"
import AstalMpris from "gi://AstalMpris?version=0.1"
import { createBinding, With } from "gnim"
import Pango from "gi://Pango?version=1.0"
import Gio from "gi://Gio?version=2.0"
import GdkPixbuf from "gi://GdkPixbuf"

export default function ControlCenter() {
  return (
    <box class="control-center">
      <menubutton
        direction={Gtk.ArrowType.DOWN}
        onNotifyActive={(self) =>
          self.active
            ? self.set_css_classes(["focused"])
            : self.set_css_classes(["unfocused"])
        }
      >
        <label label="" />
        <popover hasArrow={false} halign={Gtk.Align.CENTER}>
          <Gtk.Grid
            $={(grid) => {
              grid.set_size_request(340, -1)
              grid.hexpand = false
              grid.halign = Gtk.Align.CENTER

              grid.set_column_spacing(10)
              grid.set_row_spacing(10)

              grid.set_row_homogeneous(true)

              const wifi = Network() as Gtk.Widget
              const bluetooth = Bluetooth() as Gtk.Widget
              const media = MediaPlayer() as Gtk.Widget

              for (const widget of [wifi, bluetooth, media]) {
                widget.set_halign(Gtk.Align.FILL)
                widget.set_valign(Gtk.Align.FILL)

                widget.set_hexpand(true)
                widget.set_vexpand(true)
              }

              grid.attach(wifi, 0, 0, 1, 1)
              grid.attach(bluetooth, 0, 1, 1, 1)
              grid.attach(media, 1, 0, 1, 2)
            }}
          />
        </popover>
      </menubutton>
    </box>
  )
}

function Network() {
  const network = AstalNetwork.get_default()

  switch (network.primary) {
    case AstalNetwork.Primary.WIFI:
      return <NetworkWiFi />
  }

  return <box />
}

function NetworkWiFi() {
  const { wifi } = AstalNetwork.get_default()

  return (
    <button class="pill" hexpand>
      <box>
        <button
          cssClasses={[
            "icon",
            wifi.internet === AstalNetwork.Internet.CONNECTED
              ? "connected"
              : "disconnected",
          ]}
          onClicked={() => {
            switch (wifi.internet) {
              case AstalNetwork.Internet.CONNECTED:
              case AstalNetwork.Internet.CONNECTING:
                return wifi.deactivate_connection()
              case AstalNetwork.Internet.DISCONNECTED:
                return wifi.accessPoints
                  .filter(
                    (accessPoint) => accessPoint.get_connections().length > 0
                  )
                  .sort((first, second) => first.strength - second.strength)
                  .at(0)
                  ?.activate()
            }
          }}
        >
          <label label="" />
        </button>

        <box class="information" orientation={Gtk.Orientation.VERTICAL}>
          <label class="title" halign={Gtk.Align.START} label="Wi-Fi" />
          <label class="details" halign={Gtk.Align.START} label={wifi.ssid} />
        </box>
      </box>
    </button>
  )
}

function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default()

  return (
    <button class="pill" hexpand>
      <box>
        <button
          cssClasses={[
            "icon",
            bluetooth.isPowered ? "connected" : "disconnected",
          ]}
        >
          <label label="󰂯" />
        </button>

        <box class="information" orientation={Gtk.Orientation.VERTICAL}>
          <label class="title" halign={Gtk.Align.START} label="Bluetooth" />
          <label
            class="details"
            halign={Gtk.Align.START}
            label={createBinding(bluetooth, "isPowered").as((isPowered) =>
              isPowered ? "On" : "Off"
            )}
          />
        </box>
      </box>
    </button>
  )
}

function MediaPlayer() {
  const mpris = AstalMpris.get_default()

  const player = createBinding(mpris, "players").as((players) => {
    const playing = players
      .filter((player) => player.available)
      .find(
        (player) => player.playbackStatus === AstalMpris.PlaybackStatus.PLAYING
      )

    return playing
  })

  return (
    <box class="tile" hexpand>
      <With value={player}>
        {(player) => (
          <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
            <box>
              <Gtk.Picture
                class="cover"
                $={(self) => {
                  if (player?.coverArt) {
                    self.set_pixbuf(
                      GdkPixbuf.Pixbuf.new_from_file_at_scale(
                        player.coverArt,
                        -1,
                        30,
                        true
                      )
                    )
                  }
                }}
              />
            </box>

            <label
              class="title"
              halign={Gtk.Align.START}
              maxWidthChars={16}
              ellipsize={Pango.EllipsizeMode.END}
              label={player?.title ?? "Not playing"}
            />

            <box
              class="controls"
              spacing={10}
              halign={Gtk.Align.CENTER}
              valign={Gtk.Align.CENTER}
            >
              <button
                class="previous"
                sensitive={player?.canGoPrevious}
                onClicked={() => player?.previous()}
              >
                <label label="" />
              </button>

              <button
                class="play"
                onClicked={() => {
                  switch (player?.playbackStatus) {
                    case AstalMpris.PlaybackStatus.PLAYING:
                      return player.pause()
                    case AstalMpris.PlaybackStatus.PAUSED:
                    case AstalMpris.PlaybackStatus.STOPPED:
                      return player.stop()
                  }
                }}
              >
                <label
                  label={
                    player?.playbackStatus === AstalMpris.PlaybackStatus.PLAYING
                      ? ""
                      : ""
                  }
                />
              </button>

              <button
                class="next"
                sensitive={player?.canGoNext}
                onClicked={() => player?.next()}
              >
                <label label="" />
              </button>
            </box>
          </box>
        )}
      </With>
    </box>
  )
}

import { readFileAsync } from "ags/file"
import { createPoll } from "ags/time"
import { With } from "gnim"

const KB = 1024
const FETCH_BANDWIDTH_SPEED_INTERVAL_IN_MS = 1000
const FETCH_BANDWIDTH_SPEED_INTERVAL_IN_SECONDS =
  FETCH_BANDWIDTH_SPEED_INTERVAL_IN_MS / 1000

function calcualteBandwidthSpeed(
  currentBytes: number,
  previousBytes: number
): number {
  return (
    (currentBytes - previousBytes) /
    KB /
    FETCH_BANDWIDTH_SPEED_INTERVAL_IN_SECONDS
  )
}

export default function Network() {
  const bandwidth = createPoll(
    {
      traffic: { rx: 0, tx: 0 },
      speed: { up: 0, down: 0 },
    },
    FETCH_BANDWIDTH_SPEED_INTERVAL_IN_MS,
    async (old) => {
      const [rx, tx] = await Promise.all([
        readFileAsync("/sys/class/net/wlp3s0/statistics/rx_bytes"),
        readFileAsync("/sys/class/net/wlp3s0/statistics/tx_bytes"),
      ])

      const newTraffic = { rx: Number(rx), tx: Number(tx) }

      return {
        traffic: newTraffic,
        speed: {
          up: calcualteBandwidthSpeed(newTraffic.tx, old.traffic.tx),
          down: calcualteBandwidthSpeed(newTraffic.rx, old.traffic.rx),
        },
      }
    }
  )

  return (
    <box>
      <With value={bandwidth}>
        {({ speed }) => (
          <menubutton>
            <label
              label={`${Math.round(speed.up)}↑ ${Math.round(speed.down)}↓`}
            />
          </menubutton>
        )}
      </With>
    </box>
  )
}

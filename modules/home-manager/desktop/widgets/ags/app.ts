import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/bar"
import AppLauncher from "./widget/app-launcher"

app.start({
  css: style,
  main() {
    Bar()
    AppLauncher()
  },
})

{ pkgs, ... }:

{
  home.packages = [ pkgs.ghostty ];

  xdg.configFile."ghostty/config".text = ''
    font-family = "JetBrainsMono Nerd Font"
    font-size = 14

    background-opacity = 0.8

    term = "xterm-256color"
  '';
}

{ pkgs, ... }:

{
  programs.tmux = {
    enable = true;

    shortcut = "s";

    terminal = "tmux-256color";

    plugins = with pkgs.tmuxPlugins; [
      catppuccin
      vim-tmux-navigator
    ];

    extraConfig = ''
      unbind r
      bind r source-file ~/.tmux.conf

      bind-key h select-pane -L
      bind-key j select-pane -D
      bind-key k select-pane -U
      bind-key l select-pane -R

      set -g mouse on

      set -g status-position top

      set -g @catppuccin_status_background "none"
      set -g @catppuccin_window_current_text "#{window_name}"
      set -g @catppuccin_window_current_fill "all"

      set -g status-left ""
      set -g status-right "#{E:@catppuccin_status_directory} #{E:@catppuccin_status_session}"

      set -g status-bg default
    '';
  };
}

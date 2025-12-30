{ pkgs, ... }:

{
  imports = [
    ../../modules/home-manager/desktop/fonts/nerd-fonts.nix
    ../../modules/home-manager/desktop/widgets/ags.nix
    ../../modules/home-manager/desktop/vicinae.nix
    ../../modules/home-manager/terminal/ghostty.nix
  ];

  home.username = "dmytro-fedkiv";
  home.homeDirectory = "/home/dmytro-fedkiv";
  home.stateVersion = "25.05";

  programs.home-manager.enable = true;

  fonts.fontconfig.enable = true;
  home.packages = [ pkgs.nerd-fonts.jetbrains-mono ];
}

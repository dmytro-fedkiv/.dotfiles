{ pkgs, ... }:

{
  fonts.fontconfig.enable = true;

  home.packages = with pkgs; [
    nerd-fonts.jetbrains-mono
    nerd-fonts.symbols-only

    inter
  ];

  fonts.fontconfig.defaultFonts = {
    sansSerif = [ "Inter" ];
    serif = [ "Inter" ];
    monospace = [ "JetBrainsMono Nerd Font" ];
  };
}

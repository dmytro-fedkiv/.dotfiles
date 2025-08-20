{
  imports = [
    ../../modules/home-manager/terminal/ghostty.nix
  ];

  home.username = "dmytro-fedkiv";
  home.homeDirectory = "/home/dmytro-fedkiv";
  home.stateVersion = "25.05";

  programs.home-manager.enable = true;
}

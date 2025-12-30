{ inputs, pkgs, ... }:

{
  imports = [
    ./hardware-configuration.nix

    ../../modules/home-manager/desktop/hyprland.nix

    ../../modules/home-manager/code-editor/nvim.nix

    ../../modules/home-manager/terminal/tmux.nix
    ../../modules/home-manager/terminal/zsh.nix

    ../../modules/nixos/boot.nix
    ../../modules/nixos/network.nix
    ../../modules/nixos/nixpkgs.nix
    ../../modules/nixos/region.nix
    ../../modules/nixos/user.nix
  ];

  home-manager = {
    extraSpecialArgs = { inherit inputs; };
    users = {
      "dmytro-fedkiv" = import ./home.nix;
    };
  };

  services.upower.enable = true;

  nixpkgs.config.allowUnfree = true;

  environment.systemPackages = [
    pkgs.git
    pkgs.google-chrome
    pkgs.vscode
    pkgs.alacritty
  ];
}

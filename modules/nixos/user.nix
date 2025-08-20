{ pkgs, ... }:

{
  users.users.dmytro-fedkiv = {
    isNormalUser = true;
    description = "Dmytro Fedkiv";
    shell = pkgs.zsh;
    extraGroups = [ "wheel" ];
  };
}
